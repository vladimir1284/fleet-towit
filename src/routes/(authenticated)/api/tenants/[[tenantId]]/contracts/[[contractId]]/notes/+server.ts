import { getContractNotes, pushNote } from '$lib/actions/contracts_notes';
import type { RequestHandler } from '@sveltejs/kit';
import { mkdir, writeFileSync } from 'fs';
import { actionResult, superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

const UploadDir = 'src/upload';

const noteSchema = z.object({
	id: z.number().optional(),
	subject: z.string(),
	body: z.string(),

	remainder: z.date().optional(),

	file: z.instanceof(Array<File>).optional()
});

export const GET: RequestHandler = async ({ locals, params }) => {
	const session = await locals.getSession();
	if (!session?.user) {
		return new Response('Forbidden', { status: 403 });
	}

	if (params.contractId) {
		const notes = await getContractNotes(parseInt(params.contractId));
		return new Response(JSON.stringify(notes));
	} else {
		return new Response('Invalid contractId', { status: 400 });
	}
};

export const POST: RequestHandler = async ({ request, params, locals }) => {
	const session = await locals.getSession();
	if (!session?.user) {
		return new Response('Forbidden', { status: 403 });
	}

	const fd = await request.formData();
	const form = await superValidate(fd, noteSchema);
	if (form.data.subject == '') {
		form.errors.subject = ['Subject required'];
	}

	const file = fd.get('file') as File | null;
	let fn: string | undefined = undefined;
	if (file != null && file.name != '') {
		fn = `${UploadDir}/${file.name}`;
		writeFileSync(fn, Buffer.from(await file.arrayBuffer()));
	}

	if (!form.valid || !params.contractId) {
		console.log('validation fail', form);
		return actionResult('failure', { form }, { status: 400 });
	}
	await pushNote({
		userId: session.user.id,
		contractId: parseInt(params.contractId),
		id: form.data.id,
		body: form.data.body,
		subject: form.data.subject,
		remainder: form.data.remainder,
		file: fn
	});
	return actionResult('success', { form }, { status: 200 });
};
