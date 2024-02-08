import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	// redirect user
	if (url.pathname === '/inspections') redirect(307, '/inspections/forms');
};
