import { json } from "@sveltejs/kit"
import axios from "axios"

export const GET = async ({url}) => {
  const vin = url.searchParams.get('vin')
  const year = url.searchParams.get('year')

  console.log('VIN', vin)
  console.log('YEAR', year)

  // if (!vin || !year) {
  //   return json({
  //     code: 400,
  //     message: 'Request invalidad, there are missing params.'
  //   })
  // }

  const URL = `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/${vin}?format=json&modelyear=${year}` 

  console.log('URL: ', URL)
  try {
    const response = await axios.get(URL)
    const data = await response.data

    return json({
      code: 200,
      message: 'OK',
      data
    })
  } catch (error) {
    return json({
      code: 500,
      message: error.message
    })
  }
}