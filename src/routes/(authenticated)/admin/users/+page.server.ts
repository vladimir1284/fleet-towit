import { superValidate } from 'sveltekit-superforms/server';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types.js';
import { UserSchema } from '$lib/zod/index.js';
import { getAdminCompany, listCompanyUsers, createCompanyUser} from '$lib/actions/admin.js';
import { Role } from '@prisma/client';

export const load = (async () => {
    const adminCompany = await getAdminCompany();
    let userCompanyList = await listCompanyUsers({companyId: adminCompany?.id})
    console.log('sddsads', userCompanyList) 
    const form = await superValidate(UserSchema);
    return { form: form, users: userCompanyList} 

  }) satisfies PageServerLoad

export const actions = {
    default: async ({request}) => {
      const form = await superValidate(request, UserSchema);
      const adminCompany = await getAdminCompany();
      console.log(form)
        if (!form.valid) {
            console.log('validation fail')
            return fail(400, { form });
          }
        console.log('validation passed')
        let user = await createCompanyUser({
          email: form.data.email,
          companyId: adminCompany?.id,
          userRole: Role[form.data.role]
        })
        form.valid = true
        let userCompanyList = await listCompanyUsers({companyId: adminCompany?.id})
        return {form, users: userCompanyList}
    } 
}




