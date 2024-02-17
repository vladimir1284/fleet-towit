import { bypassPrisma } from '$lib/prisma';
import { Role } from '@prisma/client';

type createTenantType = { name: string; email?: string | null };
type createUserType = {
	email: string;
	password: string;
	tenantId: string;
	userRole?: Role;
	is_default?: boolean;
};
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
	password,
	tenantId,
	userRole = Role.STAFF,
	is_default
}: createUserType) => {
	let user = await bypassPrisma.user.findUnique({ where: { email: email } });
	if (!user) {
		user = await bypassPrisma.user.create({
			data: { email, password }
		});
	}
	const tenantUser = await bypassPrisma.tenantUser.create({
		data: {
			userId: user.id,
			tenantId: tenantId,
			role: userRole,
			is_default: is_default
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
	password,
	tenantId,
	userRole
}: editUserType) => {
	let user = await bypassPrisma.user.findUnique({ where: { email: email } });
	if (!user) {
		user = await bypassPrisma.user.create({
			data: { email, password }
		});
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
	const tenantUser = await bypassPrisma.tenantUser.findUnique({
		where: { id: tenantUserId },
		select: {
			id: true,
			role: true,
			tenantId: true,
			userId: true,
			user: true
		}
	});

	return tenantUser;
};

export const listTenants = async () => {
	const tenants = await bypassPrisma.tenant.findMany();
	const augmentedTenants = await Promise.all(
		tenants.map(async (tenant) => {
			let owner;
			const _owner = await bypassPrisma.tenantUser.findFirst({
				where: { tenantId: tenant.id, role: Role.OWNER }
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
	const users = await bypassPrisma.tenantUser.findMany({
		where: { tenantId: tenantId },
		select: {
			id: true,
			role: true,
			userId: true,
			tenantId: true,
			is_default: true,
			user: true
		}
	});
	return users;
};

export const listAllTenantUsers = async () => {
	const users = await bypassPrisma.tenantUser.findMany({
		select: {
			id: true,
			role: true,
			userId: true,
			tenantId: true,
			is_default: true,
			user: true,
			tenant: true
		}
	});
	console.log('listAllTenantUsers', users);
	return users;
};

export const getAdminTenant = async () => {
	const tenant = await bypassPrisma.tenant.findFirst({ where: { isAdmin: true } });
	return tenant;
};
