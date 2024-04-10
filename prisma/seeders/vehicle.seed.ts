const seedVehicles = async (prisma) => {
	console.log('Seeding vehicles data...');
	const vehicleIds = [];

	try {
		const vehicle1 = await prisma.vehicle.create({
			data: {
				type: 'Car',
				year: 2023,
				make: 'Toyota',
				model: 'Camry',
				trim: 'LE',
				vin: '12345678901234567',
				odometer: 10000,
				nickname: 'My Camry',
				spare_tires: 1,
				extraFields: { color: 'blue' },
				status: 'AVAILABLE',
				vehiclePictures: {
					create: [
						{ image: 'https://example.com/car1.jpg' },
						{ image: 'https://example.com/car2.jpg' }
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
				}
			}
		});

		vehicleIds.push(vehicle1.id);

		const vehicle2 = await prisma.vehicle.create({
			data: {
				type: 'Car',
				year: 2024,
				make: 'Hyundai',
				model: 'Elantra',
				trim: 'SE',
				vin: '98765432109876543',
				odometer: 5000,
				nickname: 'El Ahorrador',
				spare_tires: 1,
				extraFields: { color: 'gris perla' },
				status: 'AVAILABLE',
				vehiclePictures: {
					create: [
						{ image: 'https://example.com/elantra1.jpg' },
						{ image: 'https://example.com/elantra2.jpg' }
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
				}
			}
		});

		vehicleIds.push(vehicle2.id);

		const vehicle3 = await prisma.vehicle.create({
			data: {
				type: 'SUV',
				year: 2022,
				make: 'Mazda',
				model: 'CX-5',
				trim: 'Turbo AWD',
				vin: '01234567890123456',
				odometer: 20000,
				nickname: 'Mcarro',
				spare_tires: 1,
				extraFields: { color: 'rojo metalizado', asientos_cuero: true },
				status: 'AVAILABLE',
				vehiclePictures: {
					create: [
						{ image: 'https://example.com/cx51.jpg' },
						{ image: 'https://example.com/cx52.jpg' }
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
				}
			}
		});

		vehicleIds.push(vehicle3.id);

		const vehicle4 = await prisma.vehicle.create({
			data: {
				type: 'Motorcycle',
				year: 2023,
				make: 'Yamaha',
				model: 'YZF-R6',
				trim: '',
				vin: '23456789012345678',
				odometer: 1000,
				nickname: 'La Bala',
				spare_tires: 0,
				extraFields: { cilindrada: 600 },
				status: 'AVAILABLE',
				vehiclePictures: {
					create: [
						{ image: 'https://example.com/yzf1.jpg' },
						{ image: 'https://example.com/yzf2.jpg' }
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
				}
			}
		});

		vehicleIds.push(vehicle4.id);

		vehicleIds.forEach(async (id) => {
			await prisma.vehiclePlate.create({
				data: {
					plate: `ABC${id}123`,
					assignDate: new Date(),
					isActive: true,
					vehicle: {
						connect: {
							id: id
						}
					}
				}
			});
		});
	} catch (error) {
		console.log(error);
	}

	console.log('Seeding complete!');
	return vehicleIds;
};

export default seedVehicles;
