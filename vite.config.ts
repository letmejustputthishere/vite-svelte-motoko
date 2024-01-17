import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import environment from 'vite-plugin-environment';

export default defineConfig({
	plugins: [sveltekit(),
    environment('all', { prefix: 'CANISTER_' }),
    environment('all', { prefix: 'DFX_' }),
    environment({ BACKEND_CANISTER_ID: '' }),
	],
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:4943',
        changeOrigin: true,
      },
    },
  },
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
