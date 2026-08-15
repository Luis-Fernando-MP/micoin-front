import { type FC, useEffect, useRef, useState } from 'react'
import { Modal, Pressable, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { CameraView, useCameraPermissions } from 'expo-camera'
import { X, Zap } from 'lucide-react-native'

import Icon from '@components/icon'
import Text from '@components/text'
import { hapticImpact } from '@device/haptics'
import {
  DEFAULT_SCAN_TYPES,
  type OpenScannerOptions,
  bindScanner,
  resolveScan,
} from '@device/scanner/bridge'

import { cn } from '@/lib/utils'

/**
 * ScannerHost — modal de códigos. Montar una vez en el root.
 *
 * @example
 * import ScannerHost from '@device/scanner'
 * <ScannerHost />
 */
const ScannerHost: FC = () => {
  const insets = useSafeAreaInsets()
  const [permission, requestPermission] = useCameraPermissions()
  const [visible, setVisible] = useState(false)
  const [torch, setTorch] = useState(false)
  const [scanned, setScanned] = useState(false)
  const [scanTypes, setScanTypes] = useState(DEFAULT_SCAN_TYPES)
  const closing = useRef(false)

  const close = (result: Parameters<typeof resolveScan>[0]) => {
    if (closing.current) {
      return
    }
    closing.current = true
    setVisible(false)
    setScanned(false)
    setTorch(false)
    resolveScan(result)
  }

  useEffect(() => {
    bindScanner({
      open: (options: OpenScannerOptions) => {
        closing.current = false
        setScanTypes(options.types?.length ? options.types : DEFAULT_SCAN_TYPES)
        setScanned(false)
        setTorch(false)
        setVisible(true)
      },
    })

    return () => {
      bindScanner(null)
    }
  }, [])

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={() => close(null)}
    >
      <View className="flex-1 bg-background">
        {!permission?.granted && (
          <View
            className="flex-1 items-center justify-center gap-4 px-6"
            style={{ paddingTop: insets.top }}
          >
            <Text.Title size="sm">Escáner MiCoin</Text.Title>
            <Text.Caption className="text-center">
              Necesitamos permiso de cámara para leer códigos.
            </Text.Caption>
            <Pressable
              onPress={requestPermission}
              className="h-11 items-center justify-center rounded-control bg-primary-background px-5"
            >
              <Text className="font-semibold text-primary-foreground">
                Permitir cámara
              </Text>
            </Pressable>
            <Pressable onPress={() => close(null)}>
              <Text.Caption>Cancelar</Text.Caption>
            </Pressable>
          </View>
        )}

        {permission?.granted && (
          <>
            <View className="relative flex-1 overflow-hidden">
              <CameraView
                style={StyleSheet.absoluteFill}
                facing="back"
                enableTorch={torch}
                barcodeScannerSettings={{ barcodeTypes: scanTypes }}
                onBarcodeScanned={
                  scanned
                    ? undefined
                    : ({ data, type }) => {
                        setScanned(true)
                        void hapticImpact()
                        close({ type, data })
                      }
                }
              />
              <View
                pointerEvents="none"
                className="absolute inset-0 items-center justify-center"
              >
                <View className="h-56 w-56 rounded-control border-2 border-white/80" />
                <Text className="mt-4 text-sm font-medium text-white">
                  Apunta a QR o código de barras
                </Text>
              </View>
              <View
                className="absolute left-0 right-0 flex-row items-center justify-between px-4"
                style={{ top: insets.top + 8 }}
              >
                <Pressable
                  onPress={() => close(null)}
                  className="h-10 w-10 items-center justify-center rounded-full bg-black/45"
                >
                  <Icon icon={X} color="#ffffff" size={18} />
                </Pressable>
                <Pressable
                  onPress={() => setTorch((current) => !current)}
                  className={cn(
                    'h-10 w-10 items-center justify-center rounded-full bg-black/45',
                    torch && 'bg-brand-background',
                  )}
                >
                  <Icon icon={Zap} color="#ffffff" size={16} />
                </Pressable>
              </View>
            </View>
            <View
              className="border-t border-border bg-background px-4 pt-3"
              style={{ paddingBottom: insets.bottom + 14 }}
            >
              <Text.Caption className="text-center">
                QR · EAN · Code128 · Code39 · UPC
              </Text.Caption>
            </View>
          </>
        )}
      </View>
    </Modal>
  )
}

export default ScannerHost
export type { OpenScannerOptions, ScanResult } from './bridge'
export { openScanner } from './bridge'
export { useScanner } from './hooks'
