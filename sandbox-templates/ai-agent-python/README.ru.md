# Шаблон ИИ-агента на Python

Готовое решение для быстрого создания интеллектуальных агентов с использованием LangChain и OpenAI.

## Основной функционал

- 🐳 Docker-образ со всеми зависимостями
- 🤖 Интеграция с LangChain для работы с LLM
- ⚡ FastAPI для REST API
- 🧠 Поддержка контекста диалога
- 🩺 Встроенный healthcheck

## Варианты использования

1. **Чат-боты** для поддержки клиентов
2. **Анализ документов** (извлечение ключевой информации)
3. **Генерация контента** (статьи, описания, код)
4. **Автоматизация процессов** (обработка запросов, классификация)

## Начало работы

### Использование Docker
```bash
# Сборка Docker-образа
docker build -t ai-agent .

# Запуск контейнера
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
template_id = "akbi9k1x2t2hlowb6q6y"
memory_mb = 8_192  # Рекомендуется для ML-моделей

[env_vars]
OPENAI_API_KEY = ""  # Обязательный параметр
```

## Пример запроса

```python
import requests

response = requests.post(
    "http://localhost:8000/chat",
    json={"message": "Напиши пример кода на Python"}
)
print(response.json())
```

## Расширение функционала

1. Добавьте новые обработчики в `agent.py`
2. Подключите дополнительные модели:
```python
from langchain.llms import Anthropic

claude = Anthropic(anthropic_api_key=os.getenv("ANTHROPIC_API_KEY"))
```
3. Реализуйте долгосрочную память через векторные БД

## Тестирование

### Основные проверки
```bash
# Запуск всех тестов
pytest tests/

# Проверка healthcheck
curl http://localhost:8000/health

# Тестовый запрос к агенту
curl -X POST http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Привет"}'
```

## Поддержка

Для вопросов и предложений создавайте issues в репозитории.