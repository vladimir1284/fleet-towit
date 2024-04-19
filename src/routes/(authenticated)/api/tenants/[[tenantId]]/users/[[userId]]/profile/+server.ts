import { zod } from 'sveltekit-superforms/adapters';
import { actionResult, setError, superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';
import { editUser } from '$lib/actions/user';
import { minioClient } from '$lib/minio';

import type { RequestHandler } from '@sveltejs/kit';

const editUserSchema = z.object({
	id: z.string().optional(),
	name: z.string().optional(),
	email: z.string().email(),
	image: z.string().optional()
});

export const POST: RequestHandler = async ({ locals, request }) => {
	const session = await locals.getSession();

	const formData = await request.formData();
	const form = await superValidate(formData, zod(editUserSchema));
	const file = formData.get('imageData');
	if (!form.valid) {
		return actionResult('failure', { form }, { status: 400 });
	}
	try {
		if (file instanceof File && file.size) {
			const buff = Buffer.from(await file.arrayBuffer());
			console.log('start upload');
			await minioClient.putObject('develop', `/users/${form.data.id}/${file.name}`, buff);
		}
		await editUser({
			userId: session.user.id,
			email: form.data.email,
			name: form.data.name,
			image: form.data.image
		});
		return actionResult('success', { form }, { status: 200 });
	} catch (e) {
		console.log('Error sending file', e);
		form.valid = false;
		setError(form, 'Error sending the file');
		return actionResult('failure', { form }, { status: 400 });
	}
};
