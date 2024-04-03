import { superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types.js';
import { z } from 'zod';

const fixSchema = z.object({
	role: z.enum(['STAFF', 'ADMIN', 'OWNER']),
	email: z.string().email(),
	tenantId: z.number(),
	id: z.number().optional()
});

export const load = (async () => {
	const form = await superValidate(zod(fixSchema));

	return { form: form };
}) satisfies PageServerLoad;
