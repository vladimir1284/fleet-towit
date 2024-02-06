import { redirect , fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
import { fetchCustomFormsByUser, createNewCustomForm } from '$lib/actions/custom-forms';

// schema
const createFormSchema = z.object({
	form_name: z.string()
});

export async function load({ url, locals }) {
	// check user session
	const session = await locals.getSession();
	if (!session?.user) throw redirect(307, '/signin');

	const form = await superValidate(createFormSchema);

	// retrieve form
	const customForms = await fetchCustomFormsByUser({ userId: session.user.id });

	return { form, customForms };
}

export const actions = {
	default: async ({ request, url, locals }) => {
		const session = await locals.getSession();

		if (!session?.user) throw redirect(307, '/signin');

		const form = await superValidate(request, createFormSchema);

		if (!form.valid) {
			return fail(400, { form });
		}

		const newForm = await createNewCustomForm({
			userId: session.user.id,
			name: form.data.form_name
		});

		throw redirect(301, `${url.pathname}/${newForm.id}`);
	}
} satisfies Actions;
