import app, { type AppSnapshot } from './extensions/app'
import battery, { type BatterySnapshot } from './extensions/battery'
import biometrics, { type BiometricsSnapshot } from './extensions/biometrics'
import brightness, { type BrightnessSnapshot } from './extensions/brightness'
import cellular, { type CellularSnapshot } from './extensions/cellular'
import info, { type InfoSnapshot } from './extensions/info'
import locale, { type LocaleSnapshot } from './extensions/locale'
import location, { type LocationSnapshot } from './extensions/location'
import network, { type NetworkSnapshot } from './extensions/network'
import steps, { type StepsSnapshot } from './extensions/steps'

type DeviceSnapshot = {
  battery: BatterySnapshot
  info: InfoSnapshot
  network: NetworkSnapshot
  cellular: CellularSnapshot
  app: AppSnapshot
  brightness: BrightnessSnapshot
  locale: LocaleSnapshot
  biometrics: BiometricsSnapshot
  location: LocationSnapshot
  steps: StepsSnapshot
}

/**
 * device.all — snapshot de todas las extensions (sin location).
 *
 * `device.battery()` no pasa por aquí: solo lee batería.
 */
const all = async (): Promise<DeviceSnapshot> => {
  const [
    batteryValue,
    infoValue,
    networkValue,
    cellularValue,
    appValue,
    brightnessValue,
    localeValue,
    biometricsValue,
    stepsValue,
  ] = await Promise.all([
    battery(),
    info(),
    network(),
    cellular(),
    app(),
    brightness(),
    locale(),
    biometrics(),
    steps(),
  ])

  return {
    battery: batteryValue,
    info: infoValue,
    network: networkValue,
    cellular: cellularValue,
    app: appValue,
    brightness: brightnessValue,
    locale: localeValue,
    biometrics: biometricsValue,
    location: null,
    steps: stepsValue,
  }
}

/**
 * device — telemetría por extension (cada una independiente).
 *
 * @example
 * import device, { useDevice } from '@device/device'
 * await device.battery()
 * await device.location()
 * await device.all()
 * const all = useDevice()
 * const battery = useDevice(device.battery)
 */
const device = {
  battery,
  info,
  network,
  cellular,
  app,
  brightness,
  locale,
  biometrics,
  location,
  steps,
  all,
}

export type { DeviceSnapshot }
export { useDevice } from './hooks'
export default device
