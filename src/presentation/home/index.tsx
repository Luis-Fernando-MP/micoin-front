import { type FC, useState } from 'react'
import { ScrollView, View } from 'react-native'

import * as Crypto from 'expo-crypto'
import { type Href, Link } from 'expo-router'
import {
  Camera,
  ClipboardCopy,
  FileUp,
  Fingerprint,
  HeartPulse,
  Home as HomeIcon,
  type LucideIcon,
  Mail,
  MapPin,
  Moon,
  PenLine,
  Plane,
  Share2,
  SunMedium,
  Utensils,
  Volume2,
} from 'lucide-react-native'

import Button from '@components/button'
import Combobox, {
  type ComboboxItemState,
  type ComboboxOption,
} from '@components/combobox'
import Dialog from '@components/dialog'
import Header from '@components/header'
import Icon from '@components/icon'
import Image from '@components/image'
import Input from '@components/input'
import AppNav from '@components/nav'
import BRAND, {
  type BrandSize,
  type BrandStatus,
} from '@components/shared/brand'
import Text from '@components/text'
import ThemeToggle from '@components/theme-toggle'
import { showToast } from '@components/toast'
import { useBiometrics } from '@device/biometrics'
import { setBrightness } from '@device/brightness'
import { openCamera, openScanner, pickImage } from '@device/camera'
import { copyText } from '@device/clipboard'
import { getContactsCount } from '@device/contacts'
import { type DeviceSnapshot } from '@device/device'
import { pickDocument } from '@device/document-picker'
import { hapticImpact, hapticSuccess, hapticWarning } from '@device/haptics'
import { setKeepAwake } from '@device/keep-awake'
import { getLocationSnapshot } from '@device/location'
import { openSupportMail } from '@device/mail'
import { lockPortrait, unlockOrientation } from '@device/orientation'
import { shareFile } from '@device/sharing'
import { speakText } from '@device/speech'
import { CatalogCard, CatalogVariant } from '@views/home/catalog-card'
import { LabCatalog } from '@views/home/lab-catalog'

import { useSession } from '@/auth/use-session'
import { metadata } from '@/common/metadata'
import { cn } from '@/lib/utils'

type ComboCategory = {
  value: string
  label: string
  subtitle: string
  icon: LucideIcon
}

const COMBO_CATEGORIES: ComboCategory[] = [
  {
    value: 'pen',
    label: 'Papelería',
    subtitle: 'Útiles y escritura',
    icon: PenLine,
  },
  {
    value: 'food',
    label: 'Comida',
    subtitle: 'Restaurantes y súper',
    icon: Utensils,
  },
  {
    value: 'rent',
    label: 'Hogar',
    subtitle: 'Renta y servicios',
    icon: HomeIcon,
  },
  {
    value: 'travel',
    label: 'Viajes',
    subtitle: 'Transporte y hotel',
    icon: Plane,
  },
  {
    value: 'health',
    label: 'Salud',
    subtitle: 'Farmacia y consultas',
    icon: HeartPulse,
  },
]

const ComboOptionRow: FC<{
  icon: LucideIcon
  title: string
  subtitle: string
  selected?: boolean
}> = ({ icon, title, subtitle, selected }) => (
  <View className="flex-row items-center gap-3 py-0.5">
    <View
      className={cn(
        'h-9 w-9 items-center justify-center border border-border bg-card',
        BRAND.radius.variants.control,
      )}
    >
      <Icon icon={icon} tone="secondary" size={18} />
    </View>
    <View className="flex-1 gap-0.5">
      <Text
        className={cn('text-sm text-foreground', selected && 'font-semibold')}
      >
        {title}
      </Text>
      <Text.Caption>{subtitle}</Text.Caption>
    </View>
  </View>
)

const COMBO_CATEGORY_BY_VALUE = new Map(
  COMBO_CATEGORIES.map((item) => [item.value, item]),
)

const COMBO_CATEGORY_OPTIONS = COMBO_CATEGORIES.map(({ value, label }) => ({
  value,
  label,
}))

const RICH_COMBO_OPTIONS = COMBO_CATEGORIES.map((item) => ({
  value: item.value,
  label: item.label,
  content: (
    <ComboOptionRow
      icon={item.icon}
      title={item.label}
      subtitle={item.subtitle}
    />
  ),
}))

