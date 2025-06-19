# 🚀 E2B Fragments Development Guide

This comprehensive guide covers development, deployment, and contribution to the E2B Fragments project.

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Template Development](#template-development)
- [Testing & Quality](#testing--quality)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+** and npm
- **Python 3.10+** for template testing
- **Docker** (optional, for local template testing)
- **E2B Account** - [Sign up here](https://e2b.dev/)

### Environment Setup

1. **Clone and install dependencies:**
   ```bash
   git clone https://github.com/e2b-dev/fragments
   cd fragments
   npm install
   ```

2. **Configure environment variables:**
   ```bash
   cp .env.template .env
   ```

3. **Required environment variables:**
   ```bash
   # E2B Configuration
   E2B_API_KEY=your_e2b_api_key

   # AI Providers (at least one required)
   OPENAI_API_KEY=your_openai_key
   ANTHROPIC_API_KEY=your_anthropic_key
   GROQ_API_KEY=your_groq_key
   MISTRAL_API_KEY=your_mistral_key
   GOOGLE_AI_API_KEY=your_google_key

   # Optional: Authentication
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_anon_key

   # Optional: Analytics & Monitoring
   NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
   NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

   # Optional: Rate Limiting
   KV_REST_API_URL=your_upstash_kv_url
   KV_REST_API_TOKEN=your_upstash_kv_token
   RATE_LIMIT_MAX_REQUESTS=10
   RATE_LIMIT_WINDOW=1d
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

Visit `http://localhost:3000` to see the application running.

## 🏗️ Project Structure

```
fragments/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── chat/          # AI chat endpoint
│   │   ├── sandbox/       # E2B sandbox management
│   │   └── templates/     # Template discovery
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main chat interface
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── chat.tsx          # Chat interface
│   ├── preview.tsx       # Code preview
│   └── ...
├── lib/                   # Core utilities
│   ├── models.ts         # AI provider configurations
│   ├── prompt.ts         # Prompt engineering
│   ├── schema.ts         # Zod validation schemas
│   ├── templates.ts      # Template management
│   └── ...
├── sandbox-templates/     # E2B template definitions
│   ├── ai-agent-python/  # FastAPI AI agent template
│   ├── nextjs-developer/ # Next.js web app template
│   └── ...
├── types/                # TypeScript type definitions
└── ...
```

## 🔄 Development Workflow

### Available Scripts

```bash
# Development
npm run dev          # Start development server with Turbo
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Testing
pytest sandbox-templates/  # Test all templates
pytest sandbox-templates/ai-agent-python/  # Test specific template
```

### Hot Reload & Development

The development server supports:
- **Hot reload** for React components
- **API route hot reload** for backend changes
- **Real-time template updates** when modifying template configurations

### Code Quality Tools

- **ESLint**: Automated code quality checks
- **TypeScript**: Static type checking
- **Prettier**: Code formatting (configured via `.prettierrc`)
- **Husky**: Pre-commit hooks (optional)

## 🎯 Template Development

### Template Structure

Each template consists of:

```
sandbox-templates/my-template/
├── e2b.toml           # E2B configuration
├── e2b.Dockerfile     # Container definition
├── app.py             # Main application file
├── README.md          # Template documentation
└── tests/             # Template tests
    └── test_template.py
```

### Creating a New Template

1. **Create template directory:**
   ```bash
   mkdir sandbox-templates/my-template
   cd sandbox-templates/my-template
   ```

2. **Create `e2b.toml` configuration:**
   ```toml
   # E2B template configuration
   dockerfile = "e2b.Dockerfile"
   template_name = "my-template"
   template_id = "unique-template-id"  # Generate unique ID
   start_cmd = "cd /home/user && python app.py"
   
   # Resource allocation
   cpu_count = 2
   memory_mb = 2048
   
   # Team configuration
   team_id = "6083f2ec-2289-4ce2-9aae-1d84331e0c85"
   ```

3. **Create `e2b.Dockerfile`:**
   ```dockerfile
   # Standardized Python base image
   FROM python:3.10-slim
   
   # Install system dependencies and clean up
   RUN apt-get update && apt-get install -y \
       curl \
       && rm -rf /var/lib/apt/lists/* \
       && apt-get clean
   
   # Install Python dependencies with cache cleanup
   RUN pip3 install --no-cache-dir \
       your-dependencies \
       && pip cache purge
   
   # Create non-root user for security
   RUN useradd -m -u 1000 user && \
       chown -R user:user /home/user
   
   # Set working directory and copy files
   WORKDIR /home/user
   COPY --chown=user:user . /home/user
   
   # Switch to non-root user
   USER user
   
   # Health check
   HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
       CMD curl -f http://localhost:8080/ || exit 1
   ```

4. **Create main application file:**
   ```python
   # app.py
   from flask import Flask, jsonify
   
   app = Flask(__name__)
   
   @app.route('/')
   def home():
       return jsonify({"message": "Hello from my template!"})
   
   @app.route('/health')
   def health():
       return jsonify({"status": "healthy"})
   
   if __name__ == '__main__':
       app.run(host='0.0.0.0', port=8080, debug=True)
   ```

5. **Update `lib/templates.json`:**
   ```json
   {
     "my-template": {
       "name": "My Custom Template",
       "lib": ["flask", "requests"],
       "file": "app.py",
       "instructions": "Create custom applications with Flask. Use for REST APIs, web services, and custom backends. Server runs on port 8080 with automatic health checks.",
       "port": 8080,
       "ready_cmd": "curl -f http://localhost:8080/health || exit 1"
     }
   }
   ```

6. **Create tests:**
   ```python
   # tests/test_template.py
   import requests
   import pytest
   
   def test_template_health():
       response = requests.get('http://localhost:8080/health')
       assert response.status_code == 200
       assert response.json()['status'] == 'healthy'
   ```

### Template Best Practices

#### Security Guidelines
- **Always use non-root user** in Dockerfile
- **Pin dependency versions** for reproducibility
- **Include health checks** for monitoring
- **Validate input parameters** in application code
- **Use secure defaults** for all configurations

#### Performance Optimization
- **Minimize image size** with multi-stage builds when needed
- **Cache dependencies** effectively in Dockerfile
- **Use efficient base images** (prefer `-slim` variants)
- **Clean up package caches** after installation

#### Resource Management
- **Set appropriate CPU/memory limits** in `e2b.toml`
- **Monitor resource usage** during development
- **Test with realistic workloads** before production

## 🧪 Testing & Quality

### Template Testing

Run template tests to validate functionality:

```bash
# Test all templates
pytest sandbox-templates/ -v

# Test specific template
pytest sandbox-templates/ai-agent-python/ -v

# Test with coverage
pytest sandbox-templates/ --cov=sandbox-templates
```

### Integration Testing

Test the full application flow:

```bash
# Start development server
npm run dev

# In another terminal, run integration tests
npm run test:integration  # (if available)
```

### Health Check Validation

Validate that templates start correctly:

```bash
# Check template health manually
curl http://localhost:3000/api/templates

# Validate specific template configuration
python scripts/validate_template.py sandbox-templates/my-template
```

### Code Quality Checks

```bash
# Run linting
npm run lint

# Type checking
npx tsc --noEmit

# Format code
npx prettier --write .
```

## 🚀 Deployment

### Production Build

```bash
# Build the application
npm run build

# Test production build locally
npm run start
```

### Environment Variables for Production

```bash
# Production environment variables
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://yourdomain.com

# Disable development features
NEXT_PUBLIC_HIDE_LOCAL_MODELS=true
NEXT_PUBLIC_NO_API_KEY_INPUT=true

# Enable analytics
NEXT_PUBLIC_ENABLE_POSTHOG=true
```

### Deployment Platforms

#### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel --prod
```

#### Docker Deployment
```dockerfile
# Dockerfile for production
FROM node:18-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine AS build
WORKDIR /app
COPY . .
RUN npm ci && npm run build

FROM node:18-alpine AS runtime
WORKDIR /app
COPY --from=base /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]
```

## 🔧 Troubleshooting

### Common Issues

#### Sandbox Startup Failures
```bash
# Check E2B API key
echo $E2B_API_KEY

# Validate template configuration
cat sandbox-templates/my-template/e2b.toml

# Check sandbox logs
# (Available in application console during development)
```

#### AI Provider Timeouts
```bash
# Test API connectivity
curl -H "Authorization: Bearer $OPENAI_API_KEY" \
     https://api.openai.com/v1/models

# Switch to different provider in UI
# Check network connectivity
```

#### Port Conflicts
```bash
# Check for port conflicts in templates.json
grep -r "port.*3000" lib/templates.json

# Update conflicting ports to unique values
```

#### Template Health Check Failures
```bash
# Test health check manually
curl http://localhost:8080/health

# Check application logs
docker logs <container-id>

# Verify health check configuration in Dockerfile
```

### Debug Mode

Enable debug logging:

```bash
# Set debug environment variable
DEBUG=e2b:* npm run dev

# Enable verbose logging
NEXT_PUBLIC_DEBUG=true npm run dev
```

### Performance Debugging

Monitor performance:

```bash
# Analyze bundle size
npm run analyze  # (if available)

# Check lighthouse scores
npm run lighthouse  # (if available)

# Monitor memory usage
node --inspect npm run dev
```

## 🤝 Contributing

### Development Process

1. **Fork the repository**
2. **Create feature branch**: `git checkout -b feature/amazing-feature`
3. **Follow coding standards**: Run linting and type checks
4. **Add tests**: Ensure new features are tested
5. **Update documentation**: Keep docs current
6. **Commit changes**: Use conventional commit messages
7. **Push to branch**: `git push origin feature/amazing-feature`
8. **Open Pull Request**: Describe changes and impact

### Coding Standards

- **TypeScript**: Use strict type checking
- **React**: Follow hooks best practices
- **API Design**: RESTful conventions
- **Error Handling**: Comprehensive error boundaries
- **Security**: Follow security best practices
- **Performance**: Optimize for production use

### Pull Request Guidelines

- **Clear description** of changes and motivation
- **Test coverage** for new features
- **Documentation updates** for user-facing changes
- **Security review** for sensitive changes
- **Performance impact** assessment

### Code Review Process

- **Automated checks** must pass (linting, type checking, tests)
- **Security review** for template and API changes
- **Performance review** for frontend changes
- **Documentation review** for accuracy and completeness

## 📚 Additional Resources

- [E2B Documentation](https://e2b.dev/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [AI SDK Documentation](https://sdk.vercel.ai/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Documentation](https://react.dev/)

## 📞 Support

- **GitHub Issues**: [Report bugs and request features](https://github.com/e2b-dev/fragments/issues)
- **Discord Community**: [Join our Discord](https://discord.gg/U7KEcGErtQ)
- **Documentation**: [Read the docs](https://e2b.dev/docs)
- **Examples**: [See example implementations](https://github.com/e2b-dev/fragments/tree/main/examples)

---

**Happy coding!** 🚀