import { bypassPrisma } from "$lib/prisma";

type createContracType = {clientId: number, rentalPlanId: number, vehicleId: number}


export const getAllContracts = async() => {
    const contracts = await bypassPrisma.contract.findMany();
    return contracts
}


export const createContract = async({clientId, rentalPlanId, vehicleId}: createContracType) => {
    const initial = await bypassPrisma.stageUpdate.create({
        data: {
            date: new Date(Date.now()),
            stage: 'PENDING',
        }
    })
    
    const contract = await bypassPrisma.contract.create({
        data: {
            clientId,
            rentalPlanId,
            vehicleId,
            stageId: initial.id
        }
    })
    return contract
}