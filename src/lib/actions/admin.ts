import { bypassPrisma } from '$lib/prisma';
import { Role } from '@prisma/client';

type createTenantType = { name: string; email?: string | null };
type createUserType = { email: string; tenantId: string; userRole?: Role };
type editTenantType = createTenantType & { tenantId: string };
type editUserType = createUserType & { tenantUserId: string };

export const createTenant = async ({ name, email = null }: createTenantType) => {
	const obj = await bypassPrisma.tenant.create({
		data: {
			name: name,
			email: email
		}
	});
	return obj;
};

export const createTenantUser = async ({
	email,
	tenantId,
	userRole = Role.STAFF
}: createUserType) => {
	let user = await bypassPrisma.user.findUnique({ where: { email: email } });
	if (!user) {
		user = await bypassPrisma.user.create({ data: { email: email } });
	}
	const tenantUser = await bypassPrisma.tenantUser.create({
		data: {
			userId: user.id,
			tenantId: tenantId,
			role: userRole
		}
	});

	return tenantUser;
};

export const updateTenant = async ({ tenantId, name, email }: editTenantType) => {
	const tenant = await bypassPrisma.tenant.update({
		where: { id: tenantId },
		data: { name: name, email: email }
	});
	return tenant;
};

export const updateTenantUser = async ({
	tenantUserId,
	email,
	tenantId,
	userRole
}: editUserType) => {
	let user = await bypassPrisma.user.findUnique({ where: { email: email } });
	if (!user) {
		user = await bypassPrisma.user.create({ data: { email: email } });
	}
	const tenantUser = await bypassPrisma.tenantUser.update({
		where: { id: tenantUserId },
		data: { tenantId: tenantId, role: userRole, userId: user.id }
	});
	return tenantUser;
};

export const deleteTenant = async ({ tenantId }: { tenantId: string }) => {
	await bypassPrisma.tenant.delete({ where: { id: tenantId } });
	return true;
};

export const deleteUser = async ({ tenantUserId }: { tenantUserId: string }) => {
	const tenantUser = await bypassPrisma.tenantUser.findUnique({ where: { id: tenantUserId } });
	await bypassPrisma.tenantUser.delete({ where: { id: tenantUser?.id } });
	const restTenantUsers = await bypassPrisma.tenantUser.findMany({
		where: { userId: tenantUser?.userId }
	});
	if (!restTenantUsers.length) {
		await bypassPrisma.user.delete({ where: { id: tenantUser?.userId } });
	}
	return true;
};

export const getTenantUser = async ({ tenantUserId }: { tenantUserId: string }) => {
	const tenantUser = await bypassPrisma.tenantUser.findUnique({ where: { id: tenantUserId } });
	const user = await bypassPrisma.user.findUnique({ where: { id: tenantUser?.userId } });
	return { ...tenantUser, user };
};

export const listTenants = async () => {
	const tenants = await bypassPrisma.tenant.findMany();
	const augmentedTenants = await Promise.all(
		tenants.map(async (tenant) => {
			let owner;
			const _owner = await bypassPrisma.tenantUser.findFirst({
				where: { AND: { tenantId: tenant.id, role: Role.OWNER } }
			});
			if (_owner) {
				const user = await bypassPrisma.user.findUnique({ where: { id: _owner.userId } });
				owner = { ..._owner, user };
			} else {
				owner = _owner;
			}
			return { ...tenant, owner };
		})
	);
	return augmentedTenants;
};

export const getTenant = async ({ tenantId }: { tenantId: string }) => {
	const tenant = await bypassPrisma.tenant.findUnique({ where: { id: tenantId } });
	return tenant;
};

export const listTenantUsersOnTenant = async ({ tenantId }: { tenantId: string }) => {
	const _users = await bypassPrisma.tenantUser.findMany({ where: { tenantId: tenantId } });
	const users = await Promise.all(
		_users.map(async (user) => {
			const _user = await bypassPrisma.user.findUnique({ where: { id: user.userId } });
			return { ...user, user: _user };
		})
	);
	return users;
};

export const listAllTenantUsers = async () => {
	const _users = await bypassPrisma.tenantUser.findMany();
	const users = await Promise.all(
		_users.map(async (user) => {
			const _user = await bypassPrisma.user.findUnique({ where: { id: user.userId } });
			const _tenant = await bypassPrisma.tenant.findUnique({ where: { id: user.tenantId } });
			return { ...user, user: _user, tenant: _tenant };
		})
	);
	return users;
};

export const getAdminTenant = async () => {
	const tenant = await bypassPrisma.tenant.findFirst({ where: { isAdmin: true } });
	return tenant;
};
