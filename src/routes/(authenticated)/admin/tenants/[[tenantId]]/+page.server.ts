/* eslint-disable @typescript-eslint/no-explicit-any */
import { superValidate } from 'sveltekit-superforms/server';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { listTenants, createTenant, getTenant, updateTenant } from '$lib/actions/admin.js';
import { z } from 'zod';

const fixSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  id: z.string().optional(),
})

type fixSchemaType = z.infer<typeof fixSchema>

export const load = (async ({ params }:{params:any}) => {
  let form = await superValidate(fixSchema);
  if (params.tenantId) {
    const tenant = await getTenant({ tenantId: params.tenantId || '' });
    const data: fixSchemaType = { email: tenant?.email || '', name: tenant?.name || '', id: tenant?.id }
    form = await superValidate(data, fixSchema);
  }
  const tenants = await listTenants();
  return { form: form, tenants: tenants }

}) satisfies PageServerLoad

export const actions = {
  default: async ({ request }:{request:any}) => {
    const form = await superValidate(request, fixSchema);
    if (!form.valid) {
      console.log('validation fail')
      return fail(400, { form });
    }
    console.log('validation passed')
    if (!form.data.id) {
      await createTenant({ name: form.data.name, email: form.data.email })
      form.valid = true
    } else {
      updateTenant({
        tenantId: form.data?.id || '',
        email: form.data.email,
        name: form.data?.name
      })
      form.valid = true
    }
    const tenants = await listTenants();
    return { form: form, tenants: tenants }
  }
}




