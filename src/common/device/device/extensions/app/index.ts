import { getAppInfo } from '@device/application'
import { withTimeout } from '@device/device/with-timeout'

type AppSnapshot = {
  name: string | null
  version: string | null
} | null

/**
 * device.app — nombre y versión de la app.
 *
 * @example
 * import device from '@device/device'
 * await device.app()
 */
const app = async (): Promise<AppSnapshot> => {
  const info = await withTimeout(getAppInfo())

  if (!info) {
    return null
  }

  return {
    name: info.name,
    version: info.version,
  }
}

export type { AppSnapshot }
export default app
