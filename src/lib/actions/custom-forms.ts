import { bypassPrisma } from '$lib/prisma';
import { FormFieldType } from '@prisma/client';

/*
 * return all forms created by user
 */
export const fetchCustomFormsByUser = async ({ userId }: { userId: string }) => {
	const customForms = await bypassPrisma.customForm.findMany({
		where: {
			user: {
				id: userId
			}
		},
		include: {
			fields: true,
			user: true
		}
	});

	return customForms;
};

/*
 * Create new custom form
 */
export const createNewCustomForm = async ({ userId, name }: { userId: string; name: string }) => {
	const newForm = await bypassPrisma.customForm.create({
		data: {
			name: name,
			userId: userId
		}
	});

	return newForm;
};

/*
 * get details from one custom form
 */
export const fetchOneFormByUser = async (userId: string, formId: number) => {
	const customForm = await bypassPrisma.customForm.findUnique({
		where: {
			id: formId,
			userId: userId
		},
		include: {
			fields: true
		}
	});

	return customForm;
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
	console.log(name, formId, cardType);

	let fieldType;

	if (cardType === 'number') fieldType = FormFieldType.NUMBER;
	else fieldType = FormFieldType.TEXT;

	const newForm = await bypassPrisma.customField.create({
		data: {
			formId: formId,
			name: name,
			type: fieldType
		}
	});
};

/*
 * delete form
 */
export const deleteCustomForm = async (formId: number) => {
	await bypassPrisma.customForm.delete({
		where: {
			id: formId
		}
	});
};
