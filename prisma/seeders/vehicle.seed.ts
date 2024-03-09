const seedVehicles = async (prisma) => {
	console.log('Seeding vehicles data...');
	await prisma.vehicle.create({
		data: {
			type: 'Car',
			year: 2023,
			make: 'Toyota',
			model: 'Camry',
			trim: 'LE',
			plate: 'ABC123',
			vin: '12345678901234567',
			odometer: 10000,
			nickname: 'My Camry',
			spare_tires: 1,
			extraFields: { color: 'blue' },
			status: 'AVAILABLE',
			vehiclePictures: {
				create: [
					{ image: '/src/lib/mocks/pictures/1.jpg' },
					{ image: '/src/lib/mocks/pictures/2.jpg' },
				]
			},
			documents: {
				create: [
					{
						file: 'https://example.com/registration.pdf',
						name: 'Registration',
						note: 'A document for driving...',
						document_type: 'Registration',
						expiration_date: new Date(2024, 11, 30),
						tags: {
							create: [{ name: 'Important' }, { name: 'Expired' }]
						}
					}
				]
			},
			"costs": {
				"create": [
					{
						"value": 75.25,
						"concept": "Restaurant dinner",
						"category": {
							"create": {
								"name": "Eating Out"
							}
						},
						"date": "2024-03-10T19:00:00Z"
					},
					{
						"value": 20.00,
						"concept": "Movie tickets",
						"category": {
							"create": {
								"name": "Entertainment"
							}
						},
						"date": "2024-03-11T15:30:00Z"
					}
				]
			}
		}
	});

	await prisma.vehicle.create({
		data: {
			type: 'Car',
			year: 2024,
			make: 'Hyundai',
			model: 'Elantra',
			trim: 'SE',
			plate: 'DEF456',
			vin: '98765432109876543',
			odometer: 5000,
			nickname: 'El Ahorrador',
			spare_tires: 1,
			extraFields: { color: 'gris perla' },
			status: 'AVAILABLE',
			vehiclePictures: {
				create: [
					{ image: '/src/lib/mocks/pictures/3.jpg' },
					{ image: '/src/lib/mocks/pictures/4.jpg' },
					{ image: '/src/lib/mocks/pictures/1.jpg' },
				]
			},
			documents: {
				create: [
					{
						file: 'https://example.com/elantra_owners_manual.pdf',
						name: 'Manual del Propietario',
						note: 'Información importante sobre el mantenimiento',
						document_type: 'Manual',
						tags: {
							create: [{ name: 'Garantía' }, { name: 'Mantenimiento' }]
						}
					}
				]
			},
			"costs": {
				create: [
					{
						"value": 50.0,
						"concept": "Monthly groceries",
						"category": {
							create: {
								"name": "Groceries"
							}
						},
						"date": "2022-02-15T08:00:00Z",
					},
					{
						"value": 40.0,
						"concept": "Gas refill",
						"category": {
							create: {
								"name": "Fuel"
							}
						},
						"date": "2022-02-10T12:45:00Z",
					},
				]
			}
		}
	});

	await prisma.vehicle.create({
		data: {
			type: 'SUV',
			year: 2022,
			make: 'Mazda',
			model: 'CX-5',
			trim: 'Turbo AWD',
			plate: 'GHI789',
			vin: '01234567890123456',
			odometer: 20000,
			nickname: 'Mcarro',
			spare_tires: 1,
			extraFields: { color: 'rojo metalizado', asientos_cuero: true },
			status: 'AVAILABLE',
			vehiclePictures: {
				create: [
					{ image: '/src/lib/mocks/pictures/3.jpg' },
					{ image: '/src/lib/mocks/pictures/1.jpg' },
				]
			},
			documents: {
				create: [
					{
						file: 'https://example.com/cx5_mantenimiento_programado.pdf',
						name: 'Programa de Mantenimiento',
						note: 'Cronograma de revisiones y cambios de aceite',
						document_type: 'Mantenimiento',
						expiration_date: new Date(2025, 5, 31),
						tags: {
							create: [{ name: 'Obligatorio' }, { name: 'Garantía' }]
						}
					}
				]
			},
			"costs": {
				"create": [
					{
						"value": 120.0,
						"concept": "Oil change",
						"category": {
							"create": {
								"name": "Maintenance"
							}
						},
						"date": "2022-02-20T10:30:00Z",
					},
					{
						"value": 25.0,
						"concept": "Car wash",
						"category": {
							"create": {
								"name": "Maintenance"
							}
						},
						"date": "2022-02-28T15:15:00Z",
					},
				]
			}
		}
	});

	await prisma.vehicle.create({
		data: {
			type: 'Motorcycle',
			year: 2023,
			make: 'Yamaha',
			model: 'YZF-R6',
			trim: '',
			plate: 'MNO345',
			vin: '23456789012345678',
			odometer: 1000,
			nickname: 'La Bala',
			spare_tires: 0,
			extraFields: { cilindrada: 600 },
			status: 'AVAILABLE',
			vehiclePictures: {
				create: [
					{ image: '/src/lib/mocks/pictures/4.jpg' },
					{ image: '/src/lib/mocks/pictures/2.jpg' },
					{ image: '/src/lib/mocks/pictures/1.jpg' },
					{ image: '/src/lib/mocks/pictures/3.jpg' },
				]
			},
			documents: {
				create: [
					{
						file: 'https://example.com/yzf_manual_usuario.pdf',
						name: 'Manual de Usuario',
						note: 'Instrucciones de operación y mantenimiento',
						document_type: 'Manual',
						tags: {
							create: [{ name: 'Garantía' }, { name: 'Seguridad' }]
						}
					}
				]
			},
			"costs": {
				"create": [
					{
						"value": 8.0,
						"concept": "Toll road",
						"category": {
							"create": {
								"name": "Tolls and Parking"
							}
						},
						"date": "2022-02-18T14:45:00Z",
					},
					{
						"value": 10.0,
						"concept": "Parking fee",
						"category": {
							"create": {
								"name": "Tolls and Parking"
							}
						},
						"date": "2022-02-22T12:00:00Z",
					},
				]
			}
		}
	});

	console.log('Seeding complete!');
};

export default seedVehicles;
