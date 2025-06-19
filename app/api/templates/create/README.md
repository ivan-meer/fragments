# API для создания шаблонов E2B

Этот endpoint позволяет создавать пользовательские шаблоны sandbox через API.

## Формат запроса

POST `/api/templates/create`

**Параметры:**
- `dockerfile`: Файл e2b.Dockerfile (обязательный)
- `startCommand`: Команда запуска (опциональный)

**Пример cURL:**
```bash
curl -X POST \
  -F "dockerfile=@./e2b.Dockerfile" \
  -F "startCommand=/root/.jupyter/start-up.sh" \
  http://localhost:3000/api/templates/create
```

## Формат ответа

**Успех (200 OK):**
```json
{
  "templateId": "id-of-your-template",
  "logs": "Build logs..."
}
```

**Ошибки:**
- 400: Неверные параметры запроса
- 500: Ошибка при создании шаблона

## Пример использования

1. Создайте e2b.Dockerfile:
```dockerfile
FROM e2bdev/code-interpreter:latest
RUN pip install cowsay
```

2. Отправьте запрос через API

3. Используйте полученный templateId в SDK:
```javascript
const { Sandbox } = require('@e2b/code-interpreter')

const sandbox = await Sandbox.create('your-template-id')