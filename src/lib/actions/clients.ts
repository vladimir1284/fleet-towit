import type { PrismaClient } from '@prisma/client';

type createClientType = { name: string; email: string; phoneNumber: string; tenantId: number };
type updateClientType = createClientType & { id: number };

export const listClients = async (instance: PrismaClient) => {
	const clients = await instance.client.findMany();
	return clients;
};

export const createClient = async (
	instance: PrismaClient,
	{ name, email, phoneNumber, tenantId }: createClientType
) => {
	const client = await instance.client.create({
		data: {
			name,
			email,
			phoneNumber,
			tenantId
		}
	});
	return client;
};

export const updateClient = async (
	instance: PrismaClient,
	{ id, name, email, phoneNumber, tenantId }: updateClientType
) => {
	const client = await instance.client.update({
		where: { id },
		data: { name, email, phoneNumber, tenantId }
	});
	return client;
};

export const deleteClient = async (instance: PrismaClient, { id }: { id: number }) => {
	await instance.client.delete({ where: { id } });
};
