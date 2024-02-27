import { userPrisma, prisma } from '$lib/prisma';

type editUserType = { userId: string; email: string; name?: string; image?: string };

export const getTenantUsers = async ({ userId }: { userId: string }) => {
    const userContext = userPrisma(userId);
    const tenantUsers = await userContext.tenantUser.findMany({
        where: { userId: userId },
        select: {
            id: true,
            userId: true,
            tenantId: true,
            role: true,
            is_default: true,
            tenant: true
        }
    })
    return tenantUsers;
};

export const editUser = async ({ userId, email, name, image }: editUserType) => {
    await prisma.user.update({ where: { id: userId }, data: { email, name, image } });
};
