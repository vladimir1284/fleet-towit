import { faker } from '@faker-js/faker';

const seedClients = async (prisma, tenantsId: number[]) => {
	console.log('Seeding clients data...');
	const createdClientsIds = [];

	const generateClient = () => ({
		name: faker.person.fullName(),
		email: faker.internet.email(),
		phoneNumber: faker.phone.number(),
		avatar: faker.image.avatar(),
		tenantId: faker.helpers.arrayElement(tenantsId)
	});

	const numberOfClients = 50;
	for (let i = 0; i < numberOfClients; i++) {
		const createdClient = await prisma.client.create({
			data: generateClient()
		});
		createdClientsIds.push(createdClient.id);
	}

	console.log('Seeding complete!');
	return createdClientsIds;
};

export default seedClients;
