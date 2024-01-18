import { superValidate } from 'sveltekit-superforms/server';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types.js';
import { CompanySchema } from '$lib/zod/index';
import { listCompanies, createCompany } from '$lib/actions/admin.js';

const ExtendCompanySchema = CompanySchema.extend({ id: CompanySchema.shape.id.optional() })  

export const load = (async () => {
    const form = await superValidate(CompanySchema);
    const companies = await listCompanies();
    return { form: form, companies: companies } 

  }) satisfies PageServerLoad

export const actions = {
    default: async ({request}) => {
      const form = await superValidate(request, ExtendCompanySchema);
      console.log(form)
        if (!form.valid) {
            console.log('validation fail')
            return fail(400, { form });
          }
        console.log('validation passed')
        form.valid = true
        await createCompany({name: form.data.name, email: form.data.email})
        const companies = await listCompanies();
        return {form, companies}
    } 
}




