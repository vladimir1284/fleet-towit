import { json } from "@sveltejs/kit"
import axios from 'axios'

export const GET = async ({url}) => {
  const vin = url.searchParams.get('vin')

  const URL = `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/${vin}?format=json&modelyear=2011`

  try {
    const response = await axios.get(URL)
    return json(response.data)
  } catch (error) {
    return json(error)
  }
}