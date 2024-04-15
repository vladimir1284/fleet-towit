import { syncTenants } from './tenants/tenants';
import { syncClients } from './clients/clients';
import { syncRentalPlans } from './rental_plans/rental_plans';
import { syncContracts } from './contracts/contracts';
import { ClockAPI } from './api/apis/clock';
import { ResponseError } from './api/runtime';
import { apiConfig } from './config';

export async function syncKillBill() {
	console.log('sync killbill');

	// await syncTenants();
	await syncRentalPlans();
	await syncClients();
	await syncContracts();

	// const clockApi = new ClockAPI(apiConfig);
	// try {
	// 	const res = await clockApi.forward({ days: 10 });
	// 	console.log(res);
	// } catch (e) {
	// 	if (e instanceof ResponseError) {
	// 		console.log(await e.response.json());
	// 	}
	// 	console.log(e);
	// }
}
