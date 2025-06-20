<!--
  ℹ️ About Page
  Information about SvelteKit, the template, and getting started
-->

<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  
  let mounted = false;
  let currentSection = 'overview';
  
  const sections = [
    { id: 'overview', label: 'Overview', icon: '📋' },
    { id: 'features', label: 'Features', icon: '⭐' },
    { id: 'architecture', label: 'Architecture', icon: '🏗️' },
    { id: 'getting-started', label: 'Getting Started', icon: '🚀' },
    { id: 'resources', label: 'Resources', icon: '📚' }
  ];
  
  const features = [
    {
      icon: '⚡',
      title: 'Lightning Fast',
      description: 'Powered by Vite with instant hot module replacement',
      details: 'Development builds in milliseconds, not seconds'
    },
    {
      icon: '🔧',
      title: 'TypeScript First',
      description: 'Full TypeScript support with excellent IDE integration',
      details: 'Type safety across your entire application'
    },
    {
      icon: '📦',
      title: 'Zero Runtime',
      description: 'Svelte compiles to vanilla JavaScript with no framework overhead',
      details: 'Smaller bundles, faster loading times'
    },
    {
      icon: '🎨',
      title: 'Scoped Styling',
      description: 'CSS is automatically scoped to components',
      details: 'No CSS conflicts or naming collisions'
    },
    {
      icon: '🔄',
      title: 'Built-in Reactivity',
      description: 'Reactive updates without complex state management',
      details: 'Simple, intuitive reactive programming model'
    },
    {
      icon: '🌐',
      title: 'SSR & SSG',
      description: 'Server-side rendering and static site generation',
      details: 'Better SEO and performance out of the box'
    },
    {
      icon: '📱',
      title: 'Responsive',
      description: 'Mobile-first design with adaptive layouts',
      details: 'Works perfectly on all screen sizes'
    },
    {
      icon: '🧪',
      title: 'Testing Ready',
      description: 'Vitest integration for fast, reliable testing',
      details: 'Unit tests, integration tests, and more'
    }
  ];
  
  const techStack = [
    { name: 'SvelteKit', version: '^2.0.0', description: 'Full-stack framework' },
    { name: 'Svelte', version: '^4.2.7', description: 'UI component framework' },
    { name: 'Vite', version: '^5.0.3', description: 'Build tool and dev server' },
    { name: 'TypeScript', version: '^5.0.0', description: 'Type-safe JavaScript' },
    { name: 'Vitest', version: '^1.0.0', description: 'Testing framework' },
    { name: 'ESLint', version: '^8.28.0', description: 'Code linting' },
    { name: 'Prettier', version: '^3.0.0', description: 'Code formatting' }
  ];
  
  const commands = [
    {
      title: 'Development',
      command: 'npm run dev',
      description: 'Start development server with hot reload'
    },
    {
      title: 'Build',
      command: 'npm run build',
      description: 'Build production-ready application'
    },
    {
      title: 'Preview',
      command: 'npm run preview',
      description: 'Preview production build locally'
    },
    {
      title: 'Test',
      command: 'npm test',
      description: 'Run test suite with Vitest'
    },
    {
      title: 'Lint',
      command: 'npm run lint',
      description: 'Check code quality with ESLint'
    },
    {
      title: 'Format',
      command: 'npm run format',
      description: 'Format code with Prettier'
    }
  ];
  
  const resources = [
    {
      title: 'SvelteKit Documentation',
      url: 'https://kit.svelte.dev/docs',
      description: 'Official SvelteKit documentation',
      icon: '📖'
    },
    {
      title: 'Svelte Tutorial',
      url: 'https://svelte.dev/tutorial',
      description: 'Interactive Svelte tutorial',
      icon: '🎓'
    },
    {
      title: 'Svelte Examples',
      url: 'https://svelte.dev/examples',
      description: 'Code examples and patterns',
      icon: '💡'
    },
    {
      title: 'SvelteKit FAQ',
      url: 'https://kit.svelte.dev/faq',
      description: 'Frequently asked questions',
      icon: '❓'
    },
    {
      title: 'Svelte Society',
      url: 'https://sveltesociety.dev/',
      description: 'Community resources and tools',
      icon: '👥'
    },
    {
      title: 'E2B Documentation',
      url: 'https://e2b.dev/docs',
      description: 'E2B platform documentation',
      icon: '🔧'
    }
  ];
  
  onMount(() => {
    mounted = true;
  });
  
  function copyCommand(command: string) {
    if (browser && navigator.clipboard) {
      navigator.clipboard.writeText(command);
      // Could show a toast notification here
    }
  }
  
  async function openResource(url: string) {
    if (browser) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }
