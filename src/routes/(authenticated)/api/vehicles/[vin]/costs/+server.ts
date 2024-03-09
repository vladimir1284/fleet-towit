import getVehicleDetails from "$lib/actions/vehicle-details.js"

export const GET = async ({ params }) => {
  const vin = params.vin
  return getVehicleDetails(vin, 'costs')
}