const renderRichComboItem = (
  option: ComboboxOption,
  { selected }: ComboboxItemState,
) => {
  const item = COMBO_CATEGORY_BY_VALUE.get(option.value)

  if (!item) {
    return null
  }

  return (
    <ComboOptionRow
      icon={item.icon}
      title={item.label}
      subtitle={item.subtitle}
      selected={selected}
    />
  )
}

const DIALOG_PRIORITIES = [
  { value: 'low', label: 'Baja' },
  { value: 'normal', label: 'Normal' },
  { value: 'high', label: 'Alta' },
]

const STATUSES: BrandStatus[] = [
  'default',
  'primary',
  'active',
  'brand',
  'warning',
  'error',
  'info',
  'success',
]

const SIZES: BrandSize[] = ['xs', 'sm', 'md', 'lg', 'xl']

const AVATAR_DEMO =
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop'

const IMAGE_DEMO =
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80'

const FILTERS = ['Hoy', 'Semana', 'Mes'] as const

const KIT_LAST = 36

type LabRow = {
  id: string
  utility: string
  value: string
  status?: 'default' | 'info' | 'success' | 'warning' | 'brand'
}

const toDeviceRows = (snapshot: DeviceSnapshot): LabRow[] => {
  const rows: LabRow[] = []

  if (snapshot.battery) {
    rows.push({
      id: 'battery',
      utility: 'Battery',
      value: `${snapshot.battery.level}%`,
      status: snapshot.battery.powerSaver ? 'warning' : 'success',
    })
    rows.push({
      id: 'charging',
      utility: 'Charging',
      value: snapshot.battery.charging ? 'Yes' : 'No',
      status: snapshot.battery.charging ? 'brand' : 'default',
    })
    rows.push({
      id: 'power-saver',
      utility: 'Power saver',
      value: snapshot.battery.powerSaver ? 'On' : 'Off',
      status: snapshot.battery.powerSaver ? 'warning' : 'default',
    })
  }

  if (snapshot.info.model) {
    rows.push({
      id: 'model',
      utility: 'Model',
      value: snapshot.info.model,
      status: 'brand',
    })
  }

  if (snapshot.info.system) {
    rows.push({
      id: 'system',
      utility: 'System',
      value: snapshot.info.system,
      status: 'info',
    })
  }

  if (snapshot.network) {
    rows.push({
      id: 'online',
      utility: 'Network',
      value: snapshot.network.online ? 'Online' : 'Offline',
      status: snapshot.network.online ? 'success' : 'warning',
    })
    rows.push({
      id: 'net-type',
      utility: 'Network type',
      value: snapshot.network.type ?? 'unknown',
      status: 'default',
    })

    if (snapshot.network.ip) {
      rows.push({
        id: 'ip',
        utility: 'IP',
        value: snapshot.network.ip,
        status: 'default',
      })
    }
  }

  if (snapshot.cellular?.carrier) {
    rows.push({
      id: 'carrier',
      utility: 'Carrier',
      value: snapshot.cellular.carrier,
      status: 'default',
    })
  }

  if (snapshot.cellular?.country) {
    rows.push({
      id: 'country',
      utility: 'SIM country',
      value: snapshot.cellular.country,
      status: 'default',
    })
  }

  if (snapshot.app?.name) {
    rows.push({
      id: 'app',
      utility: 'App',
      value: snapshot.app.name,
      status: 'brand',
    })
  }

  if (snapshot.app?.version) {
    rows.push({
      id: 'version',
      utility: 'Version',
      value: snapshot.app.version,
      status: 'info',
    })
  }

  if (snapshot.brightness !== null) {
    rows.push({
      id: 'brightness',
      utility: 'Brightness',
      value: `${snapshot.brightness}%`,
      status: 'default',
    })
  }

  if (snapshot.locale) {
    if (snapshot.locale.language) {
      rows.push({
        id: 'language',
        utility: 'Language',
        value: snapshot.locale.language,
        status: 'info',
      })
    }

    if (snapshot.locale.region) {
      rows.push({
        id: 'region',
        utility: 'Region',
        value: snapshot.locale.region,
        status: 'default',
      })
    }

    if (snapshot.locale.timezone) {
      rows.push({
        id: 'timezone',
        utility: 'Timezone',
        value: snapshot.locale.timezone,
        status: 'default',
      })
    }
  }

  if (snapshot.biometrics) {
    rows.push({
      id: 'bio-hardware',
      utility: 'Biometrics',
      value: snapshot.biometrics.hasHardware ? 'Hardware' : 'None',
      status: snapshot.biometrics.hasHardware ? 'success' : 'warning',
    })
    rows.push({
      id: 'bio-enrolled',
      utility: 'Biometrics enrolled',
      value: snapshot.biometrics.enrolled ? 'Yes' : 'No',
      status: snapshot.biometrics.enrolled ? 'success' : 'default',
    })
  }

  if (snapshot.steps !== null) {
    rows.push({
      id: 'steps',
      utility: 'Steps',
      value: String(snapshot.steps),
      status: 'success',
    })
  }

  if (snapshot.location) {
    rows.push({
      id: 'location',
      utility: 'Location',
      value: `${snapshot.location.lat}, ${snapshot.location.lng}`,
      status: 'brand',
    })
  }

  return rows
}

