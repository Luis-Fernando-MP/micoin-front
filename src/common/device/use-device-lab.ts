import { useEffect, useState } from 'react'

import { getAppInfo } from '@/common/device/application'
import { getBatteryInfo } from '@/common/device/battery'
import { getBrightness } from '@/common/device/brightness'
import { getCellularInfo } from '@/common/device/cellular'
import { getDeviceInfo } from '@/common/device/device'
import { getNetworkInfo } from '@/common/device/network'
import { getOrientation } from '@/common/device/orientation'
import { readAccelerometer, readSteps } from '@/common/device/sensors'

type LabChip = {
  id: string
  label: string
  status?: 'default' | 'info' | 'success' | 'warning' | 'brand'
}

const useDeviceLab = () => {
  const [chips, setChips] = useState<LabChip[]>([
    { id: 'loading', label: 'Cargando device…', status: 'info' },
  ])

  useEffect(() => {
    let alive = true

    const load = async () => {
      const [
        battery,
        device,
        network,
        app,
        cellular,
        brightness,
        orientation,
        accel,
        steps,
      ] = await Promise.all([
        getBatteryInfo().catch(() => null),
        Promise.resolve(getDeviceInfo()),
        getNetworkInfo().catch(() => null),
        getAppInfo().catch(() => null),
        getCellularInfo().catch(() => null),
        getBrightness().catch(() => null),
        getOrientation().catch(() => null),
        readAccelerometer().catch(() => null),
        readSteps().catch(() => null),
      ])

      if (!alive) {
        return
      }

      const next: LabChip[] = []

      if (battery) {
        next.push({
          id: 'battery',
          label: `Battery ${battery.level}%`,
          status: battery.lowPower ? 'warning' : 'success',
        })
      }
      if (device.modelName) {
        next.push({
          id: 'device',
          label: device.modelName,
          status: 'brand',
        })
      }
      if (device.osName) {
        next.push({
          id: 'os',
          label: `${device.osName} ${device.osVersion ?? ''}`.trim(),
          status: 'info',
        })
      }
      if (network) {
        next.push({
          id: 'net',
          label: network.isConnected ? `Net ${network.type}` : 'Offline',
          status: network.isConnected ? 'success' : 'warning',
        })
        if (network.ip) {
          next.push({ id: 'ip', label: `IP ${network.ip}`, status: 'default' })
        }
      }
      if (app?.version) {
        next.push({
          id: 'app',
          label: `App v${app.version}`,
          status: 'info',
        })
      }
      if (cellular?.carrier) {
        next.push({
          id: 'carrier',
          label: cellular.carrier,
          status: 'default',
        })
      }
      if (brightness !== null) {
        next.push({
          id: 'brightness',
          label: `Bright ${brightness}%`,
          status: 'default',
        })
      }
      if (orientation) {
        next.push({
          id: 'orientation',
          label: orientation,
          status: 'default',
        })
      }
      if (accel) {
        next.push({
          id: 'accel',
          label: `Accel ${accel.x}/${accel.y}/${accel.z}`,
          status: 'info',
        })
      }
      if (steps !== null) {
        next.push({
          id: 'steps',
          label: `Steps ${steps}`,
          status: 'success',
        })
      }

      setChips(next)
    }

    void load()

    return () => {
      alive = false
    }
  }, [])

  return chips
}

export { useDeviceLab }
export type { LabChip }
