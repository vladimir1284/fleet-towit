import { superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types.js';
import { z } from 'zod';

const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().optional()
});

export const load = (async () => {
	const form = await superValidate(zod(loginSchema));
	return { form: form };
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(loginSchema));
		if (!form.valid) {
			console.log('validation fail');
			return fail(400, { form });
		}
		console.log('validation passed');
		form.valid = true;
		return { form };
	}
};
