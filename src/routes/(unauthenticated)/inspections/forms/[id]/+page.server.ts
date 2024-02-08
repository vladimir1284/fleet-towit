import { redirect, fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
import {
	fetchOneFormByUser,
	deleteCustomForm,
	addFieldToCustomFrom
} from '$lib/actions/custom-forms';

// schema to add new field
const addCardSchema = z.object({
	card_name: z.string(),
	form_id: z.number(),
	card_type: z.enum(['text', 'number'])
});

// delete form schema
const deleteFormSchema = z.object({
	form_id: z.number()
});

// redirect to form dashboard
const redirect_to_dashboard = () => redirect(301, '/inspections/forms');

export async function load({ params, locals }) {
	// check user session
	const session = await locals.getSession();
	if (!session?.user) throw redirect(307, '/signin');

	const formId = Number(params.id);

	if (formId) {
		const customForm = await fetchOneFormByUser(session.user.id, formId);

		// if form not exist
		if (!customForm) redirect_to_dashboard();

		const form = await superValidate(addCardSchema);

		return { customForm, form };
	} else redirect_to_dashboard();
}

export const actions = {
	/*
	 * action to add field
	 */
	addField: async ({ request, url, locals }) => {
		// check user session
		const session = await locals.getSession();
		if (!session?.user) throw redirect(307, '/signin');

		const form = await superValidate(request, addCardSchema);

		if (!form.valid) {
			return fail(400, { form });
		}

		// add field to form
		await addFieldToCustomFrom({
			name: form.data.card_name,
			formId: form.data.form_id,
			cardType: form.data.card_type
		});

		return { form };
	},

	/*
	 * action to delete form
	 */
	deleteForm: async ({ request, url, locals }) => {
		// check user session
		const session = await locals.getSession();
		if (!session?.user) throw redirect(307, '/signin');

		const form = await superValidate(request, deleteFormSchema);

		if (!form.valid) {
			return fail(400, { form });
		}

		// delete form
		await deleteCustomForm(form.data.form_id);

		redirect_to_dashboard();
	}
} satisfies Actions;
