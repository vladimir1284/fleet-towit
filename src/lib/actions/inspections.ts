import { tenantPrisma } from '$lib/prisma';

/*
 *	Get all inspections
 */
export const fetchInspections = async ({ tenantId }: { tenantId: string }) => {
	const inpections = await tenantPrisma(tenantId).inspection.findMany({
		where: {
			tenantId: tenantId
		},
		include: {
			customForm: true,
			responses: {
				include: {
					responses: true
				}
			}
		}
	});

	return inpections;
};

/*
 *	Create inspections
 */
export const createInspection = async ({
	tenantId,
	formId
}: {
	tenantId: string;
	formId: number;
}) => {
	await tenantPrisma(tenantId).inspection.create({
		data: {
			tenantId: tenantId,
			customFormId: formId
		}
	});
};

/*
 *	Retrieve inspection
 */
export const retrieveInspectionById = async ({
	tenantId,
	id
}: {
	tenantId: string;
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
							checkOptions: true
						}
					}
				}
			}
		}
	});

	return inspection;
};

/*
 * Create inspections response
 */
export const createInspectionResponse = async ({
	form_data,
	userId,
	tenantId,
	inspectionId
}: {
	form_data: object;
	userId: string;
	tenantId: string;
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
		tenantUserId: string;
		checkOptionId?: number;
		content?: string;
		checked?: boolean;
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
		} else {
			data.push({
				fieldId: fieldId,
				content: value.toString(),
				tenantUserId: tenantUser.id
			});
		}
	}

	await tenantPrisma(tenantId).inspectionResponse.create({
		data: {
			inspectionId: inspectionId,
			tenantUserId: tenantUser.id,
			responses: {
				create: data
			}
		}
	});
};
