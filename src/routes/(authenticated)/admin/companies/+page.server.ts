import { superValidate } from 'sveltekit-superforms/server';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types.js';
import { CompanySchema } from '$lib/zod/index';
import { listCompanies, createCompany } from '$lib/actions/admin.js';

export const load = (async () => {
    const form = await superValidate(CompanySchema);
    let companies = await listCompanies();
    return { form: form, companies: companies } 

  }) satisfies PageServerLoad

export const actions = {
    default: async ({request}) => {
      const form = await superValidate(request, CompanySchema);
      console.log(form)
        if (!form.valid) {
            console.log('validation fail')
            return fail(400, { form });
          }
        console.log('validation passed')
        form.valid = true
        let company = await createCompany({name: form.data.name, email: form.data.email})
        let companies = await listCompanies();
        return {form, companies}
    } 
}




