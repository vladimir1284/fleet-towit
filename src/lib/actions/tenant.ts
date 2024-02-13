import { tenantPrisma } from '$lib/prisma';
import { Role } from '@prisma/client';

type createUserType = { tenantId: string; email: string; role?: Role };

export const createNewUser = async ({ tenantId, email, role = Role.STAFF }: createUserType) => {
	const tenantContext = tenantPrisma(tenantId);
	const tenant = await tenantContext.tenant.findUnique({ where: { id: tenantId } });
	let user = await tenantContext.user.findUnique({ where: { email: email } });
	if (!user) {
		user = await tenantContext.user.create({ data: { email: email } });
	}
	const tenantUser = await tenantContext.tenantUser.create({
		data: {
			tenantId: tenantId,
			userId: user.id,
			role: role
		}
	});
	return { ...tenantUser, user, tenant };
};

/*
export const updateTenantUser = async({tenantUserId, email, tenantId, role}: editUserType) => {
    const tenantContext = tenantPrisma(tenantId);
    console.log('tenantUserId',tenantUserId)
    console.log('email',email)
    console.log('tenantId',tenantId)
    console.log('userRole',role)
    let user = await tenantContext.user.findUnique({where:{email: email}})
    if (!user) {
        user = await tenantContext.user.create({data: {email: email}})
    } 
    const tenantUser = await tenantContext.tenantUser.update({where:{id: tenantUserId}, data:{tenantId, role: role, userId: user.id}})
    return tenantUser
}*/

export const getTenantUsers = async ({ tenantId }: { tenantId: string }) => {
	const tenantContext = tenantPrisma(tenantId);
	const basetenantUsers = await tenantContext.tenantUser.findMany();
	return basetenantUsers;
};
