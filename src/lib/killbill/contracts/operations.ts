import type { Prisma } from '@prisma/client';
import { getSubscriptionApi } from './api';
import { pris } from '../config';
import { syncSubscription, unsubscribe } from './subscriptions';
import { ResponseError } from '../api/runtime';

async function deleteContract(args: Prisma.ContractDeleteArgs) {
	const contract = await pris.contract.findFirst({
		where: {
			id: args.where.id
		}
	});
	if (!contract) return;

	const subscriptionApi = getSubscriptionApi();
	if (!subscriptionApi) return;

	await unsubscribe(subscriptionApi, contract);
}

async function updateContract(args: Prisma.ContractUpdateArgs) {
	const contract = await pris.contract.findFirst({
		where: {
			id: args.where.id
		}
	});
	if (!contract) return;

	const subscriptionApi = getSubscriptionApi();
	if (!subscriptionApi) return;

	await syncSubscription(subscriptionApi, contract);
}

async function createContract(args: Prisma.ContractCreateArgs) {
	const data = args.data;
	const contract = await pris.contract.findFirst({
		where: {
			clientId: data.clientId,
			rentalPlanId: data.rentalPlanId,
			vehicleId: data.vehicleId
		}
	});
	if (!contract) return;

	const subscriptionApi = getSubscriptionApi();
	if (!subscriptionApi) return;

	await syncSubscription(subscriptionApi, contract);
}

export async function contractsOperations(operation: string, args: any) {
	try {
		switch (operation) {
			case 'delete':
				await deleteContract(args);
				break;
			case 'update':
				await updateContract(args);
				break;
			case 'create':
				await createContract(args);
				break;
		}
	} catch (e) {
		if (e instanceof ResponseError) {
			console.log(await e.response.json());
		}
		console.log(e);
	}
}
