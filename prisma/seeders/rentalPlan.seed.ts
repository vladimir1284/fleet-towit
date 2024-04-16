const seedRentalPlans = async (prisma) => {
	console.log('Seeding rental plans data...');
	const createdPlanIds = [];

	const rentalPlan1 = await prisma.rentalPlan.create({
		data: {
			name: 'Monthly trailer rental 1000',
			periodicity: 'MONTHLY',
			amount: 1000
		}
	});
	createdPlanIds.push(rentalPlan1.id);

	const rentalPlan2 = await prisma.rentalPlan.create({
		data: {
			name: 'Monthly trailer rental 900',
			periodicity: 'MONTHLY',
			amount: 900
		}
	});
	createdPlanIds.push(rentalPlan2.id);

	const rentalPlan3 = await prisma.rentalPlan.create({
		data: {
			name: 'Monthly trailer rental 450',
			periodicity: 'MONTHLY',
			amount: 450
		}
	});
	createdPlanIds.push(rentalPlan3.id);

	const rentalPlan4 = await prisma.rentalPlan.create({
		data: {
			name: 'Monthly trailer rental 400',
			periodicity: 'MONTHLY',
			amount: 400
		}
	});
	createdPlanIds.push(rentalPlan4.id);

	const rentalPlan5 = await prisma.rentalPlan.create({
		data: {
			name: 'Monthly trailer rental 250',
			periodicity: 'MONTHLY',
			amount: 250
		}
	});
	createdPlanIds.push(rentalPlan5.id);

	const rentalPlan6 = await prisma.rentalPlan.create({
		data: {
			name: 'Monthly trailer rental 200',
			periodicity: 'MONTHLY',
			amount: 200
		}
	});
	createdPlanIds.push(rentalPlan6.id);

	console.log('Seeding complete!');
	return createdPlanIds;
};

export default seedRentalPlans;
