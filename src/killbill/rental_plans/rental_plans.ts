import type { RentalPlan } from '@prisma/client';
import { generateCatalog } from './generate_catalog';
import { apiConfig, pris } from '../config';
import { CatalogApi } from '../api/apis';
import { ResponseError } from '../api/runtime';

export async function syncRentalPlans() {
	console.log('>>> Rental Plans');
	const plans: Array<RentalPlan> = await pris.rentalPlan.findMany();
	const catalog = generateCatalog(plans);

	const catalogApi = new CatalogApi(apiConfig);
	try {
		await catalogApi.uploadCatalogXmlRaw({
			body: catalog,
			xKillbillCreatedBy: 'admin'
		});
	} catch (e) {
		if (e instanceof ResponseError) {
			console.log(await e.response.json());
		}
		console.log(e);
	}
}
