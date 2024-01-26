import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { prisma } from '$lib/prisma';
import { getCompanyUsers } from '$lib/actions/user';


export const load: LayoutServerLoad = async (event) => {
  const session = await event.locals.getSession();
  if (!session?.user) throw redirect(307, '/signin');
  const users = await getCompanyUsers({ userId: session?.user.id || '' });
  if (!users.length) {
    await prisma.user.delete({ where: { id: session.user.id } })
    delete session.user;
    throw redirect(307, '/logout')
  }
  return { session };
};