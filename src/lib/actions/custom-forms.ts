import { tenantPrisma } from '$lib/prisma';
import { FormFieldType } from '@prisma/client';
import type { CheckOption } from '@prisma/client';

/*
 *  The following function are related to CustomForm
 */

/*
 * Create new custom form
 */
export const createCustomForm = async ({ tenantId, name }: { tenantId: string; name: string }) => {
	const newForm = await tenantPrisma(tenantId).customForm.create({
		data: {
			name: name,
			tenantId: tenantId
		}
	});

	return newForm;
};

/*
 *  Set isActive to false
 */
export const deleteCustomForm = async ({
	tenantId,
	formId
}: {
	formId: number;
	tenantId: string;
}) => {
	await tenantPrisma(tenantId).customForm.update({
		where: {
			id: formId
		},
		data: {
			isActive: false
		}
	});
};

/*
 *  Return all custom forms
 */
export const fetchCustomFormsByTenant = async ({ tenantId }: { tenantId: string }) => {
	const tenant = await tenantPrisma(tenantId).tenant.findFirst({
		where: {
			id: tenantId
		},

		include: {
			customForms: {
				include: {
					fields: true
				},

				where: {
					isActive: true
				}
			}
		}
	});

	return tenant?.customForms || [];
};

/*
 *  Retrieve 1 custom form by id
 */
export const retrieveCustomFormById = async ({
	tenantId,
	formId
}: {
	tenantId: string;
	formId: number;
}) => {
	const customForm = await tenantPrisma(tenantId).customForm.findUnique({
		where: {
			id: formId,
			tenantId: tenantId
		},
		include: {
			fields: {
				include: {
					checkOptions: true
				}
			}
		}
	});

	return customForm;
};

/*
 *  Rename custom form
 */
export const renameCustomForm = async ({
	formId,
	newName,
	tenantId
}: {
	formId: number;
	newName: string;
	tenantId: string;
}) => {
	await tenantPrisma(tenantId).customForm.update({
		where: {
			id: formId
		},

		data: {
			name: newName
		}
	});
};

/*
 *  The following function are related to custom field
 */

const getFieldType = (FieldType: 'text' | 'number' | 'checkboxes') => {
	if (FieldType === 'number') return FormFieldType.NUMBER;

	if (FieldType === 'checkboxes') return FormFieldType.CHECKBOXES;

	return FormFieldType.TEXT;
};

/*
 *	add field to custom form
 */
export const addFieldToCustomForm = async ({
	name,
	formId,
	cardType,
	tenantId,
	checkboxes
}: {
	name: string;
	formId: number;
	cardType: 'number' | 'text' | 'checkboxes';
	tenantId: string;
	checkboxes?: string[];
}) => {
	await tenantPrisma(tenantId).customField.create({
		data: {
			formId: formId,
			name: name,
			type: getFieldType(cardType),
			checkOptions: {
				create: checkboxes?.map((name) => ({ name }))
			}
		}
	});
};

/*
 * 	delete custom field
 */
export const deleteCustomField = async ({
	fieldId,
	formId,
	tenantId
}: {
	fieldId: number;
	formId: number;
	tenantId: string;
}) => {
	// this step is for security , checking the tenant is the owner
	// of this custom form
	const customForm = await tenantPrisma(tenantId).customForm.findFirst({
		where: {
			id: formId,
			tenantId: tenantId
		}
	});

	if (customForm) {
		await tenantPrisma(tenantId).customField.delete({
			where: {
				id: fieldId,
				formId: customForm.id
			}
		});
	}
};

/*
 *  update custom field
 */
export const updateCustomField = async ({
	cardId,
	cardType,
	newName,
	tenantId,
	checkboxes
}: {
	cardId: number;
	cardType: 'text' | 'number' | 'checkboxes';
	newName: string;
	tenantId: string;
	checkboxes: (CheckOption | string)[] | undefined;
}) => {
	let idsToSkip: number[] | undefined = checkboxes
		?.filter((el) => typeof el !== 'string')
		.map((el) => el?.id);

	// if card type is not checkboxe then delete all checkOptions
	if (cardType !== 'checkboxes') idsToSkip = [];

	await tenantPrisma(tenantId).checkOption.deleteMany({
		where: {
			id: {
				notIn: idsToSkip
			},
			fieldId: cardId
		}
	});

	// update checkboxes
	if (cardType === 'checkboxes') {
		const checkBoxesToUpdate: CheckOption[] | undefined = checkboxes?.filter(
			(el) => typeof el !== 'string'
		) as CheckOption[];

		for (const checkbox of checkBoxesToUpdate) {
			await tenantPrisma(tenantId).checkOption.update({
				where: {
					id: checkbox.id
				},
				data: {
					name: checkbox.name
				}
			});
		}
	}

	// update card
	const checkBoxesToCreate = checkboxes?.filter(
		(el) => typeof el === 'string' && el != ''
	) as string[];

	await tenantPrisma(tenantId).customField.update({
		where: {
			id: cardId
		},
		data: {
			type: getFieldType(cardType),
			name: newName,
			checkOptions: {
				create: checkBoxesToCreate?.map((name) => ({ name }))
			}
		},
		include: {
			checkOptions: true
		}
	});
};
