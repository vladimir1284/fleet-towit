import { superValidate } from 'sveltekit-superforms/server';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types.js';
import {  createCompanyUser, listAllCompanyUsers, updateCompanyUser, getCompanyUser} from '$lib/actions/admin.js';
import { Role } from '@prisma/client';
import { z } from 'zod';

const fixSchema = z.object({
  role: z.enum(['STAFF', 'ADMIN', 'OWNER']),
  email: z.string().email(),
  companyId: z.string(),
  id: z.string().optional()
})
type fixSchemaType = z.infer<typeof fixSchema> 


export const load = (async ({params}) => {
    let form = await superValidate(fixSchema);
    if(params.userId){
        const user = await getCompanyUser({companyUserId: params.userId || ''})
        const data: fixSchemaType = {email: user.user?.email || '', role: user.role || 'STAFF', id: user.id, companyId: user.companyId || ''} 
        form = await superValidate(data, fixSchema); 
    }

    return {form: form} 

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
            await createCompanyUser({
              email: form.data.email,
              companyId: form.data.companyId,
              userRole: Role[form.data.role]
            })
            form.valid = true
        }else {
            await updateCompanyUser({
                companyUserId: form.data.id,
                email: form.data.email,
                companyId: form.data.companyId,
                userRole: Role[form.data.role]
              })
            form.valid = true
        }
        const userCompanyList = await listAllCompanyUsers();
        return {form, users: userCompanyList}
    } 
}




