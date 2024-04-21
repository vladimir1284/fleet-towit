import { Prisma } from '@prisma/client';
import { clientOperation } from './clients/operations';
import { rentalPlansOperations } from './rental_plans/operations';
import { contractsOperations } from './contracts/operations';

async function update(model: string, operation: string, args: any) {
	switch (model) {
		case 'Client':
			await clientOperation(operation, args);
			break;
		case 'RentalPlan':
			await rentalPlansOperations(operation, args);
			break;
		case 'Contract':
			await contractsOperations(operation, args);
			break;
		// TODO sincronizar los tenants
	}
}

export const KillBillPExt = Prisma.defineExtension((prisma) =>
	prisma.$extends({
		query: {
			$allModels: {
				async $allOperations({ model, operation, args, query }) {
					console.log({ model, operation, args, query });

					if (operation == 'delete') update(model, operation, args);
					const result = await query(args);
					if (operation != 'delete') update(model, operation, args);

					return result;
				}
			}
		}
	})
);
