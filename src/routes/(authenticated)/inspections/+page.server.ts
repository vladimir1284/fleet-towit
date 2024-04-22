import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import { TEMPORARY_REDIRECT_STATUS, MISSING_SECURITY_HEADER_STATUS } from '$lib/shared';
import {
	fetchInspections,
	createInspection,
	fetchListFormsAndVehicles
} from '$lib/actions/inspections';

const createInspectionSchema = z.object({
	form_id: z.number(),
	vehicle_id: z.number()
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const verifySession = async (locals: any) => {
	const session = await locals.getSession();
	if (!session?.user) throw redirect(TEMPORARY_REDIRECT_STATUS, '/dashboard');
	return session;
};

export const load: PageServerLoad = async ({ locals, url }) => {
	const session = await verifySession(locals);

	const form = await superValidate(zod(createInspectionSchema));

	const tenantUserId = session.user.defaultTenantUser.tenantId;

	const { listCustomForm, listVehicles } = await fetchListFormsAndVehicles(
		locals.currentInstance.currentPrismaClient,
		{
			tenantId: tenantUserId
		}
	);

	const results = await fetchInspections(locals.currentInstance.currentPrismaClient, {
		tenantId: tenantUserId,
		page_number: Number(url.searchParams.get('page')) || 1
	});

	const inspections = results.data;

	const pagination = {
		has_next_page: results.has_next_page,
		has_prev_page: results.has_prev_page,
		next_page: results.next_page,
		prev_page: results.prev_page
	};

	return { form, inspections, pagination, listCustomForm, listVehicles };
};

export const actions = {
	default: async ({ request, locals, url }) => {
		const session = await verifySession(locals);

		const form = await superValidate(request, zod(createInspectionSchema));

		if (!form.valid) {
			return fail(MISSING_SECURITY_HEADER_STATUS, { form });
		}

		const tenantUserId = session.user.defaultTenantUser.tenantId;

		const newInspection = await createInspection(locals.currentInstance.currentPrismaClient, {
			tenantId: tenantUserId,
			userId: session.user.id,
			vehicleId: form.data.vehicle_id,
			formId: form.data.form_id
		});

		if (newInspection) {
			redirect(TEMPORARY_REDIRECT_STATUS, `${url.pathname}/create/${newInspection.id}`);
		}
	}
} satisfies Actions;
