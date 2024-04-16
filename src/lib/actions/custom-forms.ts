import { FormFieldType } from '@prisma/client';
import type { CustomForm, PrismaClient } from '@prisma/client';

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
		formId
	}: {
		formId: number;
	}
) => {
	await instance.customForm.update({
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
export const fetchCustomFormsByTenant = async (
	instance: PrismaClient,
	{ tenantId }: { tenantId: number }
) => {
	const tenant = await instance.tenant.findFirst({
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
export const retrieveCustomFormById = async (
	instance: PrismaClient,
	{
		tenantId
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

// FIXME
export const cloneCustomForm = async (
	instance: PrismaClient,
	{
		form
	}: {
		form: CustomForm;
	}
) => {
	// deactivate old form
	await instance.customForm.update({
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
		newName
	}: {
		formId: number;
		newName: string;
	}
) => {
	await instance.customForm.update({
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
export const addCard = async (
	instance: PrismaClient,
	{
		cardName,
		formId,
		fields
	}: {
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
			type: field.type
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


export const updateCard = async (instance: PrismaClient, {
	tenantId,
	cardName,
	cardId,
	fields
}: {
	tenantId: number;
	cardName: string;
	cardId: number;
	fields: string;
}) => {
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

/*
 * 	delete custom field
 */
export const deleteCard = async (
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
