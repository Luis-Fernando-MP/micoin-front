import * as Cellular from 'expo-cellular'

/**
 * getCellularInfo — Lee datos básicos de red celular.
 *
 * @example
 * import { getCellularInfo } from '@device/cellular'
 * await getCellularInfo()
 */
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
