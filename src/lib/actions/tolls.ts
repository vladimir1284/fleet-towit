import { PrismaClient, TollDueStage } from '@prisma/client';

type createTollType = {
	amount: number;
	plateId: number;
	contractId: number;
	stage: TollDueStage;
	invoice?: string;
	invoiceNumber?: string;
	createDate: Date;
	note?: string;
};
type updateTollType = createTollType & { id: number };

export const createToll = async (
	instance: PrismaClient,
	{ amount, plateId, contractId, stage, invoice, invoiceNumber, createDate, note }: createTollType
) => {
	const toll = await instance.tollDue.create({
		data: {
			amount,
			plateId,
			contractId,
			stage,
			invoice,
			invoiceNumber,
			createDate,
			note
		}
	});
	return toll;
};

export const updateToll = async (
	instance: PrismaClient,
	{
		id,
		amount,
		plateId,
		contractId,
		stage,
		invoice,
		invoiceNumber,
		createDate,
		note
	}: updateTollType
) => {
	const toll = await instance.tollDue.update({
		where: { id },
		data: {
			amount,
			plateId,
			contractId,
			stage,
			invoice: invoice || null,
			invoiceNumber,
			createDate,
			note: note || null
		}
	});
	return toll;
};

export const deleteToll = async (instance: PrismaClient, { id }: { id: number }) => {
	await instance.tollDue.delete({ where: { id } });
};

export const listTollsByContractId = async (
	instance: PrismaClient,
	{ contractId }: { contractId: number }
) => {
	const tolls = await instance.tollDue.findMany({
		where: { contractId },
		include: { contract: true, plate: true }
	});
	return tolls;
};

export const listTolls = async (instance: PrismaClient) => {
	const tolls = await instance.tollDue.findMany({
		include: { contract: true, plate: true }
	});
	return tolls;
};