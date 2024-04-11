export const DELETE = async ({ locals, params }) => {
	const id = Number(params.id);
	try {
		await locals.currentInstance.currentPrismaClient.cost.delete({
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
