import { faker } from '@faker-js/faker';

const seedRentalPlans = async (prisma) => {
	console.log('Seeding rental plans data...');
    const createdPlanIds = [];

	const generateRentalPlan = () => ({
		name: faker.commerce.productName(),
		periodicity: faker.helpers.arrayElement(['WEEKLY', 'BIWEEKLY', 'MONTHLY']),
		amount: faker.datatype.number({ min: 100, max: 1000 })
	});

	const numberOfRentalPlans = 50;
	for (let i = 0; i < numberOfRentalPlans; i++) {
		const createdPlan = await prisma.rentalPlan.create({
			data: generateRentalPlan()
		});
        createdPlanIds.push(createdPlan.id)
	}

	console.log('Seeding complete!');
    return createdPlanIds;
};

export default seedRentalPlans;
