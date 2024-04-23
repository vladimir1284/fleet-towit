import { ResponseError } from '../api/runtime';
import type { Contract } from '@prisma/client';
import { reqSubscriptionApi } from '../requests';
import { getSubscriptionKey } from './key';

export async function getSubscriptionId(contract: Contract): Promise<string | null> {
	try {
		const subscription = await reqSubscriptionApi.getSubscriptionByKey({
			externalKey: getSubscriptionKey(contract)
		});

		if (!subscription || !subscription.subscriptionId) return null;
		return subscription.subscriptionId;
	} catch (e) {
		if (e instanceof ResponseError) {
			if (e.response && e.response.status === 404) {
				console.log('Error 404: Not Found SuscriptionId:', getSubscriptionKey(contract));
			}
		} else console.log('An error occurred:', e);
	}
	return null;
}
