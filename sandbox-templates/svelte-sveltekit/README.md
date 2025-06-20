# ⚡ SvelteKit Template for E2B

A modern, full-featured SvelteKit template optimized for rapid web development with TypeScript, comprehensive UI components, and seamless E2B integration.

## 🚀 Features

- **⚡ Lightning Fast**: Vite-powered development with instant HMR
- **🔧 TypeScript Ready**: Full TypeScript support out of the box
- **📦 Zero Runtime**: Svelte compiles to efficient vanilla JavaScript
- **🎨 Component Library**: Rich collection of reusable UI components
- **🔄 Built-in Reactivity**: Simple, intuitive reactive programming
- **🌐 SSR & SSG**: Server-side rendering and static site generation
- **📱 Responsive Design**: Mobile-first with adaptive layouts
- **🧪 Testing Suite**: Vitest integration with comprehensive examples
- **🎯 E2B Optimized**: Pre-configured for E2B sandbox deployment

## 📦 Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **SvelteKit** | ^2.0.0 | Full-stack framework |
| **Svelte** | ^4.2.7 | UI component framework |
| **TypeScript** | ^5.0.0 | Type-safe JavaScript |
| **Vite** | ^5.0.3 | Build tool and dev server |
| **Vitest** | ^1.0.0 | Testing framework |
| **ESLint** | ^8.28.0 | Code linting |
| **Prettier** | ^3.0.0 | Code formatting |

## 🛠 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open browser
open http://localhost:5173
```

### Available Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm test             # Run test suite
npm run test:coverage # Run tests with coverage
npm run check        # TypeScript type checking
npm run lint         # Lint code with ESLint
npm run format       # Format code with Prettier
```

## 📁 Project Structure

```
src/
├── routes/                 # Pages and API routes
│   ├── +layout.svelte     # Root layout
│   ├── +page.svelte       # Home page
│   ├── components/        # Components showcase
│   ├── examples/          # Interactive demos
│   └── about/             # About page
├── lib/                   # Reusable components
├── test/                  # Test utilities and examples
└── app.html              # HTML template
```

## 🎯 Key Pages

### 🏠 Home Page (`/`)
Interactive landing page featuring:
- Live counter with reactive updates
- Todo list with localStorage persistence
- Feature showcase cards
- Real-time statistics
- Platform detection

### 🧩 Components Page (`/components`)
Comprehensive UI component library:
- **Buttons**: Multiple variants, sizes, and states
- **Forms**: Inputs, selects, checkboxes, validation
- **Navigation**: Breadcrumbs, pagination, dropdowns
- **Feedback**: Alerts, modals, progress indicators
- **Layout**: Cards, accordions, responsive grids

### 🚀 Examples Page (`/examples`)
Interactive demonstrations of SvelteKit features:
- **Reactivity**: Reactive statements and derived stores
- **Stores**: Writable and derived store patterns
- **Animations**: CSS transitions and transforms
- **Lifecycle**: Component lifecycle events
- **Forms**: Two-way data binding and validation
- **API**: Async operations and error handling

### ℹ️ About Page (`/about`)
Comprehensive documentation covering:
- SvelteKit overview and benefits
- Feature comparison with other frameworks
- Project architecture and folder structure
- Getting started guide and best practices
- Learning resources and community links

## 🎨 Styling System

### CSS Custom Properties
The template uses CSS custom properties for consistent theming:

```css
:root {
  --primary-color: #ff3e00;      /* Svelte orange */
  --secondary-color: #676778;     /* Neutral gray */
  --accent-color: #40b3ff;        /* Bright blue */
  --success-color: #22c55e;       /* Green */
  --warning-color: #f59e0b;       /* Amber */
  --error-color: #ef4444;         /* Red */
  --background-color: #fafafa;    /* Light background */
  --surface-color: #ffffff;       /* Card backgrounds */
  --text-primary: #1a1a1a;        /* Primary text */
  --text-secondary: #676767;      /* Secondary text */
  --border-color: #e5e5e5;        /* Borders */
  --shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  --radius: 8px;                  /* Border radius */
  --transition: all 0.2s ease;    /* Transitions */
}
```

