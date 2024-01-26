import type { RequestHandler } from '@sveltejs/kit';
import { minioClient } from '$lib/minio';

const baseRoute = 'users/'

export const GET: RequestHandler = async({ params }) => {
    try {
        let data = await minioClient.getPartialObject('develop', `${params.file}`, 0)
        let buffer = Buffer.from(await data.read());
        return new Response(buffer, {status: 200, headers: {'Content-Type': 'application/octet-stream'}})
    } catch {
        return new Response("Not Found", {status: 404})
    }
}