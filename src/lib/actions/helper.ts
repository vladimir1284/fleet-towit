import { bypassPrisma, tenantPrisma } from '$lib/prisma';

export const getPrismaInstance = async ({ tenantId }: { tenantId: number }) => {
	const adminTenant = await bypassPrisma.tenant.findFirst({ where: { isAdmin: true } });
	if (adminTenant?.id === tenantId) {
		return bypassPrisma;
	} else {
		return tenantPrisma(tenantId);
	}
};

export const validateRequest = async ({ locals, currentTenant }) => {
	if (!locals?.user) {
		return false;
	}
	const adminTenant = await bypassPrisma.tenant.findFirst({ where: { isAdmin: true } });
	if (adminTenant?.id === currentTenant) {
		return true;
	}
	if (!locals.user.tenantUsers.some((user) => user.tenant === currentTenant)) {
		return false;
	} else {
		return true;
	}
};
