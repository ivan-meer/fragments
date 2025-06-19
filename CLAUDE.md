# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Turbo (Next.js)
- `npm run build` - Build production version
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `pytest sandbox-templates/` - Run template tests using pytest

## Project Architecture

This is **E2B Fragments**, an open-source version of Anthropic's Artifacts that enables AI-powered code generation with live preview in secure E2B sandbox environments.

### Core Architecture (UPDATED 2024)

The application follows a production-ready Next.js 15 App Router structure with:

1. **Main Chat Interface** (`app/page.tsx`): Multi-LLM chat application with enhanced prompt engineering
2. **AI Integration**: Uses AI SDK with structured output validation via Zod schema
3. **Secure Sandbox Execution**: Code runs in isolated E2B environments with comprehensive monitoring
4. **Production Template System**: 7 standardized templates with security hardening

### Enhanced Data Flow

1. User submits natural language request
2. Enhanced prompt system guides AI to select optimal template
3. AI generates validated structured fragment (title, code, dependencies, port)
4. E2B sandbox created with security constraints and health monitoring
5. Application auto-starts via template `start_cmd` configuration
6. Comprehensive health checks verify successful deployment
7. Live preview URL provided with automatic error recovery

### Core Components (OPTIMIZED)

- **Enhanced Prompt System** (`lib/prompt.ts`): Detailed template selection guidance and code quality requirements
- **Fragment Schema** (`lib/schema.ts`): Comprehensive Zod validation for AI output
- **Template Management** (`lib/templates.ts`): Production-ready templates with detailed instructions
- **Multi-Provider LLM** (`lib/models.ts`): 10+ AI providers with 60s timeouts and error handling
- **Secure Sandbox API** (`app/api/sandbox/route.ts`): Health monitoring, retry logic, process management
- **Authentication**: Optional Supabase integration with team support

### Production Template System

**Standardized Templates** (All use Python 3.10, non-root users, health checks):

| Template | Port | Use Case | Key Features |
|----------|------|----------|--------------|
| `ai-agent-python` | 8000 | AI agents, chatbots, LangChain | FastAPI, Rich console, uvicorn |
| `nextjs-developer` | 3000 | React web apps, dashboards | Next.js 14, TypeScript, Tailwind |
| `vue-developer` | 3001 | Vue/Nuxt applications | Vue 3, Nuxt 3, Composition API |
| `streamlit-developer` | 8501 | Data dashboards, ML demos | Streamlit, scientific libraries |
| `gradio-developer` | 7860 | ML interfaces, model demos | Gradio, interactive ML tools |
| `r7gjwwzi8z9x5ezdjky8` | 5000 | Flask APIs, microservices | Flask, Gunicorn, CORS |
| `code-interpreter-v1` | - | Data analysis, calculations | Jupyter-style execution |

### Security & Monitoring Features

- **Sandboxed Execution**: All code runs in isolated E2B environments
- **Non-root Containers**: Security hardening with unprivileged users
- **Health Monitoring**: 3-retry health checks with process/port monitoring
- **Resource Limits**: CPU/memory constraints prevent resource abuse
- **Error Recovery**: Automatic retry logic and comprehensive logging
- **Rate Limiting**: Built-in request limiting with Upstash KV

### Template Configuration Standards

Each template requires:
- `e2b.toml` with `template_id`, standardized `team_id`, resource allocation
- `e2b.Dockerfile` with Python 3.10, security hardening, health checks
- Consistent port allocation (no conflicts)
- Proper startup commands and health verification

## Environment Configuration

**Required Environment Variables:**
```bash
E2B_API_KEY=your_e2b_api_key                    # Required for sandbox execution
OPENAI_API_KEY=your_openai_key                  # At least one AI provider required
ANTHROPIC_API_KEY=your_anthropic_key            # Recommended for best results
```

**Optional Configuration:**
- AI Providers: `GROQ_API_KEY`, `MISTRAL_API_KEY`, `GOOGLE_AI_API_KEY`, etc.
- Authentication: `SUPABASE_URL`, `SUPABASE_ANON_KEY` 
- Analytics: `NEXT_PUBLIC_POSTHOG_KEY`
- Rate Limiting: `RATE_LIMIT_MAX_REQUESTS`, `RATE_LIMIT_WINDOW`

## API Endpoints

- `/api/chat` - Enhanced AI chat with structured output and error handling
- `/api/sandbox` - E2B sandbox lifecycle management with monitoring
- `/api/templates` - Dynamic template discovery and validation

## Testing & Quality Assurance

- **Template Tests**: `pytest sandbox-templates/` - Validates all template configurations
- **Health Checks**: Automatic application monitoring with retry logic
- **Process Monitoring**: Real-time verification of application startup
- **Port Validation**: Ensures no conflicts and proper service binding

## Code Quality Standards

- **TypeScript**: Strict typing throughout the application
- **Error Handling**: Comprehensive error boundaries and recovery
- **Security**: Input validation, sanitization, and sandbox isolation
- **Performance**: Optimized builds with Turbo and efficient bundling
- **Monitoring**: Detailed logging and health check systems

## Development Best Practices

- Use `Promise.all()` for concurrent operations (never `async forEach`)
- Implement proper error handling with try-catch and retry logic
- Follow security guidelines for sandbox template creation
- Add comprehensive health checks for new templates
- Validate all environment variables and configurations
- Use structured logging for debugging and monitoring

## Troubleshooting Common Issues

- **Sandbox startup failures**: Check health check logs and process monitoring
- **Port conflicts**: Verify template port assignments in `templates.json`
- **AI timeout errors**: Switch providers or check network connectivity
- **Template configuration**: Validate `e2b.toml` and `e2b.Dockerfile` syntax

## important-instruction-reminders
Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.

## Recent Optimizations (2024)
- Fixed async forEach antipattern in sandbox file operations
- Standardized all Python templates to version 3.10 with security hardening
- Implemented comprehensive health monitoring with 3-retry logic
- Enhanced prompt engineering for better AI code generation
- Resolved port conflicts and template configuration inconsistencies
- Added 60-second timeouts for all AI provider integrations