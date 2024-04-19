import type { RequestHandler } from './$types';
import { error, json } from '@sveltejs/kit';
import { minioClient } from '$lib/minio';

export const GET: RequestHandler = async ({ params, url }) => {
	if (!params.file_name) {
		throw error(404, {
			message: 'File not found'
		});
	}

	const inspectionId = url.searchParams.get('inspection');

	const file_url = await minioClient.presignedGetObject(
		'develop',
		`inspections/${inspectionId}/${params.file_name}`
	);

	return json({
		file_url: file_url
	});
};
