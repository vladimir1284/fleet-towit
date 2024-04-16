import axios from 'axios';
import { json } from '@sveltejs/kit';

export const GET = async ({ url }) => {
	const vin = url.searchParams.get('vin');
	const year = url.searchParams.get('year');

	// if (!vin || !year) {
	//   return json({
	//     code: 400,
	//     message: 'Request invalidad, there are missing params.'
	//   })
	// }

	const URL = `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/${vin}?format=json&modelyear=${year}`;

	try {
		const response = await axios.get(URL);
		const data = await response.data;

		return json({
			code: 200,
			message: 'OK',
			data
		});
	} catch (error) {
		return json({
			code: 500,
			message: error?.message
		});
	}
};