const toastBio = (ok: boolean, message: string) => {
  showToast({
    title: metadata.name,
    status: ok ? 'success' : 'warning',
    message,
  })
}

const BiometricsLab: FC = () => {
  const [enabled, setEnabled] = useState(false)
  const [unlockedValue, setUnlockedValue] = useState<string | null>(null)
  const bio = useBiometrics({ enabled, onEnabledChange: setEnabled })

  let hardwareLabel = '…'
  if (bio.info) {
    hardwareLabel = bio.info.hasHardware ? 'sí' : 'no'
  }

  let enrolledLabel = '…'
  if (bio.info) {
    enrolledLabel = bio.info.enrolled ? 'sí' : 'no'
  }

  let vaultLabel = '…'
  if (bio.info) {
    vaultLabel = bio.info.canProtect ? 'sí' : 'no · Expo Go / sin Class 3'
  }

  return (
    <View className="gap-4">
      <View className="gap-1">
        <Text.Caption>useBiometrics — @device/biometrics</Text.Caption>
        <Text.Caption>
          Lab: enable(nonce). Sin login / Better Auth.
        </Text.Caption>
        <Text.Caption>Hardware: {hardwareLabel}</Text.Caption>
        <Text.Caption>Enrolado: {enrolledLabel}</Text.Caption>
        <Text.Caption>Vault: {vaultLabel}</Text.Caption>
        <Text.Caption>
          Flag local: {enabled ? 'enabled' : 'disabled'}
        </Text.Caption>
        {bio.lastError && (
          <Text.Caption status="warning">reason: {bio.lastError}</Text.Caption>
        )}
        {unlockedValue && (
          <Text.Caption status="success">
            unlock.value: {unlockedValue}
          </Text.Caption>
        )}
      </View>
      <CatalogVariant
        n={24}
        sub={1}
        title="enable"
        description="Pide huella y ata el nonce al Keychain. El flag se guarda en useState."
      >
        <Button
          size="sm"
          icon={Fingerprint}
          label="Configurar huella"
          disabled={bio.busy}
          onPress={async () => {
            setUnlockedValue(null)
            const result = await bio.enable(Crypto.randomUUID())
            if (result.ok) {
              toastBio(true, 'Vault configurado')
              return
            }
            toastBio(false, result.reason)
          }}
        />
      </CatalogVariant>
      <CatalogVariant
        n={24}
        sub={2}
        title="unlock"
        description="El OS descifra el vault y devuelve el mismo nonce."
      >
        <Button
          size="sm"
          variant="outline"
          label="Entrar con huella"
          disabled={bio.busy || !enabled}
          onPress={async () => {
            const result = await bio.unlock()
            if (result.ok) {
              setUnlockedValue(result.value)
              toastBio(true, 'Vault abierto')
              return
            }
            setUnlockedValue(null)
            toastBio(false, result.reason)
          }}
        />
      </CatalogVariant>
      <CatalogVariant
        n={24}
        sub={3}
        title="disable"
        description="Borra el ítem del Keychain y apaga el flag local."
      >
        <Button
          size="sm"
          variant="ghost"
          label="Desactivar"
          disabled={bio.busy || !enabled}
          onPress={async () => {
            const result = await bio.disable()
            if (result.ok) {
              setUnlockedValue(null)
              toastBio(true, 'Vault borrado')
              return
            }
            toastBio(false, result.reason)
          }}
        />
      </CatalogVariant>
    </View>
  )
}

