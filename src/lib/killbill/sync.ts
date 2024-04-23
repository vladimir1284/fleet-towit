// import { ResponseError } from './api/runtime';
// import { reqClockApi } from './requests';
// import { syncTenants } from './tenants/sync';
import { syncClients } from './clients/sync';
import { syncRentalPlans } from './rental_plans/sync';
import { syncContracts } from './contracts/sync';

export async function syncKillBill() {
	console.log('>>>> Starting sync killbill');
	// await syncTenants();
	await syncRentalPlans();
	await syncClients();
	await syncContracts();

	/*
	try {
		const res = await reqClockApi.forward({ days: 10 });
		console.log(res);
	} catch (e) {
		if (e instanceof ResponseError) {
			console.log(await e.response.json());
		}
		console.log(e);
	}
	 */
	console.log('>>>> Finished sync killbill');
}
