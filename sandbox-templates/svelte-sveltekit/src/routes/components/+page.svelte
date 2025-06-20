<!--
  🧩 Components Page
  Showcase of reusable Svelte components and UI elements
-->

<script lang="ts">
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  
  // Component state
  let mounted = false;
  let selectedTab = 'buttons';
  let modalOpen = false;
  let notificationVisible = false;
  let accordionOpen = { first: false, second: false, third: false };
  let sliderValue = 50;
  let switchValue = false;
  let dropdownOpen = false;
  let selectedOption = 'Option 1';
  
  const tabs = [
    { id: 'buttons', label: 'Buttons', icon: '🔘' },
    { id: 'forms', label: 'Forms', icon: '📝' },
    { id: 'navigation', label: 'Navigation', icon: '🧭' },
    { id: 'feedback', label: 'Feedback', icon: '💬' },
    { id: 'layout', label: 'Layout', icon: '📐' }
  ];
  
  const buttonVariants = [
    { class: 'btn-primary', label: 'Primary' },
    { class: 'btn-secondary', label: 'Secondary' },
    { class: 'btn-accent', label: 'Accent' },
    { class: 'btn-success', label: 'Success' },
    { class: 'btn-warning', label: 'Warning' },
    { class: 'btn-error', label: 'Error' },
    { class: 'btn-outline', label: 'Outline' },
    { class: 'btn-ghost', label: 'Ghost' }
  ];
  
  onMount(() => {
    mounted = true;
  });
  
  function openModal() {
    modalOpen = true;
  }
  
  function closeModal() {
    modalOpen = false;
  }
  
  function showNotification() {
    notificationVisible = true;
    setTimeout(() => {
      notificationVisible = false;
    }, 3000);
  }
  
  function toggleAccordion(key: keyof typeof accordionOpen) {
    accordionOpen[key] = !accordionOpen[key];
  }
  
  function selectOption(option: string) {
    selectedOption = option;
    dropdownOpen = false;
  }
</script>

<svelte:head>
  <title>Components - E2B SvelteKit</title>
  <meta name="description" content="Showcase of reusable Svelte components and UI elements" />
</svelte:head>

