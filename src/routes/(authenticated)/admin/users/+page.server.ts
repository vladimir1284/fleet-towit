import { superValidate } from 'sveltekit-superforms/server';
import type { PageServerLoad } from './$types.js';
import { z } from 'zod';

const fixSchema = z.object({
  role: z.enum(['STAFF', 'ADMIN', 'OWNER']),
  email: z.string().email(),
  tenantId: z.string(),
  id: z.string().optional()
})


export const load = (async () => {
    const form = await superValidate(fixSchema);

    return {form: form} 

  }) satisfies PageServerLoad





