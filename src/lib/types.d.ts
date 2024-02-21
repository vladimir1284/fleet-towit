import type { Vehicule } from '@prisma/client';

export interface SuccessfulBodyResponse {
	acknowledged: boolean;
	status: number;
	response?: string; // action response description.
	method: string;
}

export interface SuccessfulVehicleBodyResponse extends SuccessfulBodyResponse {
	data?: Vehicule[] | Vehicule; // action response data.
}
