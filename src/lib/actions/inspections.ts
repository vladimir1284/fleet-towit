import { fetchCustomFormsByTenant } from '$lib/actions/custom-forms';
import type { PrismaClient } from '@prisma/client';

/*
 *	Get all inspections
 */
export const fetchInspections = async (
	instance: PrismaClient,
	{ tenantId }: { tenantId: number }
) => {
	const inspections = await instance.inspection.findMany({
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

	return inspections;
};

/*
 *  Helper
 */
export const fetchListFormsAndVehicles = async (
	instance: PrismaClient,
	{ tenantId }: { tenantId: number }
) => {
	const customForms = await fetchCustomFormsByTenant(instance, { tenantId: tenantId });
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
		tenantId,
		id
	}: {
		tenantId: number;
		id: number;
	}
) => {
	const inspection = await instance.inspection.findFirst({
		where: {
			id: id
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
export const createResponseToInspection = async (
	instance: PrismaClient,
	{
		form_data,
		userId,
		tenantId,
		inspectionId
	}: {
		form_data: object;
		userId: string;
		tenantId: number;
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
		} else {
			data.push({
				fieldId: fieldId,
				content: value.toString(),
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
