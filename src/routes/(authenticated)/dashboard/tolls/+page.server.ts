import { superValidate } from 'sveltekit-superforms/server';
import type { PageServerLoad } from './$types.js';
import { z } from 'zod';

const fixSchema = z.object({
    amount: z.number().gte(0),
    vehicleId: z.number(),
    contractId: z.number(),
    stage: z.enum(['PAID', 'UNPAID']),
    invoice: z.string().optional(),
    invoiceNumber: z.string().optional(),
    createDate: z.date(),
    note: z.string().optional()
});

export const load = (async () => {
    const form = await superValidate(fixSchema);

    return { form: form };
}) satisfies PageServerLoad;
