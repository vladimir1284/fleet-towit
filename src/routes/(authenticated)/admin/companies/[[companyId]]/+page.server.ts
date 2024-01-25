import { superValidate } from 'sveltekit-superforms/server';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types.js';
import { listCompanies, createCompany, getCompany, updateCompany } from '$lib/actions/admin.js';
import { z } from 'zod';

const fixSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  id: z.string().optional(),
})

type fixSchemaType = z.infer<typeof fixSchema>

export const load = (async ({ params }) => {
  let form = await superValidate(fixSchema);
  if (params.companyId) {
    const company = await getCompany({ companyId: params.companyId || '' });
    const data: fixSchemaType = { email: company?.email || '', name: company?.name || '', id: company?.id }
    form = await superValidate(data, fixSchema);
  }
  const companies = await listCompanies();
  return { form: form, companies: companies }

}) satisfies PageServerLoad

export const actions = {
  default: async ({ request }) => {
    const form = await superValidate(request, fixSchema);
    if (!form.valid) {
      console.log('validation fail')
      return fail(400, { form });
    }
    console.log('validation passed')
    if (!form.data.id) {
      await createCompany({ name: form.data.name, email: form.data.email })
      form.valid = true
    } else {
      updateCompany({
        companyId: form.data?.id || '',
        email: form.data.email,
        name: form.data?.name
      })
      form.valid = true
    }
    const companies = await listCompanies();
    return { form: form, companies: companies }
  }
}




