/** @type { import("eslint").Linter.Config } */
module.exports = {
	root: true,
	extends: [
		'eslint:recommended',
		'@typescript-eslint/recommended',
		'prettier'
	],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
		extraFileExtensions: ['.svelte']
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	},
	overrides: [
		{
			files: ['*.svelte'],
			processor: 'svelte3/svelte3',
			rules: {
				// Disable some rules that don't work well with Svelte
				'@typescript-eslint/no-unused-vars': 'off',
				'no-undef': 'off'
			}
		}
	],
	settings: {
		'svelte3/typescript': () => require('typescript')
	},
	rules: {
		// Customize rules here
		'@typescript-eslint/no-unused-vars': ['error', { 
			argsIgnorePattern: '^_',
			varsIgnorePattern: '^_' 
		}],
		'@typescript-eslint/no-explicit-any': 'warn',
		'prefer-const': 'error',
		'no-var': 'error',
		'no-console': 'warn'
	}
};