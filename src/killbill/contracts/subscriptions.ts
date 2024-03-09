import type { Contract } from '@prisma/client';
import type { SubscriptionApi } from '../api/apis';
import { pris } from '../config';
import { getAccountApi } from '../clients/api';
import { getAccountKey } from '../tools/tools';
import { ResponseError } from '../api/runtime';

function getSubscriptionKey(contract: Contract): string {
	return `TestSubscription-${contract.clientId}-${contract.rentalPlanId}-${contract.vehicleId}`;
}

export async function subscribe(api: SubscriptionApi, contract: Contract) {
	const stage = await pris.stageUpdate.findFirst({
		where: {
			id: contract.stageId
		}
	});
	if (!stage || stage.stage != 'ACTIVE') {
		return;
	}

	const client = await pris.client.findFirst({
		where: {
			id: contract.clientId
		}
	});
	if (!client) return;

	const plan = await pris.rentalPlan.findFirst({
		where: {
			id: contract.rentalPlanId
		}
	});
	if (!plan) return;

	const accountApi = await getAccountApi(client.tenantId);
	if (!accountApi) return;

	const account = await accountApi.getAccountByKey({
		externalKey: getAccountKey(client.id)
	});

	await api.createSubscriptionRaw({
		xKillbillCreatedBy: 'admin',
		body: {
			externalKey: getSubscriptionKey(contract),
			accountId: account.accountId,
			planName: plan.name
		}
	});
}

export async function unsubscribe(api: SubscriptionApi, contract: Contract) {
	const subscription = await api.getSubscriptionByKey({
		externalKey: getSubscriptionKey(contract)
	});
	if (!subscription || !subscription.subscriptionId) return;

	await api.cancelSubscriptionPlanRaw({
		xKillbillCreatedBy: 'admin',
		subscriptionId: subscription.subscriptionId
	});
}

export async function cancelUnsubscription(api: SubscriptionApi, contract: Contract) {
	const subscription = await api.getSubscriptionByKey({
		externalKey: getSubscriptionKey(contract)
	});
	if (!subscription || !subscription.subscriptionId) return;

	await api.uncancelSubscriptionPlanRaw({
		xKillbillCreatedBy: 'admin',
		subscriptionId: subscription.subscriptionId
	});
}

export async function syncSubscription(api: SubscriptionApi, contract: Contract) {
	const stage = await pris.stageUpdate.findFirst({
		where: {
			id: contract.stageId
		}
	});
	if (stage && stage.stage == 'ACTIVE') {
		try {
			await subscribe(api, contract);
		} catch (e) {
			if (!(e instanceof ResponseError)) {
				throw e;
			}
			const res = await e.response.json();
			if (!res.message || res.message.toLowerCase().search('duplicate entry') == 0) {
				throw e;
			}

			await cancelUnsubscription(api, contract);
		}
	} else {
		await unsubscribe(api, contract);
	}
}
