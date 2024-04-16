import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';
import { editUser } from '$lib/actions/user';
import { setError, superValidate } from 'sveltekit-superforms/server';
import type { RequestHandler } from '@sveltejs/kit';


const editUserSchema = z.object({
	id: z.string().optional(),
	name: z.string().optional().nullable(),
	email: z.string().email(),
	image: z.string().optional().nullable(),
	imageData: z.any().optional()
});

export const POST: RequestHandler = async({locals, request, params}) => {
    const session = await locals.getSession();
		if (!session?.user) {
			return new Response('Forbidden', { status: 403 });
		}
		const formData = await request.formData();
		const form = await superValidate(formData, zod(editUserSchema));
        const file = formData.get('imageData');
        try {
            if (file instanceof File) {
                const buff = Buffer.from(await file.arrayBuffer());
            }
        }
        catch {

        }
}