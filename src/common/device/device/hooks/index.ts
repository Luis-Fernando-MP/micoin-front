import { useEffect, useState } from 'react'

import device, { type DeviceSnapshot } from '..'

type DeviceMethod<T> = () => Promise<T>

/**
 * useDevice — Snapshot reactivo del device.
 *
 * Sin argumento usa `device.all`. Con método, solo esa extension.
 *
 * @param method - Extension de device, p. ej. `device.battery`. @default device.all
 *
 * @example
 * import device, { useDevice } from '@device/device'
 * const all = useDevice()
 * const battery = useDevice(device.battery)
 * const location = useDevice(device.location)
 */
function useDevice(): DeviceSnapshot | null
function useDevice<T>(method: DeviceMethod<T>): T | null
function useDevice<T>(method?: DeviceMethod<T>) {
  const [snapshot, setSnapshot] = useState<T | DeviceSnapshot | null>(null)

  useEffect(() => {
    let alive = true

    void (method ? method() : device.all())
      .then((next) => {
        if (alive) {
          setSnapshot(next)
        }
      })
      .catch(() => {
        if (alive) {
          setSnapshot(null)
        }
      })

    return () => {
      alive = false
    }
  }, [method])

  return snapshot
}

export type { DeviceMethod }
export { useDevice }
