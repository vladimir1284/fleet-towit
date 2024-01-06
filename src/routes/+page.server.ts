import { redirect } from '@sveltejs/kit';
import { page } from '$app/stores';
import type { LayoutServerLoad, PageServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
  const session = await event.locals.getSession();
  if (!session?.user) throw redirect(307, '/signin');
  return {};
};