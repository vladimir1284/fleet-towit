import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { getAdminTenant } from '$lib/actions/admin';
import { bypassPrisma } from '$lib/prisma';
import { Role } from '@prisma/client';
import { companyActor } from '$lib/store/context-store';


export const load: LayoutServerLoad = async (event) => {
    companyActor.subscribe((state) => {
        console.log('STATE CHANGED kjasdhkajshdkjahdkua', state);
    });
    const session = await event.locals.getSession();
    const adminTenant = await getAdminTenant()
    const companyUser = await bypassPrisma.tenantUser.findFirst({where: {userId: session?.user?.id, tenantId: adminTenant?.id}})
    if (!(companyUser?.role === Role.ADMIN || companyUser?.role === Role.OWNER)){
        throw redirect(307, '/dashboard')
    }
  };