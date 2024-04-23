import { ResponseError } from '../api/runtime';
import { reqAccountApi } from '../requests';
import { pris } from '../config';
import { AccountFromClient } from './tools';

const xKillbillCreatedBy = 'admin';	// TODO ver que se hace con esto, fijo o el currentUser

export async function syncClients() {
	console.log('>>> Clients');
	const clients = await pris.client.findMany();

	for (let i = 0; i < clients.length; i++) {
		const c = clients[i];
		try {
			await reqAccountApi.createAccountRaw({
				xKillbillCreatedBy,
				body: AccountFromClient(c)
			});
		} catch (e) {
			if (e instanceof ResponseError) {
				const contentType = e.response.headers.get('content-type');
				if (contentType && contentType.includes('application/json')) {
					const response = await e.response.json();
					if (response.code === 3000) continue;
					console.log(response);
				} else console.log(await e.response.text());
			}
			console.log(e);
		}
	}
}
