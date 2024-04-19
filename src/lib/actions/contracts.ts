import { PrismaClient, Stage } from '@prisma/client';

type createContracType = { clientId: number; rentalPlanId: number; vehicleId: number };
type updateContractType = createContracType & { id: number };

type updateContractStageType = {
	id: number;
	date: Date;
	reason?: string;
	comments?: string;
	stage: Stage;
};

export const getAllContracts = async (instance: PrismaClient, isAdminUser = false) => {
	const _stage = isAdminUser ? undefined : 'DISMISS';
	const contracts = await instance.contract.findMany({
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

export const getContract = async (
	instance: PrismaClient,
	{ contractId }: { contractId: number }
) => {
	const contract = await instance.contract.findUnique({
		where: { id: contractId },
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
	return contract;
};

export const getPreviousStage = async (
	instance: PrismaClient,
	{ contractId }: { contractId: number }
) => {
	// Find the stage by its ID
	const contract = await instance.contract.findUnique({
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
			const previousStage = await instance.stageUpdate.findUnique({
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

export const createContract = async (
	instance: PrismaClient,
	{ clientId, rentalPlanId, vehicleId }: createContracType
) => {
	const initial = await instance.stageUpdate.create({
		data: {
			date: new Date(Date.now()),
			stage: Stage.PENDING
		}
	});

	const contract = await instance.contract.create({
		data: {
			clientId,
			rentalPlanId,
			vehicleId,
			stageId: initial.id
		}
	});
	return contract;
};

export const updateContract = async (
	instance: PrismaClient,
	{ id, clientId, rentalPlanId, vehicleId }: updateContractType
) => {
	const contract = await instance.contract.update({
		where: { id },
		data: { clientId, rentalPlanId, vehicleId }
	});
	return contract;
};

export const updateContractStage = async (
	instance: PrismaClient,
	{ id, date, reason, comments, stage }: updateContractStageType
) => {
	const contract = await instance.contract.findUnique({
		where: { id },
		include: { stage: true }
	});
	const newStage = await instance.stageUpdate.create({
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
	await instance.contract.update({
		where: { id },
		data: { stageId: newStage.id, endDate, activeDate }
	});
};

export const deleteContract = async (instance: PrismaClient, { id }: { id: number }) => {
	await instance.contract.delete({ where: { id } });
};

export const getContractByDateRange = async (
	instance: PrismaClient,
	{ vehicleId, date }: { vehicleId: number; date: Date }
) => {
	const contract = await instance.contract.findFirst({
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
			vehicle: {
				include: {
					plates: {
						where: {
							isActive: true
						}
					}
				}
			}
		}
	});
	return contract;
};
