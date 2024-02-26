import type { PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms/server';
import { fail } from '@sveltejs/kit';
import { z } from 'zod';
import { minioClient } from '$lib/minio';
import { prisma } from '$lib/prisma';
import { editUser } from '$lib/actions/user';

const editUserSchema = z.object({
	id: z.number().optional(),
	name: z.string().optional().nullable(),
	email: z.string().email(),
	image: z.string().optional().nullable(),
	imageData: z.any().optional()
});

type editUserSchemaType = z.infer<typeof editUserSchema>;

export const load = (async ({ locals }) => {
	let form;
	const session = await locals.getSession();
	if (session?.user?.id) {
		const user = await prisma.user.findUnique({ where: { id: session?.user?.id } });
		const data: editUserSchemaType = {
			id: user?.id,
			name: user?.name,
			email: user?.email || '',
			image: user?.image
		};
		form = await superValidate(data, editUserSchema);
	} else {
		form = await superValidate(editUserSchema);
	}
	return { form };
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();

		const form = await superValidate(formData, editUserSchema);

		if (!form.valid) {
			console.log('validatin fail', form);
			return fail(400, { form });
		}
		const file = formData.get('imageData');
		if (file instanceof File) {
			const buff = Buffer.from(await file.arrayBuffer());
			if (file.size) {
				console.log('start upload');
				await minioClient
					.putObject('develop', `/users/${form.data.id}/${file.name}`, buff)
					.catch((e) => {
						console.log('error re loco', e);
					})
					.finally(async () => {
						console.log('finished');
					});
			}
		}
		await editUser({
			userId: form.data.id || '',
			email: form.data.email,
			name: form.data.name || undefined,
			image: form.data.image || undefined
		});

		return { form };
	}
};
