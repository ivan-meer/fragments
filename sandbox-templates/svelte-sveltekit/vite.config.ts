import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	
	// Development server configuration
	server: {
		host: '0.0.0.0',
		port: 5173,
		strictPort: true,
		hmr: {
			port: 24678,
			host: '0.0.0.0'
		}
	},
	
	// Preview server configuration
	preview: {
		host: '0.0.0.0',
		port: 4173,
		strictPort: true
	},
	
	// Build configuration
	build: {
		target: 'esnext',
		minify: 'esbuild',
		sourcemap: true,
		rollupOptions: {
			output: {
				manualChunks: {
					vendor: ['svelte']
				}
			}
		}
	},
	
	// Optimization
	optimizeDeps: {
		include: ['svelte']
	},
	
	// Test configuration
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
		environment: 'jsdom',
		setupFiles: ['src/test/setup.ts'],
		coverage: {
			reporter: ['text', 'json', 'html'],
			exclude: [
				'node_modules/',
				'src/test/',
				'**/*.d.ts',
				'**/*.config.*'
			]
		}
	},
	
	// Define global constants
	define: {
		__APP_VERSION__: JSON.stringify(process.env.npm_package_version || '1.0.0'),
		__BUILD_TIME__: JSON.stringify(new Date().toISOString())
	}
});