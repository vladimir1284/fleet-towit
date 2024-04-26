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
				const error = await e.response.json();
				if (error.message.startsWith('Invalid catalog for tenant : ') && error.code == 2080) {
					console.log(
						`Error 2080: ${error.message} (MAYBE : Generated catalog's name does not match the name of the tenant to which it points)`
					);
				} else console.log(error);
			} else console.log(await e.response.text());
		} else {
			console.log(e);
		}
	}
}
