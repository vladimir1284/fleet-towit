/* eslint-disable @typescript-eslint/no-explicit-any */
import { superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types';
import { z } from 'zod';

const fixSchema = z.object({
	name: z.string(),
	email: z.string().email(),
	id: z.number().optional()
});

export const load = (async () => {
	const form = await superValidate(zod(fixSchema));

	return { form: form };
}) satisfies PageServerLoad;
