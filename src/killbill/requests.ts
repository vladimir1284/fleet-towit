/* tslint:disable */
/* eslint-disable */
import {
	AccountApi,
	AdminApi,
	BundleApi,
	CatalogApi,
	CreditApi,
	CustomFieldApi,
	ExportApi,
	InvoiceApi,
	InvoiceItemApi,
	InvoicePaymentApi,
	NodesInfoApi,
	OverdueApi,
	PaymentApi,
	PaymentGatewayApi,
	PaymentMethodApi,
	PaymentTransactionApi,
	PluginInfoApi,
	SecurityApi,
	SubscriptionApi,
	TagApi,
	TagDefinitionApi,
	TenantApi,
	UsageApi
} from './api/apis';
import type {} from '@prisma/client';

import { Configuration } from './api/runtime';
import { Config, apiConfig, pris } from './config';
import { getTenantKS } from './tenants/tenants';
import { tenantActor } from '$lib/store/context-store';

// funcion de prueba mientras el tenant sea necesario y el xstate machine no me funcione
function getCurrentTenantBySessionStorage(): object {
	const currentTenantItem = sessionStorage.getItem('currentTenant');

	if (currentTenantItem) return JSON.parse(currentTenantItem);
	return {
		id: -1,
		role: 'fake',
		tenantId: -1,
		userId: '-1',
		is_default: true,
		email: 'fake',
		isAdmin: false,
		name: 'fake'
	};
}

/**
 * Initializes an API instance based on the provided constructor.
 * @param apiConstructor The constructor for the specific API type.
 * @returns A Promise resolving to the initialized API instance or null if tenant has en error.
 */

async function initializeApi<T>(apiConstructor: new (config: Configuration) => T): Promise<T> {
	return new apiConstructor(apiConfig);

	// const currentTenant: any | null = tenantActor.getSnapshot().context.currentTenant;
	const currentTenant: any | null = getCurrentTenantBySessionStorage();

	const tenant: any | null = await pris.tenant.findFirst({
		where: {
			id: currentTenant?.id
		}
	});
	if (!tenant) {
		// return null;
		throw new Error('Tenant not found');
	}
	const tKS = await getTenantKS(tenant);
	const config = new Configuration(new Config(tKS.apiKey, tKS.apiSecret));
	return new apiConstructor(config);
}

// return objects with configs, headers and tenantID for cleaned requests
export const reqAccountApi: AccountApi = await initializeApi(AccountApi);
export const reqAdminApi: AdminApi = await initializeApi(AdminApi);
export const reqBundleApi: BundleApi = await initializeApi(BundleApi);
export const reqCatalogApi: CatalogApi = await initializeApi(CatalogApi);
export const reqCreditApi: CreditApi = await initializeApi(CreditApi);
export const reqCustomFieldApi: CustomFieldApi = await initializeApi(CustomFieldApi);
export const reqExportApi: ExportApi = await initializeApi(ExportApi);
export const reqInvoiceApi: InvoiceApi = await initializeApi(InvoiceApi);
export const reqInvoiceItemApi: InvoiceItemApi = await initializeApi(InvoiceItemApi);
export const reqInvoicePaymentApi: InvoicePaymentApi = await initializeApi(InvoicePaymentApi);
export const reqNodesInfoApi: NodesInfoApi = await initializeApi(NodesInfoApi);
export const reqOverdueApi: OverdueApi = await initializeApi(OverdueApi);
export const reqPaymentApi: PaymentApi = await initializeApi(PaymentApi);
export const reqPaymentGatewayApi: PaymentGatewayApi = await initializeApi(PaymentGatewayApi);
export const reqPaymentMethodApi: PaymentMethodApi = await initializeApi(PaymentMethodApi);
export const reqPaymentTransactionApi: PaymentTransactionApi =
	await initializeApi(PaymentTransactionApi);
export const reqPluginInfoApi: PluginInfoApi = await initializeApi(PluginInfoApi);
export const reqSecurityApi: SecurityApi = await initializeApi(SecurityApi);
export const reqSubscriptionApi: SubscriptionApi = await initializeApi(SubscriptionApi);
export const reqTagApi: TagApi = await initializeApi(TagApi);
export const reqTagDefinitionApi: TagDefinitionApi = await initializeApi(TagDefinitionApi);
export const reqTenantApi: TenantApi = await initializeApi(TenantApi);
export const reqUsageApi: UsageApi = await initializeApi(UsageApi);
