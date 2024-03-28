import {
	retrieveCustomFormById,
	deleteCustomForm,
	renameCustomForm,
	cloneCustomForm,
	deleteCard,
	addCardToForm
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

const addCardSchema = z.object({
	card_name: z.string(),
	form_id: z.number(),
	fields: z.string()
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
	 *  add card to custom form
	 */
	addCard: async ({ request, locals }) => {
		const session = await verifySession(locals);

		const form = await superValidate(request, addCardSchema);

		if (!form.valid) {
			return fail(MISSING_SECURITY_HEADER_STATUS, { form });
		}
		// this code is for testing purposes only
		const tenant = session?.user.tenantUsers[0].tenant;

		await addCardToForm({
			tenantId: tenant.id,
			cardName: form.data.card_name,
			formId: form.data.form_id,
			fields: form.data.fields
		});
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

		await deleteCard({
			tenantId: tenant.id,
			formId: form.data.form_id,
			cardId: form.data.card_id
		});
	}
} satisfies Actions;
