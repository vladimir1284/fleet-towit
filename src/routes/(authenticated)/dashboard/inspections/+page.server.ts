import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import {
	fetchInspections,
	createInspection,
	fetchListFormsAndVehicles
} from '$lib/actions/inspections';

import { z } from 'zod';
import { TEMPORARY_REDIRECT_STATUS, MISSING_SECURITY_HEADER_STATUS } from '$lib/shared';

const createInspectionSchema = z.object({
	form_id: z.number(),
	vehicle_id: z.number()
});

const verifySession = async (locals: any) => {
	const session = await locals.getSession();

	if (!session?.user) throw redirect(TEMPORARY_REDIRECT_STATUS, '/signin');

	return session;
};

export const load: PageServerLoad = async ({ locals, request }) => {
	const session = await verifySession(locals);

	const form = await superValidate(createInspectionSchema);

	// // this code is for testing purposes only
	const tenant = session?.user.tenantUsers[0].tenant;

	const inspections = await fetchInspections({ tenantId: tenant.id });

	// list form and vehicles
	const { listCustomForm, listVehicles } = await fetchListFormsAndVehicles({ tenantId: tenant.id });

	return { form, inspections, listCustomForm, listVehicles };
};

export const actions = {
	default: async ({ request, locals, url }) => {
		const session = await verifySession(locals);

		const form = await superValidate(request, createInspectionSchema);

		if (!form.valid) {
			return fail(MISSING_SECURITY_HEADER_STATUS, { form });
		}

		// this code is for testing purposes only
		const tenant = session?.user.tenantUsers[0].tenant;

		const newInspection = await createInspection({
			tenantId: tenant.id,
			userId: session.user.id,
			vehicleId: form.data.vehicle_id,
			formId: form.data.form_id
		});

		if (newInspection) {
			redirect(TEMPORARY_REDIRECT_STATUS, `${url.pathname}/create/${newInspection.id}`);
		}
	}
} satisfies Actions;
