import type { Prisma } from '@prisma/client';
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

	await unsubscribe(contract);
}

async function updateContract(args: Prisma.ContractUpdateArgs) {
	const contract = await pris.contract.findFirst({
		where: {
			id: args.where.id
		}
	});
	if (!contract) return;

	await syncSubscription(contract);
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

	await syncSubscription(contract);
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
			const contentType = e.response.headers.get('content-type');
			if (contentType && contentType.includes('application/json')) {
				console.log(await e.response.json());
			} else console.log(await e.response.text());
		}
		console.log(e);
	}
}
