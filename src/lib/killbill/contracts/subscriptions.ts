// import { ResponseError } from '../api/runtime';
import type { Contract } from '@prisma/client';
import { reqSubscriptionApi } from '../requests';
import { pris } from '../config';
import { reqAccountApi } from '../requests';
import { getAccountKey } from '../clients/key';
import { getPlanName } from '../rental_plans/tools';
import { getSubscriptionId } from './tools';
import { getSubscriptionKey } from './key';

const xKillbillCreatedBy = 'admin';	// TODO ver que se hace con esto, fijo o el currentUser

export async function subscribe(contract: Contract) {
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

	const account = await reqAccountApi.getAccountByKey({
		externalKey: getAccountKey(client.id)
	});

	const subscriptionId: string | null = await getSubscriptionId(contract);
	if (!subscriptionId) {
		// TODO ver porq esto no esta mandando todo el body (como el state que lo pone como CANCELED cuando es ACTIVE)
		await reqSubscriptionApi.createSubscriptionRaw({
			xKillbillCreatedBy,
			body: {
				externalKey: getSubscriptionKey(contract),
				accountId: account.accountId,
				planName: getPlanName(plan.name)
				// priceList: 'DEFAULT',
				// productName: 'Rental',
				// billingPeriod: plan.periodicity
			}
		});
	} else {
		// TODO ver si es posible update la suscripcion ya que en este catch es que la suscripcion ya existe (o hacer solo un return;)
	}
}

export async function unsubscribe(contract: Contract) {
	const subscriptionId: string | null = await getSubscriptionId(contract);
	if (!subscriptionId) return;

	await reqSubscriptionApi.cancelSubscriptionPlanRaw({
		xKillbillCreatedBy,
		subscriptionId
	});
}

export async function cancelUnsubscription(contract: Contract) {
	const subscriptionId: string | null = await getSubscriptionId(contract);
	if (!subscriptionId) return;

	await reqSubscriptionApi.uncancelSubscriptionPlanRaw({
		xKillbillCreatedBy,
		subscriptionId
	});
}

export async function activateSubscription(contract: Contract) {
	try {
		await cancelUnsubscription(contract);
	} catch (e) {
		await subscribe(contract);
	}
}

export async function syncSubscription(contract: Contract) {
	const stage = await pris.stageUpdate.findFirst({
		where: {
			id: contract.stageId
		}
	});
	if (stage && stage.stage === 'ACTIVE') {
		await activateSubscription(contract);
	} else {
		await unsubscribe(contract);
	}
}
