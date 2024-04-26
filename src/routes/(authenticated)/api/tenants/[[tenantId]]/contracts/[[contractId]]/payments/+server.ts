import { z } from 'zod';
import type { RequestHandler } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { actionResult } from 'sveltekit-superforms';
import { superValidate } from 'sveltekit-superforms/server';
import { getContract } from '$lib/actions/contracts';
import { getAccountKey } from '$lib/killbill/clients/key';
import { reqAccountApi } from '$lib/killbill/requests';

export const GET: RequestHandler = async ({ locals, params }) => {
	if (!params.contractId) {
		return new Response(JSON.stringify({ message: 'Invalid contractId' }), { status: 400 });
	}

	const { client, rentalPlan } = await getContract(locals.currentInstance.currentPrismaClient, {
		contractId: parseInt(params.contractId)
	});

	try {
		const { accountId } = await reqAccountApi.getAccountByKey({
			externalKey: getAccountKey(client.id)
		});

		const payments = await reqAccountApi.getPaymentsForAccount({ accountId });
		// const payments = await customReqPaymentApi.getLatestPayments({ limit: limit, audit: 'MINIMAL' });

		return new Response(JSON.stringify(payments));
	} catch (error) {
		console.error('Connection error with Kill Bill:', error);
		return new Response(
			JSON.stringify({ message: 'Error while communicating with the Kill Bill server.' }),
			{ status: 500 }
		);
	}
};
