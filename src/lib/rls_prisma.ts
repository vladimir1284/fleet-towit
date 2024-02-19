import { Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';

import { BCRYPT_SALT_LENGTH } from './shared';

export function bypassRLS() {
	return Prisma.defineExtension((prisma) =>
		prisma.$extends({
			query: {
				$allModels: {
					async $allOperations({ model, args, query }) {
						// Ensure crypt is performed only on correct operations.
						if (model === 'User') {
							type upsertDataObject = 'create' | 'update';
							type upsertActionTypes = Extract<
								typeof args,
								Partial<Record<upsertDataObject, object>>
							>;
							// Upsert-type predicate.
							const isUpsertAction = (action: typeof args): action is upsertActionTypes =>
								(action as upsertActionTypes).create !== undefined;

							type createOrUpdateDataObject = 'data';
							type createOrUpdateActionTypes = Extract<
								typeof args,
								Record<createOrUpdateDataObject, object>
							>;
							// CreateOrUpdate-type predicate.
							const isCreateOrUpdateAction = (
								action: typeof args
							): action is createOrUpdateActionTypes =>
								(action as createOrUpdateActionTypes).data !== undefined;

							// Upsert action.
							if (isUpsertAction(args)) {
								if (args.create) {
									args.create.password = await bcrypt.hash(
										args.create.password,
										BCRYPT_SALT_LENGTH
									);
								}
								if (args.update?.password) {
									args.update.password = await bcrypt.hash(
										<string>args.update.password, // as string is also valid.
										BCRYPT_SALT_LENGTH
									);
								}
							}
							// Create or update actions.
							if (isCreateOrUpdateAction(args)) {
								if (Array.isArray(args.data)) {
									args.data = await Promise.all(
										args.data.map(
											async (user) => {
												const cryptedUserPassword = await bcrypt.hash(user.password, BCRYPT_SALT_LENGTH)
												return {
													...user,
													password: cryptedUserPassword
												}

											}
										)
									);
								} else {
									if (args.data?.password) {
										args.data.password = await bcrypt.hash(
											<string>args.data.password, // as string is also valid.
											BCRYPT_SALT_LENGTH
										);
									}
								}
							}
						}
						const [, result] = await prisma.$transaction([
							prisma.$executeRaw`SELECT set_config('app.bypass_rls', 'on', TRUE)`,
							query(args)
						]);
						return result;
					}
				}
			}
		})
	);
}

export function forTenant(tenantId: string) {
	return Prisma.defineExtension((prisma) =>
		prisma.$extends({
			query: {
				$allModels: {
					async $allOperations({ model, args, query }) {
						// Ensure crypt is performed only on correct operations.
						if (model === 'User') {
							type upsertDataObject = 'create' | 'update';
							type upsertActionTypes = Extract<
								typeof args,
								Partial<Record<upsertDataObject, object>>
							>;
							// Upsert-type predicate.
							const isUpsertAction = (action: typeof args): action is upsertActionTypes =>
								(action as upsertActionTypes).create !== undefined;

							type createOrUpdateDataObject = 'data';
							type createOrUpdateActionTypes = Extract<
								typeof args,
								Record<createOrUpdateDataObject, object>
							>;
							// CreateOrUpdate-type predicate.
							const isCreateOrUpdateAction = (
								action: typeof args
							): action is createOrUpdateActionTypes =>
								(action as createOrUpdateActionTypes).data !== undefined;

							// Upsert action.
							if (isUpsertAction(args)) {
								if (args.create) {
									args.create.password = await bcrypt.hash(
										args.create.password,
										BCRYPT_SALT_LENGTH
									);
								}
								if (args.update?.password) {
									args.update.password = await bcrypt.hash(
										<string>args.update.password, // as string is also valid.
										BCRYPT_SALT_LENGTH
									);
								}
							}
							// Create or update actions.
							if (isCreateOrUpdateAction(args)) {
								if (Array.isArray(args.data)) {
									args.data = await Promise.all(
										args.data.map(
											async (user) => {
												const cryptedUserPassword = await bcrypt.hash(user.password, BCRYPT_SALT_LENGTH)
												return {
													...user,
													password: cryptedUserPassword
												}

											}
										)
									);
								} else {
									if (args.data?.password) {
										args.data.password = await bcrypt.hash(
											<string>args.data.password, // as string is also valid.
											BCRYPT_SALT_LENGTH
										);
									}
								}
							}
						}
						const [, result] = await prisma.$transaction([
							prisma.$executeRaw`SELECT set_config('app.current_tenant_id',  ${tenantId}, 'TRUE')`,
							query(args)
						]);
						return result;
					}
				}
			}
		})
	);
}

export function forUser(userId: string) {
	return Prisma.defineExtension((prisma) =>
		prisma.$extends({
			query: {
				$allModels: {
					async $allOperations({ model, args, query }) {
						// Ensure crypt is performed only on correct operations.
						if (model === 'User') {
							type upsertDataObject = 'create' | 'update';
							type upsertActionTypes = Extract<
								typeof args,
								Partial<Record<upsertDataObject, object>>
							>;
							// Upsert-type predicate.
							const isUpsertAction = (action: typeof args): action is upsertActionTypes =>
								(action as upsertActionTypes).create !== undefined;

							type createOrUpdateDataObject = 'data';
							type createOrUpdateActionTypes = Extract<
								typeof args,
								Record<createOrUpdateDataObject, object>
							>;
							// CreateOrUpdate-type predicate.
							const isCreateOrUpdateAction = (
								action: typeof args
							): action is createOrUpdateActionTypes =>
								(action as createOrUpdateActionTypes).data !== undefined;

							// Upsert action.
							if (isUpsertAction(args)) {
								if (args.create) {
									args.create.password = await bcrypt.hash(
										args.create.password,
										BCRYPT_SALT_LENGTH
									);
								}
								if (args.update?.password) {
									args.update.password = await bcrypt.hash(
										<string>args.update.password, // as string is also valid.
										BCRYPT_SALT_LENGTH
									);
								}
							}
							// Create or update actions.
							if (isCreateOrUpdateAction(args)) {
								if (Array.isArray(args.data)) {
									args.data = await Promise.all(
										args.data.map(
											async (user) => {
												const cryptedUserPassword = await bcrypt.hash(user.password, BCRYPT_SALT_LENGTH)
												return {
													...user,
													password: cryptedUserPassword
												}

											}
										)
									);
								} else {
									if (args.data?.password) {
										args.data.password = await bcrypt.hash(
											<string>args.data.password, // as string is also valid.
											BCRYPT_SALT_LENGTH
										);
									}
								}
							}
						}
						const [, result] = await prisma.$transaction([
							prisma.$executeRaw`SELECT set_config('app.current_user_id', ${userId}, TRUE)`,
							query(args)
						]);
						return result;
					}
				}
			}
		})
	);
}
