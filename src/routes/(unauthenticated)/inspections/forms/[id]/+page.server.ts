import {
	addFieldToCustomFrom,
	deleteCustomForm,
	fetchOneFormById,
	deleteCustomField,
	renameCustomForm,
	updateCustomField
} from '$lib/actions/custom-forms';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';
import type { Actions, PageServerLoad } from './$types';

const addCardSchema = z.object({
	card_name: z.string(),
	form_id: z.number(),
	card_type: z.enum(['text', 'number'])
});

const deleteFormSchema = z.object({
	form_id: z.number()
});

const deleteCardSchema = z.object({
	card_id: z.number(),
	form_id: z.number()
});

const renameFormSchema = z.object({
	new_form_name: z.string(),
	form_id: z.number()
});

const updateCardSchema = z.object({
	card_id: z.number(),
	card_type: z.enum(['text', 'number']),
	new_card_name: z.string()
});

// redirect to form dashboard
const redirect_to_dashboard = () => redirect(301, '/inspections/forms');

export const load: PageServerLoad = async ({ params, locals }) => {
	const session = await locals.getSession();

	if (!session?.user) throw redirect(307, '/signin');

	const formId = Number(params.id);

	if (formId) {
		const customForm = await fetchOneFormById(session.user.id, formId);

		if (!customForm) redirect_to_dashboard();

		const form = await superValidate(addCardSchema);

		return { customForm, form };
	} else redirect_to_dashboard();
};

export const actions = {
	/*
	 * action to add field
	 */
	addField: async ({ request, locals }) => {
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
	deleteForm: async ({ request, locals }) => {
		const session = await locals.getSession();

		if (!session?.user) throw redirect(307, '/signin');

		const form = await superValidate(request, deleteFormSchema);

		if (!form.valid) {
			return fail(400, { form });
		}

		await deleteCustomForm(form.data.form_id, session.user.id);

		redirect_to_dashboard();
	},

	/*
	 * action to delete card
	 */
	deleteCard: async ({ request, locals }) => {
		const session = await locals.getSession();

		if (!session?.user) throw redirect(307, '/signin');

		const form = await superValidate(request, deleteCardSchema);

		if (!form.valid) {
			return fail(400, { form });
		}

		await deleteCustomField({
			fieldId: form.data.card_id,
			formId: form.data.form_id,
			userId: session.user.id
		});
	},

	/*
	 * action to raname form
	 */
	renameForm: async ({ request, locals }) => {
		const session = await locals.getSession();

		if (!session?.user) throw redirect(307, '/signin');

		const form = await superValidate(request, renameFormSchema);

		if (!form.valid) {
			return fail(400, { form });
		}

		await renameCustomForm({
			formId: form.data.form_id,
			newName: form.data.new_form_name,
			userId: session.user.id
		});
	},

	/*
	 * action to update field
	 */
	updateField: async ({ request, locals }) => {
		const session = await locals.getSession();

		if (!session?.user) throw redirect(307, '/signin');

		const form = await superValidate(request, updateCardSchema);

		if (!form.valid) {
			return fail(400, { form });
		}

		await updateCustomField({
			newName: form.data.new_card_name,
			cardId: form.data.card_id,
			cardType: form.data.card_type,
			userId: session.user.id
		});
	}
} satisfies Actions;
