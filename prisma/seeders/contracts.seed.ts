const seedContract = async (prisma) => {
	console.log('Seeding contrcts data...');

	function getPastDate({
		months = undefined,
		week = undefined,
		day = undefined
	}: {
		months: number | undefined;
		week: number | undefined;
		day: number | undefined;
	}): Date {
		const currentDate = new Date();

		if (months && months !== 0) {
			currentDate.setMonth(currentDate.getMonth() - months);
		}

		if (week && week !== 0) {
			currentDate.setDate(currentDate.getDate() - week * 7);
		}

		if (day && day !== 0) {
			currentDate.setDate(day);
		}

		return currentDate;
	}

	const clientsList = await prisma.client.findMany();
	const rentalPlanList = await prisma.rentalPlan.findMany();
	const vehicleList = await prisma.vehicle.findMany({
		include: {
			plates: {
				where: {
					isActive: true
				}
			}
		}
	});

	const randomElement = (array) => array[Math.floor(Math.random() * array.length)];

	// ACTIVO HACE 1Y
	const contract1 = await prisma.contract.create({
		data: {
			rentalPlan: {
				connect: {
					id: randomElement(rentalPlanList).id
				}
			},
			client: {
				connect: {
					id: randomElement(clientsList).id
				}
			},
			vehicle: {
				connect: {
					id: randomElement(vehicleList).id
				}
			},
			stage: {
				create: {
					stage: 'ACTIVE',
					date: getPastDate({ months: 12, week: 0, day: 2 })
				}
			},
			creationDate: getPastDate({ months: 12, week: 0, day: 0 }),
			activeDate: getPastDate({ months: 12, week: 0, day: 2 })
		}
	});

	// 4 tolls pagados
	for (let i = 1; i <= 4; i++) {
		await prisma.tollDue.create({
			data: {
				amount: 100,
				plate: {
					connect: {
						id: vehicleList.find((vehicle) => vehicle.id === contract1.vehicleId).plates[0].id
					}
				},
				contract: {
					connect: {
						id: contract1.id
					}
				},
				invoiceNumber: `M1235${i}`,
				stage: 'PAID',
				createDate: getPastDate({ months: 11, week: 0, day: i * 2 })
			}
		});
	}

	// 2 tolls por pagar
	for (let i = 1; i <= 2; i++) {
		await prisma.tollDue.create({
			data: {
				amount: 500,
				plate: {
					connect: {
						id: vehicleList.find((vehicle) => vehicle.id === contract1.vehicleId).plates[0].id
					}
				},
				contract: {
					connect: {
						id: contract1.id
					}
				},
				invoiceNumber: `X1432${i}`,
				stage: 'UNPAID',
				createDate: getPastDate({ months: 11, week: 0, day: 20 + i * 2 })
			}
		});
	}

	// ACTIVO HACE 6M
	const contract2 = await prisma.contract.create({
		data: {
			rentalPlan: {
				connect: {
					id: randomElement(rentalPlanList).id
				}
			},
			client: {
				connect: {
					id: randomElement(clientsList).id
				}
			},
			vehicle: {
				connect: {
					id: randomElement(vehicleList).id
				}
			},
			stage: {
				create: {
					stage: 'ACTIVE',
					date: getPastDate({ months: 6, week: 0, day: 0 })
				}
			},
			creationDate: getPastDate({ months: 7, week: 0, day: 0 }),
			activeDate: getPastDate({ months: 6, week: 0, day: 0 })
		}
	});

	// 2 tolls pagados
	for (let i = 1; i <= 2; i++) {
		await prisma.tollDue.create({
			data: {
				amount: 250 + i * 32,
				plate: {
					connect: {
						id: vehicleList.find((vehicle) => vehicle.id === contract2.vehicleId).plates[0].id
					}
				},
				contract: {
					connect: {
						id: contract2.id
					}
				},
				invoiceNumber: `X1${i * 2}32${i}`,
				stage: 'PAID',
				createDate: getPastDate({ months: 4, week: 0, day: 15 + i * 2 })
			}
		});
	}

	// ACTIVO HACE 3M
	const contract3 = await prisma.contract.create({
		data: {
			rentalPlan: {
				connect: {
					id: randomElement(rentalPlanList).id
				}
			},
			client: {
				connect: {
					id: randomElement(clientsList).id
				}
			},
			vehicle: {
				connect: {
					id: randomElement(vehicleList).id
				}
			},
			stage: {
				create: {
					stage: 'ACTIVE',
					date: getPastDate({ months: 3, week: 0, day: 0 })
				}
			},
			creationDate: getPastDate({ months: 4, week: 0, day: 0 }),
			activeDate: getPastDate({ months: 3, week: 0, day: 0 })
		}
	});

	// 3 tolls pagados
	for (let i = 1; i <= 3; i++) {
		await prisma.tollDue.create({
			data: {
				amount: 250 + i * 32,
				plate: {
					connect: {
						id: vehicleList.find((vehicle) => vehicle.id === contract3.vehicleId).plates[0].id
					}
				},
				contract: {
					connect: {
						id: contract3.id
					}
				},
				invoiceNumber: `J1${i * 2}32${i}`,
				stage: 'PAID',
				createDate: getPastDate({ months: 2, week: 0, day: 10 + i * 2 })
			}
		});
	}

	// 1 toll por pagar
	await prisma.tollDue.create({
		data: {
			amount: 2400,
			plate: {
				connect: {
					id: vehicleList.find((vehicle) => vehicle.id === contract3.vehicleId).plates[0].id
				}
			},
			contract: {
				connect: {
					id: contract3.id
				}
			},
			invoiceNumber: `J112321`,
			stage: 'UNPAID',
			createDate: getPastDate({ months: 1, week: 0, day: 29 })
		}
	});

	// ACTIVO HACE 1M
	const contract4 = await prisma.contract.create({
		data: {
			rentalPlan: {
				connect: {
					id: randomElement(rentalPlanList).id
				}
			},
			client: {
				connect: {
					id: randomElement(clientsList).id
				}
			},
			vehicle: {
				connect: {
					id: randomElement(vehicleList).id
				}
			},
			stage: {
				create: {
					stage: 'ACTIVE',
					date: getPastDate({ months: 1, week: 0, day: 0 })
				}
			},
			creationDate: getPastDate({ months: 2, week: 0, day: 0 }),
			activeDate: getPastDate({ months: 1, week: 0, day: 0 })
		}
	});

	// 1 toll por pagar
	await prisma.tollDue.create({
		data: {
			amount: 130,
			plate: {
				connect: {
					id: vehicleList.find((vehicle) => vehicle.id === contract4.vehicleId).plates[0].id
				}
			},
			contract: {
				connect: {
					id: contract4.id
				}
			},
			invoiceNumber: `Q769531`,
			stage: 'UNPAID',
			createDate: getPastDate({ months: 1, week: 0, day: 29 })
		}
	});

	//ACTIVO HACE 1SEM
	await prisma.contract.create({
		data: {
			rentalPlan: {
				connect: {
					id: randomElement(rentalPlanList).id
				}
			},
			client: {
				connect: {
					id: randomElement(clientsList).id
				}
			},
			vehicle: {
				connect: {
					id: randomElement(vehicleList).id
				}
			},
			stage: {
				create: {
					stage: 'ACTIVE',
					date: getPastDate({ months: 0, week: 1, day: 0 })
				}
			},
			creationDate: getPastDate({ months: 0, week: 3, day: 0 }),
			activeDate: getPastDate({ months: 0, week: 1, day: 0 })
		}
	});

	//ACTIVO HACE 1 AÑO Y FINALIZADO HACE 6M
	const contract6 = await prisma.contract.create({
		data: {
			rentalPlan: {
				connect: {
					id: randomElement(rentalPlanList).id
				}
			},
			client: {
				connect: {
					id: randomElement(clientsList).id
				}
			},
			vehicle: {
				connect: {
					id: randomElement(vehicleList).id
				}
			},
			stage: {
				create: {
					stage: 'ACTIVE',
					date: getPastDate({ months: 12, week: 0, day: 2 })
				}
			},
			creationDate: getPastDate({ months: 12, week: 0, day: 0 }),
			activeDate: getPastDate({ months: 12, week: 0, day: 2 })
		}
	});

	await prisma.contract.update({
		where: {
			id: contract6.id
		},
		data: {
			stage: {
				create: {
					stage: 'ENDED',
					date: getPastDate({ months: 6, week: 0, day: 0 }),
					previousStageId: contract6.stageId
				}
			},
			endDate: getPastDate({ months: 6, week: 0, day: 0 })
		}
	});

	// 2 tolls pagados
	for (let i = 1; i <= 2; i++) {
		await prisma.tollDue.create({
			data: {
				amount: 250 + i * 32,
				plate: {
					connect: {
						id: vehicleList.find((vehicle) => vehicle.id === contract6.vehicleId).plates[0].id
					}
				},
				contract: {
					connect: {
						id: contract6.id
					}
				},
				invoiceNumber: `N9${i * 2}47${i}`,
				stage: 'PAID',
				createDate: getPastDate({ months: 10, week: 0, day: 10 + i * 2 })
			}
		});
	}

	// 1 toll pagado
	await prisma.tollDue.create({
		data: {
			amount: 130,
			plate: {
				connect: {
					id: vehicleList.find((vehicle) => vehicle.id === contract6.vehicleId).plates[0].id
				}
			},
			contract: {
				connect: {
					id: contract6.id
				}
			},
			invoiceNumber: `Z785423`,
			stage: 'PAID',
			createDate: getPastDate({ months: 0, week: 0, day: 25 })
		}
	});

	//ACTIVO HACE 1 AÑO Y FINALIZADO HACE 1M
	const contract7 = await prisma.contract.create({
		data: {
			rentalPlan: {
				connect: {
					id: randomElement(rentalPlanList).id
				}
			},
			client: {
				connect: {
					id: randomElement(clientsList).id
				}
			},
			vehicle: {
				connect: {
					id: randomElement(vehicleList).id
				}
			},
			stage: {
				create: {
					stage: 'ACTIVE',
					date: getPastDate({ months: 12, week: 0, day: 2 })
				}
			},
			creationDate: getPastDate({ months: 12, week: 0, day: 0 }),
			activeDate: getPastDate({ months: 12, week: 0, day: 2 })
		}
	});

	await prisma.contract.update({
		where: {
			id: contract7.id
		},
		data: {
			stage: {
				create: {
					stage: 'ENDED',
					date: getPastDate({ months: 1, week: 0, day: 0 }),
					previousStageId: contract7.stageId
				}
			},
			endDate: getPastDate({ months: 1, week: 0, day: 0 })
		}
	});

	// 3 tolls pagados
	for (let i = 1; i <= 3; i++) {
		await prisma.tollDue.create({
			data: {
				amount: 250 + i * 32,
				plate: {
					connect: {
						id: vehicleList.find((vehicle) => vehicle.id === contract7.vehicleId).plates[0].id
					}
				},
				contract: {
					connect: {
						id: contract7.id
					}
				},
				invoiceNumber: `M9${i * 2}23${i}`,
				stage: 'PAID',
				createDate: getPastDate({ months: 10, week: 0, day: 10 + i * 2 })
			}
		});
	}

	// 1 toll por pagar
	await prisma.tollDue.create({
		data: {
			amount: 650,
			plate: {
				connect: {
					id: vehicleList.find((vehicle) => vehicle.id === contract7.vehicleId).plates[0].id
				}
			},
			contract: {
				connect: {
					id: contract7.id
				}
			},
			invoiceNumber: `H894032`,
			stage: 'UNPAID',
			createDate: getPastDate({ months: 0, week: 1, day: 0 })
		}
	});

	//ACTIVO HACE 6M Y FINALIZADO HACE 1M
	const contract8 = await prisma.contract.create({
		data: {
			rentalPlan: {
				connect: {
					id: randomElement(rentalPlanList).id
				}
			},
			client: {
				connect: {
					id: randomElement(clientsList).id
				}
			},
			vehicle: {
				connect: {
					id: randomElement(vehicleList).id
				}
			},
			stage: {
				create: {
					stage: 'ACTIVE',
					date: getPastDate({ months: 6, week: 0, day: 0 })
				}
			},
			creationDate: getPastDate({ months: 7, week: 0, day: 0 }),
			activeDate: getPastDate({ months: 6, week: 0, day: 0 })
		}
	});

	await prisma.contract.update({
		where: {
			id: contract8.id
		},
		data: {
			stage: {
				create: {
					stage: 'ENDED',
					date: getPastDate({ months: 1, week: 0, day: 0 }),
					previousStageId: contract8.stageId
				}
			},
			endDate: getPastDate({ months: 1, week: 0, day: 0 })
		}
	});

	// 2 tolls por pagar
	await prisma.tollDue.create({
		data: {
			amount: 650,
			plate: {
				connect: {
					id: vehicleList.find((vehicle) => vehicle.id === contract8.vehicleId).plates[0].id
				}
			},
			contract: {
				connect: {
					id: contract8.id
				}
			},
			invoiceNumber: `Y546782`,
			stage: 'UNPAID',
			createDate: getPastDate({ months: 3, week: 0, day: 0 })
		}
	});

	await prisma.tollDue.create({
		data: {
			amount: 650,
			plate: {
				connect: {
					id: vehicleList.find((vehicle) => vehicle.id === contract8.vehicleId).plates[0].id
				}
			},
			contract: {
				connect: {
					id: contract8.id
				}
			},
			invoiceNumber: `Y546790`,
			stage: 'UNPAID',
			createDate: getPastDate({ months: 0, week: 1, day: 0 })
		}
	});

	//ACTIVO HACE 1M Y FINALIZADO FECHA ACTUAL
	const contract9 = await prisma.contract.create({
		data: {
			rentalPlan: {
				connect: {
					id: randomElement(rentalPlanList).id
				}
			},
			client: {
				connect: {
					id: randomElement(clientsList).id
				}
			},
			vehicle: {
				connect: {
					id: randomElement(vehicleList).id
				}
			},
			stage: {
				create: {
					stage: 'ACTIVE',
					date: getPastDate({ months: 1, week: 0, day: 0 })
				}
			},
			creationDate: getPastDate({ months: 1, week: 0, day: 0 }),
			activeDate: getPastDate({ months: 1, week: 0, day: 0 })
		}
	});

	await prisma.contract.update({
		where: {
			id: contract9.id
		},
		data: {
			stage: {
				create: {
					stage: 'ENDED',
					date: getPastDate({ months: 0, week: 0, day: 0 }),
					previousStageId: contract9.stageId
				}
			},
			endDate: getPastDate({ months: 0, week: 0, day: 0 })
		}
	});

	//DISMISSED HACE 1 AÑO
	await prisma.contract.create({
		data: {
			rentalPlan: {
				connect: {
					id: randomElement(rentalPlanList).id
				}
			},
			client: {
				connect: {
					id: randomElement(clientsList).id
				}
			},
			vehicle: {
				connect: {
					id: randomElement(vehicleList).id
				}
			},
			stage: {
				create: {
					stage: 'DISMISS',
					date: getPastDate({ months: 12, week: 0, day: 0 })
				}
			},
			creationDate: getPastDate({ months: 12, week: 0, day: 0 }),
			activeDate: getPastDate({ months: 12, week: 0, day: 0 })
		}
	});

	//DISMISSED HACE 6M
	await prisma.contract.create({
		data: {
			rentalPlan: {
				connect: {
					id: randomElement(rentalPlanList).id
				}
			},
			client: {
				connect: {
					id: randomElement(clientsList).id
				}
			},
			vehicle: {
				connect: {
					id: randomElement(vehicleList).id
				}
			},
			stage: {
				create: {
					stage: 'DISMISS',
					date: getPastDate({ months: 6, week: 0, day: 0 })
				}
			},
			creationDate: getPastDate({ months: 6, week: 0, day: 0 }),
			activeDate: getPastDate({ months: 6, week: 0, day: 0 })
		}
	});

	//DISMISSED HACE 3M
	await prisma.contract.create({
		data: {
			rentalPlan: {
				connect: {
					id: randomElement(rentalPlanList).id
				}
			},
			client: {
				connect: {
					id: randomElement(clientsList).id
				}
			},
			vehicle: {
				connect: {
					id: randomElement(vehicleList).id
				}
			},
			stage: {
				create: {
					stage: 'DISMISS',
					date: getPastDate({ months: 3, week: 0, day: 0 })
				}
			},
			creationDate: getPastDate({ months: 3, week: 0, day: 0 }),
			activeDate: getPastDate({ months: 3, week: 0, day: 0 })
		}
	});

	//DISMISSED HACE 1M
	await prisma.contract.create({
		data: {
			rentalPlan: {
				connect: {
					id: randomElement(rentalPlanList).id
				}
			},
			client: {
				connect: {
					id: randomElement(clientsList).id
				}
			},
			vehicle: {
				connect: {
					id: randomElement(vehicleList).id
				}
			},
			stage: {
				create: {
					stage: 'DISMISS',
					date: getPastDate({ months: 1, week: 0, day: 0 })
				}
			},
			creationDate: getPastDate({ months: 1, week: 0, day: 0 }),
			activeDate: getPastDate({ months: 1, week: 0, day: 0 })
		}
	});

	//DISMISSED HACE 1SEM
	await prisma.contract.create({
		data: {
			rentalPlan: {
				connect: {
					id: randomElement(rentalPlanList).id
				}
			},
			client: {
				connect: {
					id: randomElement(clientsList).id
				}
			},
			vehicle: {
				connect: {
					id: randomElement(vehicleList).id
				}
			},
			stage: {
				create: {
					stage: 'DISMISS',
					date: getPastDate({ months: 0, week: 1, day: 0 })
				}
			},
			creationDate: getPastDate({ months: 0, week: 1, day: 0 }),
			activeDate: getPastDate({ months: 0, week: 1, day: 0 })
		}
	});

	//PENDING HACE 1SEM
	await prisma.contract.create({
		data: {
			rentalPlan: {
				connect: {
					id: randomElement(rentalPlanList).id
				}
			},
			client: {
				connect: {
					id: randomElement(clientsList).id
				}
			},
			vehicle: {
				connect: {
					id: randomElement(vehicleList).id
				}
			},
			stage: {
				create: {
					stage: 'PENDING',
					date: getPastDate({ months: 0, week: 1, day: 0 })
				}
			},
			creationDate: getPastDate({ months: 0, week: 1, day: 0 }),
			activeDate: getPastDate({ months: 0, week: 1, day: 0 })
		}
	});

	//PENDING HACE 1 DIA
	await prisma.contract.create({
		data: {
			rentalPlan: {
				connect: {
					id: randomElement(rentalPlanList).id
				}
			},
			client: {
				connect: {
					id: randomElement(clientsList).id
				}
			},
			vehicle: {
				connect: {
					id: randomElement(vehicleList).id
				}
			},
			stage: {
				create: {
					stage: 'PENDING',
					date: new Date(new Date().setDate(new Date().getDate() - 1))
				}
			},
			creationDate: new Date(new Date().setDate(new Date().getDate() - 1)),
			activeDate: new Date(new Date().setDate(new Date().getDate() - 1))
		}
	});

	//PENDING FECHA ACTUAL
	await prisma.contract.create({
		data: {
			rentalPlan: {
				connect: {
					id: randomElement(rentalPlanList).id
				}
			},
			client: {
				connect: {
					id: randomElement(clientsList).id
				}
			},
			vehicle: {
				connect: {
					id: randomElement(vehicleList).id
				}
			},
			stage: {
				create: {
					stage: 'PENDING',
					date: new Date()
				}
			},
			creationDate: new Date(),
			activeDate: new Date()
		}
	});

	//PENDING FECHA ACTUAL
	await prisma.contract.create({
		data: {
			rentalPlan: {
				connect: {
					id: randomElement(rentalPlanList).id
				}
			},
			client: {
				connect: {
					id: randomElement(clientsList).id
				}
			},
			vehicle: {
				connect: {
					id: randomElement(vehicleList).id
				}
			},
			stage: {
				create: {
					stage: 'PENDING',
					date: new Date()
				}
			},
			creationDate: new Date(),
			activeDate: new Date()
		}
	});

	console.log('Seeding complete!');
};

export default seedContract;