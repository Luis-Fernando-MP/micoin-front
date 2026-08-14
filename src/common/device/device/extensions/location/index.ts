import { withTimeout } from '@device/device/with-timeout'
import { getLocationSnapshot } from '@device/location'

type LocationSnapshot = {
  lat: number
  lng: number
  accuracy: number
} | null

/**
 * device.location — coordenadas (pide permiso solo aquí).
 *
 * @example
 * import device from '@device/device'
 * await device.location()
 */
const location = async (): Promise<LocationSnapshot> => {
  const snapshot = await withTimeout(getLocationSnapshot())

  if (!snapshot?.ok) {
    return null
  }

  return {
    lat: snapshot.lat,
    lng: snapshot.lng,
    accuracy: snapshot.accuracy,
  }
}

export type { LocationSnapshot }
export default location