const Home: FC = () => {
  const { isAuthenticated, data } = useSession()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogLocked, setDialogLocked] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [checked, setChecked] = useState(false)
  const [switched, setSwitched] = useState(true)
  const [combo, setCombo] = useState('pen')
  const [comboRich, setComboRich] = useState('food')
  const [comboSearch, setComboSearch] = useState('food')
  const [dialogCategory, setDialogCategory] = useState('food')
  const [dialogPriority, setDialogPriority] = useState('normal')
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('Hoy')
  const [previewUri, setPreviewUri] = useState<string | null>(null)
  const [scanLabel, setScanLabel] = useState<string | null>(null)
  const [keepAwakeOn, setKeepAwakeOn] = useState(false)

  let statusLabel = 'Guest'
  if (isAuthenticated) {
    statusLabel = 'Signed in'
  }

  return (
    <View className="flex-1 bg-background">
      <Header
        title={metadata.name}
        rightComponents={[<ThemeToggle key="theme" />]}
      />
      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-4 p-5 pb-8"
        keyboardShouldPersistTaps="handled"
      >
        <CatalogCard
          n={24}
          title="biometrics"
          does="enable(nonce) → unlock() devuelve el nonce. Flag en useState."
          doesNot="No hay login. No usa Better Auth. En Expo Go el vault da unavailable."
          solves="Probar configurar / entrar / desactivar como Yape, sin sesión."
        >
          <BiometricsLab />
        </CatalogCard>

        <CatalogCard
          n={25}
          title="camera"
          does="Captura foto/video, galería y escáner de códigos."
          doesNot="No persiste en backend. No es el componente Image."
          solves="Tickets, KYC, cobro QR y adjuntos desde el device."
        >
          <CatalogVariant
            n={25}
            sub={1}
            title="openCamera"
            description="Modal de captura. facing back."
          >
            <View className="gap-2">
              <Button
                icon={Camera}
                variant="outline"
                label="Camera pro"
                onPress={async () => {
                  const photo = await openCamera({ facing: 'back' })
                  if (!photo) {
                    return
                  }
                  if (photo.type === 'video') {
                    showToast({ title: 'Video listo', status: 'success' })
                    return
                  }
                  setPreviewUri(photo.uri)
                  showToast({ title: 'Foto capturada', status: 'success' })
                }}
              />
              {previewUri && (
                <Image source={{ uri: previewUri }} aspectRatio="3/4" />
              )}
            </View>
          </CatalogVariant>
          <CatalogVariant
            n={25}
            sub={2}
            title="pickImage"
            description="Elige de la galería con permiso incluido."
          >
            <Button
              variant="ghost"
              label="Pick image"
              onPress={async () => {
                const image = await pickImage()
                if (!image?.uri) {
                  return
                }
                setPreviewUri(image.uri)
                showToast({ title: 'Imagen seleccionada', status: 'info' })
              }}
            />
          </CatalogVariant>
          <CatalogVariant
            n={25}
            sub={3}
            title="openScanner"
            description="Viewfinder QR / barcode."
          >
            <View className="gap-2">
              <Button
                variant="outline"
                label="Abrir scanner"
                onPress={async () => {
                  const result = await openScanner()
                  if (!result) {
                    return
                  }
                  setScanLabel(`${result.type}: ${result.data.slice(0, 48)}`)
                  showToast({
                    title: result.type,
                    message: result.data.slice(0, 60),
                    status: 'success',
                  })
                }}
              />
              {scanLabel && (
                <Text.Subtitle numberOfLines={2}>{scanLabel}</Text.Subtitle>
              )}
            </View>
          </CatalogVariant>
        </CatalogCard>

        <CatalogCard
          n={26}
          title="document-picker"
          does="Abre el selector de archivos del sistema."
          doesNot="No sube al backend. No previsualiza PDF."
          solves="Adjuntar un comprobante o KYC desde Files."
        >
          <Button
            icon={FileUp}
            variant="outline"
            label="Pick document"
            onPress={async () => {
              const file = await pickDocument()
              if (!file) {
                return
              }
              showToast({ title: file.name, status: 'info' })
            }}
          />
        </CatalogCard>

        <CatalogCard
          n={27}
          title="clipboard"
          does="Copia un string al portapapeles del sistema."
          doesNot="No comparte archivos. No lee contactos."
          solves="Copiar link de cobro o referencia."
        >
          <Button
            icon={ClipboardCopy}
            variant="outline"
            label="Clipboard"
            onPress={async () => {
              await copyText(metadata.name)
              showToast({ title: 'Copiado', status: 'success' })
            }}
          />
        </CatalogCard>

        <CatalogCard
          n={28}
          title="location"
          does="Pide permiso y devuelve lat, lng y accuracy."
          doesNot="No dibuja mapa. No trackea en background."
          solves="Snapshot de posición para sucursal o encuentro P2P."
        >
          <Button
            icon={MapPin}
            variant="outline"
            label="Location"
            onPress={async () => {
              const result = await getLocationSnapshot()
              if (!result.ok) {
                showToast({ title: 'Location denied', status: 'warning' })
                return
              }
              showToast({
                title: `${result.lat}, ${result.lng}`,
                status: 'info',
                message: `±${result.accuracy}m`,
              })
            }}
          />
        </CatalogCard>

        <CatalogCard
          n={29}
          title="speech"
          does="TTS del sistema. Si ya habla, detiene."
          doesNot="No transcribe. No es el audio-recorder."
          solves="Leer un monto o tagline en voz alta."
        >
          <Button
            icon={Volume2}
            variant="outline"
            label="Speech"
            onPress={async () => {
              await speakText()
            }}
          />
        </CatalogCard>

        <CatalogCard
          n={30}
          title="mail"
          does="Abre el composer de correo de soporte."
          doesNot="No envía solo. No es inbox in-app."
          solves="Contactar soporte con el mail nativo."
        >
          <Button
            icon={Mail}
            variant="outline"
            label="Mail support"
            onPress={async () => {
              const result = await openSupportMail()
              if (!result.ok) {
                showToast({ title: 'Mail no disponible', status: 'warning' })
              }
            }}
          />
        </CatalogCard>

        <CatalogCard
          n={31}
          title="brightness"
          does="Fija el brillo de pantalla en porcentaje."
          doesNot="No restaura al salir. No lee sensores."
          solves="Subir brillo para mostrar un QR en caja."
        >
          <Button
            icon={SunMedium}
            variant="outline"
            label="Brightness 80%"
            onPress={async () => {
              const value = await setBrightness(80)
              showToast({ title: `Bright ${value}%`, status: 'info' })
            }}
          />
        </CatalogCard>

        <CatalogCard
          n={32}
          title="keep-awake"
          does="Impide que la pantalla se apague mientras está activo."
          doesNot="No cambia brillo. No es lock de orientación."
          solves="QR de cobro o mapa sin que se duerma el device."
        >
          <Button
            icon={Moon}
            variant="outline"
            label={keepAwakeOn ? 'Keep awake off' : 'Keep awake on'}
            onPress={async () => {
              const next = !keepAwakeOn
              await setKeepAwake(next)
              setKeepAwakeOn(next)
              showToast({
                title: next ? 'Pantalla despierta' : 'Keep awake off',
                status: 'info',
              })
            }}
          />
        </CatalogCard>

        <CatalogCard
          n={33}
          title="contacts"
          does="Pide permiso y cuenta contactos accesibles."
          doesNot="No lista ni elige un contacto. No envía SMS."
          solves="Saber si hay agenda antes de un flujo P2P."
        >
          <Button
            variant="outline"
            label="Contacts count"
            onPress={async () => {
              const result = await getContactsCount()
              if (!result.ok) {
                showToast({ title: 'Contacts denied', status: 'warning' })
                return
              }
              showToast({
                title: `${result.total} contactos`,
                status: 'success',
              })
            }}
          />
        </CatalogCard>

        <CatalogCard
          n={34}
          title="orientation"
          does="Bloquea portrait o libera la rotación."
          doesNot="No lee sensores de movimiento. No es keep-awake."
          solves="Forzar vertical en cobro o cine en un video."
        >
          <CatalogVariant
            n={34}
            sub={1}
            title="lockPortrait"
            description="PORTRAIT_UP."
          >
            <Button
              variant="outline"
              label="Lock portrait"
              onPress={async () => {
                await lockPortrait()
                showToast({ title: 'Portrait lock', status: 'info' })
              }}
            />
          </CatalogVariant>
          <CatalogVariant
            n={34}
            sub={2}
            title="unlockOrientation"
            description="Todas las orientaciones."
          >
            <Button
              variant="ghost"
              label="Unlock orientation"
              onPress={async () => {
                await unlockOrientation()
                showToast({ title: 'Orientation free', status: 'info' })
              }}
            />
          </CatalogVariant>
        </CatalogCard>

        <CatalogCard
          n={35}
          title="haptics"
          does="Feedback háptico: impacto, éxito, warning."
          doesNot="No reproduce audio. No es un botón."
          solves="Confirmar tap o pago con el motor de vibración."
        >
          <CatalogVariant
            n={35}
            sub={1}
            title="hapticImpact"
            description="Impacto medio."
          >
            <Button
              variant="outline"
              label="Impact"
              onPress={async () => {
                await hapticImpact()
              }}
            />
          </CatalogVariant>
          <CatalogVariant
            n={35}
            sub={2}
            title="hapticSuccess"
            description="Notificación de éxito."
          >
            <Button
              variant="outline"
              label="Success"
              onPress={async () => {
                await hapticSuccess()
              }}
            />
          </CatalogVariant>
          <CatalogVariant
            n={35}
            sub={3}
            title="hapticWarning"
            description="Notificación de advertencia."
          >
            <Button
              variant="outline"
              label="Warning"
              onPress={async () => {
                await hapticWarning()
              }}
            />
          </CatalogVariant>
        </CatalogCard>

        <CatalogCard
          n={36}
          title="sharing"
          does="Abre el share sheet nativo con un archivo local."
          doesNot="No genera el archivo. No copia texto (eso es clipboard)."
          solves="Enviar foto de ticket o comprobante por WhatsApp / Mail."
        >
          <Button
            icon={Share2}
            variant="outline"
            label="Share file"
            onPress={async () => {
              if (!previewUri) {
                showToast({
                  title: 'Sin archivo',
                  status: 'warning',
                  message: 'Captura una foto en 28.1 primero',
                })
                return
              }
              const result = await shareFile(previewUri)
              if (!result.ok) {
                showToast({ title: 'Share no disponible', status: 'warning' })
              }
            }}
          />
        </CatalogCard>

        <LabCatalog startId={KIT_LAST + 1} />

        {data?.user && <Text>Welcome {data.user.email}</Text>}
        {!data?.user && (
          <View className="gap-3">
            <Link href={'/login' as Href} asChild>
              <Button label="Login" />
            </Link>
            <Link href={'/register' as Href} asChild>
              <Button variant="outline" label="Create account" />
            </Link>
          </View>
        )}
      </ScrollView>

      <AppNav />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <Dialog.Header>
          <Text.Title size="sm">Dialog</Text.Title>
        </Dialog.Header>
        <Dialog.Content>
          <Text.Subtitle>
            Overlay activo. closeOnOutside es false por defecto.
          </Text.Subtitle>
        </Dialog.Content>
        <Dialog.Footer>
          <Button
            variant="outline"
            label="Cancel"
            onPress={() => setDialogOpen(false)}
          />
          <Button label="OK" onPress={() => setDialogOpen(false)} />
        </Dialog.Footer>
      </Dialog>

      <Dialog
        open={dialogLocked}
        onOpenChange={setDialogLocked}
        closeOnOutside={false}
      >
        <Dialog.Header>
          <Text.Title size="sm">Form dialog</Text.Title>
        </Dialog.Header>
        <Dialog.Content>
          <Input label="Note" placeholder="Outside tap does nothing" />
          <View className="gap-2">
            <Text.Label>Categoría</Text.Label>
            <Combobox
              value={dialogCategory}
              onChange={setDialogCategory}
              placeholder="Categoría"
              options={COMBO_CATEGORY_OPTIONS}
            />
          </View>
          <View className="gap-2">
            <Text.Label>Prioridad</Text.Label>
            <Combobox
              value={dialogPriority}
              onChange={setDialogPriority}
              placeholder="Prioridad"
              options={DIALOG_PRIORITIES}
            />
          </View>
        </Dialog.Content>
        <Dialog.Footer>
          <Button
            variant="outline"
            label="Cancel"
            onPress={() => setDialogLocked(false)}
          />
          <Button label="Save" onPress={() => setDialogLocked(false)} />
        </Dialog.Footer>
      </Dialog>
    </View>
  )
}

export { Home }
