import type { Actions, PageServerLoad } from './$types';
import { redirect, fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import { FormFieldType } from '@prisma/client';
import { generateValidationSchema } from '$lib/validations';
import { retrieveInspectionById, createResponseToInspection } from '$lib/actions/inspections';
import {
	TEMPORARY_REDIRECT_STATUS,
	MISSING_SECURITY_HEADER_STATUS,
	PERMANENT_REDIRECT_STATUS
} from '$lib/shared';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const verifySession = async (locals: any) => {
	const session = await locals.getSession();
	if (!session?.user) throw redirect(TEMPORARY_REDIRECT_STATUS, '/signin');
	return session;
};

export const load: PageServerLoad = async ({ params, locals }) => {
	const session = await verifySession(locals);

	const inspectionId = Number(params.id);

	if (inspectionId) {
		try {
			const tenantUserId = session.user.defaultTenantUser.tenantId;

			const inspection = await retrieveInspectionById({
				tenantId: tenantUserId,
				id: inspectionId
			});

			if (!inspection) redirect(PERMANENT_REDIRECT_STATUS, `/inspections/`);

			// if inspection have responses redirect
			if (inspection.responses.length > 0) redirect(PERMANENT_REDIRECT_STATUS, `/inspections/`);

			// generate schema
			const schema = generateValidationSchema(inspection.customForm.cards);

			const form = await superValidate(zod(schema));

			return { inspection, FormFieldType, form };
		} catch (error) {
			console.log(error);
			redirect(PERMANENT_REDIRECT_STATUS, `/inspections/`);
		}
	}

	redirect(PERMANENT_REDIRECT_STATUS, `/inspections/`);
};

export const actions = {
	createResponse: async ({ locals, request, params }) => {
		const session = await verifySession(locals);

		const inspectionId = Number(params.id);

		if (inspectionId) {
			const tenantUserId = session.user.defaultTenantUser.tenantId;

			const inspection = await retrieveInspectionById({
				tenantId: tenantUserId,
				id: inspectionId
			});

			if (!inspection) redirect(PERMANENT_REDIRECT_STATUS, `/inspections/register/`);

			// generate schema
			const schema = generateValidationSchema(inspection.customForm.cards);

			const formData = await request.formData();

			const form = await superValidate(formData, zod(schema));

			if (!form.valid) {
				return fail(MISSING_SECURITY_HEADER_STATUS, { form });
			}

			const response = await createResponseToInspection({
				form_data: form.data,
				userId: session.user.id,
				tenantId: tenantUserId,
				inspectionId: inspectionId
			});

			if (response) redirect(PERMANENT_REDIRECT_STATUS, '/inspections/');
		}
	}
} satisfies Actions;
