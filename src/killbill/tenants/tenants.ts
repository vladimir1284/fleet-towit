import type { Tenant } from '@prisma/client';
import { TenantApi } from '../api/apis';
import type { Tenant as KBTenant } from '../api/models/Tenant';
import { apiConfig, pris } from '../config';
import { ResponseError } from '../api/runtime';

export async function getTenantKS(t: Tenant): Promise<{ apiKey: string; apiSecret: string }> {
	const apiKey = `TestT-${t.name}`;
	const apiSecret = `Secret-${t.name}`;
	return {
		apiKey,
		apiSecret
	};
}

export async function getKBTenant(t: Tenant): Promise<KBTenant> {
	const tKS = await getTenantKS(t);

	const tenantApi = new TenantApi(apiConfig);
	return await tenantApi.getTenantByApiKey({
		apiKey: tKS.apiKey
	});
}

export async function syncTenants() {
	console.log('>>> Tenants');
	const tenants = await pris.tenant.findMany();

	const tenantApi = new TenantApi(apiConfig);
	for (let i = 0; i < tenants.length; i++) {
		const t = tenants[i];
		const tKS = await getTenantKS(t);
		try {
			const kbTenant: KBTenant = {
				externalKey: t.id.toString(),
				apiKey: tKS.apiKey,
				apiSecret: tKS.apiSecret
			};
			await tenantApi.createTenantRaw({
				body: kbTenant,
				xKillbillCreatedBy: 'admin',
				useGlobalDefault: true
			});
		} catch (e) {
			if (e instanceof ResponseError) {
				console.log(await e.response.json());
			}
			console.log(e);
		}
	}
}
