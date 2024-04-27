// import { sentrySvelteKit } from '@sentry/sveltekit';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { createRequire } from 'module';
const prismaClientPath = createRequire(import.meta.url).resolve('@prisma/client');

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
			'@killbill': '/src/killbill',
			'.prisma/client/index-browser': prismaClientPath.replace(
				'.prisma/client/index-browser.js',
				'@prisma/client/default.js'
			)
		}
	}
});
