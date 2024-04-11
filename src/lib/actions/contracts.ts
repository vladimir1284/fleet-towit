import { bypassPrisma } from '$lib/prisma';
import { Stage } from '@prisma/client';

type createContracType = { clientId: number; rentalPlanId: number; vehicleId: number };
type updateContractType = createContracType & { id: number };

type updateContractStageType = {
	id: number;
	date: Date;
	reason?: string;
	comments?: string;
	stage: Stage;
};

export const getAllContracts = async (isAdminUser = false) => {
	const _stage = isAdminUser ? undefined : 'DISMISS';
	const contracts = await bypassPrisma.contract.findMany({
		where: {
			NOT: {
				stage: {
					stage: _stage
				}
			}
		},
		include: {
			client: true,
			rentalPlan: true,
			vehicle: {
				include: {
					plates: {
						where: {
							isActive: true
						}
					}
				}
			},
			stage: {
				include: {
					previousStage: true
				}
			}
		}
	});
	return contracts;
};

export const getContract = async ({ contractId }: { contractId: number }) => {
	const contract = await bypassPrisma.contract.findUnique({
		where: { id: contractId },
		include: {
			client: true,
			rentalPlan: true,
			vehicle: true,
			stage: {
				include: {
					previousStage: true
				}
			}
		}
	});
	return contract;
};

export const getPreviousStage = async ({ contractId }: { contractId: number }) => {
	// Find the stage by its ID
	const contract = await bypassPrisma.contract.findUnique({
		where: { id: contractId },
		include: {
			stage: {
				include: {
					previousStage: true
				}
			}
		}
	});

	const stage = contract?.stage;

	if (stage) {
		const stagesFound: (typeof stage.previousStage)[] = [];
		stagesFound.push(stage);
		let lastStageId = stage.previousStageId ? stage.previousStageId : null;
		while (lastStageId) {
			const previousStage = await bypassPrisma.stageUpdate.findUnique({
				where: { id: lastStageId }
			});
			stagesFound.push(previousStage);
			lastStageId = previousStage?.previousStageId ? previousStage.previousStageId : null;
		}
		return stagesFound;
	} else {
		return [];
	}
};

export const createContract = async ({ clientId, rentalPlanId, vehicleId }: createContracType) => {
	const initial = await bypassPrisma.stageUpdate.create({
		data: {
			date: new Date(Date.now()),
			stage: Stage.PENDING
		}
	});

	const contract = await bypassPrisma.contract.create({
		data: {
			clientId,
			rentalPlanId,
			vehicleId,
			stageId: initial.id
		}
	});
	return contract;
};

export const updateContract = async ({
	id,
	clientId,
	rentalPlanId,
	vehicleId
}: updateContractType) => {
	const contract = await bypassPrisma.contract.update({
		where: { id },
		data: { clientId, rentalPlanId, vehicleId }
	});
	return contract;
};

export const updateContractStage = async ({
	id,
	date,
	reason,
	comments,
	stage
}: updateContractStageType) => {
	const contract = await bypassPrisma.contract.findUnique({
		where: { id },
		include: { stage: true }
	});
	const newStage = await bypassPrisma.stageUpdate.create({
		data: {
			date,
			reason,
			comments,
			stage,
			previousStageId: contract?.stage.id
		}
	});
	let endDate = contract?.endDate;
	let activeDate = contract?.activeDate;
	if (newStage.stage === Stage.ENDED) {
		endDate = new Date(Date.now());
		endDate.setHours(0, 0, 0, 0);
	} else if (newStage.stage === Stage.ACTIVE) {
		activeDate = new Date(Date.now());
		activeDate.setHours(0, 0, 0, 0);
	}
	await bypassPrisma.contract.update({
		where: { id },
		data: { stageId: newStage.id, endDate, activeDate }
	});
};

export const deleteContract = async ({ id }: { id: number }) => {
	await bypassPrisma.contract.delete({ where: { id } });
};

export const getContractByDateRange = async ({
	vehicleId,
	date
}: {
	vehicleId: number;
	date: Date;
}) => {
	const contract = await bypassPrisma.contract.findFirst({
		where: {
			vehicleId,
			activeDate: { lte: date },
			OR: [{ endDate: { gte: date } }, { endDate: null }],
			NOT: {
				stage: {
					stage: 'DISMISS'
				}
			}
		},
		include: {
			stage: true,
			client: true,
			vehicle: true
		}
	});
	return contract;
};