</script>

<svelte:head>
  <title>About - E2B SvelteKit</title>
  <meta name="description" content="Learn about SvelteKit, this template, and how to get started with modern web development" />
</svelte:head>

<div class="about-page">
  <header class="page-header">
    <h1 class="page-title">
      <span class="page-icon">ℹ️</span>
      About E2B SvelteKit
    </h1>
    <p class="page-description">
      A comprehensive template for modern web development with SvelteKit
    </p>
  </header>
  
  <!-- Section Navigation -->
  <nav class="sections-nav">
    {#each sections as section}
      <button 
        class="section-button" 
        class:active={currentSection === section.id}
        on:click={() => currentSection = section.id}
      >
        <span class="section-icon">{section.icon}</span>
        <span class="section-label">{section.label}</span>
      </button>
    {/each}
  </nav>
  
  <!-- Section Content -->
  <div class="section-content">
    
    <!-- Overview Section -->
    {#if currentSection === 'overview'}
      <section class="content-section">
        <h2 class="section-title">📋 Project Overview</h2>
        
        <div class="overview-grid">
          <div class="overview-card">
            <h3 class="card-title">What is SvelteKit?</h3>
            <p class="card-text">
              SvelteKit is the official framework for building Svelte applications. It provides
              everything you need to build a modern web app: routing, server-side rendering,
              static site generation, and more.
            </p>
          </div>
          
          <div class="overview-card">
            <h3 class="card-title">Why Choose Svelte?</h3>
            <p class="card-text">
              Svelte compiles your components to efficient vanilla JavaScript, resulting in
              smaller bundle sizes and better performance. No virtual DOM, no runtime overhead.
            </p>
          </div>
          
          <div class="overview-card">
            <h3 class="card-title">E2B Integration</h3>
            <p class="card-text">
              This template is optimized for E2B's sandbox environment, providing instant
              deployment and development capabilities in the cloud.
            </p>
          </div>
          
          <div class="overview-card">
            <h3 class="card-title">Modern Tooling</h3>
            <p class="card-text">
              Includes TypeScript, Vite, ESLint, Prettier, and Vitest for a complete
              development experience with the latest tools.
            </p>
          </div>
        </div>
        
        <div class="stats-section">
          <h3 class="subsection-title">Template Statistics</h3>
          <div class="stats-grid">
            <div class="stat-item">
              <span class="stat-value">~2MB</span>
              <span class="stat-label">Bundle Size</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">&lt;1s</span>
              <span class="stat-label">Build Time</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">100%</span>
              <span class="stat-label">TypeScript</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">95+</span>
              <span class="stat-label">Lighthouse Score</span>
            </div>
          </div>
        </div>
      </section>
    {/if}
    
    <!-- Features Section -->
    {#if currentSection === 'features'}
      <section class="content-section">
        <h2 class="section-title">⭐ Key Features</h2>
        
        <div class="features-grid">
          {#each features as feature}
            <div class="feature-card">
              <div class="feature-icon">{feature.icon}</div>
              <h3 class="feature-title">{feature.title}</h3>
              <p class="feature-description">{feature.description}</p>
              <p class="feature-details">{feature.details}</p>
            </div>
          {/each}
        </div>
        
        <div class="comparison-section">
          <h3 class="subsection-title">Svelte vs Other Frameworks</h3>
          <div class="comparison-table">
            <div class="comparison-header">
              <div class="comparison-cell">Feature</div>
              <div class="comparison-cell">Svelte</div>
              <div class="comparison-cell">React</div>
              <div class="comparison-cell">Vue</div>
            </div>
            <div class="comparison-row">
              <div class="comparison-cell">Bundle Size</div>
              <div class="comparison-cell good">~10KB</div>
              <div class="comparison-cell">~40KB</div>
              <div class="comparison-cell">~35KB</div>
            </div>
            <div class="comparison-row">
              <div class="comparison-cell">Runtime</div>
              <div class="comparison-cell good">None</div>
              <div class="comparison-cell">Virtual DOM</div>
              <div class="comparison-cell">Virtual DOM</div>
            </div>
            <div class="comparison-row">
              <div class="comparison-cell">Learning Curve</div>
              <div class="comparison-cell good">Easy</div>
              <div class="comparison-cell">Moderate</div>
              <div class="comparison-cell">Easy</div>
            </div>
            <div class="comparison-row">
              <div class="comparison-cell">TypeScript</div>
              <div class="comparison-cell good">Excellent</div>
              <div class="comparison-cell">Good</div>
              <div class="comparison-cell">Good</div>
            </div>
          </div>
        </div>
      </section>
    {/if}
    
    <!-- Architecture Section -->
    {#if currentSection === 'architecture'}
      <section class="content-section">
        <h2 class="section-title">🏗️ Project Architecture</h2>
        
        <div class="architecture-overview">
          <h3 class="subsection-title">Folder Structure</h3>
          <div class="folder-structure">
            <div class="folder-item">
              <span class="folder-icon">📁</span>
              <span class="folder-name">src/</span>
              <span class="folder-desc">Source code directory</span>
            </div>
            <div class="folder-item nested">
              <span class="folder-icon">📁</span>
              <span class="folder-name">routes/</span>
              <span class="folder-desc">Page components and API routes</span>
            </div>
            <div class="folder-item nested">
              <span class="folder-icon">📁</span>
              <span class="folder-name">lib/</span>
              <span class="folder-desc">Reusable components and utilities</span>
            </div>
            <div class="folder-item nested">
              <span class="folder-icon">📄</span>
              <span class="folder-name">app.html</span>
              <span class="folder-desc">HTML template</span>
            </div>
            <div class="folder-item">
              <span class="folder-icon">📄</span>
              <span class="folder-name">svelte.config.js</span>
              <span class="folder-desc">SvelteKit configuration</span>
            </div>
            <div class="folder-item">
              <span class="folder-icon">📄</span>
              <span class="folder-name">vite.config.js</span>
              <span class="folder-desc">Vite build configuration</span>
            </div>
          </div>
        </div>
        
        <div class="tech-stack-section">
          <h3 class="subsection-title">Technology Stack</h3>
          <div class="tech-stack-grid">
            {#each techStack as tech}
              <div class="tech-item">
                <div class="tech-header">
                  <span class="tech-name">{tech.name}</span>
                  <span class="tech-version">{tech.version}</span>
                </div>
                <p class="tech-description">{tech.description}</p>
              </div>
            {/each}
          </div>
        </div>
        
        <div class="routing-section">
          <h3 class="subsection-title">Routing System</h3>
          <div class="routing-info">
            <div class="routing-card">
              <h4 class="routing-title">File-based Routing</h4>
              <p class="routing-text">
                SvelteKit uses file-based routing. Each <code>+page.svelte</code> file 
                in the <code>src/routes</code> directory becomes a route.
              </p>
            </div>
            <div class="routing-card">
              <h4 class="routing-title">Layout System</h4>
              <p class="routing-text">
                <code>+layout.svelte</code> files define shared layouts that wrap 
                page components, allowing for consistent navigation and styling.
              </p>
            </div>
            <div class="routing-card">
              <h4 class="routing-title">Server Routes</h4>
              <p class="routing-text">
                <code>+page.server.js</code> and <code>+layout.server.js</code> files 
                can run server-side code for data loading and form actions.
              </p>
            </div>
          </div>
        </div>
      </section>
    {/if}
    
    <!-- Getting Started Section -->
    {#if currentSection === 'getting-started'}
      <section class="content-section">
        <h2 class="section-title">🚀 Getting Started</h2>
        
        <div class="getting-started-content">
          <div class="setup-steps">
            <h3 class="subsection-title">Quick Start</h3>
            <div class="step-list">
              <div class="step-item">
                <div class="step-number">1</div>
                <div class="step-content">
                  <h4 class="step-title">Install Dependencies</h4>
                  <p class="step-description">Install all required packages using npm</p>
                  <div class="command-block">
                    <code class="command">npm install</code>
                    <button 
                      class="copy-btn"
                      on:click={() => copyCommand('npm install')}
                      title="Copy command"
                    >
                      📋
                    </button>
                  </div>
                </div>
              </div>
              
              <div class="step-item">
                <div class="step-number">2</div>
                <div class="step-content">
                  <h4 class="step-title">Start Development Server</h4>
                  <p class="step-description">Launch the development server with hot reload</p>
                  <div class="command-block">
                    <code class="command">npm run dev</code>
                    <button 
                      class="copy-btn"
                      on:click={() => copyCommand('npm run dev')}
                      title="Copy command"
                    >
                      📋
                    </button>
                  </div>
                </div>
              </div>
              
              <div class="step-item">
                <div class="step-number">3</div>
                <div class="step-content">
                  <h4 class="step-title">Open in Browser</h4>
                  <p class="step-description">Navigate to http://localhost:5173 to see your app</p>
                  <div class="url-block">
                    <code class="url">http://localhost:5173</code>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="commands-section">
            <h3 class="subsection-title">Available Commands</h3>
            <div class="commands-grid">
              {#each commands as cmd}
                <div class="command-card">
                  <h4 class="command-title">{cmd.title}</h4>
                  <div class="command-block">
                    <code class="command">{cmd.command}</code>
                    <button 
                      class="copy-btn"
                      on:click={() => copyCommand(cmd.command)}
                      title="Copy command"
                    >
                      📋
                    </button>
                  </div>
                  <p class="command-description">{cmd.description}</p>
                </div>
              {/each}
            </div>
          </div>
          
          <div class="development-tips">
            <h3 class="subsection-title">Development Tips</h3>
            <div class="tips-grid">
              <div class="tip-card">
                <div class="tip-icon">⚡</div>
                <h4 class="tip-title">Hot Module Replacement</h4>
                <p class="tip-text">
                  Changes to your code are instantly reflected in the browser 
                  without losing component state.
                </p>
              </div>
              <div class="tip-card">
                <div class="tip-icon">🔍</div>
                <h4 class="tip-title">TypeScript Checking</h4>
                <p class="tip-text">
                  Run <code>npm run check</code> to perform TypeScript type 
                  checking across your entire project.
                </p>
              </div>
              <div class="tip-card">
                <div class="tip-icon">🧪</div>
                <h4 class="tip-title">Testing</h4>
                <p class="tip-text">
                  Use <code>npm test</code> to run your test suite with Vitest 
                  in watch mode for immediate feedback.
                </p>
              </div>
              <div class="tip-card">
                <div class="tip-icon">📦</div>
                <h4 class="tip-title">Building</h4>
                <p class="tip-text">
                  Build for production with <code>npm run build</code> and preview 
                  with <code>npm run preview</code>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    {/if}
    
    <!-- Resources Section -->
    {#if currentSection === 'resources'}
      <section class="content-section">
        <h2 class="section-title">📚 Learning Resources</h2>
        
        <div class="resources-grid">
          {#each resources as resource}
            <button 
              class="resource-card"
              on:click={() => openResource(resource.url)}
            >
              <div class="resource-icon">{resource.icon}</div>
              <h3 class="resource-title">{resource.title}</h3>
              <p class="resource-description">{resource.description}</p>
              <div class="resource-link">
                <span>Open Resource</span>
                <span class="link-arrow">→</span>
              </div>
            </button>
          {/each}
        </div>
        
        <div class="community-section">
          <h3 class="subsection-title">Community & Support</h3>
          <div class="community-info">
            <div class="community-card">
              <h4 class="community-title">Discord Community</h4>
              <p class="community-text">
                Join the official Svelte Discord server to chat with other developers, 
                get help, and share your projects.
              </p>
            </div>
            <div class="community-card">
              <h4 class="community-title">GitHub Discussions</h4>
              <p class="community-text">
                Participate in GitHub discussions for longer-form questions, 
                feature requests, and community announcements.
              </p>
            </div>
            <div class="community-card">
              <h4 class="community-title">Stack Overflow</h4>
              <p class="community-text">
                Search for solutions and ask questions using the 'svelte' and 
                'sveltekit' tags on Stack Overflow.
              </p>
            </div>
          </div>
        </div>
        
        <div class="next-steps">
          <h3 class="subsection-title">Next Steps</h3>
          <div class="next-steps-list">
            <div class="next-step">
              <div class="step-icon">🏗️</div>
              <div class="step-content">
                <h4 class="step-title">Build Your First Component</h4>
                <p class="step-text">Create a new component in <code>src/lib/</code> and import it into a page</p>
              </div>
            </div>
            <div class="next-step">
              <div class="step-icon">🎨</div>
              <div class="step-content">
                <h4 class="step-title">Customize the Styling</h4>
                <p class="step-text">Modify the CSS custom properties in <code>app.html</code> to match your brand</p>
              </div>
            </div>
            <div class="next-step">
              <div class="step-icon">📡</div>
              <div class="step-content">
                <h4 class="step-title">Add API Routes</h4>
                <p class="step-text">Create API endpoints by adding <code>+server.js</code> files in your routes</p>
              </div>
            </div>
            <div class="next-step">
              <div class="step-icon">🚀</div>
              <div class="step-content">
                <h4 class="step-title">Deploy Your App</h4>
                <p class="step-text">Deploy to Vercel, Netlify, or any other platform that supports Node.js</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    {/if}
  </div>
</div>

<style>
  .about-page {
    max-width: 1000px;
    margin: 0 auto;
  }
  
  .page-header {
    text-align: center;
    margin-bottom: 3rem;
  }
  
  .page-title {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: var(--text-primary);
  }
  
  .page-icon {
    font-size: 2rem;
  }
  
  .page-description {
    font-size: 1.125rem;
    color: var(--text-secondary);
    max-width: 600px;
    margin: 0 auto;
  }
  
  /* Sections Navigation */
  .sections-nav {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 2rem;
    background-color: var(--surface-color);
    border-radius: var(--radius);
    padding: 0.5rem;
    border: 1px solid var(--border-color);
  }
  
  .section-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: none;
    border: none;
    padding: 0.75rem 1rem;
    border-radius: var(--radius);
    cursor: pointer;
    transition: var(--transition);
    color: var(--text-secondary);
    font-weight: 500;
    white-space: nowrap;
  }
  
  .section-button.active,
  .section-button:hover {
    background-color: var(--primary-color);
    color: white;
  }
  
  .section-icon {
    font-size: 1.1rem;
  }
  
  /* Content Sections */
  .content-section {
    background-color: var(--surface-color);
    border: 1px solid var(--border-color);
    border-radius: var(--radius);
    padding: 2rem;
  }
  
  .section-title {
    font-size: 1.75rem;
    font-weight: 600;
    margin-bottom: 2rem;
    color: var(--text-primary);
  }
  
  .subsection-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 2rem 0 1rem 0;
    color: var(--text-primary);
  }
  
  /* Overview Section */
  .overview-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }
  
  .overview-card {
    background-color: var(--background-color);
    border: 1px solid var(--border-color);
    border-radius: var(--radius);
    padding: 1.5rem;
    transition: var(--transition);
  }
  
  .overview-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  .card-title {
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: var(--text-primary);
  }
  
  .card-text {
    color: var(--text-secondary);
    line-height: 1.6;
    margin: 0;
  }
  
  .stats-section {
    background-color: var(--background-color);
    border-radius: var(--radius);
    padding: 1.5rem;
  }
  
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1.5rem;
  }
  
  .stat-item {
    text-align: center;
  }
  
  .stat-value {
    display: block;
    font-size: 2rem;
    font-weight: 700;
    color: var(--primary-color);
    margin-bottom: 0.25rem;
  }
  
  .stat-label {
    font-size: 0.875rem;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  /* Features Section */
  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }
  
  .feature-card {
    background-color: var(--background-color);
    border: 1px solid var(--border-color);
    border-radius: var(--radius);
    padding: 1.5rem;
    text-align: center;
    transition: var(--transition);
  }
  
  .feature-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  .feature-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
  
  .feature-title {
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: var(--text-primary);
  }
  
  .feature-description {
    color: var(--text-secondary);
    margin-bottom: 0.5rem;
    line-height: 1.5;
  }
  
  .feature-details {
    font-size: 0.875rem;
    color: var(--text-secondary);
    font-style: italic;
    margin: 0;
  }
  
  /* Comparison Table */
  .comparison-section {
    background-color: var(--background-color);
    border-radius: var(--radius);
    padding: 1.5rem;
  }
  
  .comparison-table {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 1px;
    background-color: var(--border-color);
    border-radius: var(--radius);
    overflow: hidden;
  }
  
  .comparison-header {
    display: contents;
  }
  
  .comparison-header .comparison-cell {
    background-color: var(--primary-color);
    color: white;
    font-weight: 600;
  }
  
  .comparison-row {
    display: contents;
  }
  
  .comparison-cell {
    background-color: var(--surface-color);
    padding: 0.75rem;
    text-align: center;
    font-size: 0.875rem;
  }
  
  .comparison-cell.good {
    background-color: rgba(34, 197, 94, 0.1);
    color: var(--success-color);
    font-weight: 600;
  }
  
  /* Architecture Section */
  .folder-structure {
    background-color: var(--background-color);
    border-radius: var(--radius);
    padding: 1.5rem;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    margin-bottom: 2rem;
  }
  
  .folder-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.5rem 0;
    border-bottom: 1px solid var(--border-color);
  }
  
  .folder-item:last-child {
    border-bottom: none;
  }
  
  .folder-item.nested {
    padding-left: 2rem;
  }
  
  .folder-icon {
    font-size: 1rem;
  }
  
  .folder-name {
    font-weight: 600;
    color: var(--text-primary);
    min-width: 120px;
  }
  
  .folder-desc {
    color: var(--text-secondary);
    font-size: 0.875rem;
  }
  
  .tech-stack-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  }
  
  .tech-item {
    background-color: var(--background-color);
    border: 1px solid var(--border-color);
    border-radius: var(--radius);
    padding: 1rem;
  }
  
  .tech-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  }
  
  .tech-name {
    font-weight: 600;
    color: var(--text-primary);
  }
  
  .tech-version {
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: 0.875rem;
    color: var(--text-secondary);
    background-color: var(--surface-color);
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
  }
  
  .tech-description {
    font-size: 0.875rem;
    color: var(--text-secondary);
    margin: 0;
  }
  
  .routing-info {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }
  
  .routing-card {
    background-color: var(--background-color);
    border: 1px solid var(--border-color);
    border-radius: var(--radius);
    padding: 1.5rem;
  }
  
  .routing-title {
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: var(--text-primary);
  }
  
  .routing-text {
    color: var(--text-secondary);
    line-height: 1.6;
    margin: 0;
  }
  
  .routing-text code {
    background-color: var(--surface-color);
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    color: var(--primary-color);
  }
  
  /* Getting Started Section */
  .getting-started-content {
    display: grid;
    gap: 2rem;
  }
  
  .step-list {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  
  .step-item {
    display: flex;
    gap: 1.5rem;
    align-items: flex-start;
  }
  
  .step-number {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background-color: var(--primary-color);
    color: white;
    border-radius: 50%;
    font-weight: 700;
    font-size: 1.25rem;
    flex-shrink: 0;
  }
  
  .step-content {
    flex: 1;
  }
  
  .step-title {
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: var(--text-primary);
  }
  
  .step-description {
    color: var(--text-secondary);
    margin-bottom: 1rem;
    line-height: 1.6;
  }
  
  .command-block,
  .url-block {
    display: flex;
    align-items: center;
    background-color: var(--background-color);
    border: 1px solid var(--border-color);
    border-radius: var(--radius);
    padding: 0.75rem;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  }
  
  .command,
  .url {
    flex: 1;
    color: var(--primary-color);
    font-weight: 600;
  }
  
  .copy-btn {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    padding: 0.25rem;
    border-radius: 4px;
    transition: var(--transition);
  }
  
  .copy-btn:hover {
    background-color: var(--border-color);
  }
  
  .commands-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }
  
  .command-card {
    background-color: var(--background-color);
    border: 1px solid var(--border-color);
    border-radius: var(--radius);
    padding: 1.5rem;
  }
  
  .command-title {
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: var(--text-primary);
  }
  
  .command-description {
    font-size: 0.875rem;
    color: var(--text-secondary);
    margin: 1rem 0 0 0;
    line-height: 1.5;
  }
  
  .tips-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }
  
  .tip-card {
    background-color: var(--background-color);
    border: 1px solid var(--border-color);
    border-radius: var(--radius);
    padding: 1.5rem;
    text-align: center;
  }
  
  .tip-icon {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  
  .tip-title {
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: var(--text-primary);
  }
  
  .tip-text {
    color: var(--text-secondary);
    line-height: 1.6;
    margin: 0;
  }
  
  .tip-text code {
    background-color: var(--surface-color);
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    color: var(--primary-color);
  }
  
  /* Resources Section */
  .resources-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }
  
  .resource-card {
    background-color: var(--background-color);
    border: 1px solid var(--border-color);
    border-radius: var(--radius);
    padding: 1.5rem;
    text-align: center;
    cursor: pointer;
    transition: var(--transition);
    width: 100%;
  }
  
  .resource-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-color: var(--primary-color);
  }
  
  .resource-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
  
  .resource-title {
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: var(--text-primary);
  }
  
  .resource-description {
    color: var(--text-secondary);
    margin-bottom: 1rem;
    line-height: 1.6;
  }
  
  .resource-link {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    color: var(--primary-color);
    font-weight: 600;
  }
  
  .link-arrow {
    transition: transform 0.3s ease;
  }
  
  .resource-card:hover .link-arrow {
    transform: translateX(4px);
  }
  
  .community-info {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    background-color: var(--background-color);
    border-radius: var(--radius);
    padding: 1.5rem;
    margin-bottom: 2rem;
  }
  
  .community-card {
    padding: 1rem;
  }
  
  .community-title {
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: var(--text-primary);
  }
  
  .community-text {
    color: var(--text-secondary);
    line-height: 1.6;
    margin: 0;
  }
  
  .next-steps-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .next-step {
    display: flex;
    gap: 1rem;
    align-items: flex-start;
    background-color: var(--background-color);
    border-radius: var(--radius);
    padding: 1.5rem;
    border: 1px solid var(--border-color);
  }
  
  .step-icon {
    font-size: 1.5rem;
    flex-shrink: 0;
  }
  
  .step-content h4 {
    margin: 0 0 0.5rem 0;
    color: var(--text-primary);
  }
  
  .step-text {
    color: var(--text-secondary);
    line-height: 1.6;
    margin: 0;
  }
  
  .step-text code {
    background-color: var(--surface-color);
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    color: var(--primary-color);
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .sections-nav {
      overflow-x: auto;
      flex-wrap: nowrap;
    }
    
    .section-label {
      display: none;
    }
    
    .overview-grid,
    .features-grid,
    .tech-stack-grid,
    .routing-info,
    .commands-grid,
    .tips-grid,
    .resources-grid,
    .community-info {
      grid-template-columns: 1fr;
    }
    
    .comparison-table {
      grid-template-columns: 1fr 1fr;
    }
    
    .comparison-table .comparison-cell:nth-child(4n-1),
    .comparison-table .comparison-cell:nth-child(4n) {
      display: none;
    }
    
    .step-item {
      flex-direction: column;
      text-align: center;
    }
    
    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (max-width: 480px) {
    .stats-grid {
      grid-template-columns: 1fr;
    }
    
    .comparison-table {
      grid-template-columns: 1fr;
    }
    
    .comparison-table .comparison-cell:nth-child(n+3) {
      display: none;
    }
  }
</style>