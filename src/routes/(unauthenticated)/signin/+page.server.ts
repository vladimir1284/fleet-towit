import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types.js';
import { UserSchema } from '$lib/zod/index.js';

const crudSchema = UserSchema.extend({
	id: UserSchema.shape.id.optional()
});

export const load = (async () => {
	// Server API:
	const form = await superValidate(UserSchema);
	// Unless you throw, always return { form } in load and form actions.
	return { form: form };
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, crudSchema);
		if (!form.valid) {
			console.log('validation fail');
			// Again, return { form } and things will just work.
			return fail(400, { form });
		}
		console.log('validation passed');
		form.valid = true;
		return { form };
	}
};
