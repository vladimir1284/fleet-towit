import type { PageServerLoad } from './$types';
import { redirect, error } from '@sveltejs/kit';
import { retrieveInspectionById } from '$lib/actions/inspections';
import { TEMPORARY_REDIRECT_STATUS, PERMANENT_REDIRECT_STATUS } from '$lib/shared';
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
		const tenantUserId = session.user.defaultTenantUser.tenantId;

		const inspection = await retrieveInspectionById(locals.currentInstance.currentPrismaClient, {
			tenantId: tenantUserId,
			id: inspectionId
		});

		if (!inspection) {
			error(404, {
				message: 'Not found'
			});
		}

		// if inspection not have responses
		if (!inspection?.responses.length)
			return redirect(PERMANENT_REDIRECT_STATUS, `/inspections/create/${inspection?.id}`);

		return { inspection, FormFieldType };
	}

	error(404, {
		message: 'Not found'
	});
};
