import {
  Aperture,
  Camera as CameraIcon,
  Flashlight,
  FlashlightOff,
  FlipHorizontal2,
  Grid3x3,
  Video,
  X,
  Zap,
} from 'lucide-react-native';
import {
  CameraView,
  type BarcodeType,
  useCameraPermissions,
} from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { type FC, useEffect, useRef, useState } from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Icon from '@/common/components/icon';
import Text from '@/common/components/text';
import { hapticImpact } from '@/common/device/haptics';
import { cn } from '@/lib/utils';

type Facing = 'front' | 'back';
type Flash = 'off' | 'on' | 'auto';
type CaptureMode = 'picture' | 'video';
type HostMode = 'camera' | 'scanner';

type CameraAsset = {
  uri: string;
  width?: number;
  height?: number;
  type?: 'photo' | 'video';
};

type ScanResult = {
  type: string;
  data: string;
};

type OpenCameraOptions = {
  facing?: Facing;
  mode?: CaptureMode;
};

type OpenScannerOptions = {
  types?: BarcodeType[];
};

const DEFAULT_SCAN_TYPES: BarcodeType[] = [
  'qr',
  'ean13',
  'ean8',
  'code128',
  'code39',
  'upc_a',
];

type CameraControls = {
  openCamera: (options: OpenCameraOptions) => void;
  openScanner: (options: OpenScannerOptions) => void;
};

let controls: CameraControls | null = null;
let pendingCamera: ((asset: CameraAsset | null) => void) | null = null;
let pendingScan: ((result: ScanResult | null) => void) | null = null;

const openCamera = (options: OpenCameraOptions = {}) => {
  return new Promise<CameraAsset | null>((resolve) => {
    pendingCamera = resolve;
    if (!controls) {
      resolve(null);
      return;
    }
    controls.openCamera(options);
  });
};

const openScanner = (options: OpenScannerOptions = {}) => {
  return new Promise<ScanResult | null>((resolve) => {
    pendingScan = resolve;
    if (!controls) {
      resolve(null);
      return;
    }
    controls.openScanner(options);
  });
};

const pickImage = async () => {
  const current = await ImagePicker.getMediaLibraryPermissionsAsync();
  if (!current.granted) {
    const asked = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!asked.granted) {
      return null;
    }
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    quality: 0.9,
    allowsEditing: true,
    mediaTypes: ['images'],
  });

  if (result.canceled) {
    return null;
  }

  return result.assets[0] ?? null;
};

