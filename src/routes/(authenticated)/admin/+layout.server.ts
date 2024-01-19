import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { getAdminCompany } from '$lib/actions/admin';
import { bypassPrisma } from '$lib/prisma';
import { Role } from '@prisma/client';


export const load: LayoutServerLoad = async (event) => {
    const session = await event.locals.getSession();
    const adminCompany = await getAdminCompany()
    const companyUser = await bypassPrisma.companyUser.findFirst({where: {userId: session?.user?.id, companyId: adminCompany?.id}})
    if (!(companyUser?.role === Role.ADMIN || companyUser?.role === Role.OWNER)){
        throw redirect(307, '/dashboard')
    }
  };