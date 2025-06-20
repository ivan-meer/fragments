import { FragmentSchema } from '@/lib/schema'
import { ExecutionResultInterpreter, ExecutionResultWeb } from '@/lib/types'
import { Sandbox } from '@e2b/code-interpreter'
import { loadTemplates } from '@/lib/loadTemplates'
import type { Templates } from '@/lib/templates'
import { logger, logError, logInfo, logSecurity } from '@/lib/logger'
import path from 'path'
import fs from 'fs'
import toml from 'toml'

const templatesPath = path.join(process.cwd(), 'sandbox-templates')

const sandboxTimeout = 10 * 60 * 1000 // 10 minute in ms

export const maxDuration = 60

export async function POST(req: Request) {
  // Логирование загрузки шаблонов
  const templates: Templates = await loadTemplates()
  const {
    fragment,
    userID,
    teamID,
    accessToken,
  }: {
    fragment: FragmentSchema
    userID: string | undefined
    teamID: string | undefined
    accessToken: string | undefined
  } = await req.json()
  logInfo('Sandbox creation requested', { 
    template: fragment.template,
    hasCode: !!fragment.code,
    codeFilesCount: fragment.code?.length || 0
  }, userID)

  // Проверка доступности шаблона
  const templateName = fragment.template as keyof typeof templates
  if (!templates[templateName]) {
    logError(`Template not found: ${fragment.template}`, { 
      requestedTemplate: fragment.template,
      availableTemplates: Object.keys(templates)
    }, userID)
    return new Response(
      JSON.stringify({ error: `Template ${fragment.template} not found` }),
      { status: 404 }
    )
  }

  // Get template ID from config
  const templateConfigPath = path.join(templatesPath, fragment.template, 'e2b.toml')
  const templateConfig = toml.parse(fs.readFileSync(templateConfigPath, 'utf-8'))
  const templateId = templateConfig.template_id

  // Create an interpreter or a sandbox
  let sbx: Sandbox
  try {
    logInfo('Creating sandbox', { templateId, teamID: !!teamID }, userID)
    sbx = await Sandbox.create(templateId, {
      metadata: {
        template: templateId,
        userID: userID ?? '',
        teamID: teamID ?? '',
      },
      timeoutMs: sandboxTimeout,
      ...(teamID && accessToken
        ? {
            headers: {
              'X-Supabase-Team': teamID,
              'X-Supabase-Token': accessToken,
            },
          }
        : {}),
    })
    logInfo('Sandbox created successfully', { sandboxId: sbx.sandboxId }, userID)
  } catch (error) {
    logError('Failed to create sandbox', error, userID)
    return new Response(
      JSON.stringify({ error: 'Failed to create sandbox', details: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500 }
    )
  }

  // Install packages
  if (fragment.has_additional_dependencies) {
    try {
      logInfo('Installing additional dependencies', { 
        dependencies: fragment.additional_dependencies,
        command: fragment.install_dependencies_command 
      }, userID)
      await sbx.commands.run(fragment.install_dependencies_command)
      logInfo('Dependencies installed successfully', { 
        dependencies: fragment.additional_dependencies.join(', '),
        sandboxId: sbx.sandboxId 
      }, userID)
    } catch (error) {
      logError('Failed to install dependencies', error, userID)
      // Продолжаем выполнение, но логируем ошибку
    }
  }

  // Copy code to fs
  try {
    if (fragment.code && Array.isArray(fragment.code)) {
      logInfo('Copying multiple files to sandbox', { fileCount: fragment.code.length }, userID)
      await Promise.all(
        fragment.code.map(async (file) => {
          await sbx.files.write(file.file_path, file.file_content)
          logger.debug(`Copied file to ${file.file_path}`, { sandboxId: sbx.sandboxId }, userID)
        })
      )
    } else {
      logInfo('Copying single file to sandbox', { filePath: fragment.file_path }, userID)
      await sbx.files.write(fragment.file_path, fragment.code)
      logger.debug(`Copied file to ${fragment.file_path}`, { sandboxId: sbx.sandboxId }, userID)
    }
    logInfo('All files copied successfully', { sandboxId: sbx.sandboxId }, userID)
  } catch (error) {
    logError('Failed to copy files to sandbox', error, userID)
    return new Response(
      JSON.stringify({ error: 'Failed to copy files to sandbox' }),
      { status: 500 }
    )
  }

  // Start the application for web templates using E2B built-in mechanisms
  if (fragment.template !== 'code-interpreter-v1' && fragment.port) {
    logInfo('Starting web application', { 
      template: fragment.template, 
      port: fragment.port,
      sandboxId: sbx.sandboxId 
    }, userID)
    
    // E2B templates should auto-start via start_cmd in e2b.toml
    // We just need to wait and verify the application is running
    await new Promise(resolve => setTimeout(resolve, 8000)) // Give more time for startup
    
    // Comprehensive health check with retries
    let healthCheckPassed = false
    const maxRetries = 3
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`Health check attempt ${attempt}/${maxRetries} for ${sbx.sandboxId}`)
        
        // Check if process is running
        const processCheck = await sbx.commands.run(
          `ps aux | grep -v grep | grep -E "(python|node|npm)" | head -5`,
          { timeoutMs: 5000 }
        )
        console.log(`Running processes: ${processCheck.stdout}`)
        
        // Check if port is listening
        const portCheck = await sbx.commands.run(
          `netstat -tlnp 2>/dev/null | grep :${fragment.port} || ss -tlnp | grep :${fragment.port} || echo "Port not found"`,
          { timeoutMs: 5000 }
        )
        console.log(`Port ${fragment.port} status: ${portCheck.stdout}`)
        
        // Try HTTP request to the application
        const httpCheck = await sbx.commands.run(
          `curl -f -m 10 http://localhost:${fragment.port}/health 2>/dev/null || curl -f -m 10 http://localhost:${fragment.port}/ 2>/dev/null || echo "HTTP request failed"`,
          { timeoutMs: 15000 }
        )
        console.log(`HTTP check result: ${httpCheck.stdout}`)
        
        if (httpCheck.stdout && !httpCheck.stdout.includes("HTTP request failed")) {
          healthCheckPassed = true
          console.log(`✅ Application is running successfully on port ${fragment.port}`)
          break
        }
        
        if (attempt < maxRetries) {
          console.log(`⏳ Waiting 5 seconds before retry...`)
          await new Promise(resolve => setTimeout(resolve, 5000))
        }
        
      } catch (error) {
        console.log(`Health check attempt ${attempt} failed:`, error.message)
        if (attempt < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, 5000))
        }
      }
    }
    
    if (!healthCheckPassed) {
      console.warn(`⚠️ Application health check failed after ${maxRetries} attempts. App may still be starting up.`)
      
      // Log application logs for debugging
      try {
        const logs = await sbx.commands.run(`cd /home/user && tail -50 app.log 2>/dev/null || echo "No app.log found"`)
        console.log(`Application logs: ${logs.stdout}`)
      } catch (e) {
        console.log(`Could not retrieve application logs`)
      }
    }
  }

  // Execute code or return a URL to the running sandbox
  if (fragment.template === 'code-interpreter-v1') {
    const { logs, error, results } = await sbx.runCode(fragment.code || '')

    return new Response(
      JSON.stringify({
        sbxId: sbx?.sandboxId,
        template: fragment.template,
        stdout: logs.stdout,
        stderr: logs.stderr,
        runtimeError: error,
        cellResults: results,
      } as ExecutionResultInterpreter),
    )
  }

  // Get template port from configuration
  const templatePort = fragment.port || templates[templateName]?.port || 80
  console.log(`Using port ${templatePort} for template ${templateName}`)
  console.log(`Fragment port: ${fragment.port}, Template port: ${templates[templateName]?.port}`)
  
  return new Response(
    JSON.stringify({
      sbxId: sbx?.sandboxId,
      template: fragment.template,
      url: `https://${sbx?.getHost(templatePort)}`,
    } as ExecutionResultWeb),
  )
}
