import { getCellularInfo } from '@device/cellular'
import { withTimeout } from '@device/device/with-timeout'

type CellularSnapshot = {
  carrier: string | null
  country: string | null
} | null

/**
 * device.cellular — operador y país SIM.
 *
 * @example
 * import device from '@device/device'
 * await device.cellular()
 */
const cellular = async (): Promise<CellularSnapshot> => {
  const info = await withTimeout(getCellularInfo())

  if (!info) {
    return null
  }

  return {
    carrier: info.carrier,
    country: info.iso?.toUpperCase() ?? null,
  }
}

export type { CellularSnapshot }
export default cellular
