import type { Tenant } from '@prisma/client';

export async function getTenantKS(t: Tenant): Promise<{ apiKey: string; apiSecret: string }> {
	// TODO implement a better key generator
	const apiKey = `TestT-${t.name}`;
	const apiSecret = `Secret-${t.name}`;
	return {
		apiKey,
		apiSecret
	};
}
