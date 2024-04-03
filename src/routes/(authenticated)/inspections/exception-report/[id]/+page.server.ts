import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
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

	const redirect_to_back = () => redirect(PERMANENT_REDIRECT_STATUS, `/inspections/`);

	if (inspectionId) {
		try {
			const tenantUserId = session.user.defaultTenantUser.tenantId;

			const inspection = await retrieveInspectionById({
				tenantId: tenantUserId,
				id: inspectionId
			});

			if (!inspection) redirect_to_back();

			// if inspection not have responses
			if (!inspection?.responses.length) return redirect(PERMANENT_REDIRECT_STATUS, `/inspections/create/${inspection?.id}`);

			return { inspection, FormFieldType };
		} catch (err) {
			console.log(err);
			redirect_to_back();
		}
	}

	redirect_to_back();
};
