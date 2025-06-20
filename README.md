# 🚀 E2B Agent Templates

![](assets/BANNER.jpg)

> Готовые шаблоны для sandbox-сред E2B с ИИ-генерацией кода

[![Version](https://img.shields.io/badge/Version-2.0.0-blue)](https://github.com/e2b-dev/fragments)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Production--Ready-brightgreen)](https://github.com/e2b-dev/fragments)

## ✨ Features

- 🤖 **Multi-LLM Support**: Anthropic Claude, OpenAI GPT, Google Gemini, Mistral, Groq, and more
- 🔒 **Secure Execution**: Isolated E2B sandbox environments for safe code execution
- 🎯 **Smart Templates**: Pre-configured environments for different use cases
- 📱 **Live Preview**: Real-time preview of generated applications
- 🔄 **Hot Reload**: Automatic updates during development
- 🎨 **Modern UI**: Clean interface with dark/light theme support

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript, Tailwind CSS
- **AI Integration**: AI SDK with structured output validation
- **Backend**: Next.js API routes, E2B Code Interpreter SDK
- **Sandbox**: E2B cloud runtime environments
- **Authentication**: Supabase (optional)
- **Styling**: Tailwind CSS with Radix UI components

## 📦 Available Templates

### **Production-Ready Templates** ✅

| Template | Use Case | Port | Technologies |
|----------|----------|------|-------------|
| **AI Agent Python** | AI chatbots, LangChain agents, FastAPI APIs | 8000 | FastAPI, LangChain, Rich, Uvicorn |
| **Next.js Developer** | React web apps, dashboards, full-stack apps | 3000 | Next.js 14, TypeScript, Tailwind CSS |
| **Vue.js Developer** | Vue/Nuxt applications, SPAs, PWAs | 3001 | Vue 3, Nuxt 3, Composition API |
| **Streamlit Developer** | Data dashboards, ML demos, analytics | 8501 | Streamlit, Pandas, Matplotlib |
| **Gradio Developer** | ML interfaces, model demos, AI tools | 7860 | Gradio, Pandas, NumPy |
| **Flask API** | REST APIs, microservices, web backends | 5000 | Flask, Gunicorn, Flask-CORS |
| **Code Interpreter** | Data analysis, calculations, visualizations | - | Python, Jupyter, Scientific libraries |

### **🔥 New Templates (2024-2025)** 🚧

| Template | Use Case | Port | Technologies | Status |
|----------|----------|------|-------------|--------|
| **MLOps FastAPI** | ML model deployment, data pipelines, monitoring | 8080 | FastAPI, MLflow, DVC, Evidently | 🚧 In Progress |
| **React Native Expo** | Cross-platform mobile apps, rapid prototyping | 19000 | React Native, Expo, TypeScript | 📋 Planned |
| **Svelte/SvelteKit** | High-performance web apps, SSR | 5173 | Svelte, SvelteKit, Vite | 📋 Planned |
| **Solidity Hardhat** | Smart contracts, DApps, Web3 development | 8545 | Solidity, Hardhat, Ethers.js | 📋 Planned |
| **Kubernetes DevOps** | Container orchestration, microservices | 8080 | Kubernetes, Helm, Docker | 📋 Planned |
| **Flutter Developer** | Cross-platform mobile apps, native performance | 3000 | Flutter, Dart, Material UI | 📋 Planned |
| **Data Engineering** | ETL pipelines, data processing, analytics | 8501 | Apache Airflow, Spark, Pandas | 📋 Planned |
| **NestJS Enterprise** | Enterprise APIs, microservices architecture | 3000 | NestJS, TypeScript, GraphQL | 📋 Planned |

### **🎯 Specialized Templates** 🎮

| Template | Use Case | Port | Technologies | Status |
|----------|----------|------|-------------|--------|
| **Discord Bot** | Bot development, automation, communities | 3001 | Discord.js, Node.js, TypeScript | 📋 Planned |
| **Chrome Extension** | Browser extensions, web automation | 3000 | Manifest V3, TypeScript, React | 📋 Planned |
| **Game Development** | Unity scripts, game mechanics, prototyping | 7777 | Unity, C#, Game Engine | 📋 Planned |
| **Go Microservice** | High-performance APIs, cloud-native | 8080 | Go, gRPC, Docker, Kubernetes | 📋 Planned |

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- E2B API key ([get one here](https://e2b.dev/))
- AI provider API keys (OpenAI, Anthropic, etc.)

### Installation

```bash
# Clone the repository
git clone https://github.com/e2b-dev/fragments
cd fragments

# Install dependencies
npm install

# Set up environment variables
cp .env.template .env
# Edit .env with your API keys

# Start development server
npm run dev
```

Visit `http://localhost:3000` to start creating code fragments!

### Environment Setup

Create a `.env` file with the following variables:

```bash
# Required
E2B_API_KEY=your_e2b_api_key

# AI Provider Keys (at least one required)
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_anthropic_key
GROQ_API_KEY=your_groq_key

# Optional: Authentication & Analytics
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_key
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
```

## 📖 How It Works

1. **User Input**: Describe what you want to build in natural language
2. **AI Generation**: LLM generates structured code using our enhanced prompt system
3. **Template Selection**: AI automatically chooses the best template for your use case
4. **Sandbox Creation**: E2B creates an isolated environment with your code
5. **Live Preview**: Access your running application via secure URL
6. **Iteration**: Modify and improve your code with AI assistance

## 🏗️ Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Next.js App  │    │   AI SDK +       │    │  E2B Sandbox   │
│                 │────│   Structured     │────│                 │
│ - Chat UI       │    │   Output         │    │ - Code Exec     │
│ - File Preview  │    │ - Multi-LLM      │    │ - Live Preview  │
│ - Template      │    │ - Prompt Eng.    │    │ - Secure Env    │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

## 🎯 Template System

### Template Structure

Each template consists of:
- `e2b.toml` - E2B configuration (ports, resources, startup commands)
- `e2b.Dockerfile` - Container definition with dependencies
- Application files - Starter code and examples
- Health checks - Automatic monitoring and validation

### Creating Custom Templates

1. **Create template directory**:
   ```bash
   mkdir sandbox-templates/my-template
   ```

2. **Add configuration files**:
   ```toml
   # e2b.toml
   dockerfile = "e2b.Dockerfile"
   template_name = "my-template"
   template_id = "unique-template-id"
   start_cmd = "cd /home/user && python app.py"
   cpu_count = 2
   memory_mb = 2048
   team_id = "your-team-id"
   ```

3. **Create Dockerfile**:
   ```dockerfile
   FROM python:3.10-slim
   RUN pip install your-dependencies
   WORKDIR /home/user
   COPY . /home/user
   USER user
   HEALTHCHECK CMD curl -f http://localhost:8080/ || exit 1
   ```

4. **Update templates.json** with template metadata

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server with Turbo
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
pytest sandbox-templates/  # Run template tests
```

### API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/chat` | POST | Generate code fragments with AI |
| `/api/sandbox` | POST | Create and manage E2B sandboxes |
| `/api/templates` | GET | List available templates |

### Key Files

- `app/page.tsx` - Main chat interface
- `app/api/chat/route.ts` - AI integration endpoint
- `app/api/sandbox/route.ts` - E2B sandbox management
- `lib/prompt.ts` - AI prompt engineering
- `lib/schema.ts` - Structured output validation
- `lib/templates.ts` - Template management

## 🛡️ Security Features

- **Sandboxed Execution**: All code runs in isolated E2B environments
- **Non-root Containers**: All templates use unprivileged users
- **Resource Limits**: CPU and memory constraints prevent abuse
- **Health Monitoring**: Automatic process and port monitoring
- **Rate Limiting**: Built-in request limiting with Upstash
- **Input Validation**: Zod schema validation for all inputs

## 🎨 Customization

### Supported AI Providers

- **Anthropic**: Claude 3.5 Sonnet, Claude 3.5 Haiku
- **OpenAI**: GPT-4, GPT-4 Turbo, GPT-3.5 Turbo
- **Google**: Gemini Pro, Gemini Flash
- **Mistral**: Mistral Large, Mistral Medium
- **Groq**: Llama 3.1, Mixtral models
- **Local**: Ollama support for local models

### Theme Support

- Light and dark mode toggle
- Customizable via Tailwind CSS
- Responsive design for all screen sizes

## 📊 Monitoring & Debugging

The application includes comprehensive logging and monitoring:

- **Health Checks**: Automatic application monitoring with retries
- **Process Monitoring**: Real-time process and port status
- **Error Handling**: Detailed error messages and recovery
- **Performance Tracking**: Request timing and success rates

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Add tests for new templates
- Update documentation for changes
- Ensure all health checks pass
- Follow security guidelines

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [E2B](https://e2b.dev/) - Secure cloud runtime for AI applications
- [Anthropic](https://anthropic.com/) - Original Artifacts inspiration
- [Vercel](https://vercel.com/) - AI SDK and deployment platform
- [Next.js](https://nextjs.org/) - React framework

---

<div align="center">
  <img src="https://img.shields.io/badge/Version-2.0.0-blue" alt="Version">
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License">
  <img src="https://img.shields.io/badge/Status-Production--Ready-brightgreen" alt="Status">
</div>
        