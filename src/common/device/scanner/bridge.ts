import { type BarcodeType } from 'expo-camera'

type ScanResult = {
  type: string
  data: string
}

type OpenScannerOptions = {
  types?: BarcodeType[]
}

const DEFAULT_SCAN_TYPES: BarcodeType[] = [
  'qr',
  'ean13',
  'ean8',
  'code128',
  'code39',
  'upc_a',
]

type ScannerControls = {
  open: (options: OpenScannerOptions) => void
}

let controls: ScannerControls | null = null
let pending: ((result: ScanResult | null) => void) | null = null

const bindScanner = (next: ScannerControls | null) => {
  controls = next
}

const resolveScan = (result: ScanResult | null) => {
  pending?.(result)
  pending = null
}

/**
 * openScanner — abre el escáner de códigos y resuelve con el resultado o null.
 *
 * @param options - Tipos de barcode admitidos. @default qr y barras comunes
 *
 * @example
 * import { openScanner } from '@device/scanner'
 * const code = await openScanner({ types: ['qr'] })
 */
const openScanner = (options: OpenScannerOptions = {}) => {
  return new Promise<ScanResult | null>((resolve) => {
    pending = resolve
    if (!controls) {
      resolve(null)
      return
    }
    controls.open(options)
  })
}

export { bindScanner, DEFAULT_SCAN_TYPES, openScanner, resolveScan }
export type { OpenScannerOptions, ScanResult }
