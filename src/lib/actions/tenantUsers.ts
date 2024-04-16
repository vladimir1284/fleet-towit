import { Role } from '@prisma/client';
import { bypassPrisma } from '$lib/prisma';
import type { PrismaClient } from '@prisma/client';

type createTenantUserType = { role: Role; tenantId: number; email: string };
type updateTenantUserType = createTenantUserType & { id: number };

export const createTenantUser = async (
	instance: PrismaClient,
	{ role, tenantId, email }: createTenantUserType
) => {
	let user = await bypassPrisma.user.findUnique({ where: { email: email } });
	if (!user) {
		user = await bypassPrisma.user.create({ data: { email: email } });
	}
	const tenantUser = await instance.tenantUser.create({
		data: {
			role,
			tenantId,
			userId: user.id
		}
	});
	return tenantUser;
};

export const updateTenantUser = async (
	instance: PrismaClient,
	{ id, role, tenantId, email }: updateTenantUserType
) => {
	let user = await bypassPrisma.user.findUnique({ where: { email: email } });
	if (!user) {
		user = await bypassPrisma.user.create({ data: { email: email } });
	}
	const tenantUser = await instance.tenantUser.update({
		where: { id },
		data: { role, tenantId, userId: user.id }
	});

	return tenantUser;
};

export const deleteTenantUser = async (instance: PrismaClient, { id }: { id: number }) => {
	const tenantUser = await instance.tenantUser.findUnique({ where: { id } });
	await instance.tenantUser.delete({
		where: { id }
	});
	const rest = await instance.tenantUser.findMany({ where: { userId: tenantUser?.userId } });
	if (!rest.length && tenantUser) {
		await bypassPrisma.user.delete({ where: { id: tenantUser.userId } });
	}
};

export const listTenantUsers = async (
	instance: PrismaClient,
	{ tenantId = undefined }: { tenantId: number | undefined }
) => {
	if (tenantId) {
		const tenantUsers = await instance.tenantUser.findMany({
			where: { tenantId },
			include: {
				tenant: true,
				user: true
			}
		});
		return tenantUsers;
	} else {
		const tenantUsers = await instance.tenantUser.findMany({
			include: {
				tenant: true,
				user: true
			}
		});
		return tenantUsers;
	}
};

export const updateDefaultTenantUser = async (
	instance: PrismaClient,
	{ id, tenantId, isDefault }: { id: number; tenantId: number; isDefault: boolean }
) => {
	if (isDefault) {
		await instance.tenantUser.updateMany({
			where: {
				tenantId: tenantId,
				id: { not: id }
			},
			data: {
				is_default: false
			}
		});
	}
	const tenantUser = await instance.tenantUser.update({
		where: { id: id },
		data: { is_default: isDefault }
	});

	return tenantUser;
};

export const getTenantUsers = async ({ id }: { id: string }) => {
	const tenantUsers = await bypassPrisma.tenantUser.findMany({
		where: {
			userId: id
		},
		include: {
			tenant: true,
			user: true
		}
	});
	return tenantUsers;
};