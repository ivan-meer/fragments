import { NextResponse } from 'next/server'
import { exec } from 'child_process'
import { promisify } from 'util'
import fs from 'fs/promises'
import path from 'path'
import toml from '@iarna/toml'
import 'dotenv/config'
import { Sandbox } from '@e2b/code-interpreter'

const execAsync = promisify(exec)

export const maxDuration = 300 // 5 minutes for template building

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const dockerfile = formData.get('dockerfile') as File
    const startCommand = formData.get('startCommand') as string | null
    const configFile = formData.get('config') as File | null

    if (!dockerfile) {
      return NextResponse.json(
        { error: 'e2b.Dockerfile is required' },
        { status: 400 }
      )
    }

    // Create temp directory
    const tempDir = path.join(process.cwd(), 'tmp', `template-${Date.now()}`)
    await fs.mkdir(tempDir, { recursive: true })

    // Save Dockerfile
    const dockerfilePath = path.join(tempDir, 'e2b.Dockerfile')
    const dockerfileContent = await dockerfile.text()
    await fs.writeFile(dockerfilePath, dockerfileContent)

    // Handle config file if provided
    let finalStartCommand = startCommand
    if (configFile) {
      const configPath = path.join(tempDir, 'e2b.toml')
      const configContent = await configFile.text()
      await fs.writeFile(configPath, configContent)

      // Parse config to get start command if not provided directly
      if (!finalStartCommand) {
        try {
          const config = typeof configContent === 'string' ? toml.parse(configContent) : configContent
          if (config?.start_cmd) {
            finalStartCommand = String(config.start_cmd)
          }
        } catch (err) {
          console.error('Failed to parse TOML config:', err)
        }
      }
    }

    // Build template
    const buildCmd = finalStartCommand
      ? `e2b template build -c "${finalStartCommand}"`
      : 'e2b template build'
    
    const { stdout, stderr } = await execAsync(buildCmd, { cwd: tempDir })
    const templateId = stdout.trim().split('\n').pop()

    if (!templateId || stderr) {
      throw new Error(stderr || 'Failed to extract template ID')
    }

    // Cleanup
    await fs.rm(tempDir, { recursive: true })

    return NextResponse.json({
      templateId,
      logs: stdout,
      startCommand: finalStartCommand || null
    })
  } catch (err) {
    console.error('Template creation error:', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Template creation failed' },
      { status: 500 }
    )
  }
}

const maxRetries = 5;
const baseDelay = 3000; // 3 секунды

async function createSandboxWithRetry(templateId: string, startCmd?: string) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      // Use Sandbox.create with the templateId and startCommand
      // This assumes Sandbox.create is the correct method to initialize a sandbox
      // based on a template ID and start command.
      const sandbox = await Sandbox.create(templateId, {
        startCommand: startCmd,
        healthcheck: {
          retries: 10,
          interval: '5s',
          timeout: '15s'
        }
      });
      return sandbox;
    } catch (err) {
      if (attempt === maxRetries) throw err;
      const delay = baseDelay * Math.pow(2, attempt);
      console.warn(`Retry ${attempt}/${maxRetries} in ${delay}ms`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

// The following block was outside the POST function and causing the error.
// It should be removed or moved inside the POST function if needed for sandbox initialization after template creation.
// try {
//   const sandbox = await createSandboxWithRetry(templateId, finalStartCommand);
// } catch (err) {
//   console.error('Sandbox initialization failed after retries:', err);
// throw new Error(
//     { error: 'Не удалось инициализировать песочницу',
//       details: err.message,
//       code: err.code === 'ECONNREFUSED' ? 'SERVICE_UNAVAILABLE' : 'INTERNAL_ERROR'},
//     { status: 503 }
//   );
// }
