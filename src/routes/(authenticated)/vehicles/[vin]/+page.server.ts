import axios from "axios"
import { error as ErrorResponse } from "@sveltejs/kit"
//import vehicleMock from "$lib/mocks/vehicle.json"

const formatVehicleData = (data, vin) => {
  const getValue = (data, variable) => {
    return data.find(entry => entry.Variable === variable).Value
  }

  return {
    type: getValue(data, 'Vehicle Type'),
    year: getValue(data, 'Model Year'),
    make: getValue(data, 'Make'),
    model: getValue(data, 'Model'),
    trim: getValue(data, 'Trim'),
    // plate: getValue(data, 'Model'),
    vin,
  }
}

export const load = async ({ params }) => {
  const vin = params.vin

  const URL = `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/${vin}?format=json`
  let data

  try {
    const response = await axios.get(URL)
    data = formatVehicleData(await response.data.Results, vin)

    //data = formatVehicleData(vehicleMock.Results, vin)

    return data
  } catch (error) {
    return ErrorResponse(500, {
      message: error.message
    })
  }
}