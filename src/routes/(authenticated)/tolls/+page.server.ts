import { superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types.js';
import { z } from 'zod';

const fixSchema = z.object({
    amount: z.number().gte(0),
    plateId: z.number(),
    contractId: z.number(),
    stage: z.enum(['PAID', 'UNPAID']).default('UNPAID'),
    invoice: z.string().optional(),
    invoiceNumber: z.string().optional(),
    createDate: z.date(),
    note: z.string().optional()
});

export const load = (async () => {
    const form = await superValidate(zod(fixSchema));

    return { form: form };
}) satisfies PageServerLoad;
