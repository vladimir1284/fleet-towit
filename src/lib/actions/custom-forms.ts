import { bypassPrisma } from '$lib/prisma';

/*
 * return all forms created by user
 */
export const fetchCustomFormByUser = async ({ userId }: { userId: string }) => {
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

export const createNewCustomForm = async ({ userId, name }: { userId: string; name: string }) => {
	const newForm = await bypassPrisma.customForm.create({
		data: {
			name: name,
			userId: userId
		}
	});

	return newForm;
};
