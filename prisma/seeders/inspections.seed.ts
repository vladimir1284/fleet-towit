import { faker } from '@faker-js/faker';

const seedInspection = async (prisma, tenantsId: number[]) => {
	console.log('Seeding inspections data...');

	const generateCustomForm = () => ({
		name: faker.commerce.productName(),
		tenantId: faker.helpers.arrayElement(tenantsId),
		fields: {
			create: [
				{
					name: faker.commerce.productAdjective(),
					type: 'SINGLE_CHECK', // Example type, adjust according to your schema
					checkOptions: {
						create: [{ name: 'Yes' }, { name: 'No' }]
					}
				}
				// Add more fields as needed
			]
		}
	});

	const numberOfForms = 50;
	for (let i = 0; i < numberOfForms; i++) {
		await prisma.customForm.create({
			data: generateCustomForm()
		});
	}

	console.log('Seeding complete!');
};

export default seedInspection;
