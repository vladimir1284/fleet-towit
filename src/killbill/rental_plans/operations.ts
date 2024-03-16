import { syncRentalPlans } from './rental_plans';

export async function rentalPlansOperations(operation: string, args: any) {
	if (!(operation == 'create' || operation == 'update' || operation == 'delete')) return;
	await syncRentalPlans();
}
