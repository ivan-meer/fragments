/**
 * 🧪 Example Test Suite
 * Sample tests demonstrating SvelteKit testing patterns
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import { writable } from 'svelte/store';

// Mock component for testing
const MockComponent = `
<script>
  import { createEventDispatcher } from 'svelte';
  
  export let count = 0;
  export let name = 'World';
  
  const dispatch = createEventDispatcher();
  
  function increment() {
    count += 1;
    dispatch('increment', { count });
  }
  
  $: greeting = \`Hello, \${name}!\`;
</script>

<div data-testid="mock-component">
  <h1 data-testid="greeting">{greeting}</h1>
  <p data-testid="count">Count: {count}</p>
  <button data-testid="increment" on:click={increment}>
    Increment
  </button>
</div>
`;

describe('SvelteKit Testing Examples', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Component Testing', () => {
    it('renders with default props', () => {
      render(MockComponent);
      
      expect(screen.getByTestId('greeting')).toHaveTextContent('Hello, World!');
      expect(screen.getByTestId('count')).toHaveTextContent('Count: 0');
    });

    it('renders with custom props', () => {
      render(MockComponent, { 
        props: { 
          count: 5, 
          name: 'Svelte' 
        } 
      });
      
      expect(screen.getByTestId('greeting')).toHaveTextContent('Hello, Svelte!');
      expect(screen.getByTestId('count')).toHaveTextContent('Count: 5');
    });

    it('handles button click and events', async () => {
      const mockHandler = vi.fn();
      const { component } = render(MockComponent, { 
        props: { count: 0 } 
      });
      
      component.$on('increment', mockHandler);
      
      const button = screen.getByTestId('increment');
      await fireEvent.click(button);
      
      expect(screen.getByTestId('count')).toHaveTextContent('Count: 1');
      expect(mockHandler).toHaveBeenCalledWith(
        expect.objectContaining({
          detail: { count: 1 }
        })
      );
    });
  });

  describe('Store Testing', () => {
    it('works with writable stores', () => {
      const store = writable(0);
      
      expect(store).toBeDefined();
      
      let value: number;
      const unsubscribe = store.subscribe(val => value = val);
      
      expect(value!).toBe(0);
      
      store.set(5);
      expect(value!).toBe(5);
      
      store.update(n => n + 1);
      expect(value!).toBe(6);
      
      unsubscribe();
    });

    it('handles store updates', () => {
      const store = writable({ count: 0, name: 'Test' });
      const values: any[] = [];
      
      const unsubscribe = store.subscribe(val => values.push(val));
      
      store.update(state => ({ ...state, count: 1 }));
      store.update(state => ({ ...state, name: 'Updated' }));
      
      expect(values).toHaveLength(3); // Initial + 2 updates
      expect(values[0]).toEqual({ count: 0, name: 'Test' });
      expect(values[1]).toEqual({ count: 1, name: 'Test' });
      expect(values[2]).toEqual({ count: 1, name: 'Updated' });
      
      unsubscribe();
    });
  });

  describe('Async Testing', () => {
    it('handles promises', async () => {
      const asyncFunction = vi.fn().mockResolvedValue('success');
      
      const result = await asyncFunction();
      
      expect(result).toBe('success');
      expect(asyncFunction).toHaveBeenCalledTimes(1);
    });

    it('handles rejected promises', async () => {
      const asyncFunction = vi.fn().mockRejectedValue(new Error('failed'));
      
      await expect(asyncFunction()).rejects.toThrow('failed');
    });

    it('handles timeouts', async () => {
      const slowFunction = () => new Promise(resolve => 
        setTimeout(() => resolve('done'), 100)
      );
      
      const result = await slowFunction();
      expect(result).toBe('done');
    });
  });

  describe('DOM Testing', () => {
    it('checks element visibility', () => {
      render(MockComponent);
      
      const greeting = screen.getByTestId('greeting');
      expect(greeting).toBeVisible();
      expect(greeting).toBeInTheDocument();
    });

    it('checks element attributes', () => {
      render(MockComponent);
      
      const button = screen.getByTestId('increment');
      expect(button).toHaveAttribute('data-testid', 'increment');
      expect(button.tagName).toBe('BUTTON');
    });

    it('checks CSS classes', () => {
      const ComponentWithClass = `
        <div class="test-class active" data-testid="styled-div">
          Styled content
        </div>
      `;
      
      render(ComponentWithClass);
      
      const div = screen.getByTestId('styled-div');
      expect(div).toHaveClass('test-class');
      expect(div).toHaveClass('active');
      expect(div).toHaveClass('test-class', 'active');
    });
  });

  describe('Form Testing', () => {
    it('handles form inputs', async () => {
      const FormComponent = `
        <script>
          let email = '';
          let message = '';
          
          function handleSubmit() {
            console.log('Form submitted:', { email, message });
          }
        </script>
        
        <form on:submit|preventDefault={handleSubmit} data-testid="form">
          <input 
            type="email" 
            bind:value={email} 
            data-testid="email-input"
            placeholder="Enter email"
          />
          <textarea 
            bind:value={message} 
            data-testid="message-input"
            placeholder="Enter message"
          ></textarea>
          <button type="submit" data-testid="submit-button">Submit</button>
        </form>
      `;
      
      render(FormComponent);
      
      const emailInput = screen.getByTestId('email-input') as HTMLInputElement;
      const messageInput = screen.getByTestId('message-input') as HTMLTextAreaElement;
      const submitButton = screen.getByTestId('submit-button');
      
      await fireEvent.input(emailInput, { target: { value: 'test@example.com' } });
      await fireEvent.input(messageInput, { target: { value: 'Test message' } });
      
      expect(emailInput.value).toBe('test@example.com');
      expect(messageInput.value).toBe('Test message');
      
      await fireEvent.click(submitButton);
      
      // Form submission would be handled by the component
      expect(submitButton).toBeInTheDocument();
    });
  });

  describe('Accessibility Testing', () => {
    it('checks ARIA attributes', () => {
      const AccessibleComponent = `
        <button 
          aria-label="Close dialog"
          aria-expanded="false"
          data-testid="accessible-button"
        >
          ×
        </button>
      `;
      
      render(AccessibleComponent);
      
      const button = screen.getByTestId('accessible-button');
      expect(button).toHaveAttribute('aria-label', 'Close dialog');
      expect(button).toHaveAttribute('aria-expanded', 'false');
    });

    it('checks semantic HTML', () => {
      const SemanticComponent = `
        <main data-testid="main-content">
          <header data-testid="page-header">
            <h1>Page Title</h1>
          </header>
          <section data-testid="content-section">
            <p>Content goes here</p>
          </section>
        </main>
      `;
      
      render(SemanticComponent);
      
      expect(screen.getByTestId('main-content').tagName).toBe('MAIN');
      expect(screen.getByTestId('page-header').tagName).toBe('HEADER');
      expect(screen.getByTestId('content-section').tagName).toBe('SECTION');
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    it('handles component errors gracefully', () => {
      const ErrorComponent = `
        <script>
          export let shouldError = false;
          
          if (shouldError) {
            throw new Error('Component error');
          }
        </script>
        
        <div data-testid="error-component">
          {shouldError ? 'This should not render' : 'Normal content'}
        </div>
      `;
      
      // Test normal rendering
      render(ErrorComponent, { props: { shouldError: false } });
      expect(screen.getByTestId('error-component')).toHaveTextContent('Normal content');
      
      // Error case would need error boundary testing in a real app
    });
  });
});

describe('Utility Functions', () => {
  it('formats numbers correctly', () => {
    const formatNumber = (num: number) => {
      return new Intl.NumberFormat('en-US').format(num);
    };
    
    expect(formatNumber(1000)).toBe('1,000');
    expect(formatNumber(1234567)).toBe('1,234,567');
  });

  it('validates email addresses', () => {
    const isValidEmail = (email: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
    
    expect(isValidEmail('test@example.com')).toBe(true);
    expect(isValidEmail('invalid.email')).toBe(false);
    expect(isValidEmail('user@domain')).toBe(false);
  });

  it('debounces function calls', async () => {
    const debounce = (func: Function, delay: number) => {
      let timeoutId: NodeJS.Timeout;
      return (...args: any[]) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(null, args), delay);
      };
    };
    
    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 100);
    
    debouncedFn('call1');
    debouncedFn('call2');
    debouncedFn('call3');
    
    expect(mockFn).not.toHaveBeenCalled();
    
    await vi.runAllTimersAsync();
    
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith('call3');
  });
});