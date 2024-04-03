import { createCustomForm, fetchCustomFormsByTenant } from '$lib/actions/custom-forms';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';
import { TEMPORARY_REDIRECT_STATUS, MISSING_SECURITY_HEADER_STATUS } from '$lib/shared';

const createFormSchema = z.object({
	form_name: z.string()
});

const verifySession = async (locals: unknown) => {
	//@ts-expect-error Error type on locals
	const session = await locals.getSession();

	if (!session?.user) throw redirect(TEMPORARY_REDIRECT_STATUS, '/signin');

	return session;
};

export const load: PageServerLoad = async ({ locals }) => {
	const session = await verifySession(locals);

	const form = await superValidate(zod(createFormSchema));

	// this code is for testing purposes only
	const tenant = session?.user.tenantUsers[0].tenant;

	const customForms = await fetchCustomFormsByTenant({ tenantId: tenant.id });

	return { form, customForms };
};

export const actions = {
	default: async ({ request, url, locals }) => {
		const session = await verifySession(locals);

		const form = await superValidate(request, zod(createFormSchema));

		if (!form.valid) {
			return fail(MISSING_SECURITY_HEADER_STATUS, { form });
		}

		// this code is for testing purposes only
		const tenant = session?.user.tenantUsers[0].tenant;

		const newForm = await createCustomForm({
			tenantId: tenant.id,
			name: form.data.form_name
		});

		if (newForm) {
			redirect(TEMPORARY_REDIRECT_STATUS, `${url.pathname}/${newForm.id}`);
		}
	}
} satisfies Actions;
