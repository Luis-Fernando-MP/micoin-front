import * as Cellular from 'expo-cellular'

const getCellularInfo = async () => {
  const [carrier, generation, iso] = await Promise.all([
    Cellular.getCarrierNameAsync(),
    Cellular.getCellularGenerationAsync(),
    Cellular.getIsoCountryCodeAsync(),
  ])

  return {
    carrier,
    generation,
    iso,
  }
}

export { getCellularInfo }
