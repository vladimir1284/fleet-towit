import { bypassPrisma } from '$lib/prisma';
import pkg from '@prisma/client';
const { Role } = pkg;
type createTenantType = { name: string; email?: string | null };
type createUserType = { email: string; tenantId: number; userRole?: Role; is_default?: boolean };
type editTenantType = createTenantType & { tenantId: number };
type editUserType = createUserType & { tenantUserId: number };

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
	userRole = Role.STAFF,
	is_default
}: createUserType) => {
	let user = await bypassPrisma.user.findUnique({ where: { email: email } });
	if (!user) {
		user = await bypassPrisma.user.create({ data: { email: email } });
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

export const deleteTenant = async ({ tenantId }: { tenantId: number }) => {
	await bypassPrisma.tenant.delete({ where: { id: tenantId } });
	return true;
};

export const deleteUser = async ({ tenantUserId }: { tenantUserId: number }) => {
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

export const getTenantUser = async ({ tenantUserId }: { tenantUserId: number | undefined }) => {
	if (!tenantUserId) {
		throw new Error('TenantUser ID is required');
	}
	const tenantUser = await bypassPrisma.tenantUser.findUnique({
		where: { id: tenantUserId },
		include: {
			user: true,
			tenant: true
		}
	});

	return tenantUser;
};

export const getTenantOwner = async ({ tenantId }: { tenantId: number | undefined }) => {
	if (!tenantId) {
		throw new Error('Tenant ID is required');
	}
	const ownerTenant = await bypassPrisma.tenantUser.findFirst({
		where: { tenantId: tenantId, role: Role.OWNER },
		include: { user: true }
	});

	return ownerTenant;
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

export const getTenant = async ({ tenantId }: { tenantId: number }) => {
	const tenant = await bypassPrisma.tenant.findUnique({ where: { id: tenantId } });
	return tenant;
};

export const listTenantUsersOnTenant = async ({ tenantId }: { tenantId: number }) => {
	const users = await bypassPrisma.tenantUser.findMany({
		where: { tenantId: tenantId },
		include: {
			user: true,
			tenant: true
		}
	});
	return users;
};

export const listAllTenantUsers = async () => {
	const users = await bypassPrisma.tenantUser.findMany({
		include: {
			user: true,
			tenant: true
		}
	});
	return users;
};

export const getAdminTenant = async () => {
	const tenant = await bypassPrisma.tenant.findFirst({ where: { isAdmin: true } });
	return tenant;
};
