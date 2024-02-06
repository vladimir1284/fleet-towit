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

export const fetchOneFormById = async (userId: string, formId: number) => {
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

/*
 * add field to custom form
 */
export const addFieldToCustomFrom = async ({
	name,
	formId,
	cardType
}: {
	name: string;
	formId: number;
	cardType: 'number' | 'text';
}) => {
	let fieldType;

	if (cardType === 'number') fieldType = FormFieldType.NUMBER;
	else fieldType = FormFieldType.TEXT;

	await bypassPrisma.customField.create({
		data: {
			formId: formId,
			name: name,
			type: fieldType
		}
	});
};

export const deleteCustomForm = async (formId: number) => {
	await bypassPrisma.customForm.delete({
		where: {
			id: formId
		}
	});
};
