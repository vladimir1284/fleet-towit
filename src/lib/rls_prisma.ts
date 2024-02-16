import { Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';

export function bypassRLS() {
	return Prisma.defineExtension((prisma) =>
		prisma.$extends({
			query: {
				$allModels: {
					async $allOperations({ args, query }) {
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
					async $allOperations({ args, query }) {
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
					async $allOperations({ model, operation, args, query }) {
						if (
							// Ensure crypt is performed only on correct operations.
							model === 'User' &&
							['create', 'update'].includes(operation) &&
							'data' in args &&
							'password' in args.data
						) {
							const salt = bcrypt.genSaltSync(10);
							args.data.password = await bcrypt.hash(args.data.password as string, salt);
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
