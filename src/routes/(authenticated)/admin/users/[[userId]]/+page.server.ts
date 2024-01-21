import { superValidate } from 'sveltekit-superforms/server';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types.js';
import { getAdminCompany, listCompanyUsersOnCompany, createCompanyUser, listCompanies, listAllCompanyUsers, updateCompanyUser, getCompanyUser} from '$lib/actions/admin.js';
import { Role } from '@prisma/client';
import { z } from 'zod';

let fixSchema = z.object({
  role: z.enum(['STAFF', 'ADMIN', 'OWNER']),
  email: z.string().email(),
  companyId: z.string(),
  id: z.string().optional()
})
type fixSchemaType = z.infer<typeof fixSchema> 

export const load = (async ({params}) => {
    let form = await superValidate(fixSchema);
    if(params.userId){
        let user = await getCompanyUser({companyUserId: params.userId || ''})
        let data: fixSchemaType = {email: user.user?.email || '', role: user.role || 'STAFF', id: user.id, companyId: user.companyId || ''} 
        form = await superValidate(data, fixSchema); 
    }
    let userCompanyList = await listAllCompanyUsers();
    let companies = await listCompanies();
    return { form: form, users: userCompanyList, companies: companies} 

  }) satisfies PageServerLoad

export const actions = {
    default: async ({request}) => {
        const formData = await request.formData();
        const form = await superValidate(formData, fixSchema);
        if (!form.valid) {
            console.log('validation fail')
            return fail(400, { form });
          }
        console.log('validation passed')
        if (!form.data.id){
            let user = await createCompanyUser({
              email: form.data.email,
              companyId: form.data.companyId,
              userRole: Role[form.data.role]
            })
            form.valid = true
        }else {
            updateCompanyUser({
                companyUserId: form.data.id,
                email: form.data.email,
                companyId: form.data.companyId,
                userRole: Role[form.data.role]
              })
            form.valid = true
        }
        let userCompanyList = await listAllCompanyUsers();
        return {form, users: userCompanyList}
    } 
}




