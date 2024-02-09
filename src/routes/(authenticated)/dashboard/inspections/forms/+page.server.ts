import { createNewCustomForm, fetchCustomFormsByTenantUser } from '$lib/actions/custom-forms';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';
import type { Actions, PageServerLoad } from './$types';
import { TEMPORARY_REDIRECT_STATUS, MISSING_SECURITY_HEADER_STATUS } from '$lib/shared/helpers';

const createFormSchema = z.object({
	form_name: z.string()
});

const verifySession = async (locals: any) => {
	const session = await locals.getSession();

	if (!session?.user) throw redirect(TEMPORARY_REDIRECT_STATUS, '/signin');

	return session;
};

export const load: PageServerLoad = async ({ locals }) => {
	const session = await verifySession(locals);

	const form = await superValidate(createFormSchema);

	const customForms = await fetchCustomFormsByTenantUser({ userId: session.user.id });

	return { form, customForms };
};

export const actions = {
	default: async ({ request, url, locals }) => {
		const session = await verifySession(locals);

		const form = await superValidate(request, createFormSchema);

		if (!form.valid) {
			return fail(MISSING_SECURITY_HEADER_STATUS, { form });
		}

		const newForm = await createNewCustomForm({
			userId: session.user.id,
			name: form.data.form_name
		});

		if (newForm) {
			throw redirect(TEMPORARY_REDIRECT_STATUS, `${url.pathname}/${newForm.id}`);
		}
	}
} satisfies Actions;
