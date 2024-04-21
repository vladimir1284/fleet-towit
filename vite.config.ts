// import { sentrySvelteKit } from '@sentry/sveltekit';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [
		// sentrySvelteKit({
		// 	sourceMapsUploadOptions: {
		// 		org: 'towit',
		// 		project: 'javascript-sveltekit'
		// 	}
		// }),
		sveltekit()
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}', 'tests/**/*.{test,spec}.{js,ts}']
	},
	preview: {
		port: 5173
	},
	resolve: {
		alias: {
			'@killbill': '/src/lib/killbill',
			".prisma/client/index-browser": "./node_modules/.prisma/client/index-browser.js"
		}
	}
});
