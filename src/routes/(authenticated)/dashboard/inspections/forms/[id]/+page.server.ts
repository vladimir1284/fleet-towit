import {
	addFieldToCustomForm,
	deleteCustomForm,
	cloneCustomForm,
	retrieveCustomFormById,
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
} from '$lib/shared';
import { FormFieldType } from '@prisma/client';
import type { CheckOption } from '@prisma/client';

const cardTypeSchema = z.enum(['text', 'number', 'checkboxes', 'single_check']);

const addCardSchema = z.object({
	card_name: z.string(),
	form_id: z.number(),
	card_type: cardTypeSchema,
	checkboxes: z.string().optional()
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
	card_type: cardTypeSchema,
	new_card_name: z.string(),
	checkboxes: z.string().optional()
});

// utils
const verifySession = async (locals: any) => {
	const session = await locals.getSession();

	if (!session?.user) redirect(TEMPORARY_REDIRECT_STATUS, '/signin');

	return session;
};

const redirect_to_back = () => redirect(PERMANENT_REDIRECT_STATUS, `/dashboard/inspections/forms/`);

export const load: PageServerLoad = async ({ params, locals }) => {
	const session = await verifySession(locals);

	const formId = Number(params.id);

	if (formId) {
		try {
			// this code is for testing purposes only
			const tenant = session?.user.tenantUsers[0].tenant;

			const customForm = await retrieveCustomFormById({
				tenantId: tenant.id,
				formId: formId
			});

			const form = await superValidate(addCardSchema);

			if (!customForm) redirect_to_back();

			// if the form has inspections then the form will be cloned
			// and the user will be redirected to its path

			if (customForm?.inspections.length) {
				const cloneForm = await cloneCustomForm({ form: customForm, tenantId: tenant.id });

				return {
					redirect_to: cloneForm.id,
					customForm: cloneForm,
					form,
					FormFieldType
				};
			}

			return { customForm, form, FormFieldType };
		} catch {
			redirect_to_back();
		}
	}

	redirect_to_back();
};

export const actions = {
	/*
	 * action to delete form
	 */
	deleteForm: async ({ request, locals }) => {
		const session = await verifySession(locals);

		const form = await superValidate(request, deleteFormSchema);

		if (!form.valid) {
			return fail(MISSING_SECURITY_HEADER_STATUS, { form });
		}

		// this code is for testing purposes only
		const tenant = session?.user.tenantUsers[0].tenant;

		await deleteCustomForm({
			tenantId: tenant.id,
			formId: form.data.form_id
		});

		redirect_to_back();
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

		// this code is for testing purposes only
		const tenant = session?.user.tenantUsers[0].tenant;

		await renameCustomForm({
			tenantId: tenant.id,
			formId: form.data.form_id,
			newName: form.data.new_form_name
		});
	},

	/*
	 * action to add field to custom form
	 */
	addField: async ({ request, locals }) => {
		const session = await verifySession(locals);

		const form = await superValidate(request, addCardSchema);

		if (!form.valid) {
			return fail(MISSING_SECURITY_HEADER_STATUS, { form });
		}

		// this code is for testing purposes only
		const tenant = session?.user.tenantUsers[0].tenant;

		let checkboxes: string[] | undefined = undefined;
		if (form.data.checkboxes) checkboxes = JSON.parse(form.data.checkboxes);

		await addFieldToCustomForm({
			tenantId: tenant.id,
			cardType: form.data.card_type,
			name: form.data.card_name,
			formId: form.data.form_id,
			checkboxes: checkboxes
		});

		return { form };
	},

	/*
	 * action to delete card or field
	 */
	deleteCard: async ({ request, locals }) => {
		const session = await verifySession(locals);

		const form = await superValidate(request, deleteCardSchema);

		if (!form.valid) {
			return fail(MISSING_SECURITY_HEADER_STATUS, { form });
		}

		// this code is for testing purposes only
		const tenant = session?.user.tenantUsers[0].tenant;

		await deleteCustomField({
			tenantId: tenant.id,
			formId: form.data.form_id,
			fieldId: form.data.card_id
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

		// this code is for testing purposes only
		const tenant = session?.user.tenantUsers[0].tenant;

		let checkboxes: (CheckOption | string)[] | undefined = undefined;
		if (form.data.checkboxes) checkboxes = JSON.parse(form.data.checkboxes);

		await updateCustomField({
			tenantId: tenant.id,
			newName: form.data.new_card_name,
			cardId: form.data.card_id,
			cardType: form.data.card_type,
			checkboxes: checkboxes
		});
	}
} satisfies Actions;