### Dark Mode Support
Automatic dark mode based on system preference:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --background-color: #1a1a1a;
    --surface-color: #2d2d2d;
    --text-primary: #ffffff;
    --text-secondary: #a3a3a3;
    --border-color: #404040;
  }
}
```

### Component Styling
- **Scoped CSS**: Each component has scoped styles
- **Responsive Design**: Mobile-first approach
- **Consistent Spacing**: Using CSS Grid and Flexbox
- **Accessibility**: Focus states and ARIA support

## 🧪 Testing

### Test Setup
The template includes a comprehensive testing setup with Vitest:

```typescript
// src/test/setup.ts
import { vi } from 'vitest';
import '@testing-library/jest-dom';

// Global test utilities and mocks
```

### Running Tests

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run in watch mode
npm run test:watch

# Run specific test file
npm test -- example.test.ts
```

### Test Examples
The template includes examples for:
- Component testing with Testing Library
- Store testing with writable/derived stores
- Async operations and API calls
- Form interactions and validation
- Accessibility testing
- Error handling

## 🔧 Configuration

### E2B Sandbox
Optimized for E2B deployment with:
- **CPU**: 2 cores
- **Memory**: 2GB
- **Port**: 5173 (development), 4173 (preview)
- **Health Check**: Automatic server monitoring

### Vite Configuration
```typescript
// vite.config.ts
export default defineConfig({
  server: {
    host: '0.0.0.0',  // Allow external connections
    port: 5173,       // Development port
    strictPort: true  // Fail if port is occupied
  },
  // ... additional configuration
});
```

### TypeScript Configuration
```json
{
  "extends": "./.svelte-kit/tsconfig.json",
  "compilerOptions": {
    "strict": true,
    "target": "ES2022",
    "moduleResolution": "bundler"
  }
}
```

## 🌟 Best Practices

### Component Development
- Use TypeScript for all components
- Implement proper prop typing
- Add accessibility attributes
- Include component documentation
- Write unit tests for complex logic

### State Management
- Use stores for cross-component state
- Prefer derived stores for computed values
- Implement proper store cleanup
- Use reactive statements for side effects

### Performance
- Leverage Svelte's compile-time optimizations
- Use code splitting for large applications
- Optimize images and assets
- Implement proper loading states

### Accessibility
- Use semantic HTML elements
- Provide proper ARIA labels
- Ensure keyboard navigation
- Test with screen readers

## 📚 Learning Resources

### Official Documentation
- [SvelteKit Docs](https://kit.svelte.dev/docs) - Official SvelteKit documentation
- [Svelte Tutorial](https://svelte.dev/tutorial) - Interactive Svelte tutorial
- [Svelte Examples](https://svelte.dev/examples) - Code examples and patterns

### Community Resources
- [Svelte Society](https://sveltesociety.dev/) - Community resources and tools
- [SvelteKit FAQ](https://kit.svelte.dev/faq) - Frequently asked questions
- [Svelte Discord](https://discord.com/invite/yy75DKs) - Community chat

### E2B Resources
- [E2B Documentation](https://e2b.dev/docs) - E2B platform documentation
- [E2B Templates](https://e2b.dev/docs/templates) - Template creation guide

## 🚀 Deployment

### Production Build
```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### Deployment Platforms
The template works with any Node.js hosting platform:
- **Vercel**: Zero-config deployment
- **Netlify**: Static and serverless functions
- **Railway**: Full-stack applications
- **DigitalOcean**: App platform deployment

### Environment Variables
Configure in your deployment environment:

```bash
NODE_ENV=production
PUBLIC_API_URL=https://api.example.com
DATABASE_URL=postgresql://...
```

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

### Code Style
- Follow the Prettier configuration
- Use TypeScript for type safety
- Write descriptive commit messages
- Include tests for new features

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

- **Issues**: Report bugs and request features on GitHub
- **Discussions**: Ask questions in GitHub Discussions
- **Community**: Join the Svelte Discord for real-time help

---

Built with ❤️ using **SvelteKit** and **E2B Fragments** for rapid web development.