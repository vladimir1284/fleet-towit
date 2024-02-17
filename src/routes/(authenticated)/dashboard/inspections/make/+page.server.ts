import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { PERMANENT_REDIRECT_STATUS } from '$lib/shared';

export const load: PageServerLoad = async () => {
	// redirect user
	redirect(PERMANENT_REDIRECT_STATUS, '/dashboard/inspections/register');
};
