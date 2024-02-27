import { bypassPrisma } from "$lib/prisma";

type createClientType = { name: string, email: string, phoneNumber: string, tenantId: number };
type updateClientType = createClientType & { id: number }

export const listClients = async () => {
    const clients = await bypassPrisma.client.findMany();
    return clients
}

export const createClient = async ({ name, email, phoneNumber, tenantId }: createClientType) => {
    const client = await bypassPrisma.client.create({
        data: {
            name,
            email,
            phoneNumber,
            tenantId
        }
    })
    return client
}

export const updateClient = async ({ id, name, email, phoneNumber, tenantId }: updateClientType) => {
    const client = await bypassPrisma.client.update({
        where: { id },
        data: { name, email, phoneNumber, tenantId }
    })
    return client
}

export const deleteClient = async ({ id }: { id: number }) => {
    await bypassPrisma.client.delete({ where: { id } })
}