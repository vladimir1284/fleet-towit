import { FormFieldType } from '@prisma/client';
import type { Card, CustomForm, CustomField, CheckOption, PrismaClient } from '@prisma/client';
import { Page } from '$lib/pagination';

interface CustomFields extends CustomField {
	checkOptions: CheckOption[];
}

interface Cards extends Card {
	fields: CustomFields[];
}

/*
 * Create new custom form
 */
export const createCustomForm = async (
	instance: PrismaClient,
	{ tenantId, name }: { tenantId: number; name: string }
) => {
	const newForm = await instance.customForm.create({
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
export const deleteCustomForm = async (
	instance: PrismaClient,
	{
		tenantId,
		formId
	}: {
		formId: number;
		tenantId: number;
	}
) => {
	await instance.customForm.update({
		where: {
			id: formId,
			tenantId: tenantId
		},
		data: {
			isActive: false
		}
	});
};

/*
 *  Return all custom forms
 */
export const fetchCustomFormsByTenant = async (
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
	const customForms = await instance.customForm.findMany({
		skip: (page_number - 1) * results,
		take: results,
		where: {
			tenantId: tenantId,
			isActive: true
		},
		include: {
			cards: {
				include: {
					fields: true
				}
			}
		},
		orderBy: {
			createdAt: 'desc'
		}
	});

	const count = await instance.customForm.count({
		where: {
			tenantId: tenantId,
			isActive: true
		}
	});

	return new Page(customForms, count, results, page_number).toJSON();
};

/*
 *  Retrieve 1 custom form by id
 */
export const retrieveCustomFormById = async (
	instance: PrismaClient,
	{
		tenantId,
		formId
	}: {
		tenantId: number;
		formId: number;
	}
) => {
	const customForm = await instance.customForm.findUnique({
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

export const cloneCustomForm = async (
	instance: PrismaClient,
	{
		form,
		tenantId
	}: {
		form: CustomForm;
		tenantId: number;
	}
) => {
	// deactivate old form
	await instance.customForm.update({
		where: {
			id: form.id,
			tenantId: tenantId
		},
		data: {
			isActive: false
		}
	});

	// copy data
	const cloneCustomForm = JSON.parse(JSON.stringify(form));

	const cloneCards = cloneCustomForm.cards.map((card: Cards) => {
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

	const newForm = await instance.customForm.create({
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
export const renameCustomForm = async (
	instance: PrismaClient,
	{
		formId,
		newName,
		tenantId
	}: {
		formId: number;
		newName: string;
		tenantId: number;
	}
) => {
	await instance.customForm.update({
		where: {
			id: formId,
			tenantId: tenantId
		},

		data: {
			name: newName
		}
	});
};

/*
 * add card to custom form
 */
export const addCardToForm = async (
	instance: PrismaClient,
	{
		tenantId,
		cardName,
		formId,
		fields
	}: {
		tenantId: number;
		cardName: string;
		formId: number;
		fields: string;
	}
) => {
	const parseFields = JSON.parse(fields);

	const createCustomField = [];

	for (const field of parseFields) {
		const customField = {
			name: field.labelName,
			type: field.type,
			required: field.required
		};

		if (field.type === FormFieldType.SINGLE_CHECK) {
			customField.checkOptions = {
				create: [{ name: field.pointPass }, { name: field.pointFail }]
			};
		}

		createCustomField.push(customField);
	}

	await instance.card.create({
		data: {
			formId: formId,
			name: cardName,
			fields: {
				create: createCustomField
			}
		}
	});
};

/*
 * 	delete custom field
 */
export const deleteCardForm = async (
	instance: PrismaClient,
	{
		cardId,
		formId,
		tenantId
	}: {
		cardId: number;
		formId: number;
		tenantId: number;
	}
) => {
	// this step is for security , checking the tenant is the owner
	// of this custom form
	const customForm = await instance.customForm.findFirst({
		where: {
			id: formId,
			tenantId: tenantId
		}
	});

	if (customForm) {
		await instance.card.delete({
			where: {
				id: cardId,
				formId: customForm.id
			}
		});
	}
};

export const updateCardForm = async (
	instance: PrismaClient,
	{
		cardName,
		cardId,
		fields
	}: {
		cardName: string;
		cardId: number;
		fields: string;
	}
) => {
	const parseFields = JSON.parse(fields);

	if (cardId) {
		await instance.card.update({
			where: {
				id: cardId
			},
			data: {
				name: cardName
			},
			include: {
				fields: true
			}
		});

		await instance.customField.deleteMany({
			where: {
				cardId: cardId,
				id: {
					notIn: parseFields
						.filter((el: { id: number }) => el.id)
						.map((el: { id: number }) => el.id)
				}
			}
		});
	}

	for (const field of parseFields) {
		const customField = {
			name: field.labelName,
			type: field.type as FormFieldType,
			required: field.required,
			id: field?.id
		};

		// update old fields
		if (customField.id) {
			const cf = await instance.customField.update({
				where: {
					id: customField.id
				},
				data: {
					name: customField.name,
					type: customField.type,
					required: customField.required
				},
				include: {
					checkOptions: true
				}
			});

			const updateCheck = async (id: number, name: string) => {
				await instance.checkOption.update({
					where: {
						id: id
					},
					data: {
						name: name
					}
				});
			};

			if (cf.type === FormFieldType.SINGLE_CHECK) {
				// SINGLE_CHECK only has 2 checkOptions

				// if has 2 checkOptions update
				if (cf.checkOptions.length === 2) {
					await updateCheck(cf.checkOptions[0].id, field.pointPass);
					await updateCheck(cf.checkOptions[1].id, field.pointFail);
					// if not has checkOptions create
				} else {
					await instance.customField.update({
						where: {
							id: customField.id
						},
						data: {
							checkOptions: {
								create: [
									{
										name: field.pointPass
									},
									{
										name: field.pointFail
									}
								]
							}
						}
					});
				}

				// delete checkOptions
			} else {
				for (const checkoption of cf.checkOptions) {
					await instance.checkOption.delete({
						where: {
							id: checkoption.id
						}
					});
				}
			}
			// create new fields
		} else {
			await instance.customField.create({
				data: {
					cardId: cardId,
					name: customField.name,
					type: customField.type,
					checkOptions: {
						create:
							FormFieldType.SINGLE_CHECK === customField.type
								? [
										{
											name: field.pointPass
										},
										{
											name: field.pointFail
										}
									]
								: undefined
					}
				}
			});
		}
	}
};
