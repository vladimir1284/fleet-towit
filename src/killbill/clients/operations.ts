import type { Prisma } from '@prisma/client';
import { pris } from '../config';
import { getAccountApi } from './api';
import { getAccountKey } from '../tools/tools';
import { AccountFromClient } from './clients';

async function deleteClient(args: Prisma.ClientDeleteArgs) {
	const id = args.where.id;
	const client = await pris.client.findFirst({
		where: {
			id: id
		}
	});
	if (!client) return;

	const accountApi = await getAccountApi(client.tenantId);
	if (!accountApi) return;

	const account = await accountApi.getAccountByKey({
		externalKey: getAccountKey(client.id)
	});

	await accountApi.closeAccountRaw({
		accountId: account.accountId!,
		xKillbillCreatedBy: 'admin'
	});
}

async function updateClient(args: Prisma.ClientUpdateArgs) {
	const id = args.where.id;
	const client = await pris.client.findFirst({
		where: {
			id: id
		}
	});
	if (!client) return;

	const accountApi = await getAccountApi(client.tenantId);
	if (!accountApi) return;

	const account = await accountApi.getAccountByKey({
		externalKey: getAccountKey(client.id)
	});

	const newAccount = AccountFromClient(client);

	await accountApi.updateAccountRaw({
		accountId: account.accountId!,
		body: newAccount,
		xKillbillCreatedBy: 'admin'
	});
}

async function createClient(args: Prisma.ClientCreateArgs) {
	const data = args.data;
	const client = await pris.client.findFirst({
		where: {
			name: data.name,
			email: data.email,
			avatar: data.avatar,
			phoneNumber: data.phoneNumber,
			tenantId: data.tenantId
		}
	});
	if (!client) return;

	const accountApi = await getAccountApi(client.tenantId);
	if (!accountApi) return;

	const newAccount = AccountFromClient(client);

	await accountApi.createAccountRaw({
		body: newAccount,
		xKillbillCreatedBy: 'admin'
	});
}

export async function clientOperation(operation: string, args: any) {
	switch (operation) {
		case 'delete':
			await deleteClient(args);
			break;
		case 'update':
			await updateClient(args);
			break;
		case 'create':
			await createClient(args);
			break;
	}
}
