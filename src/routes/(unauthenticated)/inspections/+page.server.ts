import { redirect } from '@sveltejs/kit';

export async function load({ url }) {
	// redirect user
	if (url.pathname === '/inspections') redirect(307, '/inspections/forms');
}
