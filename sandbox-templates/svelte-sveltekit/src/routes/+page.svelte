<!--
  🏠 Home Page Component
  Main landing page with features and interactive examples
-->

<script lang="ts">
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import { browser } from '$app/environment';
  
  // Reactive state
  let mounted = false;
  let counter = writable(0);
  let inputText = '';
  let todos = writable<{ id: number; text: string; completed: boolean }[]>([]);
  let newTodo = '';
  let nextId = 1;
  
  // Animation state
  let heroVisible = false;
  let featuresVisible = false;
  
  onMount(() => {
    mounted = true;
    
    // Trigger animations
    setTimeout(() => heroVisible = true, 100);
    setTimeout(() => featuresVisible = true, 300);
    
    // Load todos from localStorage
    if (browser) {
      const savedTodos = localStorage.getItem('svelte-todos');
      if (savedTodos) {
        const parsed = JSON.parse(savedTodos);
        todos.set(parsed);
        nextId = Math.max(...parsed.map((t: any) => t.id), 0) + 1;
      }
    }
    
    // Auto-increment counter
    const interval = setInterval(() => {
      counter.update(n => n + 1);
    }, 3000);
    
    return () => clearInterval(interval);
  });
  
  // Features data
  const features = [
    {
      icon: '⚡',
      title: 'Lightning Fast',
      description: 'Vite-powered development with instant HMR',
      color: '#ff3e00'
    },
    {
      icon: '🔧',
      title: 'TypeScript Ready',
      description: 'Full TypeScript support out of the box',
      color: '#3178c6'
    },
    {
      icon: '📦',
      title: 'Lightweight',
      description: 'Minimal bundle size with optimal performance',
      color: '#22c55e'
    },
    {
      icon: '🎨',
      title: 'Component Based',
      description: 'Reusable components with scoped styling',
      color: '#8b5cf6'
    },
    {
      icon: '🚀',
      title: 'SSR/SSG',
      description: 'Server-side rendering and static generation',
      color: '#f59e0b'
    },
    {
      icon: '🔄',
      title: 'Reactive',
      description: 'Built-in reactivity without complex state management',
      color: '#06b6d4'
    }
  ];
  
  // Interactive functions
  function incrementCounter() {
    counter.update(n => n + 1);
  }
  
  function resetCounter() {
    counter.set(0);
  }
  
  function handleTextSubmit() {
    if (inputText.trim()) {
      alert(`You entered: ${inputText}`);
      inputText = '';
    } else {
      alert('Please enter some text!');
    }
  }
  
  function addTodo() {
    if (newTodo.trim()) {
      const newTodoItem = {
        id: nextId++,
        text: newTodo.trim(),
        completed: false
      };
      
      todos.update(items => {
        const updated = [...items, newTodoItem];
        if (browser) {
          localStorage.setItem('svelte-todos', JSON.stringify(updated));
        }
        return updated;
      });
      
      newTodo = '';
    }
  }
  
  function toggleTodo(id: number) {
    todos.update(items => {
      const updated = items.map(item => 
        item.id === id ? { ...item, completed: !item.completed } : item
      );
      if (browser) {
        localStorage.setItem('svelte-todos', JSON.stringify(updated));
      }
      return updated;
    });
  }
  
  function deleteTodo(id: number) {
    todos.update(items => {
      const updated = items.filter(item => item.id !== id);
      if (browser) {
        localStorage.setItem('svelte-todos', JSON.stringify(updated));
      }
      return updated;
    });
  }
  
  // Statistics
  $: completedTodos = $todos.filter(t => t.completed).length;
  $: totalTodos = $todos.length;
  $: completionRate = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;
</script>

<svelte:head>
  <title>⚡ E2B SvelteKit - Modern Web Development</title>
  <meta name="description" content="SvelteKit template for rapid web development with TypeScript, Vite, and modern tooling." />
</svelte:head>

<!-- Hero Section -->
<section class="hero" class:visible={heroVisible}>
  <div class="hero-content">
    <h1 class="hero-title">
      <span class="gradient-text">Welcome to E2B SvelteKit!</span>
    </h1>
    <p class="hero-subtitle">
      Modern web development template with TypeScript, Vite, and lightning-fast HMR
    </p>
    <div class="hero-stats">
      <div class="stat-item">
        <span class="stat-value">{$counter}</span>
        <span class="stat-label">Live Counter</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">{totalTodos}</span>
        <span class="stat-label">Todos</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">{completionRate}%</span>
        <span class="stat-label">Complete</span>
      </div>
    </div>
  </div>
</section>

