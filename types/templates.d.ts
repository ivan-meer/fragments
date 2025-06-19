import staticTemplates from '../lib/templates.json'

type TemplateConfig = {
  name: string
  lib: string[]
  file: string
  instructions: string
  port: number | null
  ready_cmd?: string // Команда для проверки готовности песочницы
  [key: string]: any // Дополнительные динамические поля
}

type StaticTemplates = typeof staticTemplates
type DynamicTemplates = Record<string, TemplateConfig>

type Templates = StaticTemplates | DynamicTemplates

export type {
  Templates,
  TemplateConfig,
  StaticTemplates,
  DynamicTemplates
}