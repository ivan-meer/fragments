<!--
  ⚡ Root Layout Component
  Global layout with navigation and theming
-->

<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { writable } from 'svelte/store';
  
  // Theme management
  export const isDarkMode = writable(false);
  
  let mounted = false;
  
  onMount(() => {
    mounted = true;
    // Initialize theme from localStorage or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const shouldUseDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    isDarkMode.set(shouldUseDark);
    
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        isDarkMode.set(e.matches);
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  });
  
  // Toggle theme function
  function toggleTheme() {
    isDarkMode.update(dark => {
      const newMode = !dark;
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      return newMode;
    });
  }
  
  // Navigation items
  const navItems = [
    { href: '/', label: 'Home', icon: '🏠' },
    { href: '/components', label: 'Components', icon: '🧩' },
    { href: '/examples', label: 'Examples', icon: '🚀' },
    { href: '/about', label: 'About', icon: 'ℹ️' }
  ];
  
  $: currentPath = $page.url.pathname;
</script>

<svelte:head>
  <meta name="theme-color" content={$isDarkMode ? '#1a1a1a' : '#ffffff'} />
</svelte:head>

<div class="app" class:dark={$isDarkMode}>
  <!-- Navigation Header -->
  <nav class="navbar">
    <div class="nav-container">
      <!-- Logo -->
      <a href="/" class="logo">
        <span class="logo-icon">⚡</span>
        <span class="logo-text">E2B SvelteKit</span>
      </a>
      
      <!-- Navigation Links -->
      <ul class="nav-links">
        {#each navItems as item}
          <li>
            <a 
              href={item.href} 
              class="nav-link"
              class:active={currentPath === item.href}
              data-sveltekit-preload-data="hover"
            >
              <span class="nav-icon">{item.icon}</span>
              <span class="nav-label">{item.label}</span>
            </a>
          </li>
        {/each}
      </ul>
      
      <!-- Theme Toggle -->
      {#if mounted}
        <button class="theme-toggle" on:click={toggleTheme} aria-label="Toggle theme">
          <span class="theme-icon">
            {$isDarkMode ? '☀️' : '🌙'}
          </span>
        </button>
      {/if}
    </div>
  </nav>
  
  <!-- Main Content -->
  <main class="main-content">
    <slot />
  </main>
  
  <!-- Footer -->
  <footer class="footer">
    <div class="footer-container">
      <p class="footer-text">
        Built with ❤️ using <strong>SvelteKit</strong> & <strong>E2B Fragments</strong>
      </p>
      <div class="footer-links">
        <a href="https://kit.svelte.dev" target="_blank" rel="noopener noreferrer">
          SvelteKit Docs
        </a>
        <a href="https://e2b.dev/docs" target="_blank" rel="noopener noreferrer">
          E2B Docs
        </a>
      </div>
    </div>
  </footer>
</div>

<style>
  /* Global app styles */
  .app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: var(--background-color);
    color: var(--text-primary);
    transition: var(--transition);
  }
  
  /* Navigation Styles */
  .navbar {
    background-color: var(--surface-color);
    border-bottom: 1px solid var(--border-color);
    box-shadow: var(--shadow);
    position: sticky;
    top: 0;
    z-index: 100;
  }
  
  .nav-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none;
    color: var(--primary-color);
    font-weight: 700;
    font-size: 1.25rem;
  }
  
  .logo-icon {
    font-size: 1.5rem;
  }
  
  .nav-links {
    display: flex;
    list-style: none;
    gap: 2rem;
    margin: 0;
    padding: 0;
  }
  
  .nav-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none;
    color: var(--text-secondary);
    padding: 0.5rem 1rem;
    border-radius: var(--radius);
    transition: var(--transition);
    font-weight: 500;
  }
  
  .nav-link:hover,
  .nav-link.active {
    color: var(--primary-color);
    background-color: rgba(255, 62, 0, 0.1);
  }
  
  .nav-icon {
    font-size: 1.1rem;
  }
  
  .theme-toggle {
    background: none;
    border: 1px solid var(--border-color);
    border-radius: var(--radius);
    padding: 0.5rem;
    cursor: pointer;
    font-size: 1.25rem;
    transition: var(--transition);
    background-color: var(--surface-color);
  }
  
  .theme-toggle:hover {
    border-color: var(--primary-color);
    transform: scale(1.05);
  }
  
  /* Main Content */
  .main-content {
    flex: 1;
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
    width: 100%;
  }
  
  /* Footer */
  .footer {
    background-color: var(--surface-color);
    border-top: 1px solid var(--border-color);
    margin-top: auto;
  }
  
  .footer-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1.5rem 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
  }
  
  .footer-text {
    color: var(--text-secondary);
    margin: 0;
  }
  
  .footer-links {
    display: flex;
    gap: 1rem;
  }
  
  .footer-links a {
    color: var(--accent-color);
    text-decoration: none;
    font-weight: 500;
    transition: var(--transition);
  }
  
  .footer-links a:hover {
    color: var(--primary-color);
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .nav-container {
      padding: 0 0.5rem;
    }
    
    .nav-links {
      gap: 1rem;
    }
    
    .nav-label {
      display: none;
    }
    
    .nav-link {
      padding: 0.5rem;
    }
    
    .main-content {
      padding: 1rem 0.5rem;
    }
    
    .footer-container {
      flex-direction: column;
      text-align: center;
    }
  }
  
  @media (max-width: 480px) {
    .logo-text {
      display: none;
    }
    
    .nav-links {
      gap: 0.5rem;
    }
  }
</style>