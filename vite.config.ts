import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import environment from 'vite-plugin-environment';

export default defineConfig({
	plugins: [
		sveltekit(),
		// this is needed to surface the environment variables to your app
		// https://vitejs.dev/guide/env-and-mode
		// https://www.npmjs.com/package/vite-plugin-environment
		environment('all', { prefix: 'CANISTER_' }),
		environment('all', { prefix: 'DFX_' })
	],
	optimizeDeps: {
		// he global object varies between environments (like window in browsers, global in Node.js), leading to compatibility issues.
		// By defining global as globalThis, developers unify access to the global scope, as globalThis is a standard and
		// environment-agnostic way to refer to the global object/
		esbuildOptions: {
			define: {
				global: 'globalThis'
			}
		}
	},
	server: {
		// this is needed to redirect api calls to the local replica locally
		proxy: {
			'/api': {
				target: 'http://127.0.0.1:4943',
				changeOrigin: true
			}
		}
	},
	test: {
		include: ['tests/**/*.{test,spec}.{js,ts}']
	}
});
