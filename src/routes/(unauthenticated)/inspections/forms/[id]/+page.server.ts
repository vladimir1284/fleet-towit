import {
	addFieldToCustomFrom,
	deleteCustomForm,
	fetchOneFormById
} from '$lib/actions/custom-forms';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';
import type { Actions } from './$types';
// import { ExclamationCircleOutline , TrashBinOutline , PenOutline} from 'flowbite-svelte-icons';

const addCardSchema = z.object({
	card_name: z.string(),
	form_id: z.number(),
	card_type: z.enum(['text', 'number'])
});

const deleteFormSchema = z.object({
	form_id: z.number()
});

// redirect to form dashboard
const redirect_to_dashboard = () => redirect(301, '/inspections/forms');

export async function load({ params, locals }) {
	const session = await locals.getSession();

	if (!session?.user) throw redirect(307, '/signin');

	const formId = Number(params.id);

	if (formId) {
		const customForm = await fetchOneFormById(session.user.id, formId);

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
		const session = await locals.getSession();

		if (!session?.user) throw redirect(307, '/signin');

		const form = await superValidate(request, addCardSchema);

		if (!form.valid) {
			return fail(400, { form });
		}

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
		const session = await locals.getSession();

		if (!session?.user) throw redirect(307, '/signin');

		const form = await superValidate(request, deleteFormSchema);

		if (!form.valid) {
			return fail(400, { form });
		}

		await deleteCustomForm(form.data.form_id);

		redirect_to_dashboard();
	}
} satisfies Actions;
