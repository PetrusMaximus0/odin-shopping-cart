import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	test: {
		coverage: {
			provider: 'v8',
		},
		globals: true,
		environment: 'jsdom',
		setupFiles: './tests/setup.js',
		poolOptions: {
			forks: {
				singleFork: true,
			},
		},
	},
});
