import type { Prisma } from '@prisma/client';
import { pris } from '../config';
import { reqAccountApi } from '../requests';
import { getAccountKey } from './key';
import { AccountFromClient } from './tools';

const xKillbillCreatedBy = 'admin';	// TODO ver que se hace con esto, fijo o el currentUser

async function deleteClient(args: Prisma.ClientDeleteArgs) {
	const id = args.where.id;
	const client = await pris.client.findFirst({
		where: {
			id: id
		}
	});
	if (!client) return;

	const account = await reqAccountApi.getAccountByKey({
		externalKey: getAccountKey(client.id)
	});

	await reqAccountApi.closeAccountRaw({
		accountId: account.accountId!,
		xKillbillCreatedBy
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

	const account = await reqAccountApi.getAccountByKey({
		externalKey: getAccountKey(client.id)
	});

	const newAccount = AccountFromClient(client);

	await reqAccountApi.updateAccountRaw({
		accountId: account.accountId!,
		body: newAccount,
		xKillbillCreatedBy
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

	const newAccount = AccountFromClient(client);

	await reqAccountApi.createAccountRaw({
		body: newAccount,
		xKillbillCreatedBy
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
