# AI Agent Python Template

Шаблон для быстрого развертывания ИИ-агентов на Python с поддержкой LangChain и OpenAI.

## Template ID: `akbi9k1x2t2hlowb6q6y`

## Основные возможности

- 🐳 Готовый Docker-образ с предустановленными зависимостями:
  - Python 3.10
  - LangChain для работы с LLM
  - PyTorch и Transformers для локальных моделей
  - FastAPI для REST API

- ⚙️ Конфигурация через e2b.toml:
  - Настройки CPU и памяти
  - Healthcheck для мониторинга
  - Переменные окружения

- 🤖 Примеры использования:
  - Чат-боты
  - Анализ документов
  - Генерация контента
  - Автоматизация workflows

## Быстрый старт

### Использование Docker
```bash
# Сборка образа
docker build -t ai-agent .

# Запуск (указать API ключи)
docker run -p 8000:8000 -e OPENAI_API_KEY=ваш_ключ ai-agent
```

### Использование через SDK
```python
from e2b import Sandbox, AsyncSandbox

# Создание синхронного sandbox
sandbox = Sandbox("akbi9k1x2t2hlowb6q6y")

# Создание асинхронного sandbox
sandbox = await AsyncSandbox.create("akbi9k1x2t2hlowb6q6y")
```

```javascript
import { Sandbox } from 'e2b'

// Создание sandbox
const sandbox = await Sandbox.create('akbi9k1x2t2hlowb6q6y')
```

## Конфигурация

Основные параметры в `e2b.toml`:

```toml
[env_vars]
OPENAI_API_KEY = ""  # Обязательный
ANTHROPIC_API_KEY = "" # Опционально

[healthcheck]
cmd = "curl -f http://localhost:8000/health || exit 1"
```

## Примеры запросов

Тестовый запрос к агенту:
```bash
curl -X POST http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Привет, как дела?"}'
```

## Разработка

### Тестирование
```bash
# Запуск всех тестов
pytest tests/

# Проверка healthcheck
curl http://localhost:8000/health

# Тестовый запрос к агенту
curl -X POST http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello"}'
```

## Расширение функционала

1. Добавьте новые цепи (chains) в `agent.py`
2. Подключите дополнительные модели через LangChain
3. Реализуйте долгосрочную память (векторные БД)