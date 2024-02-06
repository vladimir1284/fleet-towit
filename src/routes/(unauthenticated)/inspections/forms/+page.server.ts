import { createNewCustomForm, fetchCustomFormsByTenantUser } from '$lib/actions/custom-forms';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';
import type { Actions, PageServerLoad } from './$types';

const createFormSchema = z.object({
	form_name: z.string()
});

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.getSession();

	if (!session?.user) throw redirect(307, '/signin');

	const form = await superValidate(createFormSchema);

	const customForms = await fetchCustomFormsByTenantUser({ userId: session.user.id });

	return { form, customForms };
};

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

		if (newForm) {
			throw redirect(301, `${url.pathname}/${newForm.id}`);
		}
	}
} satisfies Actions;
