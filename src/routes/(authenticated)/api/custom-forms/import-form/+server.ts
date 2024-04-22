import type { RequestHandler } from '@sveltejs/kit';
import type { PrismaClient } from '@prisma/client';

export const POST: RequestHandler = async ({ locals, request }) => {
	const session = await locals.getSession();

	if (!session?.user) {
		return new Response('Forbidden', { status: 403 });
	}

	const resp = await request.json();
	const form = resp.form;

	try {
		const tenantUserId = session.user.defaultTenantUser.tenantId;

		await importForm(locals.currentInstance.currentPrismaClient, tenantUserId, form);

		return new Response('Ok', { status: 200 });
	} catch (error) {
		console.log(error);
		return new Response('Failed', { status: 400 });
	}
};

const importForm = async (instance: PrismaClient, tenantId: number, formString: string) => {
	const customForms = JSON.parse(formString);

	if (Array.isArray(customForms)) {
		for (const form of customForms) await createForm(instance, form, tenantId);
	} else await createForm(instance, customForms, tenantId);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createForm = async (instance: PrismaClient, form: any, tenantId: number) => {
	await instance.customForm.create({
		data: {
			name: form.name,
			tenantId: tenantId,
			cards: {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				create: form.cards.map((card: { name: string; fields: any }) => {
					return {
						name: card.name,
						fields: {
							create: card.fields
						}
					};
				})
			}
		}
	});
};
