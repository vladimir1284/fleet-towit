import { Periodicity, PrismaClient } from '@prisma/client';

type createRentalPlanType = { name: string; amount: number; periodicity: Periodicity };
type updateRentalPlanType = createRentalPlanType & { id: number };

export const listRentalPlans = async (instance: PrismaClient) => {
	const plans = await instance.rentalPlan.findMany();
	return plans;
};

export const createRentalPlan = async (
	instance: PrismaClient,
	{ name, amount, periodicity }: createRentalPlanType
) => {
	const plan = await instance.rentalPlan.create({
		data: {
			name,
			amount,
			periodicity
		}
	});
	return plan;
};

export const updateRentalPlan = async (
	instance: PrismaClient,
	{ id, name, amount, periodicity }: updateRentalPlanType
) => {
	const plan = await instance.rentalPlan.update({
		where: { id },
		data: { name, amount, periodicity }
	});
	return plan;
};

export const deleteRentalPlan = async (instance: PrismaClient, { id }: { id: number }) => {
	await instance.rentalPlan.delete({ where: { id } });
};
