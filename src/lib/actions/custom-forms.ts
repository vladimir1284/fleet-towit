import { tenantPrisma } from '$lib/prisma';
import { FormFieldType } from '@prisma/client';
import type { CheckOption, CustomForm } from '@prisma/client';

type fieldType = 'number' | 'text' | 'checkboxes' | 'single_check';

/*
 *  The following function are related to CustomForm
 */

/*
 * Create new custom form
 */
export const createCustomForm = async ({ tenantId, name }: { tenantId: number; name: string }) => {
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
	tenantId: number;
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
export const fetchCustomFormsByTenant = async ({ tenantId }: { tenantId: number }) => {
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
	tenantId: number;
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
			},
			inspections: true
		}
	});

	return customForm;
};

export const cloneCustomForm = async ({
	form,
	tenantId
}: {
	form: CustomForm;
	tenantId: number;
}) => {
	// deactivate old form
	await tenantPrisma(tenantId).customForm.update({
		where: {
			id: form.id
		},
		data: {
			isActive: false
		}
	});

	// copy data
	const cloneCustomForm = JSON.parse(JSON.stringify(form));

	const cloneFields = cloneCustomForm.fields.map((field) => {
		return {
			name: field.name,
			type: field.type,
			checkOptions: {
				create: field.checkOptions?.map((opt) => ({ name: opt.name }))
			}
		};
	});

	// create new form
	const newForm = await tenantPrisma(tenantId).customForm.create({
		data: {
			name: cloneCustomForm.name,
			tenantId: cloneCustomForm.tenantId,
			fields: {
				create: cloneFields
			}
		},
		include: {
			fields: {
				include: {
					checkOptions: true
				}
			},
			inspections: true
		}
	});
	return newForm;
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
	tenantId: number;
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

const getFieldType = (FieldType: fieldType) => {
	if (FieldType === 'number') return FormFieldType.NUMBER;

	if (FieldType === 'checkboxes') return FormFieldType.CHECKBOXES;

	if (FieldType === 'single_check') return FormFieldType.SINGLE_CHECK;

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
	cardType: fieldType;
	tenantId: number;
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
	tenantId: number;
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
	cardType: fieldType;
	newName: string;
	tenantId: number;
	checkboxes: (CheckOption | string)[] | undefined;
}) => {
	let idsToSkip: number[] | undefined = checkboxes
		?.filter((el) => typeof el !== 'string')
		.map((el) => el?.id);

	// if card type is not check then delete all checkOptions
	if (cardType !== 'checkboxes' && cardType !== 'single_check') idsToSkip = [];

	await tenantPrisma(tenantId).checkOption.deleteMany({
		where: {
			id: {
				notIn: idsToSkip
			},
			fieldId: cardId
		}
	});

	// update checkboxes
	if (cardType === 'checkboxes' || cardType === 'single_check') {
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
