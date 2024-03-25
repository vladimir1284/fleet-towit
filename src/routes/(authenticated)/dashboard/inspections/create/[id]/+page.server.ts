import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { generateValidationSchema } from '$lib/validations';
import { retrieveInspectionById, createResponseToInspection } from '$lib/actions/inspections';
import {
	TEMPORARY_REDIRECT_STATUS,
	MISSING_SECURITY_HEADER_STATUS,
	PERMANENT_REDIRECT_STATUS
} from '$lib/shared';
import { FormFieldType } from '@prisma/client';

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
			// this code is for testing purposes only
			const tenant = session?.user.tenantUsers[0].tenant;

			const inspection = await retrieveInspectionById({
				tenantId: tenant.id,
				id: inspectionId
			});

			if (!inspection) redirect(PERMANENT_REDIRECT_STATUS, `/dashboard/inspections/`);
			// if inspection have responses redirect
			if (inspection.responses.length > 0)
				redirect(PERMANENT_REDIRECT_STATUS, `/dashboard/inspections/`);

			// generate schema
			const schema = generateValidationSchema(inspection.customForm.cards);

			const form = await superValidate(schema);

			return { inspection, FormFieldType, form };
		} catch {
			redirect(PERMANENT_REDIRECT_STATUS, `/dashboard/inspections/`);
		}
	}

	redirect(PERMANENT_REDIRECT_STATUS, `/dashboard/inspections/`);
};

export const actions = {
	createResponse: async ({ locals, request, params }) => {
		const session = await verifySession(locals);

		const inspectionId = Number(params.id);

		if (inspectionId) {
			// this code is for testing purposes only
			const tenant = session?.user.tenantUsers[0].tenant;

			const inspection = await retrieveInspectionById({
				tenantId: tenant.id,
				id: inspectionId
			});

			if (!inspection) redirect(PERMANENT_REDIRECT_STATUS, `/dashboard/inspections/register/`);

			// generate schema
			const schema = generateValidationSchema(inspection.customForm.cards);

			const form = await superValidate(request, schema);

			if (!form.valid) {
				return fail(MISSING_SECURITY_HEADER_STATUS, { form });
			}

			const response = await createResponseToInspection({
				form_data: form.data,
				userId: session.user.id,
				tenantId: tenant.id,
				inspectionId: inspectionId
			});

			if (response) redirect(PERMANENT_REDIRECT_STATUS, '/dashboard/inspections/');
		}
	}
} satisfies Actions;
