import { z } from 'zod';
import { zod } from 'sveltekit-superforms/adapters';
import type { RequestHandler } from '@sveltejs/kit';
import { deleteNote } from '$lib/actions/contracts_notes';
import { actionResult, setError, superValidate } from 'sveltekit-superforms/server';
import { getContractNotes, pushNote } from '$lib/actions/contracts_notes';
import { minioClient } from '$lib/minio';

const noteSchema = z.object({
	id: z.number().optional(),
	subject: z.string(),
	body: z.string(),
	remainder: z.date().optional(),
	file: z.string().optional()
});

export const GET: RequestHandler = async ({ locals, params }) => {
	if (params.contractId) {
		const notes = await getContractNotes(
			locals.currentInstance.currentPrismaClient,
			parseInt(params.contractId)
		);
		return new Response(JSON.stringify(notes));
	} else {
		return new Response('Invalid contractId', { status: 400 });
	}
};

export const POST: RequestHandler = async ({ request, params, locals }) => {
	const session = await locals.getSession();
	const formData = await request.formData();
	const form = await superValidate(formData, zod(noteSchema));
	const file = formData.get('fileData');

	if (form.valid) {
		let note = undefined;
		console.log('ONFORMDATA: ', formData);
		console.log('ONSERVER: ', form);

		note = await pushNote(locals.currentInstance.currentPrismaClient, {
			userId: session.user.id,
			contractId: parseInt(params.contractId),
			id: form?.data.id,
			body: form.data.body,
			subject: form.data.subject,
			remainder: form.data.remainder,
			file: form.data.file
		});

		try {
			if (file instanceof File) {
				const buff = Buffer.from(await file.arrayBuffer());
				if (file.size) {
					console.log('start upload');
					await minioClient.putObject(
						'develop',
						`/contracts/${note.contractId}/notes/${note.id}/${note.file}`,
						buff
					);
					return actionResult('success', { form }, { status: 200 });
				} else {
					return actionResult('success', { form }, { status: 200 });
				}
			} else {
				return actionResult('success', { form }, { status: 200 });
			}
		} catch {
			await deleteNote(locals.currentInstance.currentPrismaClient, note.id);
			setError(form, 'Error sending the file');
			form.valid = false;
			return actionResult('failure', { form }, { status: 400 });
		}
	} else {
		return actionResult('failure', { form }, { status: 400 });
	}
};

export const DELETE: RequestHandler = async ({ params, locals }) => {
	try {
		await deleteNote(
			locals.currentInstance.currentPrismaClient,
			parseInt(params.noteId || '0', 10)
		);
		return new Response(null, { status: 204 });
	} catch (error) {
		console.error(error);
		return new Response('Deletion failed', { status: 400 });
	}
};
