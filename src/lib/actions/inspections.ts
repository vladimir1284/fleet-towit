import { minioClient } from '$lib/minio';
import { Page } from '$lib/pagination';
import type { PrismaClient } from '@prisma/client';

/*
 *	Get all inspections
 */
export const fetchInspections = async (
	instance: PrismaClient,
	{
		tenantId,
		page_number,
		results = 5
	}: {
		tenantId: number;
		page_number: number;
		results?: number;
	}
) => {
	const inspections = await instance.inspection.findMany({
		skip: (page_number - 1) * results,
		take: results,
		where: {
			tenantId: tenantId
		},
		include: {
			customForm: true,
			responses: true
		},
		orderBy: {
			createdAt: 'desc'
		}
	});

	const count = await instance.inspection.count({
		where: {
			tenantId: tenantId
		}
	});

	return new Page(inspections, count, results, page_number).toJSON();
};

/*
 *  Helper
 */
export const fetchListFormsAndVehicles = async (
	instance: PrismaClient,
	{ tenantId }: { tenantId: number }
) => {
	const customForms = await instance.customForm.findMany({
		where: {
			tenantId: tenantId,
			isActive: true
		}
	});
	const listCustomForm = customForms.map((el) => ({ value: el.id, name: el.name }));

	const vehicles = await instance.vehicle.findMany();
	const listVehicles = vehicles.map((el) => ({ value: el.id, name: el.type }));

	return { listCustomForm, listVehicles };
};

/*
 *	Create inspections
 */
export const createInspection = async (
	instance: PrismaClient,
	{
		tenantId,
		userId,
		formId,
		vehicleId
	}: {
		tenantId: number;
		userId: string;
		formId: number;
		vehicleId: number;
	}
) => {
	const tenantUser = await instance.tenantUser.findFirst({
		where: {
			userId: userId
		}
	});

	if (!tenantUser) return;

	const newInspection = await instance.inspection.create({
		data: {
			tenantId: tenantId,
			tenantUserId: tenantUser.id,
			customFormId: formId,
			vehicleId: vehicleId
		}
	});

	return newInspection;
};

/*
 *	Retrieve inspection
 */
export const retrieveInspectionById = async (
	instance: PrismaClient,
	{
		id,
		tenantId
	}: {
		tenantId: number;
		id: number;
	}
) => {
	const inspection = await instance.inspection.findFirst({
		where: {
			id: id,
			tenantId: tenantId
		},
		include: {
			customForm: {
				include: {
					cards: {
						include: {
							fields: {
								include: {
									checkOptions: true,
									responses: {
										where: {
											inspectionId: id
										}
									}
								}
							}
						}
					}
				}
			},
			responses: true,
			vehicle: true
		}
	});

	return inspection;
};

/*
 * Create inspections response
 */

const urltoFile = async (url: string, filename: string) => {
	const mimeType = (url.match(/^data:([^;]+);/) || '')[1];
	const req = await fetch(url);
	const buff = await req.arrayBuffer();
	return new File([buff], filename, { type: mimeType });
};

export const createResponseToInspection = async (
	instance: PrismaClient,
	{
		form_data,
		userId,
		inspectionId
	}: {
		form_data: object;
		userId: string;
		inspectionId: number;
	}
) => {
	const tenantUser = await instance.tenantUser.findFirst({
		where: {
			userId: userId
		}
	});

	if (!tenantUser) return;

	const data: {
		fieldId: number;
		tenantUserId: number;
		checkOptionId?: number;
		content?: string;
		note?: string;
	}[] = [];

	for (const [key, value] of Object.entries(form_data)) {
		const fieldId = Number(key.split('_')[1]);

		// in radio (single check) only check 1 field from all fields
		if (key.includes('radio')) {
			data.push({
				fieldId: fieldId,
				checkOptionId: value as number,
				content: 'checked',
				tenantUserId: tenantUser.id
			});
			// add note to response
		} else if (key.includes('note')) {
			data.map((el) => (el.fieldId === fieldId ? (el.note = value) : el));

			// upload file to minio
		} else if (value instanceof File) {
			const buff = Buffer.from(await value.arrayBuffer());

			await minioClient.putObject('develop', `/inspections/${inspectionId}/${value.name}`, buff);

			data.push({
				fieldId: fieldId,
				content: value.name,
				tenantUserId: tenantUser.id
			});
			// convert from base 64 to file then upload image to minio
		} else if (/^data:image\/png;base64,([A-Za-z0-9+/=])+$/.test(value)) {
			const signature = await urltoFile(value, `signature-${fieldId}.png`);

			const buff = Buffer.from(await signature.arrayBuffer());

			await minioClient.putObject(
				'develop',
				`/inspections/${inspectionId}/${signature.name}`,
				buff
			);

			data.push({
				fieldId: fieldId,
				content: signature.name,
				tenantUserId: tenantUser.id
			});
		} else {
			data.push({
				fieldId: fieldId,
				content: value || value === 0 ? value.toString() : value,
				tenantUserId: tenantUser.id
			});
		}
	}

	const response = await instance.inspection.update({
		where: {
			id: inspectionId
		},
		data: {
			responses: {
				create: data
			}
		}
	});

	return response;
};
