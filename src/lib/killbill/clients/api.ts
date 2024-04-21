import { AccountApi } from '../api/apis';
import { Configuration } from '../api/runtime';
import { Config, apiConfig, pris } from '../config';
import { getTenantKS } from '../tenants/tenants';

export async function getAccountApi(tenantID: number): Promise<AccountApi | null> {
	return new AccountApi(apiConfig);
	const tenant = await pris.tenant.findFirst({
		where: {
			id: tenantID
		}
	});
	if (!tenant) return null;
	const tKS = await getTenantKS(tenant);
	return new AccountApi(new Configuration(new Config(tKS.apiKey, tKS.apiSecret)));
}
