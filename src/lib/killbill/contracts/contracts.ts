import { ResponseError } from '../api/runtime';
import { pris } from '../config';
import { getSubscriptionApi } from './api';
import { syncSubscription } from './subscriptions';

export async function syncContracts() {
	console.log('>>> Contracts');
	const contracts = await pris.contract.findMany();

	const subscriptionApi = getSubscriptionApi();

	for (let i = 0; i < contracts.length; i++) {
		const contract = contracts[i];
		try {
			await syncSubscription(subscriptionApi, contract);
		} catch (e) {
			if (e instanceof ResponseError) {
				console.log(await e.response.json());
			}
			console.log(e);
		}
	}
}
