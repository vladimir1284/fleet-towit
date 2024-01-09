import { z } from 'zod';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';

import { ClientSchema } from '$lib/zod';

export const load = async () => {
	// Server API:
	const form = await superValidate(ClientSchema);

	// Unless you throw, always return { form } in load and form actions.
	return { form };
};

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, ClientSchema);
		console.log('POST', form);

		// Convenient validation check:
		if (!form.valid) {
			// Again, return { form } and things will just work.
			return fail(400, { form });
		}

		// TODO: Do something with the validated form.data

		// Yep, return { form } here too
		return { form };
	}
};
