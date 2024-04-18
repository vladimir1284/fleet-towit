import type { Actions, PageServerLoad } from './$types';
import { fail, redirect, error } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import { FormFieldType } from '@prisma/client';
import {
	retrieveCustomFormById,
	deleteCustomForm,
	renameCustomForm,
	cloneCustomForm,
	deleteCardForm,
	addCardToForm,
	updateCardForm
} from '$lib/actions/custom-forms';
import {
	PERMANENT_REDIRECT_STATUS,
	TEMPORARY_REDIRECT_STATUS,
	MISSING_SECURITY_HEADER_STATUS
} from '$lib/shared';

const addCardSchema = z.object({
	card_name: z.string(),
	form_id: z.number(),
	fields: z.string()
});

const updateCardSchema = z.object({
	card_name: z.string(),
	card_id: z.number(),
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const verifySession = async (locals: any) => {
	const session = await locals.getSession();
	if (!session?.user) redirect(TEMPORARY_REDIRECT_STATUS, '/signin');
	return session;
};

export const load: PageServerLoad = async ({ params, locals }) => {
	const session = await verifySession(locals);

	const formId = Number(params.id);

	if (formId) {
		const tenantUserId = session.user.defaultTenantUser.tenantId;

		const customForm = await retrieveCustomFormById(locals.currentInstance.currentPrismaClient, {
			tenantId: tenantUserId,
			formId: formId
		});

		const addCardForm = await superValidate(zod(addCardSchema));
		const updateCardForm = await superValidate(zod(updateCardSchema));

		if (!customForm) {
			error(404, {
				message: 'Not found'
			});
		}

		// if the form has inspections then the form will be cloned
		// and the user will be redirected to its path

		if (customForm?.inspections.length) {
			const cloneForm = await cloneCustomForm(locals.currentInstance.currentPrismaClient, {
				form: customForm,
				tenantId: tenantUserId
			});

			return {
				// forms
				addCardForm,
				updateCardForm,
				// data
				redirect_to: cloneForm.id,
				customForm: cloneForm,
				FormFieldType
			};
		}

		return {
			// forms
			addCardForm,
			updateCardForm,
			// data
			customForm,
			FormFieldType
		};
	}

	error(404, {
		message: 'Not found'
	});
};

export const actions = {
	/*
	 * action to delete form
	 */
	deleteForm: async ({ request, locals }) => {
		const session = await verifySession(locals);

		const form = await superValidate(request, zod(deleteFormSchema));

		if (!form.valid) {
			return fail(MISSING_SECURITY_HEADER_STATUS, { form });
		}

		await deleteCustomForm(locals.currentInstance.currentPrismaClient, {
			tenantId: session.user.defaultTenantUser.tenantId,
			formId: form.data.form_id
		});

		redirect(PERMANENT_REDIRECT_STATUS, `/inspections/forms/`);
	},

	/*
	 * action to raname form
	 */
	renameForm: async ({ request, locals }) => {
		const session = await verifySession(locals);

		const form = await superValidate(request, zod(renameFormSchema));

		if (!form.valid) {
			return fail(MISSING_SECURITY_HEADER_STATUS, { form });
		}

		await renameCustomForm(locals.currentInstance.currentPrismaClient, {
			tenantId: session.user.defaultTenantUser.tenantId,
			formId: form.data.form_id,
			newName: form.data.new_form_name
		});
	},

	/*
	 *  add card to custom form
	 */
	addCard: async ({ request, locals }) => {
		const session = await verifySession(locals);

		const form = await superValidate(request, zod(addCardSchema));

		if (!form.valid) {
			return fail(MISSING_SECURITY_HEADER_STATUS, { form });
		}

		await addCardToForm(locals.currentInstance.currentPrismaClient, {
			tenantId: session.user.defaultTenantUser.tenantId,
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

		const form = await superValidate(request, zod(deleteCardSchema));

		if (!form.valid) {
			return fail(MISSING_SECURITY_HEADER_STATUS, { form });
		}

		await deleteCardForm(locals.currentInstance.currentPrismaClient, {
			tenantId: session.user.defaultTenantUser.tenantId,
			formId: form.data.form_id,
			cardId: form.data.card_id
		});
	},

	/*
	 *  update card to custom form
	 */
	updateCard: async ({ request, locals }) => {
		await verifySession(locals);

		const form = await superValidate(request, zod(updateCardSchema));

		if (!form.valid) {
			return fail(MISSING_SECURITY_HEADER_STATUS, { form });
		}

		await updateCardForm(locals.currentInstance.currentPrismaClient, {
			cardName: form.data.card_name,
			cardId: form.data.card_id,
			fields: form.data.fields
		});
	}
} satisfies Actions;
