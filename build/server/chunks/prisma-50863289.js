import { PrismaClient, Prisma } from '@prisma/client';
import './sentry-release-injection-file-4a7720ec.js';

function bypassRLS() {
  return Prisma.defineExtension(
    (prisma2) => prisma2.$extends({
      query: {
        $allModels: {
          async $allOperations({ args, query }) {
            const [, result] = await prisma2.$transaction([
              prisma2.$executeRaw`SELECT set_config('app.bypass_rls', 'on', TRUE)`,
              query(args)
            ]);
            return result;
          }
        }
      }
    })
  );
}
function forCompany(companyId) {
  return Prisma.defineExtension(
    (prisma2) => prisma2.$extends({
      query: {
        $allModels: {
          async $allOperations({ args, query }) {
            const [, result] = await prisma2.$transaction([
              prisma2.$executeRaw`SELECT set_config('app.current_company_id',  ${companyId}, 'TRUE')`,
              query(args)
            ]);
            return result;
          }
        }
      }
    })
  );
}
const prisma = new PrismaClient();
const bypassPrisma = prisma.$extends(bypassRLS());
function companyPrisma(company) {
  const extended = prisma.$extends(forCompany(company));
  return extended;
}

export { bypassPrisma as b, companyPrisma as c };
//# sourceMappingURL=prisma-50863289.js.map
