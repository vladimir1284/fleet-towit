import { tenantPrisma } from '$lib/prisma';
import { fetchCustomFormsByTenant } from '$lib/actions/custom-forms';

/*
 *	Get all inspections
 */
export const fetchInspections = async ({ tenantId }: { tenantId: number }) => {
	const inspections = await tenantPrisma(tenantId).inspection.findMany({
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
export const fetchListFormsAndVehicles = async ({ tenantId }: { tenantId: number }) => {
	const customForms = await fetchCustomFormsByTenant({ tenantId: tenantId });
	const listCustomForm = customForms.map((el) => ({ value: el.id, name: el.name }));

	const vehicles = await tenantPrisma(tenantId).vehicle.findMany();
	const listVehicles = vehicles.map((el) => ({ value: el.id, name: el.type }));

	return { listCustomForm, listVehicles };
};

/*
 *	Create inspections
 */
export const createInspection = async ({
	tenantId,
	userId,
	formId,
	vehicleId
}: {
	tenantId: number;
	userId: string;
	formId: number;
	vehicleId: number;
}) => {
	const tenantUser = await tenantPrisma(tenantId).tenantUser.findFirst({
		where: {
			userId: userId
		}
	});

	if (!tenantUser) return;

	const newInspection = await tenantPrisma(tenantId).inspection.create({
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
export const retrieveInspectionById = async ({
	tenantId,
	id
}: {
	tenantId: number;
	id: number;
}) => {
	const inspection = await tenantPrisma(tenantId).inspection.findFirst({
		where: {
			id: id
		},
		include: {
			customForm: {
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
			},
			responses: true,
			vehicle: {
				include: {
					plates: {
						where: {
							isActive: true
						}
					}
				}
			}
		}
	});

	console.log(inspection);
	console.log(inspection.vehicle?.plates[0].plate);
	return inspection;
};

/*
 * Create inspections response
 */
export const createResponseToInspection = async ({
	form_data,
	userId,
	tenantId,
	inspectionId
}: {
	form_data: object;
	userId: string;
	tenantId: number;
	inspectionId: number;
}) => {
	const tenantUser = await tenantPrisma(tenantId).tenantUser.findFirst({
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
		checked?: boolean;
		note?: string;
	}[] = [];

	for (const [key, value] of Object.entries(form_data)) {
		const fieldId = Number(key.split('_')[1]);

		// if checkbox
		if (key.includes('checkbox')) {
			const checkboxId = Number(key.split('_')[3]);

			data.push({
				fieldId: fieldId,
				checkOptionId: checkboxId,
				checked: value as boolean,
				tenantUserId: tenantUser.id
			});
			// in radio (single check) only check 1 field from all fields
		} else if (key.includes('radio')) {
			data.push({
				fieldId: fieldId,
				checkOptionId: value as number,
				checked: true,
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

	const response = await tenantPrisma(tenantId).inspection.update({
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