const CameraHost: FC = () => {
  const insets = useSafeAreaInsets();
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [visible, setVisible] = useState(false);
  const [hostMode, setHostMode] = useState<HostMode>('camera');
  const [facing, setFacing] = useState<Facing>('back');
  const [flash, setFlash] = useState<Flash>('off');
  const [torch, setTorch] = useState(false);
  const [zoom, setZoom] = useState(0);
  const [grid, setGrid] = useState(true);
  const [mode, setMode] = useState<CaptureMode>('picture');
  const [recording, setRecording] = useState(false);
  const [busy, setBusy] = useState(false);
  const [scanTypes, setScanTypes] = useState<BarcodeType[]>(DEFAULT_SCAN_TYPES);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    controls = {
      openCamera: (options) => {
        setHostMode('camera');
        setFacing(options.facing ?? 'back');
        setMode(options.mode ?? 'picture');
        setScanned(false);
        setVisible(true);
      },
      openScanner: (options) => {
        setHostMode('scanner');
        setFacing('back');
        setScanTypes(options.types?.length ? options.types : DEFAULT_SCAN_TYPES);
        setScanned(false);
        setTorch(false);
        setVisible(true);
      },
    };

    return () => {
      controls = null;
    };
  }, []);

  const closeCamera = (asset: CameraAsset | null) => {
    setVisible(false);
    setBusy(false);
    setRecording(false);
    setZoom(0);
    setTorch(false);
    pendingCamera?.(asset);
    pendingCamera = null;
  };

  const closeScanner = (result: ScanResult | null) => {
    setVisible(false);
    setScanned(false);
    setTorch(false);
    pendingScan?.(result);
    pendingScan = null;
  };

  const onRequestClose = () => {
    if (hostMode === 'scanner') {
      closeScanner(null);
      return;
    }
    closeCamera(null);
  };

  const cycleFlash = () => {
    if (flash === 'off') {
      setFlash('on');
      return;
    }
    if (flash === 'on') {
      setFlash('auto');
      return;
    }
    setFlash('off');
  };

  const onCapture = async () => {
    if (!cameraRef.current || busy || hostMode !== 'camera') {
      return;
    }

    if (mode === 'video') {
      if (recording) {
        cameraRef.current.stopRecording();
        return;
      }
      setRecording(true);
      await hapticImpact();
      const video = await cameraRef.current.recordAsync({ maxDuration: 30 });
      setRecording(false);
      if (!video?.uri) {
        closeCamera(null);
        return;
      }
      closeCamera({ uri: video.uri, type: 'video' });
      return;
    }

    setBusy(true);
    await hapticImpact();
    const photo = await cameraRef.current.takePictureAsync({
      quality: 0.92,
      skipProcessing: false,
      exif: true,
    });
    if (!photo?.uri) {
      closeCamera(null);
      return;
    }
    closeCamera({
      uri: photo.uri,
      width: photo.width,
      height: photo.height,
      type: 'photo',
    });
  };

  let flashLabel = 'Off';
  if (flash === 'on') {
    flashLabel = 'On';
  }
  if (flash === 'auto') {
    flashLabel = 'Auto';
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onRequestClose}
    >
      <View className="flex-1 bg-background">
        {!permission?.granted && (
          <View
            className="flex-1 items-center justify-center gap-4 px-6"
            style={{ paddingTop: insets.top }}
          >
            <Icon icon={CameraIcon} size={36} tone="brand" />
            <Text className="text-center text-base font-semibold">
              Cámara MiCoin
            </Text>
            <Text className="text-center text-secondary">
              Necesitamos permiso para foto, video o escanear códigos.
            </Text>
            <Pressable
              onPress={requestPermission}
              className="h-11 items-center justify-center rounded-control bg-primary-background px-5"
            >
              <Text className="font-semibold text-primary-foreground">
                Permitir cámara
              </Text>
            </Pressable>
            <Pressable onPress={onRequestClose}>
              <Text className="text-secondary">Cancelar</Text>
            </Pressable>
          </View>
        )}

        {permission?.granted && hostMode === 'scanner' && (
          <>
            <View className="relative flex-1 overflow-hidden">
              <CameraView
                ref={cameraRef}
                style={StyleSheet.absoluteFill}
                facing={facing}
                enableTorch={torch}
                barcodeScannerSettings={{ barcodeTypes: scanTypes }}
                onBarcodeScanned={
                  scanned
                    ? undefined
                    : ({ data, type }) => {
                        setScanned(true);
                        void hapticImpact();
                        closeScanner({ type, data });
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
                  onPress={() => closeScanner(null)}
                  className="h-10 w-10 items-center justify-center rounded-full bg-black/45"
                >
                  <Icon icon={X} color="#ffffff" size={18} />
                </Pressable>
                <Pressable
                  onPress={() => setTorch((current) => !current)}
                  className={cn(
                    'h-10 w-10 items-center justify-center rounded-full bg-black/45',
                    torch && 'bg-brand-background'
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
              <Text className="text-center text-sm text-secondary">
                QR · EAN · Code128 · Code39 · UPC
              </Text>
            </View>
          </>
        )}

        {permission?.granted && hostMode === 'camera' && (
          <>
            <View className="relative flex-1 overflow-hidden">
              <CameraView
                ref={cameraRef}
                style={StyleSheet.absoluteFill}
                facing={facing}
                flash={flash}
                enableTorch={torch}
                zoom={zoom}
                mode={mode}
                videoQuality="1080p"
              />

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
                  onPress={() => closeCamera(null)}
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
                      torch && 'bg-brand-background'
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
                </View>
              </View>

              <View className="absolute bottom-28 left-0 right-0 items-center gap-3">
                <View className="flex-row gap-2 rounded-full bg-black/45 p-1">
                  {(['picture', 'video'] as CaptureMode[]).map((item) => {
                    const selected = mode === item;
                    return (
                      <Pressable
                        key={item}
                        onPress={() => setMode(item)}
                        className={cn(
                          'h-8 min-w-16 flex-row items-center justify-center gap-1 rounded-full px-3',
                          selected && 'bg-white'
                        )}
                      >
                        <Icon
                          icon={item === 'picture' ? Aperture : Video}
                          color={selected ? '#000000' : '#ffffff'}
                          size={14}
                        />
                        <Text
                          className={cn(
                            'text-xs font-semibold',
                            selected && 'text-black',
                            !selected && 'text-white'
                          )}
                        >
                          {item === 'picture' ? 'Foto' : 'Video'}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </View>
            </View>

            <View
              className="flex-row items-center justify-between border-t border-border bg-background px-6 pt-3"
              style={{ paddingBottom: insets.bottom + 14 }}
            >
              <Pressable
                onPress={() =>
                  setFacing((current) =>
                    current === 'back' ? 'front' : 'back'
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
                  recording && 'bg-error'
                )}
              >
                <Icon
                  icon={mode === 'video' ? Video : Aperture}
                  tone="onPrimary"
                  size={28}
                />
              </Pressable>
              <View className="h-12 w-12" />
            </View>
          </>
        )}
      </View>
    </Modal>
  );
};

export { CameraHost, openCamera, openScanner, pickImage };
export type { CameraAsset, Facing, ScanResult };
