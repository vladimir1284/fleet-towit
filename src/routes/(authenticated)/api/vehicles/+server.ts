import { getAllVehicles } from '$lib/actions/vehicles';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
  const vehicles = await getAllVehicles();
  return new Response(JSON.stringify(vehicles))
}