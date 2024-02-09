import { tenantPrisma } from '$lib/prisma';
import { FormFieldType } from '@prisma/client';

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
 * Delete custom form
 */
export const deleteCustomForm = async ({
	tenantId,
	formId
}: {
	formId: number;
	tenantId: string;
}) => {
	await tenantPrisma(tenantId).customForm.delete({
		where: {
			id: formId
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
			fields: true
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

const getFieldType = (type: 'text' | 'number') => {
	let fieldType;
	if (type === 'number') fieldType = FormFieldType.NUMBER;
	else fieldType = FormFieldType.TEXT;
	return fieldType;
};

/*
 *	add field to custom form
 */
export const addFieldToCustomFrom = async ({
	name,
	formId,
	cardType,
	tenantId
}: {
	name: string;
	formId: number;
	cardType: 'number' | 'text';
	tenantId: string;
}) => {
	await tenantPrisma(tenantId).customField.create({
		data: {
			formId: formId,
			name: name,
			type: getFieldType(cardType)
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
	tenantId
}: {
	cardId: number;
	cardType: 'text' | 'number';
	newName: string;
	tenantId: string;
}) => {
	await tenantPrisma(tenantId).customField.update({
		where: {
			id: cardId
		},
		data: {
			type: getFieldType(cardType),
			name: newName
		}
	});
};
