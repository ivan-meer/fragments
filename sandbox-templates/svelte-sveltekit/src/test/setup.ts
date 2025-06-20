/**
 * 🧪 Vitest Test Setup
 * Global test configuration for SvelteKit testing
 */

import { vi } from 'vitest';
import '@testing-library/jest-dom';

// Mock browser environment
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
global.localStorage = localStorageMock;

// Mock sessionStorage
const sessionStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
global.sessionStorage = sessionStorageMock;

// Mock navigator.clipboard
Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn().mockImplementation(() => Promise.resolve()),
    readText: vi.fn().mockImplementation(() => Promise.resolve('')),
  },
});

// Mock fetch
global.fetch = vi.fn();

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  log: vi.fn(),
  warn: vi.fn(),
  error: vi.fn(),
};

// Setup fake timers for consistent testing
vi.useFakeTimers();

// Global test utilities
export const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

export const mockFetch = (response: any, ok = true) => {
  (global.fetch as any).mockResolvedValueOnce({
    ok,
    json: async () => response,
    text: async () => JSON.stringify(response),
    status: ok ? 200 : 400,
  });
};

export const waitFor = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};