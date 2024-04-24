import type { PrismaClient } from '@prisma/client';
import pkg from '@prisma/client';
const { Role } = pkg;

type createUserType = { tenantId: number; email: string; role?: Role };

export const createNewUser = async (
	instance: PrismaClient,
	{ tenantId, email, role = Role.STAFF }: createUserType
) => {
	const tenant = await instance.tenant.findUnique({ where: { id: tenantId } });
	let user = await instance.user.findUnique({ where: { email: email } });
	if (!user) {
		user = await instance.user.create({ data: { email: email } });
	}
	const tenantUser = await instance.tenantUser.create({
		data: {
			tenantId: tenantId,
			userId: user.id,
			role: role
		}
	});
	return { ...tenantUser, user, tenant };
};

export const getTenantUsers = async (
	instance: PrismaClient,
	{ tenantId }: { tenantId: number }
) => {
	const basetenantUsers = await instance.tenantUser.findMany();
	return basetenantUsers;
};
