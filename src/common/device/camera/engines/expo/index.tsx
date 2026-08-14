import { type FC, useEffect, useMemo, useRef, useState } from 'react'
import { Modal, Pressable, StyleSheet, View } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import {
  CameraView,
  useCameraPermissions,
  useMicrophonePermissions,
} from 'expo-camera'
import {
  Aperture,
  Camera as CameraIcon,
  Flashlight,
  FlashlightOff,
  FlipHorizontal2,
  Grid3x3,
  Image as ImageIcon,
  Mic,
  MicOff,
  Video,
  X,
  Zap,
} from 'lucide-react-native'

import Icon from '@components/icon'
import Text from '@components/text'
import { bindCamera, resolveCamera } from '@device/camera/bridge'
import Filters, { FILTER_OVERLAY } from '@device/camera/extensions/filters'
import { pickImage } from '@device/camera/pick'
import {
  type CameraFilter,
  type CaptureMode,
  type Facing,
  type Flash,
  type OpenCameraOptions,
} from '@device/camera/types'
import { hapticImpact } from '@device/haptics'

import { cn } from '@/lib/utils'

/**
 * CameraHost — modal de foto/video (motor expo-camera, Expo Go).
 *
 * @example
 * import CameraHost from '@device/camera'
 * <CameraHost />
 */
