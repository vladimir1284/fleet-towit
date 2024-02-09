import { bypassPrisma } from '$lib/prisma';
import { FormFieldType } from '@prisma/client';

const selectTenantUser = async (userId: string) => {
	const tenantUser = await bypassPrisma.tenantUser.findFirst({
		where: {
			userId: userId
		}
	});

	return tenantUser;
};

const getFieldType = (type: 'text' | 'number') => {
	let fieldType;
	if (type === 'number') fieldType = FormFieldType.NUMBER;
	else fieldType = FormFieldType.TEXT;

	return fieldType;
};

export const fetchCustomFormsByTenantUser = async ({ userId }: { userId: string }) => {
	const tenantUser = await bypassPrisma.tenantUser.findFirst({
		where: {
			userId: userId
		},

		include: {
			customForms: {
				include: {
					fields: true
				}
			}
		}
	});

	return tenantUser?.customForms || [];
};

export const createNewCustomForm = async ({ userId, name }: { userId: string; name: string }) => {
	const tenantUser = await selectTenantUser(userId);

	if (tenantUser) {
		const newForm = await bypassPrisma.customForm.create({
			data: {
				name: name,
				tenantUserId: tenantUser.id
			}
		});

		return newForm;
	}
};

export const fetchCustomFormById = async (userId: string, formId: number) => {
	const tenantUser = await selectTenantUser(userId);

	if (tenantUser) {
		const customForm = await bypassPrisma.customForm.findUnique({
			where: {
				id: formId,
				tenantUserId: tenantUser.id
			},
			include: {
				fields: true
			}
		});

		return customForm;
	}
};

export const addFieldToCustomFrom = async ({
	name,
	formId,
	cardType
}: {
	name: string;
	formId: number;
	cardType: 'number' | 'text';
}) => {
	await bypassPrisma.customField.create({
		data: {
			formId: formId,
			name: name,
			type: getFieldType(cardType)
		}
	});
};

export const deleteCustomForm = async (formId: number, userId: string) => {
	const tenantUser = await selectTenantUser(userId);

	if (tenantUser) {
		await bypassPrisma.customForm.delete({
			where: {
				id: formId,
				tenantUserId: tenantUser.id
			}
		});
	}
};

export const deleteCustomField = async ({
	fieldId,
	formId,
	userId
}: {
	fieldId: number;
	formId: number;
	userId: string;
}) => {
	const tenantUser = await selectTenantUser(userId);

	if (!tenantUser) return;

	const customForm = await bypassPrisma.customForm.findFirst({
		where: {
			id: formId,
			tenantUserId: tenantUser.id
		}
	});

	if (customForm) {
		await bypassPrisma.customField.delete({
			where: {
				id: fieldId,
				formId: customForm.id
			}
		});
	}
};

export const renameCustomForm = async ({
	formId,
	newName,
	userId
}: {
	formId: number;
	newName: string;
	userId: string;
}) => {
	const tenantUser = await selectTenantUser(userId);

	if (!tenantUser) return;

	await bypassPrisma.customForm.update({
		where: {
			id: formId,
			tenantUserId: tenantUser.id
		},
		data: {
			name: newName
		}
	});
};

export const updateCustomField = async ({
	cardId,
	cardType,
	newName,
	userId
}: {
	cardId: number;
	cardType: 'text' | 'number';
	newName: string;
	userId: string;
}) => {
	const tenantUser = await selectTenantUser(userId);

	if (!tenantUser) return;

	await bypassPrisma.customField.update({
		where: {
			id: cardId
		},
		data: {
			type: getFieldType(cardType),
			name: newName
		}
	});
};
