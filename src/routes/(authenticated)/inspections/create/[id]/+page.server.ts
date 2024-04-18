import type { Actions, PageServerLoad } from './$types';
import { redirect, fail, error } from '@sveltejs/kit';
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
		const inspection = await retrieveInspectionById(locals.currentInstance.currentPrismaClient, {
			tenantId: session.user.defaultTenantUser.tenantId,
			id: inspectionId
		});

		if (!inspection) {
			error(404, {
				message: 'Not found'
			});
		}

		// if inspection have responses redirect to read
		if (inspection.responses.length > 0)
			redirect(PERMANENT_REDIRECT_STATUS, `/inspections/exception-report/${inspectionId}`);

		// generate schema
		const schema = generateValidationSchema(inspection.customForm.cards);

		const form = await superValidate(zod(schema));

		return { inspection, FormFieldType, form };
	}

	error(404, {
		message: 'Not found'
	});
};

export const actions = {
	createResponse: async ({ locals, request, params }) => {
		const session = await verifySession(locals);

		const inspectionId = Number(params.id);

		if (inspectionId) {
			const inspection = await retrieveInspectionById(locals.currentInstance.currentPrismaClient, {
				tenantId: session.user.defaultTenantUser.tenantId,
				id: inspectionId
			});

			if (!inspection) {
				error(404, {
					message: 'Not found'
				});
			}

			// generate schema
			const schema = generateValidationSchema(inspection.customForm.cards);

			const form = await superValidate(request, zod(schema));

			if (!form.valid) {
				return fail(MISSING_SECURITY_HEADER_STATUS, { form });
			}

			const response = await createResponseToInspection(
				locals.currentInstance.currentPrismaClient,
				{
					form_data: form.data,
					userId: session.user.id,
					inspectionId: inspectionId
				}
			);

			if (response)
				// redirect to read inspections
				redirect(PERMANENT_REDIRECT_STATUS, `/inspections/exception-report/${response.id}`);
		}
	} ,

	validateResponse: async ({ locals, request, params }) => {


		console.log("Validando form")
	}
} satisfies Actions;
