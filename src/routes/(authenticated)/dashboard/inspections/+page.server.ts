import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { PERMANENT_REDIRECT_STATUS } from '$lib/shared/helpers';

export const load: PageServerLoad = async ({ url }) => {
	// redirect user
	redirect(PERMANENT_REDIRECT_STATUS, `${url.pathname}/forms`);
};