import type { RequestHandler } from '@sveltejs/kit';

// GET: /api/inventory/parts/[partId]
export const GET: RequestHandler = async ({ params, locals }): Promise<Response> => {
	const currentPrismaClient = locals.currentPrismaClient;
	const partOrError = await currentPrismaClient.part.findUniqueOrThrow({
		where: {
			id: params.partId
		}
	});
	return new Response(JSON.stringify(partOrError), { status: 200 });
};

// DELETE: /api/inventory/parts/[partId]
export const DELETE: RequestHandler = async ({ params, locals }): Promise<Response> => {
	const currentPrismaClient = locals.currentPrismaClient;
	const deletedInventoryPart = await currentPrismaClient.part.delete({
		where: {
			id: params.partId
		}
	});
	return new Response(JSON.stringify(deletedInventoryPart), { status: 200 });
};
