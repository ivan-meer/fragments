import fs from 'fs/promises'
import path from 'path'
import { Sandbox } from '@e2b/code-interpreter'
import type { Templates, TemplateConfig, DynamicTemplates } from '@/types/templates'

function isDynamicTemplates(templates: unknown): templates is DynamicTemplates {
  return typeof templates === 'object' &&
         templates !== null &&
         !('then' in templates)
}

const TEMPLATES_FILE = path.join(process.cwd(), 'lib/templates.json')

export async function getTemplates(): Promise<DynamicTemplates> {
  try {
    const data = await fs.readFile(TEMPLATES_FILE, 'utf-8')
    return JSON.parse(data)
  } catch (err) {
    console.error('Error reading templates:', err)
    return {} as DynamicTemplates
  }
}

export async function addTemplate(
  templateId: string,
  config: {
    name: string
    lib: string[]
    file: string
    instructions: string
    port: number | null
    ready_cmd?: string
  }
): Promise<void> {
  const templates = await getTemplates()
  if (!isDynamicTemplates(templates)) {
    throw new Error('Invalid templates format')
  }
  
  if (templateId in templates) {
    throw new Error(`Template ${templateId} already exists`)
  }

  (templates as DynamicTemplates)[templateId] = config
  await fs.writeFile(TEMPLATES_FILE, JSON.stringify(templates, null, 2))
}

export async function removeTemplate(templateId: string): Promise<void> {
  const templates = await getTemplates()
  if (!isDynamicTemplates(templates)) {
    throw new Error('Invalid templates format')
  }
  
  if (!(templateId in templates)) {
    throw new Error(`Template ${templateId} not found`)
  }

  delete (templates as DynamicTemplates)[templateId]
  await fs.writeFile(TEMPLATES_FILE, JSON.stringify(templates, null, 2))
}

export async function listRunningSandboxes() {
  const sandboxes = await Sandbox.list()
  return sandboxes.map(sb => ({
    sandboxId: sb.sandboxId,
    templateId: sb.templateId,
    metadata: sb.metadata,
    startedAt: sb.startedAt
  }))
}

export async function connectToSandbox(sandboxId: string) {
  return Sandbox.connect(sandboxId)
}

export async function getSandboxUrl(sandbox: Sandbox, port: number) {
  return `https://${sandbox.getHost(port)}`
}