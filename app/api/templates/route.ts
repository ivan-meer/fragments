import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import toml from 'toml'
import type { Templates } from '@/types/templates'

const templatesPath = path.join(process.cwd(), 'sandbox-templates')

export async function GET() {
  try {
    const templates: Record<string, any> = {}
    const templateDirs = fs.readdirSync(templatesPath)

    templateDirs.forEach(dir => {
      const configPath = path.join(templatesPath, dir, 'e2b.toml')
      if (fs.existsSync(configPath)) {
        const configContent = fs.readFileSync(configPath, 'utf-8')
        const config = toml.parse(configContent)
        templates[dir] = {
          path: path.join(templatesPath, dir),
          name: config.template_name || dir,
          file: 'app.py', // Default file for Python templates
          port: 8000, // Default port for Flask
          dependencies: ['flask', 'gunicorn'] // Default dependencies
        }
      }
    })

    const formattedTemplates = Object.fromEntries(
      Object.entries(templates).map(([id, config]) => [
        id,
        {
          name: config.name,
          lib: config.dependencies,
          file: config.file,
          instructions: '',
          port: config.port,
          path: config.path
        }
      ])
    )
    
    if (Object.keys(formattedTemplates).length === 0) {
      return NextResponse.json(
        {
          error: 'No templates found',
          availableTemplates: templateDirs
        },
        { status: 404 }
      )
    }
    
    return NextResponse.json(formattedTemplates)
  } catch (err) {
    return NextResponse.json(
      {
        error: 'Error loading templates',
        details: err instanceof Error ? err.message : String(err)
      },
      { status: 500 }
    )
  }
}