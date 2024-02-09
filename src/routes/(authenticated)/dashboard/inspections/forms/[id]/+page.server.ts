import {
	addFieldToCustomFrom,
	deleteCustomForm,
	fetchCustomFormById,
	deleteCustomField,
	renameCustomForm,
	updateCustomField
} from '$lib/actions/custom-forms';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';
import type { Actions, PageServerLoad } from './$types';
import {
	PERMANENT_REDIRECT_STATUS,
	TEMPORARY_REDIRECT_STATUS,
	MISSING_SECURITY_HEADER_STATUS
} from '$lib/shared/helpers';

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

const verifySession = async (locals: any) => {
	const session = await locals.getSession();

	if (!session?.user) redirect(TEMPORARY_REDIRECT_STATUS, '/signin');

	return session;
};

export const load: PageServerLoad = async ({ params, locals }) => {
	const session = await verifySession(locals);

	const formId = Number(params.id);

	if (formId) {
		try {
			const customForm = await fetchCustomFormById(session.user.id, formId);

			if (!customForm) redirect(PERMANENT_REDIRECT_STATUS, `/dashboard/inspections/forms/`);

			const form = await superValidate(addCardSchema);

			return { customForm, form };
		} catch {
			redirect(PERMANENT_REDIRECT_STATUS, `/dashboard/inspections/forms/`);
		}
	}

	redirect(PERMANENT_REDIRECT_STATUS, `/dashboard/inspections/forms/`);
};

export const actions = {
	/*
	 * action to add field
	 */
	addField: async ({ request, locals }) => {
		await verifySession(locals);

		const form = await superValidate(request, addCardSchema);

		if (!form.valid) {
			return fail(MISSING_SECURITY_HEADER_STATUS, { form });
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
		const session = await verifySession(locals);

		const form = await superValidate(request, deleteFormSchema);

		if (!form.valid) {
			return fail(MISSING_SECURITY_HEADER_STATUS, { form });
		}

		await deleteCustomForm(form.data.form_id, session.user.id);

		redirect(PERMANENT_REDIRECT_STATUS, `/dashboard/inspections/forms/`);
	},

	/*
	 * action to delete card
	 */
	deleteCard: async ({ request, locals }) => {
		const session = await verifySession(locals);

		const form = await superValidate(request, deleteCardSchema);

		if (!form.valid) {
			return fail(MISSING_SECURITY_HEADER_STATUS, { form });
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
		const session = await verifySession(locals);

		const form = await superValidate(request, renameFormSchema);

		if (!form.valid) {
			return fail(MISSING_SECURITY_HEADER_STATUS, { form });
		}

		await renameCustomForm({
			formId: form.data.form_id,
			newName: form.data.new_form_name,
			userId: session.user.id
		});
	},

	/*
	 * action to update custom field
	 */
	updateField: async ({ request, locals }) => {
		const session = await verifySession(locals);

		const form = await superValidate(request, updateCardSchema);

		if (!form.valid) {
			return fail(MISSING_SECURITY_HEADER_STATUS, { form });
		}

		await updateCustomField({
			newName: form.data.new_card_name,
			cardId: form.data.card_id,
			cardType: form.data.card_type,
			userId: session.user.id
		});
	}
} satisfies Actions;
