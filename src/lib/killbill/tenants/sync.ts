import { reqTenantApi } from '../requests';
import type { Tenant as KBTenant } from '../api/models/Tenant';
import { pris } from '../config';
import { ResponseError } from '../api/runtime';
import { getTenantKS } from './key';

const xKillbillCreatedBy = 'admin'; // TODO ver que se hace con esto, fijo o el currentUser

export async function syncTenants() {
	console.log('>>> Tenants');
	const tenants = await pris.tenant.findMany();

	for (let i = 0; i < tenants.length; i++) {
		const t = tenants[i];
		const tKS = await getTenantKS(t);
		try {
			const kbTenant: KBTenant = {
				externalKey: t.id.toString(),
				apiKey: tKS.apiKey,
				apiSecret: tKS.apiSecret
			};
			await reqTenantApi.createTenantRaw({
				body: kbTenant,
				xKillbillCreatedBy,
				useGlobalDefault: true
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
}
