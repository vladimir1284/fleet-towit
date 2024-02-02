import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { prisma } from '$lib/prisma';
import { getTenantUsers } from '$lib/actions/user';
export const ssr = false;


export const load: LayoutServerLoad = async (event) => {
  const session = await event.locals.getSession();
  if (!session?.user) throw redirect(307, '/signin');
  const users = await getTenantUsers({ userId: session?.user.id || '' });
  if (!users.length) {
    await prisma.user.delete({ where: { id: session.user.id } })
    throw redirect(307, '/logout')
  }
  return { session };
};