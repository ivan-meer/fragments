import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		
		// Configure the development server
		version: {
			pollInterval: 300
		},
		
		// Configure CSP for security
		csp: {
			mode: 'auto',
			directives: {
				'script-src': ['self', 'unsafe-inline'],
				'style-src': ['self', 'unsafe-inline'],
				'object-src': ['none'],
				'base-uri': ['self']
			}
		},
		
		// Configure service worker
		serviceWorker: {
			register: false
		},
		
		// Configure app paths
		paths: {
			base: '',
			assets: ''
		}
	}
};

export default config;