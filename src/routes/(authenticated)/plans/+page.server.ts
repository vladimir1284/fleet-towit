import { superValidate } from 'sveltekit-superforms/server';
import type { PageServerLoad } from './$types.js';
import { z } from 'zod';

const fixSchema = z.object({
    name: z.string(),
    amount: z.number(),
    periodicity: z.enum(["WEEKLY", "BIWEEKLY", "MONTHLY"]),
    id: z.number().optional()
});

export const load = (async () => {
    const form = await superValidate(fixSchema);

    return { form: form };
}) satisfies PageServerLoad;
