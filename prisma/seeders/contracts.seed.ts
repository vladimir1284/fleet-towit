import { faker } from '@faker-js/faker';

const seedContract = async (
	prisma,
	createdClientsIds: number[],
	createdPlansIds: number[],
	createdVehiclesIds: number[]
) => {
	console.log('Seeding contrcts data...');

	const generateContract = () => ({
		client: {
			connect: {
				id: faker.helpers.arrayElement(createdClientsIds)
			}
		},
		rentalPlan: {
			connect: {
				id: faker.helpers.arrayElement(createdPlansIds)
			}
		},
		vehicle: {
			connect: {
				id: 1
			}
		},
		stage: {
			create: {
				stage: 'PENDING',
				date: new Date(Date.now())
			}
		},
		creationDate: new Date(Date.now()),
		activeDate: faker.date.future(),
		endDate: faker.date.future()
	});

	const numberOfContracts = 50;
	for (let i = 0; i < numberOfContracts; i++) {
		await prisma.contract.create({
			data: generateContract()
		});
	}

	console.log('Seeding complete!');
};

export default seedContract;
