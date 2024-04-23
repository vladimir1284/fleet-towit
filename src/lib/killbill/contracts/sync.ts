import { ResponseError } from '../api/runtime';
import { pris } from '../config';
import { syncSubscription } from './subscriptions';

export async function syncContracts() {
	console.log('>>> Contracts');
	const contracts = await pris.contract.findMany();

	for (let i = 0; i < contracts.length; i++) {
		const contract = contracts[i];
		try {
			await syncSubscription(contract);
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
}
