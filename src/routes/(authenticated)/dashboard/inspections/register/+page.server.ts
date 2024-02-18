import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';
import { fetchInspections, createInspection } from '$lib/actions/inspections';
import { TEMPORARY_REDIRECT_STATUS, MISSING_SECURITY_HEADER_STATUS } from '$lib/shared';
import { fetchCustomFormsByTenant } from '$lib/actions/custom-forms';

const createInspectionSchema = z.object({
	form_id: z.number()
});

const verifySession = async (locals: any) => {
	const session = await locals.getSession();

	if (!session?.user) throw redirect(TEMPORARY_REDIRECT_STATUS, '/signin');

	return session;
};

export const load: PageServerLoad = async ({ locals }) => {
	const session = await verifySession(locals);

	const form = await superValidate(createInspectionSchema);

	// this code is for testing purposes only
	const tenant = session?.user.tenantUsers[0].tenant;

	const inspections = await fetchInspections({ tenantId: tenant.id });

	const customForms = await fetchCustomFormsByTenant({ tenantId: tenant.id });

	const listCustomForm = customForms.map((el) => ({ value: el.id, name: el.name }));

	return { form, inspections, listCustomForm };
};

export const actions = {
	default: async ({ request, locals }) => {
		const session = await verifySession(locals);

		const form = await superValidate(request, createInspectionSchema);

		if (!form.valid) {
			return fail(MISSING_SECURITY_HEADER_STATUS, { form });
		}

		// this code is for testing purposes only
		const tenant = session?.user.tenantUsers[0].tenant;

		await createInspection({
			tenantId: tenant.id,
			formId: form.data.form_id
		});
	}
} satisfies Actions;
