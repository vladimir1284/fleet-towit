import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { retrieveInspectionById } from '$lib/actions/inspections';
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

	const redirect_to_back = () => redirect(PERMANENT_REDIRECT_STATUS, `/dashboard/inspections/`);

	if (inspectionId) {
		try {
			// this code is for testing purposes only
			const tenant = session?.user.tenantUsers[0].tenant;

			const inspection = await retrieveInspectionById({
				tenantId: tenant.id,
				id: inspectionId
			});

			if (!inspection) redirect_to_back();

			// if inspection not have responses
			if (!inspection?.responses.length) redirect_to_back();

			return { inspection, FormFieldType };
		} catch (err) {
			redirect_to_back();
		}
	}

	redirect_to_back();
};
