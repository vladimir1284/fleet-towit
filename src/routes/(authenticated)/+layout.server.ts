import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';


export const load: LayoutServerLoad = async (event) => {
    const session = await event.locals.getSession();
    if (!session?.user) throw redirect(307, '/signin');
    return {session};
  };