const ExpoCameraHost: FC = () => {
  const insets = useSafeAreaInsets()
  const cameraRef = useRef<CameraView>(null)
  const [permission, requestPermission] = useCameraPermissions()
  const [micPermission, requestMicPermission] = useMicrophonePermissions()
  const [visible, setVisible] = useState(false)
  const [facing, setFacing] = useState<Facing>('back')
  const [flash, setFlash] = useState<Flash>('off')
  const [torch, setTorch] = useState(false)
  const [zoom, setZoom] = useState(0)
  const zoomStart = useRef(0)
  const [grid, setGrid] = useState(true)
  const [mute, setMute] = useState(false)
  const [mode, setMode] = useState<CaptureMode>('picture')
  const [filter, setFilter] = useState<CameraFilter>('none')
  const [recording, setRecording] = useState(false)
  const [busy, setBusy] = useState(false)

  const overlay = FILTER_OVERLAY[filter]
  const mirror = facing === 'front'

  const pinch = useMemo(
    () =>
      Gesture.Pinch()
        .runOnJS(true)
        .onStart(() => {
          zoomStart.current = zoom
        })
        .onUpdate((event) => {
          const next = Math.min(1, Math.max(0, zoomStart.current * event.scale))
          setZoom(next)
        }),
    [zoom],
  )

  const close = (asset: Parameters<typeof resolveCamera>[0]) => {
    setVisible(false)
    setBusy(false)
    setRecording(false)
    setZoom(0)
    setTorch(false)
    resolveCamera(asset)
  }

  useEffect(() => {
    bindCamera({
      open: (options: OpenCameraOptions) => {
        setFacing(options.facing ?? 'back')
        setMode(options.mode ?? 'picture')
        setVisible(true)
      },
    })

    return () => {
      bindCamera(null)
    }
  }, [])

  const cycleFlash = () => {
    if (flash === 'off') {
      setFlash('on')
      return
    }
    if (flash === 'on') {
      setFlash('auto')
      return
    }
    setFlash('off')
  }

  const onCapture = async () => {
    if (!cameraRef.current || busy) {
      return
    }

    if (mode === 'video') {
      if (!micPermission?.granted && !mute) {
        const asked = await requestMicPermission()
        if (!asked.granted) {
          setMute(true)
        }
      }
      if (recording) {
        cameraRef.current.stopRecording()
        return
      }
      setRecording(true)
      await hapticImpact()
      const video = await cameraRef.current.recordAsync({ maxDuration: 30 })
      setRecording(false)
      if (!video?.uri) {
        close(null)
        return
      }
      close({ uri: video.uri, type: 'video' })
      return
    }

    setBusy(true)
    await hapticImpact()
    const photo = await cameraRef.current.takePictureAsync({
      quality: 0.92,
      skipProcessing: false,
      exif: true,
      mirror,
    })
    if (!photo?.uri) {
      close(null)
      return
    }
    close({
      uri: photo.uri,
      width: photo.width,
      height: photo.height,
      type: 'photo',
    })
  }

  let flashLabel = 'Off'
  if (flash === 'on') {
    flashLabel = 'On'
  }
  if (flash === 'auto') {
    flashLabel = 'Auto'
  }

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
            <Icon icon={CameraIcon} size={36} tone="brand" />
            <Text.Title size="sm">Cámara MiCoin</Text.Title>
            <Text.Caption className="text-center">
              Necesitamos permiso para foto y video.
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
            <GestureDetector gesture={pinch}>
              <View className="relative flex-1 overflow-hidden">
                <CameraView
                  ref={cameraRef}
                  style={StyleSheet.absoluteFill}
                  facing={facing}
                  flash={flash}
                  enableTorch={torch}
                  zoom={zoom}
                  mode={mode}
                  mute={mute}
                  mirror={mirror}
                  videoQuality="1080p"
                  videoStabilizationMode="auto"
                  animateShutter
                />
                {overlay && (
                  <View
                    pointerEvents="none"
                    style={[
                      StyleSheet.absoluteFill,
                      { backgroundColor: overlay },
                    ]}
                  />
                )}
                {grid && (
                  <View pointerEvents="none" style={StyleSheet.absoluteFill}>
                    <View className="absolute bottom-0 left-1/3 top-0 w-px bg-white/25" />
                    <View className="absolute bottom-0 left-2/3 top-0 w-px bg-white/25" />
                    <View className="absolute left-0 right-0 top-1/3 h-px bg-white/25" />
                    <View className="absolute left-0 right-0 top-2/3 h-px bg-white/25" />
                  </View>
                )}
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
                  <View className="flex-row items-center gap-2">
                    <Pressable
                      onPress={cycleFlash}
                      className="h-10 flex-row items-center gap-1 rounded-full bg-black/45 px-3"
                    >
                      <Icon
                        icon={flash === 'off' ? FlashlightOff : Flashlight}
                        color="#ffffff"
                        size={16}
                      />
                      <Text className="text-xs font-medium text-white">
                        {flashLabel}
                      </Text>
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
                    <Pressable
                      onPress={() => setGrid((current) => !current)}
                      className="h-10 w-10 items-center justify-center rounded-full bg-black/45"
                    >
                      <Icon icon={Grid3x3} color="#ffffff" size={16} />
                    </Pressable>
                    {mode === 'video' && (
                      <Pressable
                        onPress={() => setMute((current) => !current)}
                        className="h-10 w-10 items-center justify-center rounded-full bg-black/45"
                      >
                        <Icon
                          icon={mute ? MicOff : Mic}
                          color="#ffffff"
                          size={16}
                        />
                      </Pressable>
                    )}
                  </View>
                </View>
                <View className="absolute bottom-28 left-0 right-0 items-center gap-3">
                  <View className="flex-row gap-2 rounded-full bg-black/45 p-1">
                    {Filters.list.map((item) => {
                      const selected = filter === item
                      return (
                        <Pressable
                          key={item}
                          onPress={() => setFilter(item)}
                          className={cn(
                            'h-8 px-3 items-center justify-center rounded-full',
                            selected && 'bg-white',
                          )}
                        >
                          <Text
                            className={cn(
                              'text-xs font-semibold text-white',
                              selected && 'text-black',
                            )}
                          >
                            {item}
                          </Text>
                        </Pressable>
                      )
                    })}
                  </View>
                  <View className="flex-row gap-2 rounded-full bg-black/45 p-1">
                    {(['picture', 'video'] as CaptureMode[]).map((item) => {
                      const selected = mode === item
                      return (
                        <Pressable
                          key={item}
                          onPress={() => setMode(item)}
                          className={cn(
                            'h-8 min-w-16 flex-row items-center justify-center gap-1 rounded-full px-3',
                            selected && 'bg-white',
                          )}
                        >
                          <Icon
                            icon={item === 'picture' ? Aperture : Video}
                            color={selected ? '#000000' : '#ffffff'}
                            size={14}
                          />
                          <Text
                            className={cn(
                              'text-xs font-semibold text-white',
                              selected && 'text-black',
                            )}
                          >
                            {item === 'picture' ? 'Foto' : 'Video'}
                          </Text>
                        </Pressable>
                      )
                    })}
                  </View>
                </View>
              </View>
            </GestureDetector>
            <View
              className="flex-row items-center justify-between border-t border-border bg-background px-6 pt-3"
              style={{ paddingBottom: insets.bottom + 14 }}
            >
              <Pressable
                onPress={() =>
                  setFacing((current) =>
                    current === 'back' ? 'front' : 'back',
                  )
                }
                className="h-12 w-12 items-center justify-center rounded-full border border-border"
              >
                <Icon icon={FlipHorizontal2} size={20} />
              </Pressable>
              <Pressable
                onPress={onCapture}
                disabled={busy}
                className={cn(
                  'h-20 w-20 items-center justify-center rounded-full border-4 border-brand-background bg-primary-background',
                  recording && 'bg-error',
                )}
              >
                <Icon
                  icon={mode === 'video' ? Video : Aperture}
                  tone="onPrimary"
                  size={28}
                />
              </Pressable>
              <Pressable
                onPress={async () => {
                  const asset = await pickImage()
                  if (asset) {
                    close(asset)
                  }
                }}
                className="h-12 w-12 items-center justify-center rounded-full border border-border"
              >
                <Icon icon={ImageIcon} size={20} />
              </Pressable>
            </View>
          </>
        )}
      </View>
    </Modal>
  )
}

export default ExpoCameraHost
