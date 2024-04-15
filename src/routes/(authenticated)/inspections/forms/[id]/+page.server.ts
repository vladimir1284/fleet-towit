import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import { FormFieldType } from '@prisma/client';
import {
	retrieveCustomFormById,
	deleteCustomForm,
	renameCustomForm,
	cloneCustomForm,
	deleteCard,
	addCard,
	updateCard
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

const redirect_to_back = () => redirect(PERMANENT_REDIRECT_STATUS, `/inspections/forms/`);

export const load: PageServerLoad = async ({ params, locals }) => {
	const session = await verifySession(locals);

	const formId = Number(params.id);

	if (formId) {
		try {
			const tenantUserId = session.user.defaultTenantUser.tenantId;

			const customForm = await retrieveCustomFormById(locals.currentInstance.currentPrismaClient, {
				tenantId: tenantUserId,
				formId: formId
			});

			const addCardForm = await superValidate(zod(addCardSchema));
			const updateCardForm = await superValidate(zod(updateCardSchema));

			if (!customForm) redirect_to_back();

			// if the form has inspections then the form will be cloned
			// and the user will be redirected to its path

			if (customForm?.inspections.length) {
				const cloneForm = await cloneCustomForm(locals.currentInstance.currentPrismaClient, {
					form: customForm
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
		} catch (error) {
			console.log(error);
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

		const form = await superValidate(request, zod(deleteFormSchema));

		if (!form.valid) {
			return fail(MISSING_SECURITY_HEADER_STATUS, { form });
		}

		await deleteCustomForm(locals.currentInstance.currentPrismaClient, {
			formId: form.data.form_id
		});

		redirect_to_back();
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

		const tenantUserId = session.user.defaultTenantUser.tenantId;

		await renameCustomForm(locals.currentInstance.currentPrismaClient, {
			tenantId: tenantUserId,
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
		const tenantUserId = session.user.defaultTenantUser.tenantId;

		await addCard(locals.currentInstance.currentPrismaClient, {
			tenantId: tenantUserId,
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

		const tenantUserId = session.user.defaultTenantUser.tenantId;

		await deleteCard(locals.currentInstance.currentPrismaClient, {
			tenantId: tenantUserId,
			formId: form.data.form_id,
			cardId: form.data.card_id
		});
	},

	/*
	 *  update card to custom form
	 */
	updateCard: async ({ request, locals }) => {
		const session = await verifySession(locals);

		const form = await superValidate(request, zod(updateCardSchema));

		if (!form.valid) {
			return fail(MISSING_SECURITY_HEADER_STATUS, { form });
		}

		const tenantUserId = session.user.defaultTenantUser.tenantId;

		await updateCard({
			tenantId: tenantUserId,
			cardName: form.data.card_name,
			cardId: form.data.card_id,
			fields: form.data.fields
		});
	}
} satisfies Actions;
