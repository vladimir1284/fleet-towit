import { PrismaClient } from '@prisma/client';

export const DELETE = async ({ params }) => {
	const prisma = new PrismaClient();
	const id = Number(params.id);
	try {
		await prisma.cost.delete({
			where: {
				id
			}
		});

		console.log('Record deleted');

		return new Response('Record deleted');
	} catch (error) {
		console.error(error.message);
		return new Response(null, {
			status: 500,
			statusText: error.message
		});
	}
};
