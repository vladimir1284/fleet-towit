import type { Tenant } from '@prisma/client';
import type { Tenant as KBTenant } from '../api/models/Tenant';
import { getTenantKS } from './key';
import { reqTenantApi } from '../requests';

export async function getKBTenant(t: Tenant): Promise<KBTenant> {
	const tKS = await getTenantKS(t);

	return await reqTenantApi.getTenantByApiKey({
		apiKey: tKS.apiKey
	});
}
