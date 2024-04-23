import type { Contract } from '@prisma/client';

export function getSubscriptionKey(contract: Contract): string {
	// TODO implement a better key generator
	return `TestSubscription-${contract.id}-${contract.clientId}-${contract.rentalPlanId}-${contract.vehicleId}`;
}