<div class="components-page">
  <header class="page-header">
    <h1 class="page-title">
      <span class="page-icon">🧩</span>
      Component Library
    </h1>
    <p class="page-description">
      A collection of reusable Svelte components for modern web applications
    </p>
  </header>
  
  <!-- Tab Navigation -->
  <nav class="tabs-nav">
    {#each tabs as tab}
      <button 
        class="tab-button" 
        class:active={selectedTab === tab.id}
        on:click={() => selectedTab = tab.id}
      >
        <span class="tab-icon">{tab.icon}</span>
        <span class="tab-label">{tab.label}</span>
      </button>
    {/each}
  </nav>
  
  <!-- Tab Content -->
  <div class="tab-content">
    
    <!-- Buttons Tab -->
    {#if selectedTab === 'buttons'}
      <section class="component-section">
        <h2 class="section-title">Button Variants</h2>
        <div class="button-grid">
          {#each buttonVariants as variant}
            <button class="btn {variant.class}" on:click={showNotification}>
              {variant.label}
            </button>
          {/each}
        </div>
        
        <h3 class="subsection-title">Button Sizes</h3>
        <div class="button-row">
          <button class="btn btn-primary btn-sm">Small</button>
          <button class="btn btn-primary">Default</button>
          <button class="btn btn-primary btn-lg">Large</button>
        </div>
        
        <h3 class="subsection-title">Button States</h3>
        <div class="button-row">
          <button class="btn btn-primary">Normal</button>
          <button class="btn btn-primary" disabled>Disabled</button>
          <button class="btn btn-primary loading">Loading...</button>
        </div>
      </section>
    {/if}
    
    <!-- Forms Tab -->
    {#if selectedTab === 'forms'}
      <section class="component-section">
        <h2 class="section-title">Form Elements</h2>
        
        <div class="form-grid">
          <div class="form-group">
            <label for="text-input" class="form-label">Text Input</label>
            <input 
              id="text-input"
              type="text" 
              class="form-input" 
              placeholder="Enter text..."
            />
          </div>
          
          <div class="form-group">
            <label for="email-input" class="form-label">Email Input</label>
            <input 
              id="email-input"
              type="email" 
              class="form-input" 
              placeholder="Enter email..."
            />
          </div>
          
          <div class="form-group">
            <label for="textarea" class="form-label">Textarea</label>
            <textarea 
              id="textarea"
              class="form-textarea" 
              rows="4" 
              placeholder="Enter message..."
            ></textarea>
          </div>
          
          <div class="form-group">
            <label for="select" class="form-label">Select</label>
            <select id="select" class="form-select">
              <option>Choose option...</option>
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
            </select>
          </div>
        </div>
        
        <h3 class="subsection-title">Range & Toggle Controls</h3>
        <div class="controls-group">
          <div class="control-item">
            <label class="form-label">Range Slider: {sliderValue}</label>
            <input 
              type="range" 
              min="0" 
              max="100" 
              bind:value={sliderValue}
              class="range-slider"
            />
          </div>
          
          <div class="control-item">
            <label class="switch-label">
              <input 
                type="checkbox" 
                bind:checked={switchValue}
                class="switch-input"
              />
              <span class="switch-slider"></span>
              <span class="switch-text">Toggle Switch</span>
            </label>
          </div>
        </div>
      </section>
    {/if}
    
    <!-- Navigation Tab -->
    {#if selectedTab === 'navigation'}
      <section class="component-section">
        <h2 class="section-title">Navigation Components</h2>
        
        <h3 class="subsection-title">Breadcrumbs</h3>
        <nav class="breadcrumbs">
          <a href="/" class="breadcrumb-item">Home</a>
          <span class="breadcrumb-separator">→</span>
          <a href="/components" class="breadcrumb-item">Components</a>
          <span class="breadcrumb-separator">→</span>
          <span class="breadcrumb-current">Navigation</span>
        </nav>
        
        <h3 class="subsection-title">Pagination</h3>
        <nav class="pagination">
          <button class="pagination-btn" disabled>←</button>
          <button class="pagination-btn active">1</button>
          <button class="pagination-btn">2</button>
          <button class="pagination-btn">3</button>
          <span class="pagination-dots">...</span>
          <button class="pagination-btn">10</button>
          <button class="pagination-btn">→</button>
        </nav>
        
        <h3 class="subsection-title">Custom Dropdown</h3>
        <div class="dropdown" class:open={dropdownOpen}>
          <button 
            class="dropdown-trigger"
            on:click={() => dropdownOpen = !dropdownOpen}
          >
            {selectedOption}
            <span class="dropdown-arrow">▼</span>
          </button>
          {#if dropdownOpen}
            <div class="dropdown-menu">
              {#each ['Option 1', 'Option 2', 'Option 3', 'Option 4'] as option}
                <button 
                  class="dropdown-item"
                  on:click={() => selectOption(option)}
                >
                  {option}
                </button>
              {/each}
            </div>
          {/if}
        </div>
      </section>
    {/if}
    
    <!-- Feedback Tab -->
    {#if selectedTab === 'feedback'}
      <section class="component-section">
        <h2 class="section-title">Feedback Components</h2>
        
        <h3 class="subsection-title">Alerts</h3>
        <div class="alerts-grid">
          <div class="alert alert-info">
            <span class="alert-icon">ℹ️</span>
            <div class="alert-content">
              <strong>Info:</strong> This is an informational message.
            </div>
          </div>
          
          <div class="alert alert-success">
            <span class="alert-icon">✅</span>
            <div class="alert-content">
              <strong>Success:</strong> Operation completed successfully!
            </div>
          </div>
          
          <div class="alert alert-warning">
            <span class="alert-icon">⚠️</span>
            <div class="alert-content">
              <strong>Warning:</strong> Please review your input.
            </div>
          </div>
          
          <div class="alert alert-error">
            <span class="alert-icon">❌</span>
            <div class="alert-content">
              <strong>Error:</strong> Something went wrong.
            </div>
          </div>
        </div>
        
        <h3 class="subsection-title">Modal Dialog</h3>
        <button class="btn btn-primary" on:click={openModal}>
          Open Modal
        </button>
        
        <h3 class="subsection-title">Progress Indicators</h3>
        <div class="progress-examples">
          <div class="progress-item">
            <label class="form-label">Progress Bar</label>
            <div class="progress-bar">
              <div class="progress-fill" style="width: {sliderValue}%"></div>
            </div>
            <span class="progress-text">{sliderValue}%</span>
          </div>
          
          <div class="progress-item">
            <label class="form-label">Loading Spinner</label>
            <div class="spinner"></div>
          </div>
        </div>
      </section>
    {/if}
    
    <!-- Layout Tab -->
    {#if selectedTab === 'layout'}
      <section class="component-section">
        <h2 class="section-title">Layout Components</h2>
        
        <h3 class="subsection-title">Cards</h3>
        <div class="cards-grid">
          <div class="card">
            <div class="card-header">
              <h4 class="card-title">Basic Card</h4>
            </div>
            <div class="card-content">
              <p>This is a basic card component with header and content.</p>
            </div>
          </div>
          
          <div class="card">
            <div class="card-header">
              <h4 class="card-title">Featured Card</h4>
              <span class="card-badge">NEW</span>
            </div>
            <div class="card-content">
              <p>This card has a featured badge and special styling.</p>
            </div>
            <div class="card-footer">
              <button class="btn btn-sm btn-primary">Action</button>
            </div>
          </div>
        </div>
        
        <h3 class="subsection-title">Accordion</h3>
        <div class="accordion">
          <div class="accordion-item">
            <button 
              class="accordion-header"
              on:click={() => toggleAccordion('first')}
            >
              <span>What is SvelteKit?</span>
              <span class="accordion-icon" class:rotated={accordionOpen.first}>▼</span>
            </button>
            {#if accordionOpen.first}
              <div class="accordion-content">
                <p>SvelteKit is a framework for building web applications of all sizes, with a beautiful development experience and flexible filesystem-based routing.</p>
              </div>
            {/if}
          </div>
          
          <div class="accordion-item">
            <button 
              class="accordion-header"
              on:click={() => toggleAccordion('second')}
            >
              <span>Why choose Svelte?</span>
              <span class="accordion-icon" class:rotated={accordionOpen.second}>▼</span>
            </button>
            {#if accordionOpen.second}
              <div class="accordion-content">
                <p>Svelte is a radical new approach to building user interfaces. Instead of using techniques like virtual DOM diffing, Svelte writes code that surgically updates the DOM when the state of your app changes.</p>
              </div>
            {/if}
          </div>
          
          <div class="accordion-item">
            <button 
              class="accordion-header"
              on:click={() => toggleAccordion('third')}
            >
              <span>How fast is SvelteKit?</span>
              <span class="accordion-icon" class:rotated={accordionOpen.third}>▼</span>
            </button>
            {#if accordionOpen.third}
              <div class="accordion-content">
                <p>SvelteKit applications are extremely fast because Svelte compiles your components to highly optimized vanilla JavaScript, resulting in smaller bundle sizes and better performance.</p>
              </div>
            {/if}
          </div>
        </div>
      </section>
    {/if}
  </div>
</div>

<!-- Modal Component -->
{#if modalOpen}
  <div class="modal-overlay" on:click={closeModal}>
    <div class="modal-content" on:click|stopPropagation>
      <div class="modal-header">
        <h3 class="modal-title">Modal Example</h3>
        <button class="modal-close" on:click={closeModal}>×</button>
      </div>
      <div class="modal-body">
        <p>This is a modal dialog component. You can put any content here!</p>
        <p>Click outside the modal or the × button to close it.</p>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" on:click={closeModal}>Cancel</button>
        <button class="btn btn-primary" on:click={closeModal}>Confirm</button>
      </div>
    </div>
  </div>
{/if}

<!-- Notification -->
{#if notificationVisible}
  <div class="notification">
    <span class="notification-icon">🎉</span>
    <span class="notification-text">Button clicked!</span>
  </div>
{/if}

<style>
  .components-page {
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
  
  /* Tabs Navigation */
  .tabs-nav {
    display: flex;
    background-color: var(--surface-color);
    border-radius: var(--radius);
    padding: 0.25rem;
    margin-bottom: 2rem;
    border: 1px solid var(--border-color);
    overflow-x: auto;
  }
  
  .tab-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: none;
    border: none;
    padding: 0.75rem 1rem;
    border-radius: var(--radius);
    cursor: pointer;
    transition: var(--transition);
    white-space: nowrap;
    color: var(--text-secondary);
    font-weight: 500;
  }
  
  .tab-button.active,
  .tab-button:hover {
    background-color: var(--primary-color);
    color: white;
  }
  
  .tab-icon {
    font-size: 1.1rem;
  }
  
  /* Component Sections */
  .component-section {
    background-color: var(--surface-color);
    border: 1px solid var(--border-color);
    border-radius: var(--radius);
    padding: 2rem;
    margin-bottom: 2rem;
  }
  
  .section-title {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    color: var(--text-primary);
  }
  
  .subsection-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 2rem 0 1rem 0;
    color: var(--text-primary);
  }
  
  /* Button Styles */
  .button-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
  }
  
  .button-row {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    margin-bottom: 2rem;
  }
  
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
  .btn-accent { background-color: var(--accent-color); color: white; }
  .btn-success { background-color: var(--success-color); color: white; }
  .btn-warning { background-color: var(--warning-color); color: white; }
  .btn-error { background-color: var(--error-color); color: white; }
  
  .btn-outline {
    background-color: transparent;
    border: 2px solid var(--primary-color);
    color: var(--primary-color);
  }
  
  .btn-ghost {
    background-color: transparent;
    color: var(--text-primary);
  }
  
  .btn:hover { transform: translateY(-1px); }
  .btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
  .btn.loading { opacity: 0.7; cursor: wait; }
  
  /* Form Styles */
  .form-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
  }
  
  .form-label {
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: var(--text-primary);
  }
  
  .form-input,
  .form-textarea,
  .form-select {
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
  
  /* Controls */
  .controls-group {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .control-item {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .range-slider {
    width: 100%;
    height: 6px;
    border-radius: 3px;
    background: var(--border-color);
    outline: none;
    -webkit-appearance: none;
  }
  
  .range-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--primary-color);
    cursor: pointer;
  }
  
  .switch-label {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    cursor: pointer;
  }
  
  .switch-input {
    display: none;
  }
  
  .switch-slider {
    width: 50px;
    height: 26px;
    background-color: var(--border-color);
    border-radius: 13px;
    position: relative;
    transition: var(--transition);
  }
  
  .switch-slider::before {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 22px;
    height: 22px;
    background-color: white;
    border-radius: 50%;
    transition: var(--transition);
  }
  
  .switch-input:checked + .switch-slider {
    background-color: var(--primary-color);
  }
  
  .switch-input:checked + .switch-slider::before {
    transform: translateX(24px);
  }
  
  /* Navigation Components */
  .breadcrumbs {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 2rem;
    padding: 1rem;
    background-color: var(--background-color);
    border-radius: var(--radius);
  }
  
  .breadcrumb-item {
    color: var(--accent-color);
    text-decoration: none;
    transition: var(--transition);
  }
  
  .breadcrumb-item:hover {
    color: var(--primary-color);
  }
  
  .breadcrumb-current {
    color: var(--text-secondary);
  }
  
  .breadcrumb-separator {
    color: var(--text-secondary);
  }
  
  .pagination {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 2rem;
  }
  
  .pagination-btn {
    padding: 0.5rem 0.75rem;
    border: 1px solid var(--border-color);
    background-color: var(--surface-color);
    color: var(--text-primary);
    cursor: pointer;
    border-radius: var(--radius);
    transition: var(--transition);
  }
  
  .pagination-btn:hover:not(:disabled) {
    background-color: var(--primary-color);
    color: white;
  }
  
  .pagination-btn.active {
    background-color: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
  }
  
  .pagination-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .pagination-dots {
    color: var(--text-secondary);
    padding: 0 0.5rem;
  }
  
  /* Dropdown */
  .dropdown {
    position: relative;
    display: inline-block;
    margin-bottom: 2rem;
  }
  
  .dropdown-trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    border: 1px solid var(--border-color);
    background-color: var(--surface-color);
    color: var(--text-primary);
    cursor: pointer;
    border-radius: var(--radius);
    min-width: 150px;
    transition: var(--transition);
  }
  
  .dropdown-trigger:hover {
    border-color: var(--primary-color);
  }
  
  .dropdown-arrow {
    transition: transform 0.3s ease;
  }
  
  .dropdown.open .dropdown-arrow {
    transform: rotate(180deg);
  }
  
  .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: var(--surface-color);
    border: 1px solid var(--border-color);
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    z-index: 10;
    margin-top: 0.25rem;
  }
  
  .dropdown-item {
    display: block;
    width: 100%;
    padding: 0.75rem 1rem;
    border: none;
    background: none;
    color: var(--text-primary);
    text-align: left;
    cursor: pointer;
    transition: var(--transition);
  }
  
  .dropdown-item:hover {
    background-color: var(--background-color);
  }
  
  /* Alerts */
  .alerts-grid {
    display: grid;
    gap: 1rem;
    margin-bottom: 2rem;
  }
  
  .alert {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    padding: 1rem;
    border-radius: var(--radius);
    border-left: 4px solid;
  }
  
  .alert-info { background-color: rgba(64, 179, 255, 0.1); border-left-color: var(--accent-color); }
  .alert-success { background-color: rgba(34, 197, 94, 0.1); border-left-color: var(--success-color); }
  .alert-warning { background-color: rgba(245, 158, 11, 0.1); border-left-color: var(--warning-color); }
  .alert-error { background-color: rgba(239, 68, 68, 0.1); border-left-color: var(--error-color); }
  
  .alert-icon {
    font-size: 1.25rem;
  }
  
  .alert-content {
    flex: 1;
  }
  
  /* Progress */
  .progress-examples {
    display: grid;
    gap: 2rem;
    margin-bottom: 2rem;
  }
  
  .progress-item {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .progress-bar {
    width: 100%;
    height: 8px;
    background-color: var(--border-color);
    border-radius: 4px;
    overflow: hidden;
  }
  
  .progress-fill {
    height: 100%;
    background-color: var(--primary-color);
    transition: width 0.3s ease;
  }
  
  .progress-text {
    font-size: 0.875rem;
    color: var(--text-secondary);
  }
  
  .spinner {
    width: 32px;
    height: 32px;
    border: 3px solid var(--border-color);
    border-top: 3px solid var(--primary-color);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  /* Cards */
  .cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }
  
  .card {
    border: 1px solid var(--border-color);
    border-radius: var(--radius);
    overflow: hidden;
    background-color: var(--background-color);
  }
  
  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    border-bottom: 1px solid var(--border-color);
    background-color: var(--surface-color);
  }
  
  .card-title {
    margin: 0;
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--text-primary);
  }
  
  .card-badge {
    background-color: var(--primary-color);
    color: white;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 600;
  }
  
  .card-content {
    padding: 1rem;
  }
  
  .card-footer {
    padding: 1rem;
    border-top: 1px solid var(--border-color);
    background-color: var(--surface-color);
  }
  
  /* Accordion */
  .accordion {
    border: 1px solid var(--border-color);
    border-radius: var(--radius);
    overflow: hidden;
  }
  
  .accordion-item:not(:last-child) {
    border-bottom: 1px solid var(--border-color);
  }
  
  .accordion-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 1rem;
    background-color: var(--surface-color);
    border: none;
    color: var(--text-primary);
    font-weight: 600;
    cursor: pointer;
    transition: var(--transition);
  }
  
  .accordion-header:hover {
    background-color: var(--background-color);
  }
  
  .accordion-icon {
    transition: transform 0.3s ease;
  }
  
  .accordion-icon.rotated {
    transform: rotate(180deg);
  }
  
  .accordion-content {
    padding: 1rem;
    background-color: var(--background-color);
    animation: slideDown 0.3s ease;
  }
  
  @keyframes slideDown {
    from {
      opacity: 0;
      max-height: 0;
    }
    to {
      opacity: 1;
      max-height: 200px;
    }
  }
  
  /* Modal */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    animation: fadeIn 0.3s ease;
  }
  
  .modal-content {
    background-color: var(--surface-color);
    border-radius: var(--radius);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    max-width: 500px;
    width: 90%;
    max-height: 90%;
    overflow: hidden;
    animation: slideUp 0.3s ease;
  }
  
  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    border-bottom: 1px solid var(--border-color);
  }
  
  .modal-title {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--text-primary);
  }
  
  .modal-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--text-secondary);
    transition: var(--transition);
  }
  
  .modal-close:hover {
    color: var(--text-primary);
  }
  
  .modal-body {
    padding: 1rem;
  }
  
  .modal-footer {
    display: flex;
    gap: 0.5rem;
    justify-content: flex-end;
    padding: 1rem;
    border-top: 1px solid var(--border-color);
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  /* Notification */
  .notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: var(--success-color);
    color: white;
    padding: 1rem;
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    z-index: 1001;
    animation: slideInRight 0.3s ease;
  }
  
  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(100%);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .tabs-nav {
      padding: 0.125rem;
    }
    
    .tab-button {
      padding: 0.5rem 0.75rem;
      font-size: 0.875rem;
    }
    
    .tab-label {
      display: none;
    }
    
    .button-grid {
      grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    }
    
    .form-grid {
      grid-template-columns: 1fr;
    }
    
    .cards-grid {
      grid-template-columns: 1fr;
    }
    
    .modal-content {
      margin: 1rem;
      width: calc(100% - 2rem);
    }
  }
</style>