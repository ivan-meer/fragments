import staticTemplates from './templates.json'
import { loadTemplates } from './loadTemplates'
import type { Templates, TemplateConfig } from '@/types/templates'

// Используем только статическую конфигурацию из templates.json
// const dynamicTemplates = loadTemplates()
const templates: Templates = staticTemplates

export default templates
export type { Templates, TemplateConfig }
export type TemplateId = keyof Templates

export function templatesToPrompt(templates: Templates) {
  return `${Object.entries(templates).map(([id, t], index) => `${index + 1}. ${id}: "${t.instructions}". 
    File: ${t.file || 'none'}. 
    Main dependencies: ${t.lib.slice(0, 3).join(', ')}${t.lib.length > 3 ? ` (+${t.lib.length - 3} more)` : ''}.
    Port: ${t.port ? `${t.port} (${t.ready_cmd ? 'auto-check' : 'manual check'})` : 'none'}.
    ${t.name}`).join('\n\n')}`
}

// Проверка доступности шаблонов
export function checkTemplateAvailability(templateId: TemplateId) {
  return templateId in templates
}
