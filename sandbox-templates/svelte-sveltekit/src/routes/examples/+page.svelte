<!--
  🚀 Examples Page
  Interactive examples and demos of SvelteKit features
-->

<script lang="ts">
  import { onMount } from 'svelte';
  import { writable, derived } from 'svelte/store';
  import { browser } from '$app/environment';
  
  // State management
  let mounted = false;
  let currentExample = 'reactivity';
  
  // Reactive data stores
  const count = writable(0);
  const name = writable('World');
  const items = writable<{ id: number; name: string; price: number }[]>([
    { id: 1, name: 'Laptop', price: 999 },
    { id: 2, name: 'Phone', price: 699 },
    { id: 3, name: 'Tablet', price: 399 },
    { id: 4, name: 'Watch', price: 299 }
  ]);
  
  // Derived stores
  const doubled = derived(count, $count => $count * 2);
  const greeting = derived(name, $name => `Hello, ${$name}!`);
  const total = derived(items, $items => 
    $items.reduce((sum, item) => sum + item.price, 0)
  );
  
  // Animation states
  let animatedBox = { x: 0, y: 0, rotation: 0, scale: 1 };
  let isAnimating = false;
  
  // Lifecycle data
  let lifecycleLog: string[] = [];
  
  // Form data
  let formData = {
    email: '',
    message: '',
    category: 'general',
    subscribe: false
  };
  
  const examples = [
    { id: 'reactivity', label: 'Reactivity', icon: '🔄' },
    { id: 'stores', label: 'Stores', icon: '🏪' },
    { id: 'animations', label: 'Animations', icon: '🎬' },
    { id: 'lifecycle', label: 'Lifecycle', icon: '🔄' },
    { id: 'forms', label: 'Forms', icon: '📝' },
    { id: 'api', label: 'API Demo', icon: '🌐' }
  ];
  
  onMount(() => {
    mounted = true;
    log('Component mounted');
    
    // Simulate some lifecycle events
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        log('Random event triggered');
      }
    }, 3000);
    
    return () => {
      clearInterval(interval);
      log('Component cleanup');
    };
  });
  
  function log(message: string) {
    const timestamp = new Date().toLocaleTimeString();
    lifecycleLog = [`[${timestamp}] ${message}`, ...lifecycleLog.slice(0, 9)];
  }
  
  function increment() {
    count.update(n => n + 1);
  }
  
  function decrement() {
    count.update(n => n - 1);
  }
  
  function reset() {
    count.set(0);
  }
  
  function addItem() {
    const names = ['Keyboard', 'Mouse', 'Monitor', 'Speaker', 'Camera', 'Microphone'];
    const newItem = {
      id: Date.now(),
      name: names[Math.floor(Math.random() * names.length)],
      price: Math.floor(Math.random() * 500) + 100
    };
    items.update(list => [...list, newItem]);
  }
  
  function removeItem(id: number) {
    items.update(list => list.filter(item => item.id !== id));
  }
  
  function animateBox() {
    if (isAnimating) return;
    
    isAnimating = true;
    animatedBox = {
      x: Math.random() * 200,
      y: Math.random() * 100,
      rotation: Math.random() * 360,
      scale: 0.5 + Math.random() * 1
    };
    
    setTimeout(() => {
      isAnimating = false;
    }, 1000);
  }
  
  function resetAnimation() {
    animatedBox = { x: 0, y: 0, rotation: 0, scale: 1 };
  }
  
  async function handleFormSubmit() {
    log('Form submitted with data: ' + JSON.stringify(formData));
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      log('Form submission successful');
      
      // Reset form
      formData = {
        email: '',
        message: '',
        category: 'general',
        subscribe: false
      };
    } catch (error) {
      log('Form submission failed');
    }
  }
  
  async function fetchRandomFact() {
    log('Fetching random fact...');
    
    try {
      // Simulate API call with random programming fact
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const facts = [
        'Svelte was created by Rich Harris in 2016',
        'SvelteKit is the official framework for building Svelte applications',
        'Svelte compiles to vanilla JavaScript with no runtime overhead',
        'SvelteKit supports Server-Side Rendering out of the box',
        'Svelte uses a compile-time approach instead of virtual DOM',
        'SvelteKit has built-in support for TypeScript'
      ];
      
      const randomFact = facts[Math.floor(Math.random() * facts.length)];
      log(`API Response: ${randomFact}`);
    } catch (error) {
      log('API call failed');
    }
  }
  
  // Reactive statements
  $: if (browser && $count > 10) {
    log(`Count is getting high: ${$count}`);
  }
  
  $: if (browser && $items.length > 6) {
    log(`Cart is getting full: ${$items.length} items`);
  }
