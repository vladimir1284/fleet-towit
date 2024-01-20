import { superValidate } from 'sveltekit-superforms/server';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types.js';
import { getCompany, updateCompany } from '$lib/actions/admin.js';
import { z } from 'zod';

let fixSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  id: z.string().optional(),
})

type fixSchemaType = z.infer<typeof fixSchema> 

export const load = (async ({params}) => {
    let company = await getCompany({ companyId: params.companyId });
    let data: fixSchemaType = {email: company?.email || '', name: company?.name || '', id: company?.id} 

    const form = await superValidate(data, fixSchema);
    return { form: form} 

  }) satisfies PageServerLoad

export const actions = {
    default: async ({request}) => {
      const form = await superValidate(request, fixSchema);
      console.log(form)
        if (!form.valid) {
            console.log('validation fail')
            return fail(400, { form });
          }
        console.log('validation passed')
        updateCompany({
            companyId: form.data?.id||'',
            email: form.data.email,
            name: form.data?.name
        })
        form.valid = true
        throw redirect(307, '/admin/companies')
    } 
}




