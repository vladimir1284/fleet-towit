import { faker } from '@faker-js/faker';

const seedInspection = async (prisma, tenantsId: number[]) => {
	console.log('Seeding inspections data...');

	const yesOrNot = {
		create: [
			{
				name: 'Si'
			},
			{
				name: 'No'
			}
		]
	};

	const generateCustomForm = async () =>
		await prisma.customForm.create({
			data: {
				name: faker.commerce.productName(),
				tenantId: faker.helpers.arrayElement(tenantsId),
				cards: {
					create: [
						{
							name: 'Whinch',
							fields: {
								create: [
									{
										name: faker.commerce.productAdjective(),
										type: 'SINGLE_CHECK',
										checkOptions: yesOrNot
									},
									{
										name: faker.commerce.productAdjective(),
										type: 'SINGLE_CHECK',
										checkOptions: yesOrNot
									},
									{
										name: faker.commerce.productAdjective(),
										type: 'SINGLE_CHECK',
										checkOptions: yesOrNot
									},
									{
										name: faker.commerce.productAdjective(),
										type: 'NUMBER'
									},
									{
										name: 'Batería Volt',
										type: 'NUMBER'
									}
								]
							}
						}
					]
				}
			}
		});

	const numberOfForms = 50;
	for (let i = 0; i < numberOfForms; i++) {
		await generateCustomForm();
	}

	console.log('Seeding complete!');
};

export default seedInspection;
