import * as Minio from 'minio';

import { S3_SERVER, S3_ACCESS_KEY, S3_SECRET_KEY } from '$env/static/private';

export const minioClient = new Minio.Client({
	endPoint: S3_SERVER,
	useSSL: false,
	accessKey: S3_ACCESS_KEY,
	secretKey: S3_SECRET_KEY,
	port: 9000
});
