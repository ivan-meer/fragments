# Next.js Developer Sandbox Template

## Описание шаблона

Шаблон для разработки приложений на Next.js 14+ с использованием:
- TypeScript
- Tailwind CSS
- shadcn/ui компонентов
- PostHog для аналитики

Автоматически создает новое Next.js приложение с предустановленными зависимостями и конфигурацией.

## Требования

- Node.js 21+
- 4 CPU ядра
- 4GB RAM
- Docker (для сборки образа)

## Быстрый старт

1. Создайте sandbox используя E2B SDK:

```python
from e2b import Sandbox
sandbox = Sandbox(template='nextjs-developer')
```

```javascript
import { Sandbox } from 'e2b'
const sandbox = await Sandbox.create({ template: 'nextjs-developer' })
```

2. Приложение будет доступно по URL песочницы

## Конфигурация

Основные параметры конфигурации (e2b.toml):

```toml
template_id = "scwxnhs1apt5uj7na7db"
template_name = "nextjs-developer"
dockerfile = "e2b.Dockerfile"
start_cmd = "/compile_page.sh"
cpu_count = 4
memory_mb = 4096
```

## Переменные окружения

Для кастомизации можно использовать:

- `NEXT_PUBLIC_POSTHOG_KEY` - ключ PostHog
- `NEXT_PUBLIC_APP_ENV` - окружение приложения (development/production)

## Примеры использования

1. Разработка Next.js приложений:
```javascript
// pages/index.tsx
export default function Home() {
  return <div>Hello World</div>
}
```

2. Использование shadcn/ui компонентов:
```javascript
import { Button } from "@/components/ui/button"

export default function Page() {
  return <Button>Click me</Button>
}
```

3. Интеграция с PostHog:
```javascript
import posthog from 'posthog-js'

posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY)
```

## Лицензия

MIT License