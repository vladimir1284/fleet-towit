import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(1)
});

export const load = (async () => {
    const form = await superValidate(schema);
    return { form };
});