<!-- Interactive Demo Section -->
<section class="demo-section">
  <h2 class="section-title">Interactive Demo</h2>
  
  <!-- Counter Demo -->
  <div class="demo-card">
    <h3 class="demo-title">
      <span class="demo-icon">🔢</span>
      Counter Demo
    </h3>
    <div class="counter-display">
      <span class="counter-value">{$counter}</span>
    </div>
    <div class="counter-controls">
      <button class="btn btn-primary" on:click={incrementCounter}>
        Increment
      </button>
      <button class="btn btn-secondary" on:click={resetCounter}>
        Reset
      </button>
    </div>
  </div>
  
  <!-- Text Input Demo -->
  <div class="demo-card">
    <h3 class="demo-title">
      <span class="demo-icon">📝</span>
      Text Input Demo
    </h3>
    <div class="input-group">
      <input 
        type="text" 
        bind:value={inputText}
        placeholder="Enter some text..."
        class="text-input"
        on:keydown={(e) => e.key === 'Enter' && handleTextSubmit()}
      />
      <button class="btn btn-accent" on:click={handleTextSubmit}>
        Submit
      </button>
    </div>
  </div>
  
  <!-- Todo Demo -->
  <div class="demo-card todo-demo">
    <h3 class="demo-title">
      <span class="demo-icon">✅</span>
      Todo Demo
    </h3>
    
    <div class="todo-input">
      <input 
        type="text" 
        bind:value={newTodo}
        placeholder="Add a new todo..."
        class="text-input"
        on:keydown={(e) => e.key === 'Enter' && addTodo()}
      />
      <button class="btn btn-success" on:click={addTodo}>
        Add
      </button>
    </div>
    
    {#if $todos.length > 0}
      <ul class="todo-list">
        {#each $todos as todo (todo.id)}
          <li class="todo-item" class:completed={todo.completed}>
            <button 
              class="todo-toggle"
              on:click={() => toggleTodo(todo.id)}
            >
              {todo.completed ? '✅' : '⭕'}
            </button>
            <span class="todo-text">{todo.text}</span>
            <button 
              class="todo-delete"
              on:click={() => deleteTodo(todo.id)}
            >
              🗑️
            </button>
          </li>
        {/each}
      </ul>
    {:else}
      <p class="empty-state">No todos yet. Add one above!</p>
    {/if}
  </div>
</section>

<!-- Features Section -->
<section class="features" class:visible={featuresVisible}>
  <h2 class="section-title">Why SvelteKit?</h2>
  <div class="features-grid">
    {#each features as feature}
      <div class="feature-card" style="--accent-color: {feature.color}">
        <div class="feature-icon">{feature.icon}</div>
        <h3 class="feature-title">{feature.title}</h3>
        <p class="feature-description">{feature.description}</p>
      </div>
    {/each}
  </div>
</section>

<!-- Getting Started Section -->
<section class="getting-started">
  <h2 class="section-title">Getting Started</h2>
  <div class="steps-grid">
    <div class="step-card">
      <div class="step-number">1</div>
      <h3 class="step-title">Install Dependencies</h3>
      <code class="code-block">npm install</code>
    </div>
    <div class="step-card">
      <div class="step-number">2</div>
      <h3 class="step-title">Start Development</h3>
      <code class="code-block">npm run dev</code>
    </div>
    <div class="step-card">
      <div class="step-number">3</div>
      <h3 class="step-title">Build for Production</h3>
      <code class="code-block">npm run build</code>
    </div>
  </div>
</section>

<style>
  /* Hero Section */
  .hero {
    text-align: center;
    padding: 3rem 0;
    background: linear-gradient(135deg, rgba(255, 62, 0, 0.1), rgba(64, 179, 255, 0.1));
    border-radius: var(--radius);
    margin-bottom: 3rem;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.6s ease;
  }
  
  .hero.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .hero-title {
    font-size: 3rem;
    font-weight: 800;
    margin-bottom: 1rem;
    line-height: 1.1;
  }
  
  .gradient-text {
    background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .hero-subtitle {
    font-size: 1.25rem;
    color: var(--text-secondary);
    margin-bottom: 2rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .hero-stats {
    display: flex;
    justify-content: center;
    gap: 2rem;
    flex-wrap: wrap;
  }
  
  .stat-item {
    text-align: center;
  }
  
  .stat-value {
    display: block;
    font-size: 2rem;
    font-weight: 700;
    color: var(--primary-color);
  }
  
  .stat-label {
    display: block;
    font-size: 0.875rem;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  /* Demo Section */
  .demo-section {
    margin-bottom: 3rem;
  }
  
  .section-title {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 2rem;
    text-align: center;
    color: var(--text-primary);
  }
  
  .demo-card {
    background-color: var(--surface-color);
    border: 1px solid var(--border-color);
    border-radius: var(--radius);
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    box-shadow: var(--shadow);
    transition: var(--transition);
  }
  
  .demo-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  .demo-title {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: var(--text-primary);
  }
  
  .demo-icon {
    font-size: 1.5rem;
  }
  
  /* Counter Styles */
  .counter-display {
    text-align: center;
    margin-bottom: 1rem;
  }
  
  .counter-value {
    font-size: 3rem;
    font-weight: 700;
    color: var(--primary-color);
  }
  
  .counter-controls {
    display: flex;
    gap: 1rem;
    justify-content: center;
  }
  
  /* Input Styles */
  .input-group {
    display: flex;
    gap: 0.5rem;
  }
  
  .text-input {
    flex: 1;
    padding: 0.75rem;
    border: 1px solid var(--border-color);
    border-radius: var(--radius);
    font-size: 1rem;
    background-color: var(--surface-color);
    color: var(--text-primary);
    transition: var(--transition);
  }
  
  .text-input:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(255, 62, 0, 0.1);
  }
  
  /* Button Styles */
  .btn {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: var(--radius);
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: var(--transition);
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  
  .btn-primary {
    background-color: var(--primary-color);
    color: white;
  }
  
  .btn-primary:hover {
    background-color: #e63900;
    transform: translateY(-1px);
  }
  
  .btn-secondary {
    background-color: var(--secondary-color);
    color: white;
  }
  
  .btn-secondary:hover {
    background-color: #5a5a6b;
    transform: translateY(-1px);
  }
  
  .btn-accent {
    background-color: var(--accent-color);
    color: white;
  }
  
  .btn-accent:hover {
    background-color: #2492d9;
    transform: translateY(-1px);
  }
  
  .btn-success {
    background-color: var(--success-color);
    color: white;
  }
  
  .btn-success:hover {
    background-color: #16a34a;
    transform: translateY(-1px);
  }
  
  /* Todo Styles */
  .todo-demo {
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .todo-input {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
  
  .todo-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .todo-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem;
    background-color: var(--background-color);
    border-radius: var(--radius);
    margin-bottom: 0.5rem;
    transition: var(--transition);
  }
  
  .todo-item.completed .todo-text {
    text-decoration: line-through;
    opacity: 0.6;
  }
  
  .todo-toggle,
  .todo-delete {
    background: none;
    border: none;
    font-size: 1.25rem;
    cursor: pointer;
    transition: var(--transition);
  }
  
  .todo-toggle:hover,
  .todo-delete:hover {
    transform: scale(1.1);
  }
  
  .todo-text {
    flex: 1;
    font-size: 1rem;
  }
  
  .empty-state {
    text-align: center;
    color: var(--text-secondary);
    font-style: italic;
    padding: 2rem 0;
  }
  
  /* Features Section */
  .features {
    margin-bottom: 3rem;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.6s ease 0.2s;
  }
  
  .features.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  }
  
  .feature-card {
    background-color: var(--surface-color);
    border: 1px solid var(--border-color);
    border-radius: var(--radius);
    padding: 1.5rem;
    text-align: center;
    transition: var(--transition);
    position: relative;
    overflow: hidden;
  }
  
  .feature-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background-color: var(--accent-color);
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }
  
  .feature-card:hover::before {
    transform: scaleX(1);
  }
  
  .feature-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }
  
  .feature-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
  
  .feature-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: var(--text-primary);
  }
  
  .feature-description {
    color: var(--text-secondary);
    line-height: 1.6;
  }
  
  /* Getting Started Section */
  .getting-started {
    margin-bottom: 3rem;
  }
  
  .steps-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }
  
  .step-card {
    background-color: var(--surface-color);
    border: 1px solid var(--border-color);
    border-radius: var(--radius);
    padding: 1.5rem;
    text-align: center;
    position: relative;
  }
  
  .step-number {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background-color: var(--primary-color);
    color: white;
    border-radius: 50%;
    font-weight: 700;
    font-size: 1.25rem;
    margin-bottom: 1rem;
  }
  
  .step-title {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: var(--text-primary);
  }
  
  .code-block {
    display: inline-block;
    background-color: var(--background-color);
    padding: 0.5rem 1rem;
    border-radius: var(--radius);
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: 0.9rem;
    color: var(--primary-color);
    border: 1px solid var(--border-color);
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .hero-title {
      font-size: 2rem;
    }
    
    .hero-stats {
      gap: 1rem;
    }
    
    .input-group {
      flex-direction: column;
    }
    
    .counter-controls {
      flex-direction: column;
      align-items: center;
    }
    
    .features-grid {
      grid-template-columns: 1fr;
    }
  }
</style>