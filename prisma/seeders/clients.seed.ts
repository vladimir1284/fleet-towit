const seedClients = async (prisma) => {
	console.log('Seeding clients data...');
	const tenants = await prisma.tenant.findMany();

	await prisma.client.create({
		data: {
			name: 'Random guy 1',
			email: 'zxczx@gmail.com',
			phoneNumber: '+8 (737) 236-5655',
			tenantId: tenants[1].id
		}
	});

	await prisma.client.create({
		data: {
			name: 'Gandom ruy 2',
			email: 'ynjuyj@gmail.com',
			phoneNumber: '+8 (737) 236-4455',
			tenantId: tenants[1].id
		}
	});

	await prisma.client.create({
		data: {
			name: 'Guy random 3',
			email: 'client3@gmail.com',
			phoneNumber: '+8 (737) 986-5655',
			tenantId: tenants[1].id
		}
	});

	console.log('Seeding complete!');
};

export default seedClients;
