import type { Actions, PageServerLoad } from './$types';
import { redirect, fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import { generateValidationSchema } from '$lib/validations';
import { retrieveInspectionById, createResponseToInspection } from '$lib/actions/inspections';
import {
	TEMPORARY_REDIRECT_STATUS,
	MISSING_SECURITY_HEADER_STATUS,
	PERMANENT_REDIRECT_STATUS
} from '$lib/shared';
import { FormFieldType } from '@prisma/client';

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
			// this code is for testing purposes only
			const tenant = session?.user.tenantUsers[0].tenant;

			const inspection = await retrieveInspectionById({
				tenantId: tenant.id,
				id: inspectionId
			});

			if (!inspection) redirect(PERMANENT_REDIRECT_STATUS, `/inspections/`);

			// if inspection have responses redirect
			if (inspection.responses.length > 0) redirect(PERMANENT_REDIRECT_STATUS, `/inspections/`);

			// generate schema
			const schema = generateValidationSchema(inspection.customForm.cards);

			const form = await superValidate(zod(schema));

			return { inspection, FormFieldType, form };
		} catch {
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
			// this code is for testing purposes only
			const tenant = session?.user.tenantUsers[0].tenant;

			const inspection = await retrieveInspectionById({
				tenantId: tenant.id,
				id: inspectionId
			});

			if (!inspection) redirect(PERMANENT_REDIRECT_STATUS, `/inspections/register/`);

			// generate schema
			const schema = generateValidationSchema(inspection.customForm.cards);

			const formData = await request.formData();

			const form = await superValidate(formData, zod(schema));

			// Validating image type fields manually
			// since the validation done with superform and zod does not work

			const MAX_UPLOAD_SIZE = 1024 * 1024 * 3;
			const ACCEPTED_FILE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

			for (const field in form.data) {
				// @ts-expect-error: get value
				const value = form.data[field];

				// In the case of zod files
				// gives the default value of undefined
				if (value === undefined) {
					const file = formData.get(field);

					if (file instanceof File) {
						if (file.size >= MAX_UPLOAD_SIZE) {
							form.valid = false;
							// @ts-expect-error:  Set error message
							form.errors[field] = 'File size must be less than 3MB';
						} else if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
							form.valid = false;
							// @ts-expect-error:  Set error message
							form.errors[field] = 'File must be a image';
						} else {
							// @ts-expect-error:  Set file
							form.data[field] = file;
						}
					}
				}
			}

			console.log(form);

			if (!form.valid) {
				return fail(MISSING_SECURITY_HEADER_STATUS, { form });
			}

			const response = await createResponseToInspection({
				form_data: form.data,
				userId: session.user.id,
				tenantId: tenant.id,
				inspectionId: inspectionId
			});

			console.log(response);

			if (response) redirect(PERMANENT_REDIRECT_STATUS, '/inspections/');
		}
	}
} satisfies Actions;
