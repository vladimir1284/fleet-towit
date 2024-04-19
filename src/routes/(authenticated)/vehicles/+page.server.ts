//@ts-nocheck
import z from 'zod';
import prisma from '$lib/prisma-client';
import { randomUUID } from 'node:crypto';
import type { PageServerLoad } from '../$types';
import { zod } from 'sveltekit-superforms/adapters';
import { getAllVehicles } from '$lib/actions/vehicles';
import { message, superValidate } from 'sveltekit-superforms/server';

// Zod-validation schema.
const STRING_MIN_CONSTRAINT = 5;
const VEHICLE_STATES = <const>['AVAILABLE', 'UNAVAILABLE'];
const VEHICLE_MODELS = <const>['CX-5', 'YZF-R6', 'Camry', 'Elantra'];

const vehicleSchema = z.object({
	nickname: z.string().trim().min(STRING_MIN_CONSTRAINT),
	model: z.enum(VEHICLE_MODELS),
	make: z.string().trim().min(STRING_MIN_CONSTRAINT),
	year: z.number().nonnegative().default(2000), // Define default year value.
	odometer: z.number().nonnegative(),
	status: z.enum(VEHICLE_STATES)
});

export const load: PageServerLoad = async ({ locals }) => {
	try {
		const form = await superValidate(zod(vehicleSchema));
		const vehicles = (await getAllVehicles(locals.currentInstance.currentPrismaClient)).map((vehicle) => ({
			...vehicle,
			moreDetailsRoute: `/vehicles/${vehicle.vin}`
		}));
		return {
			form,
			vehicles
		};
	} catch (error) {
		console.log('There was an error: ', error);
		return {
			vehicles: []
		};
	}
};

export const actions = {
	create: async ({ request }) => {
		const form = await superValidate(request, zod(vehicleSchema));
		if (!form.valid) {
			return message(form, 'Invalid vehicle creation data');
		}
		const newlyCreatedVehicle = await prisma.vehicle.create({
			data: {
				...form.data,
				vin: randomUUID(),
				type: 'ATV',
				trim: 'TEST',
				spare_tires: 2
			}
		});
		return {
			form,
			newlyCreatedVehicle
		};
	}
};
