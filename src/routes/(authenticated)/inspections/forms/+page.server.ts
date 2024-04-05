import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import { createCustomForm, fetchCustomFormsByTenant } from '$lib/actions/custom-forms';
import { TEMPORARY_REDIRECT_STATUS, MISSING_SECURITY_HEADER_STATUS } from '$lib/shared';

const createFormSchema = z.object({
	form_name: z.string()
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const verifySession = async (locals: any) => {
	const session = await locals.getSession();
	if (!session?.user) throw redirect(TEMPORARY_REDIRECT_STATUS, '/signin');
	return session;
};

export const load: PageServerLoad = async ({ locals, url }) => {
	const session = await verifySession(locals);

	const form = await superValidate(zod(createFormSchema));

	const tenantUserId = session.user.defaultTenantUser.tenantId;

	const results = await fetchCustomFormsByTenant({
		tenantId: tenantUserId,
		page_number: Number(url.searchParams.get('page')) || 1
	});

	const customForms = results.data;

	const pagination = {
		has_next_page: results.has_next_page,
		has_prev_page: results.has_prev_page,
		next_page: results.next_page,
		prev_page: results.prev_page
	};

	return { form, customForms, pagination };
};

export const actions = {
	default: async ({ request, url, locals }) => {
		const session = await verifySession(locals);

		const form = await superValidate(request, zod(createFormSchema));

		if (!form.valid) {
			return fail(MISSING_SECURITY_HEADER_STATUS, { form });
		}

		const tenantUserId = session.user.defaultTenantUser.tenantId;

		const newForm = await createCustomForm({
			tenantId: tenantUserId,
			name: form.data.form_name
		});

		if (newForm) {
			redirect(TEMPORARY_REDIRECT_STATUS, `${url.pathname}/${newForm.id}`);
		}
	}
} satisfies Actions;
