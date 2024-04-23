import type { RentalPlan } from '@prisma/client';
import { generateCatalog } from './generate_catalog';
import { pris } from '../config';
import { reqCatalogApi } from '../requests';
import { ResponseError } from '../api/runtime';

const xKillbillCreatedBy = 'admin';	// TODO ver que se hace con esto, fijo o el currentUser

export async function syncRentalPlans() {
	console.log('>>> Rental Plans');
	const plans: Array<RentalPlan> = await pris.rentalPlan.findMany();
	const catalog = generateCatalog(plans);

	try {
		await reqCatalogApi.uploadCatalogXml({
			body: catalog,
			xKillbillCreatedBy
		});
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
