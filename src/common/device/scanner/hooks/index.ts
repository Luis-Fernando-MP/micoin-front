import { openScanner } from '../bridge'

/**
 * useScanner — abre el escáner desde UI.
 *
 * @example
 * import { useScanner } from '@device/scanner'
 * const { open } = useScanner()
 * await open({ types: ['qr'] })
 */
const useScanner = () => {
  return { open: openScanner }
}

export { useScanner }
