import type { RequestHandler } from '@sveltejs/kit';
// import { z } from 'zod';
// import { zod } from 'sveltekit-superforms/adapters';
// import { actionResult } from 'sveltekit-superforms';
// import { superValidate } from 'sveltekit-superforms/server';
// import { getContract } from '$lib/actions/contracts';
// import { getAccountKey } from '$lib/killbill/clients/key';
// import { reqAccountApi, reqPaymentApi } from '$lib/killbill/requests';

export const GET: RequestHandler = async ({ params }) => {
	if (!params.invoiceId) {
		return new Response(JSON.stringify({ message: 'Invalid paymentId' }), { status: 400 });
	}

	try {
		const payment = {};
		// ...

		return new Response(JSON.stringify(payment));
	} catch (error) {
		console.error('Connection error with Kill Bill:', error);
		return new Response(
			JSON.stringify({ message: 'Error while communicating with the Kill Bill server.' }),
			{ status: 500 }
		);
	}
};