</script>

<svelte:head>
  <title>Examples - E2B SvelteKit</title>
  <meta name="description" content="Interactive examples and demos of SvelteKit features" />
</svelte:head>

<div class="examples-page">
  <header class="page-header">
    <h1 class="page-title">
      <span class="page-icon">🚀</span>
      Interactive Examples
    </h1>
    <p class="page-description">
      Explore SvelteKit features with hands-on interactive demonstrations
    </p>
  </header>
  
  <!-- Example Navigation -->
  <nav class="examples-nav">
    {#each examples as example}
      <button 
        class="example-button" 
        class:active={currentExample === example.id}
        on:click={() => currentExample = example.id}
      >
        <span class="example-icon">{example.icon}</span>
        <span class="example-label">{example.label}</span>
      </button>
    {/each}
  </nav>
  
  <!-- Example Content -->
  <div class="example-content">
    
    <!-- Reactivity Example -->
    {#if currentExample === 'reactivity'}
      <section class="example-section">
        <h2 class="section-title">🔄 Reactivity in Action</h2>
        <p class="section-description">
          Svelte's reactivity system automatically updates the UI when data changes. 
          No need for setState or complex state management!
        </p>
        
        <div class="demo-grid">
          <div class="demo-card">
            <h3 class="demo-title">Basic Counter</h3>
            <div class="counter-display">
              <span class="counter-value">{$count}</span>
            </div>
            <div class="counter-controls">
              <button class="btn btn-secondary" on:click={decrement}>-</button>
              <button class="btn btn-primary" on:click={increment}>+</button>
              <button class="btn btn-outline" on:click={reset}>Reset</button>
            </div>
          </div>
          
          <div class="demo-card">
            <h3 class="demo-title">Reactive Greeting</h3>
            <div class="greeting-display">
              <p class="greeting-text">{$greeting}</p>
            </div>
            <input 
              class="name-input"
              bind:value={$name} 
              placeholder="Enter your name..."
            />
          </div>
        </div>
        
        <div class="reactive-statements">
          <h4 class="subsection-title">Reactive Statements</h4>
          <div class="code-example">
            <code>$: doubled = count * 2</code>
            <div class="result">Result: {$doubled}</div>
          </div>
          <div class="code-example">
            <code>$: greeting = `Hello, ${name}!`</code>
            <div class="result">Result: {$greeting}</div>
          </div>
        </div>
      </section>
    {/if}
    
    <!-- Stores Example -->
    {#if currentExample === 'stores'}
      <section class="example-section">
        <h2 class="section-title">🏪 Svelte Stores</h2>
        <p class="section-description">
          Stores provide a way to share state across components. This shopping cart 
          demonstrates writable and derived stores.
        </p>
        
        <div class="store-demo">
          <div class="cart-section">
            <div class="cart-header">
              <h3 class="cart-title">Shopping Cart</h3>
              <span class="cart-count">{$items.length} items</span>
            </div>
            
            <div class="cart-items">
              {#each $items as item (item.id)}
                <div class="cart-item">
                  <span class="item-name">{item.name}</span>
                  <span class="item-price">${item.price}</span>
                  <button 
                    class="remove-btn"
                    on:click={() => removeItem(item.id)}
                  >
                    ×
                  </button>
                </div>
              {/each}
            </div>
            
            <div class="cart-footer">
              <div class="cart-total">
                <strong>Total: ${$total}</strong>
              </div>
              <button class="btn btn-primary" on:click={addItem}>
                Add Random Item
              </button>
            </div>
          </div>
          
          <div class="store-info">
            <h4 class="subsection-title">Store Types Used</h4>
            <ul class="store-list">
              <li><code>writable()</code> - For the items array</li>
              <li><code>derived()</code> - For the computed total</li>
              <li><code>$store</code> - Auto-subscription syntax</li>
            </ul>
          </div>
        </div>
      </section>
    {/if}
    
    <!-- Animations Example -->
    {#if currentExample === 'animations'}
      <section class="example-section">
        <h2 class="section-title">🎬 CSS Animations</h2>
        <p class="section-description">
          Smooth animations and transitions using CSS and Svelte's reactive updates.
        </p>
        
        <div class="animation-demo">
          <div class="animation-stage">
            <div 
              class="animated-box"
              style="
                transform: translate({animatedBox.x}px, {animatedBox.y}px) 
                          rotate({animatedBox.rotation}deg) 
                          scale({animatedBox.scale});
              "
            >
              🎯
            </div>
          </div>
          
          <div class="animation-controls">
            <button 
              class="btn btn-primary" 
              on:click={animateBox}
              disabled={isAnimating}
            >
              {isAnimating ? 'Animating...' : 'Animate Box'}
            </button>
            <button class="btn btn-secondary" on:click={resetAnimation}>
              Reset Position
            </button>
          </div>
          
          <div class="animation-values">
            <div class="value-item">
              <span class="value-label">X:</span>
              <span class="value-number">{Math.round(animatedBox.x)}px</span>
            </div>
            <div class="value-item">
              <span class="value-label">Y:</span>
              <span class="value-number">{Math.round(animatedBox.y)}px</span>
            </div>
            <div class="value-item">
              <span class="value-label">Rotation:</span>
              <span class="value-number">{Math.round(animatedBox.rotation)}°</span>
            </div>
            <div class="value-item">
              <span class="value-label">Scale:</span>
              <span class="value-number">{animatedBox.scale.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </section>
    {/if}
    
    <!-- Lifecycle Example -->
    {#if currentExample === 'lifecycle'}
      <section class="example-section">
        <h2 class="section-title">🔄 Component Lifecycle</h2>
        <p class="section-description">
          Monitor component lifecycle events and reactive statements in real-time.
        </p>
        
        <div class="lifecycle-demo">
          <div class="lifecycle-log">
            <h4 class="log-title">Lifecycle Events</h4>
            <div class="log-container">
              {#each lifecycleLog as entry}
                <div class="log-entry">{entry}</div>
              {/each}
            </div>
          </div>
          
          <div class="lifecycle-actions">
            <button class="btn btn-primary" on:click={() => log('Manual event triggered')}>
              Trigger Event
            </button>
            <button class="btn btn-secondary" on:click={() => lifecycleLog = []}>
              Clear Log
            </button>
          </div>
          
          <div class="lifecycle-info">
            <h4 class="subsection-title">Available Lifecycle Functions</h4>
            <ul class="lifecycle-list">
              <li><code>onMount()</code> - After component is rendered</li>
              <li><code>beforeUpdate()</code> - Before DOM updates</li>
              <li><code>afterUpdate()</code> - After DOM updates</li>
              <li><code>onDestroy()</code> - Before component is destroyed</li>
            </ul>
          </div>
        </div>
      </section>
    {/if}
    
    <!-- Forms Example -->
    {#if currentExample === 'forms'}
      <section class="example-section">
        <h2 class="section-title">📝 Form Handling</h2>
        <p class="section-description">
          Two-way data binding makes form handling simple and intuitive in Svelte.
        </p>
        
        <div class="form-demo">
          <form class="demo-form" on:submit|preventDefault={handleFormSubmit}>
            <div class="form-group">
              <label for="email" class="form-label">Email</label>
              <input 
                id="email"
                type="email" 
                class="form-input" 
                bind:value={formData.email}
                placeholder="Enter your email..."
                required
              />
            </div>
            
            <div class="form-group">
              <label for="category" class="form-label">Category</label>
              <select id="category" class="form-select" bind:value={formData.category}>
                <option value="general">General</option>
                <option value="support">Support</option>
                <option value="feedback">Feedback</option>
                <option value="bug">Bug Report</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="message" class="form-label">Message</label>
              <textarea 
                id="message"
                class="form-textarea" 
                bind:value={formData.message}
                placeholder="Enter your message..."
                rows="4"
                required
              ></textarea>
            </div>
            
            <div class="form-group">
              <label class="checkbox-label">
                <input 
                  type="checkbox" 
                  bind:checked={formData.subscribe}
                  class="checkbox-input"
                />
                <span class="checkbox-text">Subscribe to newsletter</span>
              </label>
            </div>
            
            <button type="submit" class="btn btn-primary btn-lg">
              Submit Form
            </button>
          </form>
          
          <div class="form-preview">
            <h4 class="preview-title">Form Data Preview</h4>
            <pre class="form-data">{JSON.stringify(formData, null, 2)}</pre>
          </div>
        </div>
      </section>
    {/if}
    
    <!-- API Example -->
    {#if currentExample === 'api'}
      <section class="example-section">
        <h2 class="section-title">🌐 API Integration</h2>
        <p class="section-description">
          Demonstrate async operations and API calls with proper loading states.
        </p>
        
        <div class="api-demo">
          <div class="api-controls">
            <button class="btn btn-primary" on:click={fetchRandomFact}>
              Fetch Random Fact
            </button>
            <button class="btn btn-secondary" on:click={() => log('Manual API test')}>
              Test Logging
            </button>
          </div>
          
          <div class="api-log">
            <h4 class="log-title">API Activity Log</h4>
            <div class="log-container">
              {#each lifecycleLog.filter(entry => entry.includes('API') || entry.includes('Response')) as entry}
                <div class="log-entry api-entry">{entry}</div>
              {:else}
                <div class="empty-log">No API activity yet. Click "Fetch Random Fact" to start!</div>
              {/each}
            </div>
          </div>
          
          <div class="api-info">
            <h4 class="subsection-title">Best Practices</h4>
            <ul class="best-practices">
              <li>Use async/await for cleaner code</li>
              <li>Handle loading states properly</li>
              <li>Implement error boundaries</li>
              <li>Cache responses when appropriate</li>
              <li>Show meaningful error messages</li>
            </ul>
          </div>
        </div>
      </section>
    {/if}
  </div>
</div>

<style>
  .examples-page {
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
  
  /* Examples Navigation */
  .examples-nav {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 2rem;
    background-color: var(--surface-color);
    border-radius: var(--radius);
    padding: 0.5rem;
    border: 1px solid var(--border-color);
  }
  
  .example-button {
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
  }
  
  .example-button.active,
  .example-button:hover {
    background-color: var(--primary-color);
    color: white;
  }
  
  .example-icon {
    font-size: 1.1rem;
  }
  
  /* Example Content */
  .example-section {
    background-color: var(--surface-color);
    border: 1px solid var(--border-color);
    border-radius: var(--radius);
    padding: 2rem;
  }
  
  .section-title {
    font-size: 1.75rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: var(--text-primary);
  }
  
  .section-description {
    font-size: 1rem;
    color: var(--text-secondary);
    margin-bottom: 2rem;
    line-height: 1.6;
  }
  
  .subsection-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 1.5rem 0 1rem 0;
    color: var(--text-primary);
  }
  
  /* Demo Components */
  .demo-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }
  
  .demo-card {
    background-color: var(--background-color);
    border: 1px solid var(--border-color);
    border-radius: var(--radius);
    padding: 1.5rem;
  }
  
  .demo-title {
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: var(--text-primary);
  }
  
  /* Counter Styles */
  .counter-display {
    text-align: center;
    margin-bottom: 1rem;
  }
  
  .counter-value {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--primary-color);
  }
  
  .counter-controls {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
  }
  
  /* Greeting Styles */
  .greeting-display {
    text-align: center;
    margin-bottom: 1rem;
  }
  
  .greeting-text {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--accent-color);
    margin: 0;
  }
  
  .name-input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid var(--border-color);
    border-radius: var(--radius);
    font-size: 1rem;
    background-color: var(--surface-color);
    color: var(--text-primary);
  }
  
  /* Reactive Statements */
  .reactive-statements {
    background-color: var(--background-color);
    border-radius: var(--radius);
    padding: 1.5rem;
  }
  
  .code-example {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: var(--surface-color);
    border-radius: var(--radius);
    margin-bottom: 0.5rem;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  }
  
  .code-example code {
    color: var(--primary-color);
    font-weight: 600;
  }
  
  .result {
    color: var(--text-secondary);
    font-weight: 500;
  }
  
  /* Store Demo */
  .store-demo {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 2rem;
  }
  
  .cart-section {
    background-color: var(--background-color);
    border-radius: var(--radius);
    padding: 1.5rem;
  }
  
  .cart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
  
  .cart-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0;
    color: var(--text-primary);
  }
  
  .cart-count {
    background-color: var(--primary-color);
    color: white;
    padding: 0.25rem 0.5rem;
    border-radius: 12px;
    font-size: 0.875rem;
    font-weight: 600;
  }
  
  .cart-items {
    margin-bottom: 1rem;
  }
  
  .cart-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem;
    background-color: var(--surface-color);
    border-radius: var(--radius);
    margin-bottom: 0.5rem;
  }
  
  .item-name {
    font-weight: 500;
    color: var(--text-primary);
  }
  
  .item-price {
    font-weight: 600;
    color: var(--success-color);
  }
  
  .remove-btn {
    background: none;
    border: none;
    color: var(--error-color);
    font-size: 1.25rem;
    cursor: pointer;
    padding: 0.25rem;
    border-radius: 4px;
    transition: var(--transition);
  }
  
  .remove-btn:hover {
    background-color: rgba(239, 68, 68, 0.1);
  }
  
  .cart-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 1rem;
    border-top: 1px solid var(--border-color);
  }
  
  .cart-total {
    font-size: 1.125rem;
    color: var(--text-primary);
  }
  
  .store-info {
    background-color: var(--background-color);
    border-radius: var(--radius);
    padding: 1.5rem;
  }
  
  .store-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .store-list li {
    padding: 0.5rem 0;
    border-bottom: 1px solid var(--border-color);
  }
  
  .store-list li:last-child {
    border-bottom: none;
  }
  
  .store-list code {
    background-color: var(--surface-color);
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    color: var(--primary-color);
  }
  
  /* Animation Demo */
  .animation-demo {
    text-align: center;
  }
  
  .animation-stage {
    height: 200px;
    background-color: var(--background-color);
    border: 2px dashed var(--border-color);
    border-radius: var(--radius);
    margin-bottom: 1rem;
    position: relative;
    overflow: hidden;
  }
  
  .animated-box {
    position: absolute;
    top: 50px;
    left: 50px;
    width: 60px;
    height: 60px;
    background-color: var(--primary-color);
    border-radius: var(--radius);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    transition: transform 1s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
  }
  
  .animation-controls {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-bottom: 1rem;
  }
  
  .animation-values {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 1rem;
    background-color: var(--background-color);
    border-radius: var(--radius);
    padding: 1rem;
  }
  
  .value-item {
    text-align: center;
  }
  
  .value-label {
    display: block;
    font-size: 0.875rem;
    color: var(--text-secondary);
    margin-bottom: 0.25rem;
  }
  
  .value-number {
    display: block;
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--text-primary);
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  }
  
  /* Lifecycle Demo */
  .lifecycle-demo {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
  
  .lifecycle-log {
    background-color: var(--background-color);
    border-radius: var(--radius);
    padding: 1rem;
  }
  
  .log-title {
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: var(--text-primary);
  }
  
  .log-container {
    height: 200px;
    overflow-y: auto;
    background-color: var(--surface-color);
    border-radius: var(--radius);
    padding: 1rem;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: 0.875rem;
  }
  
  .log-entry {
    padding: 0.25rem 0;
    color: var(--text-secondary);
    border-bottom: 1px solid var(--border-color);
  }
  
  .log-entry:last-child {
    border-bottom: none;
  }
  
  .api-entry {
    color: var(--accent-color);
  }
  
  .empty-log {
    color: var(--text-secondary);
    font-style: italic;
    text-align: center;
    padding: 2rem 0;
  }
  
  .lifecycle-actions {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1rem;
  }
  
  .lifecycle-info {
    background-color: var(--background-color);
    border-radius: var(--radius);
    padding: 1rem;
  }
  
  .lifecycle-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .lifecycle-list li {
    padding: 0.5rem 0;
    border-bottom: 1px solid var(--border-color);
  }
  
  .lifecycle-list li:last-child {
    border-bottom: none;
  }
  
  .lifecycle-list code {
    background-color: var(--surface-color);
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    color: var(--primary-color);
    font-weight: 600;
  }
  
  /* Form Demo */
  .form-demo {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
  
  .demo-form {
    background-color: var(--background-color);
    border-radius: var(--radius);
    padding: 1.5rem;
  }
  
  .form-group {
    margin-bottom: 1.5rem;
  }
  
  .form-label {
    display: block;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: var(--text-primary);
  }
  
  .form-input,
  .form-textarea,
  .form-select {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid var(--border-color);
    border-radius: var(--radius);
    font-size: 1rem;
    background-color: var(--surface-color);
    color: var(--text-primary);
    transition: var(--transition);
  }
  
  .form-input:focus,
  .form-textarea:focus,
  .form-select:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(255, 62, 0, 0.1);
  }
  
  .checkbox-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
  }
  
  .checkbox-input {
    width: 18px;
    height: 18px;
    accent-color: var(--primary-color);
  }
  
  .form-preview {
    background-color: var(--background-color);
    border-radius: var(--radius);
    padding: 1.5rem;
  }
  
  .preview-title {
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: var(--text-primary);
  }
  
  .form-data {
    background-color: var(--surface-color);
    border-radius: var(--radius);
    padding: 1rem;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: 0.875rem;
    color: var(--text-primary);
    overflow-x: auto;
    white-space: pre-wrap;
  }
  
  /* API Demo */
  .api-demo {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
  
  .api-controls {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1rem;
  }
  
  .api-log {
    background-color: var(--background-color);
    border-radius: var(--radius);
    padding: 1rem;
  }
  
  .api-info {
    background-color: var(--background-color);
    border-radius: var(--radius);
    padding: 1rem;
  }
  
  .best-practices {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .best-practices li {
    padding: 0.5rem 0;
    border-bottom: 1px solid var(--border-color);
    position: relative;
    padding-left: 1.5rem;
  }
  
  .best-practices li:before {
    content: '✓';
    position: absolute;
    left: 0;
    color: var(--success-color);
    font-weight: bold;
  }
  
  .best-practices li:last-child {
    border-bottom: none;
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
  
  .btn-sm { padding: 0.5rem 1rem; font-size: 0.875rem; }
  .btn-lg { padding: 1rem 2rem; font-size: 1.125rem; }
  
  .btn-primary { background-color: var(--primary-color); color: white; }
  .btn-secondary { background-color: var(--secondary-color); color: white; }
  .btn-outline { 
    background-color: transparent; 
    border: 2px solid var(--primary-color); 
    color: var(--primary-color); 
  }
  
  .btn:hover:not(:disabled) { transform: translateY(-1px); }
  .btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .examples-nav {
      flex-wrap: wrap;
    }
    
    .example-label {
      display: none;
    }
    
    .demo-grid,
    .store-demo,
    .lifecycle-demo,
    .form-demo,
    .api-demo {
      grid-template-columns: 1fr;
    }
    
    .animation-values {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (max-width: 480px) {
    .counter-controls {
      flex-direction: column;
      align-items: center;
    }
    
    .animation-values {
      grid-template-columns: 1fr;
    }
  }
</style>