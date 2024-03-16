import { bypassPrisma } from "$lib/prisma";
import { TollDueStage } from "@prisma/client";

type createTollType = {amount: number, vehicleId: number, contractId: number, stage: TollDueStage, invoice?: string, invoiceNumber?: string, createDate: Date, note?: string}
type updateTollType = createTollType & {id: number}

export const createToll = async({amount, vehicleId, contractId, stage, invoice, invoiceNumber, createDate, note}: createTollType) => {
    const toll = await bypassPrisma.tollDue.create({
        data: {
            amount, vehicleId, contractId, stage, invoice, invoiceNumber, createDate, note
        }
    })
    return toll
}

export const updateToll = async({id, amount, vehicleId, contractId, stage, invoice, invoiceNumber, createDate, note}: updateTollType) => {
    const toll = await bypassPrisma.tollDue.update({
        where: {id},
        data: {amount, vehicleId, contractId, stage, invoice, invoiceNumber, createDate, note}
    })
    return toll
}

export const deleteToll = async({id}: {id: number}) => {
    await bypassPrisma.tollDue.delete({where: {id}})
}

export const listTollsByContractId = async({contractId}: {contractId: number}) => {
    const tolls = await bypassPrisma.tollDue.findMany({
        where: {contractId}
    })
    return tolls
}