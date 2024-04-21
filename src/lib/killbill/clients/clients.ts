import type { Client } from '@prisma/client';
import { ResponseError } from '../api/runtime';
import { getAccountApi } from './api';
import { getAccountKey } from '../tools/tools';
import type { Account } from '../api/models';
import { pris } from '../config';

export function AccountFromClient(c: Client): Account {
	return {
		externalKey: getAccountKey(c.id),
		name: c.name,
		email: c.email,
		phone: c.phoneNumber
	};
}

export async function syncClients() {
	console.log('>>> Clients');
	const clients = await pris.client.findMany();

	for (let i = 0; i < clients.length; i++) {
		const c = clients[i];
		const accountApi = await getAccountApi(c.tenantId);
		if (accountApi == null) continue;

		try {
			await accountApi.createAccountRaw({
				xKillbillCreatedBy: 'admin',
				body: AccountFromClient(c)
			});
		} catch (e) {
			if (e instanceof ResponseError) {
				console.log(await e.response.json());
			}
			console.log(e);
		}
	}
}
