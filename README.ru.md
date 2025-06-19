# Fragments by E2B - Документация

![Превью Fragments (светлая тема)](/readme-assets/fragments-light.png#gh-light-mode-only)
![Превью Fragments (темная тема)](/readme-assets/fragments-dark.png#gh-dark-mode-only)

## О проекте

Открытая версия таких продуктов как [Claude Artifacts](https://www.anthropic.com/news/claude-3-5-sonnet), [v0](https://v0.dev) или [GPT Engineer](https://gptengineer.app).

Использует [E2B SDK](https://github.com/e2b-dev/code-interpreter) для безопасного выполнения AI-генерации кода.

[→ Демо на fragments.e2b.dev](https://fragments.e2b.dev)

## Возможности

- Next.js 14 (App Router, Server Actions), shadcn/ui, TailwindCSS, Vercel AI SDK
- Безопасное выполнение кода через [E2B SDK](https://github.com/e2b-dev/code-interpreter)
- Поддержка npm, pip пакетов
- Поддерживаемые стеки:
  - Python интерпретатор
  - Next.js
  - Vue.js
  - Streamlit
  - Gradio
- Поддерживаемые AI провайдеры:
  - OpenAI
  - Anthropic
  - Google AI
  - Mistral
  - Groq
  - Fireworks
  - Together AI
  - Ollama

## Описание шаблонов

1. **code-interpreter-v1**:
   - **Описание**: Шаблон для анализа данных на Python. Использует Jupyter notebook для выполнения кода с акцентом на анализ данных и визуализацию.
   - **Файл**: script.py
   - **Инструкции**: Выполняет код как ячейку Jupyter notebook. Сильный акцент на анализ данных. Может использовать сложные визуализации для объяснения результатов.

2. **nextjs-developer**:
   - **Описание**: Шаблон для разработки приложений на Next.js 13+. Использует pages router и автоматически перезагружает изменения.
   - **Файл**: pages/index.tsx
   - **Инструкции**: Приложение Next.js 13+, которое автоматически перезагружается. Использует pages router.

3. **vue-developer**:
   - **Описание**: Шаблон для разработки приложений на Vue.js 3+. Автоматически перезагружает изменения.
   - **Файл**: app.vue
   - **Инструкции**: Приложение Vue.js 3+, которое автоматически перезагружается. Только при явном запросе на создание Vue приложения.

4. **streamlit-developer**:
   - **Описание**: Шаблон для создания приложений на Streamlit. Автоматически перезагружает изменения.
   - **Файл**: app.py
   - **Инструкции**: Приложение Streamlit, которое автоматически перезагружается.

5. **gradio-developer**:
   - **Описание**: Шаблон для создания приложений на Gradio. Интерфейс Gradio Blocks/Interface должен называться demo.
   - **Файл**: app.py
   - **Инструкции**: Приложение Gradio. Gradio Blocks/Interface должен называться demo.

6. **ai-agent-python**:
   - **Описание**: Python-агент с FastAPI и LangChain. Включает терминальный дашборд для мониторинга.
   - **Файл**: agent.py
   - **Инструкции**: ИИ-агент с REST API и терминальным интерфейсом. Использует LangChain для работы с LLM.
   - **Технологии**: Python, FastAPI, LangChain, Rich
   - **Порт**: 8000


## Быстрый старт

### Требования

- [git](https://git-scm.com)
- Node.js и npm
- [E2B API Key](https://e2b.dev)
- API ключ AI провайдера

### 1. Клонирование репозитория

```bash
git clone https://github.com/e2b-dev/fragments.git
```

### 2. Установка зависимостей

```bash
cd fragments
npm i
```

### 3. Настройка переменных окружения

Создайте `.env.local`:

```sh
E2B_API_KEY="ваш-e2b-ключ"
OPENAI_API_KEY=
ANTHROPIC_API_KEY=
# ... другие ключи
```

### 4. Запуск сервера разработки

```bash
npm run dev
```

## Руководство разработчика

### Архитектура проекта

Проект использует Next.js 14 с App Router. Основные модули:

- `app/` - Next.js роуты
- `components/` - UI компоненты (shadcn/ui)
- `lib/` - Бизнес-логика и утилиты
- `sandbox-templates/` - Шаблоны для E2B

### Настройка окружения

1. Установите [E2B CLI](https://e2b.dev/docs/cli)
2. Настройте API ключи в `.env.local`
3. Для кастомных шаблонов используйте `e2b template init`

## Обзор фронтенда

### Компоненты

Основные UI компоненты (см. `components.json`):

- `Chat` - Интерфейс чата с AI
- `CodeEditor` - Редактор кода с подсветкой
- `SandboxViewer` - Просмотрщик E2B песочниц
- `ModelSelector` - Выбор AI модели

Используемые библиотеки:

- shadcn/ui - UI компоненты
- TailwindCSS - Стилизация
- Monaco Editor - Редактор кода

## Интерпретатор кода (E2B SDK)

### Принцип работы

1. Пользователь отправляет запрос
2. AI генерирует код
3. Код выполняется в изолированном контейнере E2B
4. Результаты возвращаются пользователю

### Безопасность

- Изолированные контейнеры
- Ограниченное время выполнения
- Контроль доступа к сети

## Кастомизация

### Добавление шаблонов

1. Создайте папку в `sandbox-templates/`
2. Инициализируйте шаблон:
   ```bash
   e2b template init
   ```
3. Настройте `e2b.Dockerfile` и `e2b.toml`
4. Добавьте шаблон в `lib/templates.json`

### Добавление AI моделей

1. Откройте `lib/models.json`
2. Добавьте новую модель:
   ```json
   {
     "id": "model-id",
     "provider": "Provider",
     "name": "Model Name"
   }
   ```

## Участие в разработке

Мы приветствуем вклад в проект. Если вы нашли баг или хотите предложить улучшение, создайте issue или pull request.
