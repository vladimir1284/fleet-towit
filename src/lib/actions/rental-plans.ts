import { bypassPrisma } from '$lib/prisma';
import { Periodicity } from '@prisma/client';

type createRentalPlanType = { name: string; amount: number; periodicity: Periodicity };
type updateRentalPlanType = createRentalPlanType & { id: number };

export const listRentalPlans = async () => {
	const plans = await bypassPrisma.rentalPlan.findMany();
	return plans;
};

export const createRentalPlan = async ({ name, amount, periodicity }: createRentalPlanType) => {
	const plan = await bypassPrisma.rentalPlan.create({
		data: {
			name,
			amount,
			periodicity
		}
	});
	return plan;
};

export const updateRentalPlan = async ({ id, name, amount, periodicity }: updateRentalPlanType) => {
	const plan = await bypassPrisma.rentalPlan.update({
		where: { id },
		data: { name, amount, periodicity }
	});
	return plan;
};

export const deleteRentalPlan = async ({ id }: { id: number }) => {
	await bypassPrisma.rentalPlan.delete({ where: { id } });
};
