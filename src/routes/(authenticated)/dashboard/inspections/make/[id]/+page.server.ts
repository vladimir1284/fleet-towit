import type { Actions, PageServerLoad } from './$types';
import {
	PERMANENT_REDIRECT_STATUS,
	TEMPORARY_REDIRECT_STATUS,
	MISSING_SECURITY_HEADER_STATUS
} from '$lib/shared';
import { superValidate } from 'sveltekit-superforms/server';
import { fail, redirect } from '@sveltejs/kit';
import { retrieveInspectionById, createInspectionResponse } from '$lib/actions/inspections';
import { generateValidationSchema } from '$lib/validations';

const verifySession = async (locals: any) => {
	const session = await locals.getSession();

	if (!session?.user) redirect(TEMPORARY_REDIRECT_STATUS, '/signin');

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

			if (!inspection) redirect(PERMANENT_REDIRECT_STATUS, `/dashboard/inspections/register/`);

			console.log(inspection.responses);

			// generate schema
			const schema = generateValidationSchema(inspection.customForm.fields);

			const form = await superValidate(schema);

			return { inspection, form };
		} catch {
			redirect(PERMANENT_REDIRECT_STATUS, `/dashboard/inspections/register/`);
		}
	}

	redirect(PERMANENT_REDIRECT_STATUS, `/dashboard/inspections/register/`);
};

export const actions = {
	default: async ({ locals, request, params }) => {
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
			const schema = generateValidationSchema(inspection.customForm.fields);

			const form = await superValidate(request, schema);

			if (!form.valid) {
				return fail(MISSING_SECURITY_HEADER_STATUS, { form });
			}

			await createInspectionResponse({
				form_data: form.data,
				userId: session.user.id,
				tenantId: tenant.id,
				inspectionId: inspectionId
			});
		}
	}
} satisfies Actions;
