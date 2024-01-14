import { Prisma, PrismaClient } from '@prisma/client';

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

export function forCompany(companyId: string) {
	return Prisma.defineExtension((prisma) =>
		prisma.$extends({
			query: {
				$allModels: {
					async $allOperations({ args, query }) {
						const [, result] = await prisma.$transaction([
							prisma.$executeRaw`SELECT set_config('app.current_company_id',  ${companyId}, 'TRUE')`,
							query(args)
						]);
						return result;
					}
				}
			}
		})
	);
}
