import { tenantPrisma } from '$lib/prisma';
import { FormFieldType } from '@prisma/client';
import type { CustomForm } from '@prisma/client';

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
					cards: true
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
			cards: {
				include: {
					fields: {
						include: {
							checkOptions: true
						}
					}
				}
			},
			inspections: true
		}
	});

	return customForm;
};

// FIXME
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

	const cloneCards = cloneCustomForm.cards.map((card) => {
		return {
			name: card.name,
			fields: {
				create: card.fields.map((field) => {
					return {
						name: field.name,
						type: field.type,
						checkOptions: {
							create: field.checkOptions?.map((opt) => ({ name: opt.name }))
						}
					};
				})
			}
		};
	});

	const newForm = await tenantPrisma(tenantId).customForm.create({
		data: {
			name: cloneCustomForm.name,
			tenantId: cloneCustomForm.tenantId,
			cards: {
				create: cloneCards
			}
		},
		include: {
			cards: {
				include: {
					fields: {
						include: {
							checkOptions: true
						}
					}
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
 * add card to custom form
 */
export const addCardToForm = async ({
	tenantId,
	cardName,
	formId,
	fields
}: {
	tenantId: number;
	cardName: string;
	formId: number;
	fields: string;
}) => {
	const parseFields = JSON.parse(fields);

	const createCustomField = [];

	for (const field of parseFields) {
		const customField = {
			name: field.labelName,
			type: field.type
		};

		if (field.type === FormFieldType.SINGLE_CHECK) {
			customField.checkOptions = {
				create: [{ name: field.pointPass }, { name: field.pointFail }]
			};
		}

		createCustomField.push(customField);
	}

	try {
		await tenantPrisma(tenantId).card.create({
			data: {
				formId: formId,
				name: cardName,
				fields: {
					create: createCustomField
				}
			}
		});
	} catch (err) {
		console.log(err);
	}
};

/*
 * 	delete custom field
 */
export const deleteCard = async ({
	cardId,
	formId,
	tenantId
}: {
	cardId: number;
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
		await tenantPrisma(tenantId).card.delete({
			where: {
				id: cardId,
				formId: customForm.id
			}
		});
	}
};