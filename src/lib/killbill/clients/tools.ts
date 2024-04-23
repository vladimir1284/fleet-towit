import type { Client } from '@prisma/client';
import type { Account } from '../api/models';
import { getAccountKey } from './key';

export function AccountFromClient(c: Client): Account {
	return {
		externalKey: getAccountKey(c.id),
		name: c.name,
		email: c.email,
		phone: c.phoneNumber
	};
}
