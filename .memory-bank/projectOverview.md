# Project Overview

## Project Name
E2B Fragments - AI Code Generation and Execution Platform

## Core Purpose
E2B Fragments is a web application that allows users to generate, execute, and preview code fragments using AI assistance. The platform provides a sandbox environment for running code safely and sharing code snippets with others.

## Target Audience
- Developers learning new technologies
- Educators teaching programming concepts
- Professionals prototyping ideas quickly
- Anyone needing to test code snippets safely

## Key Features
1. **AI-Powered Code Generation**: Chat interface for generating code using various AI models
2. **Sandbox Execution**: Safe execution environment using E2B sandboxes
3. **Live Preview**: Real-time preview of web applications and code output
4. **Multi-Language Support**: Support for Python, JavaScript, React, Vue, Streamlit, Gradio, and more
5. **Template System**: Pre-configured templates for different development environments
6. **Authentication**: User authentication and session management
7. **Sharing**: Ability to share and deploy code fragments

## Technical Stack
- **Frontend**: Next.js 14 with React, TypeScript, Tailwind CSS
- **Backend**: Next.js API routes
- **Execution Environment**: E2B Sandboxes
- **Authentication**: Supabase Auth
- **Database**: Supabase (PostgreSQL)
- **AI Models**: Support for multiple LLM providers
- **Styling**: Tailwind CSS with custom components

## Project Goals
1. Provide a seamless code generation and execution experience
2. Enable safe code testing without local environment setup
3. Facilitate learning and experimentation with new technologies
4. Create a platform for sharing and collaborating on code snippets
5. Support multiple programming languages and frameworks

## Current Status
The project appears to be a fully functional web application with:
- Complete UI components and layouts
- API endpoints for chat, sandbox management, and templates
- Authentication system integration
- Multiple sandbox templates
- Deployment configuration

## Main Challenges
- Port connectivity issues in E2B sandboxes ("Connection refused on port 8000")
- Proper sandbox lifecycle management
- Handling different template types and their specific requirements
- Managing real-time communication between frontend and sandbox environments

## Success Metrics
- Successful code execution in sandboxes
- User engagement with generated code
- Successful deployment and sharing of fragments
- Reliable connectivity to sandbox ports