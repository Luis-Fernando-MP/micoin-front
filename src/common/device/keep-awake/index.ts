import { activateKeepAwakeAsync, deactivateKeepAwake } from 'expo-keep-awake'

/**
 * setKeepAwake — Evita que la pantalla se apague mientras la app está activa.
 *
 * @example
 * import { setKeepAwake } from '@device/keep-awake'
 * await setKeepAwake()
 */
const setKeepAwake = async (enabled: boolean) => {
  if (enabled) {
    await activateKeepAwakeAsync('micoin')
    return true
  }
  deactivateKeepAwake('micoin')
  return false
}

export { setKeepAwake }
