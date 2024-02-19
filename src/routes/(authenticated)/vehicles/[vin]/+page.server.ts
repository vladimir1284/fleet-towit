import axios from 'axios';
import { error as ErrorResponse } from '@sveltejs/kit';
import type { FormattedVehicleData, VehicleDataEntry } from '../types.js';
import vehicleMock from '$lib/mocks/vehicle.json';

const getValue = (data: VehicleDataEntry[], variable: string) => {
	const value = data.find((entry: VehicleDataEntry) => entry.Variable === variable)?.Value;
	return value;
};

const formatVehicleData = (data: VehicleDataEntry[], vin: string): FormattedVehicleData => {
	return {
		type: getValue(data, 'Vehicle Type'),
		year: getValue(data, 'Model Year'),
		make: getValue(data, 'Make'),
		model: getValue(data, 'Model'),
		trim: getValue(data, 'Trim'),
		// plate: getValue(data, 'Model'),
		vin
	};
};

export const load = async ({ params }: { params: { vin: string } }) => {
	const vin = params.vin;

	const URL = `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/${vin}?format=json`;
	let data;

	try {
		// const response = await axios.get(URL)
		// data = formatVehicleData(await response.data.Results, vin)

		data = formatVehicleData(vehicleMock.Results, vin);

		return data;
	} catch (error) {
		return ErrorResponse(500, {
			message: error instanceof Error ? error.message : String(error)
		});
	}
};
