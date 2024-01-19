import { superValidate } from 'sveltekit-superforms/server';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types.js';
//import { UserSchema, CompanyUserSchema } from '$lib/zod/index.js';
import { getAdminCompany, updateCompanyUser, getCompanyUser} from '$lib/actions/admin.js';
import { Role } from '@prisma/client';
import { z } from 'zod';

let fixSchema = z.object({
  role: z.enum(['STAFF', 'ADMIN', 'OWNER']),
  email: z.string().email(),
  id: z.string().optional(),
})

type fixSchemaType = z.infer<typeof fixSchema> 

export const load = (async ({params}) => {
    const adminCompany = await getAdminCompany();
    

    let user = await getCompanyUser({companyUserId: params.userId})
    let data: fixSchemaType = {email: user.user?.email || '', role: user.role || 'STAFF', id: user.id} 

    const form = await superValidate(data, fixSchema);
    return { form: form} 

  }) satisfies PageServerLoad

export const actions = {
    default: async ({request}) => {
      const form = await superValidate(request, fixSchema);
      const adminCompany = await getAdminCompany();
      console.log(form)
        if (!form.valid) {
            console.log('validation fail')
            return fail(400, { form });
          }
        console.log('validation passed')
        updateCompanyUser({
          companyUserId: form.data.id||'',
          email: form.data.email,
          companyId: adminCompany?.id||'',
          userRole: Role[form.data.role]
        })
        form.valid = true
        throw redirect(307, '/admin/users')
    } 
}




