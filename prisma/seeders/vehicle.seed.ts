import { faker } from '@faker-js/faker';

const seedVehicles = async (prisma) => {
	console.log('Seeding vehicles data...');
	const vehicleTypes = [
		'ATV',
		'Boat',
		'Bus',
		'Car',
		'Chassis',
		'Equipment',
		'Forklift',
		'Freightliner',
		'Generator',
		'Machinery',
		'Motorcycle',
		'Plane',
		'RV',
		'SUV',
		'Tractor',
		'Trailer',
		'Truck',
		'Van',
		'Custom'
	];
	const createdVehiclesIds = [];

	const generateVehicle = () => ({
		type: faker.helpers.arrayElement(vehicleTypes),
		year: faker.date.past().getFullYear(),
		make: faker.vehicle.manufacturer(),
		model: faker.vehicle.model(),
		trim: faker.vehicle.vrm(),
		vin: faker.vehicle.vin(),
		odometer: faker.datatype.number({ min: 0, max: 100000 }),
		nickname: faker.vehicle.manufacturer(),
		spare_tires: faker.number.int(10),
		extraFields: {
			color: faker.color.human(),
			asientos_cuero: faker.datatype.boolean()
		},
		status: 'AVAILABLE',
		vehiclePictures: {
			create: [{ image: faker.image.url() }, { image: faker.image.url() }]
		},
		documents: {
			create: [
				{
					file: faker.internet.url(),
					name: faker.commerce.productName(),
					note: faker.lorem.sentence(),
					document_type: faker.commerce.department(),
					expiration_date: faker.date.future(),
					tags: {
						create: [
							{ name: faker.commerce.productAdjective() },
							{ name: faker.commerce.productMaterial() }
						]
					}
				}
			]
		},
		costs: {
			create: [
				{
					value: faker.number.float(),
					concept: faker.commerce.productDescription(),
					category: {
						create: {
							name: faker.commerce.department()
						}
					},
					date: faker.date.past()
				}
			]
		},
		plates: {
			create: [
				{
					plate: faker.vehicle.vrm(),
					assignDate: faker.date.past(),
					isActive: true
				}
			]
		}
	});

	const numberOfVehicles = 50;
	for (let i = 0; i < numberOfVehicles; i++) {
		const createdVehicle  = await prisma.vehicle.create({
			data: generateVehicle()
		});
		createdVehiclesIds.push(createdVehicle.id)
	}

	console.log('Seeding complete!');
	return createdVehiclesIds
};

export default seedVehicles;
