import { type FC, useState } from 'react'
import { ScrollView, View } from 'react-native'

import { type Href, Link } from 'expo-router'
import {
  Camera,
  ClipboardCopy,
  CreditCard,
  FileUp,
  Fingerprint,
  Mail,
  MapPin,
  Moon,
  Send,
  Share2,
  SunMedium,
  Volume2,
  Wallet,
} from 'lucide-react-native'

import Accordion from '@components/accordion'
import Breadcrumb from '@components/breadcrumb'
import Button from '@components/button'
import Checkbox from '@components/checkbox'
import Chip from '@components/chip'
import Combobox from '@components/combobox'
import Dialog from '@components/dialog'
import Drawer from '@components/drawer'
import Header from '@components/header'
import Icon from '@components/icon'
import Image, { IMAGE_ASPECTS, type ImageAspect } from '@components/image'
import Input from '@components/input'
import MultiStep from '@components/multi-step'
import AppNav from '@components/nav'
import { type BrandSize, type BrandStatus } from '@components/shared/brand'
import Switch from '@components/switch'
import Tabs from '@components/tabs'
import Text from '@components/text'
import ThemeToggle from '@components/theme-toggle'
import { showToast } from '@components/toast'
import { authenticateBiometric } from '@device/biometrics'
import { setBrightness } from '@device/brightness'
import { openCamera, openScanner, pickImage } from '@device/camera'
import { copyText } from '@device/clipboard'
import { getContactsCount } from '@device/contacts'
import { useDeviceLab } from '@device/device-lab/hooks'
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

const STATUSES: BrandStatus[] = [
  'default',
  'primary',
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

const IMAGE_ASPECT_KEYS = Object.keys(IMAGE_ASPECTS.variants) as ImageAspect[]

const KIT_LAST = 38

const Home: FC = () => {
  const { isAuthenticated, data } = useSession()
  const deviceChips = useDeviceLab()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogLocked, setDialogLocked] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [checked, setChecked] = useState(false)
  const [switched, setSwitched] = useState(true)
  const [combo, setCombo] = useState('pen')
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
          n={17}
          title="Tabs"
          does="Triggers Button; trigger string o ReactNode; cambio directo de panel."
          doesNot="No es SegmentedTabs nativo. No persiste ruta."
          solves="Cambiar de vista in-place sin navegar."
        >
          <CatalogVariant
            n={17}
            sub={1}
            title="Contenido largo"
            description="Tres paneles con copy, chips, lista e inputs."
          >
            <Tabs
              tabs={[
                {
                  id: 'resumen',
                  trigger: 'Resumen',
                  content: (
                    <View className="gap-3">
                      <Text.Title size="sm">Saldo disponible</Text.Title>
                      <Text.Highlight>$1,248.50</Text.Highlight>
                      <View className="flex-row flex-wrap gap-2">
                        {FILTERS.map((item) => (
                          <Chip key={item} label={item} variant="soft" />
                        ))}
                      </View>
                      <Text.Paragraph>
                        Vista general de movimientos del periodo. Cambia de tab
                        para ver el detalle o preferencias del demo.
                      </Text.Paragraph>
                      <Image
                        source={{ uri: IMAGE_DEMO }}
                        aspectRatio="16/9"
                      />
                    </View>
                  ),
                },
                {
                  id: 'movimientos',
                  trigger: 'Movimientos',
                  content: (
                    <View className="gap-2">
                      <Text.Subtitle>Hoy</Text.Subtitle>
                      {[
                        'Café · −$4.50',
                        'Transferencia · +$120.00',
                        'Suscripción · −$9.99',
                        'Supermercado · −$38.20',
                        'Reembolso · +$15.00',
                      ].map((line) => (
                        <View
                          key={line}
                          className="rounded-control border border-border bg-card px-3 py-2"
                        >
                          <Text>{line}</Text>
                        </View>
                      ))}
                    </View>
                  ),
                },
                {
                  id: 'ajustes',
                  trigger: 'Ajustes',
                  content: (
                    <View className="gap-3">
                      <Switch
                        checked={switched}
                        onCheckedChange={setSwitched}
                        label="Notificaciones push"
                      />
                      <Checkbox
                        checked={checked}
                        onCheckedChange={setChecked}
                        label="Acepto términos del demo"
                        variant="outline"
                      />
                      <Input
                        label="Alias de cuenta"
                        placeholder="Mi cuenta"
                        value={inputValue}
                        onChangeText={setInputValue}
                      />
                    </View>
                  ),
                },
              ]}
            />
          </CatalogVariant>
          <CatalogVariant
            n={17}
            sub={2}
            title="Trigger custom"
            description="Icono + texto vía trigger (selected) => …"
          >
            <Tabs
              defaultTab="card"
              tabs={[
                {
                  id: 'wallet',
                  trigger: (selected) => (
                    <View className="flex-row items-center gap-1.5">
                      <Icon
                        icon={Wallet}
                        size={14}
                        tone={selected ? 'onPrimary' : 'secondary'}
                      />
                      <Text
                        className={cn(
                          'text-sm font-semibold',
                          selected
                            ? 'text-primary-foreground'
                            : 'text-secondary',
                        )}
                      >
                        Wallet
                      </Text>
                    </View>
                  ),
                  content: (
                    <View className="gap-2">
                      <Text.Caption>Balance total</Text.Caption>
                      <Text.Title size="md">$842.10</Text.Title>
                      <Text.Paragraph>
                        Panel corto al cambiar tab.
                      </Text.Paragraph>
                    </View>
                  ),
                },
                {
                  id: 'card',
                  trigger: (selected) => (
                    <View className="flex-row items-center gap-1.5">
                      <Icon
                        icon={CreditCard}
                        size={14}
                        tone={selected ? 'onPrimary' : 'secondary'}
                      />
                      <Text
                        className={cn(
                          'text-sm font-semibold',
                          selected
                            ? 'text-primary-foreground'
                            : 'text-secondary',
                        )}
                      >
                        Tarjeta
                      </Text>
                    </View>
                  ),
                  content: (
                    <View className="gap-2">
                      <Text.Subtitle>•••• 4242</Text.Subtitle>
                      <Chip label="Activa" status="success" variant="solid" />
                      <Text.Paragraph>
                        Tab inicial vía defaultTab. El activo usa primary.
                      </Text.Paragraph>
                    </View>
                  ),
                },
                {
                  id: 'send',
                  trigger: (selected) => (
                    <View className="flex-row items-center gap-1.5">
                      <Icon
                        icon={Send}
                        size={14}
                        tone={selected ? 'onPrimary' : 'secondary'}
                      />
                      <Text
                        className={cn(
                          'text-sm font-semibold',
                          selected
                            ? 'text-primary-foreground'
                            : 'text-secondary',
                        )}
                      >
                        Enviar
                      </Text>
                    </View>
                  ),
                  content: (
                    <View className="gap-2">
                      <Input label="Destinatario" placeholder="@usuario" />
                      <Input label="Monto" placeholder="0.00" />
                      <Button label="Continuar" size="sm" />
                    </View>
                  ),
                },
                {
                  id: 'more',
                  trigger: 'Más',
                  content: (
                    <View className="gap-2">
                      {STATUSES.slice(0, 4).map((status) => (
                        <Chip
                          key={status}
                          label={status}
                          status={status}
                          variant="outline"
                        />
                      ))}
                    </View>
                  ),
                },
              ]}
            />
          </CatalogVariant>
          <CatalogVariant
            n={17}
            sub={3}
            title="Button props"
            description="tabProps: variant, status e icon por tab."
          >
            <Tabs
              tabs={[
                {
                  id: 'solid',
                  trigger: 'Solid',
                  content: <Text.Paragraph>Tab default + primary al activo.</Text.Paragraph>,
                },
                {
                  id: 'outline',
                  trigger: 'Outline',
                  tabProps: { variant: 'outline', status: 'info' },
                  content: (
                    <Text.Paragraph>
                      Siempre outline info; anula el ghost/default del kit.
                    </Text.Paragraph>
                  ),
                },
                {
                  id: 'brand',
                  trigger: 'Brand',
                  tabProps: { variant: 'brand', icon: Share2 },
                  content: (
                    <Text.Paragraph>
                      variant brand + icon Lucide en el trigger.
                    </Text.Paragraph>
                  ),
                },
              ]}
            />
          </CatalogVariant>
        </CatalogCard>

        <CatalogCard
          n={18}
          title="Accordion"
          does="Lista colapsable. type single o multiple."
          doesNot="No es Dialog. No navega. El contenido es string."
          solves="FAQ o detalle largo sin ocupar la pantalla entera."
        >
          <CatalogVariant
            n={18}
            sub={1}
            title="Single"
            description="Un ítem abierto a la vez."
          >
            <Accordion
              items={[
                {
                  id: '1',
                  title: `Qué es ${metadata.name}?`,
                  content: metadata.description,
                },
                {
                  id: '2',
                  title: 'Offline?',
                  content: 'SQLite first, then sync.',
                },
              ]}
            />
          </CatalogVariant>
          <CatalogVariant
            n={18}
            sub={2}
            title="Multiple"
            description="Varios ítems abiertos a la vez."
          >
            <Accordion
              type="multiple"
              items={[
                {
                  id: 'a',
                  title: 'Paso 1',
                  content: 'Puede quedar abierto.',
                },
                {
                  id: 'b',
                  title: 'Paso 2',
                  content: 'También este.',
                },
              ]}
            />
          </CatalogVariant>
        </CatalogCard>

        <CatalogCard
          n={19}
          title="Breadcrumb"
          does="Ruta de migas: Home / Lab / UI."
          doesNot="No navega al tap. No es Header."
          solves="Orientar al usuario en jerarquías profundas."
        >
          <Breadcrumb
            items={[{ label: 'Home' }, { label: 'Lab' }, { label: 'UI' }]}
          />
        </CatalogCard>

        <CatalogCard
          n={20}
          title="Combobox"
          does="Select in-place: value + options + onChange."
          doesNot="No es Input libre. No busca remoto."
          solves="Elegir una opción de lista corta (categoría, moneda)."
        >
          <Combobox
            value={combo}
            onChange={setCombo}
            options={[
              { value: 'pen', label: 'Pens' },
              { value: 'food', label: 'Food' },
              { value: 'rent', label: 'Rent' },
            ]}
          />
        </CatalogCard>

        <CatalogCard
          n={21}
          title="MultiStep"
          does="Wizard con MultiStep.Step, header y onComplete."
          doesNot="No persiste el flujo. No es Tabs."
          solves="Onboarding o un cobro en pasos sin cambiar de ruta."
        >
          <MultiStep
            headerTitle="Demo flow"
            onComplete={() => showToast({ title: 'Listo', status: 'success' })}
          >
            <MultiStep.Step title="One">
              <Text>First step</Text>
            </MultiStep.Step>
            <MultiStep.Step title="Two">
              <Text>Second step</Text>
            </MultiStep.Step>
          </MultiStep>
        </CatalogCard>

        <CatalogCard
          n={22}
          title="Dialog"
          does="Modal compuesto: Header, Title, Content, Footer."
          doesNot="No es Drawer ni Toast. closeOnOutside es false por defecto."
          solves="Confirmar, formularios cortos o bloqueo de contexto."
        >
          <CatalogVariant
            n={22}
            sub={1}
            title="Default"
            description="Compound: Dialog.Header, Dialog.Title, Dialog.Content, Dialog.Footer. Overlay. Tap fuera no cierra."
          >
            <Button label="Open dialog" onPress={() => setDialogOpen(true)} />
          </CatalogVariant>
          <CatalogVariant
            n={22}
            sub={2}
            title="Form locked"
            description="closeOnOutside false + Input."
          >
            <Button
              variant="outline"
              label="Form dialog"
              onPress={() => setDialogLocked(true)}
            />
          </CatalogVariant>
        </CatalogCard>

        <CatalogCard
          n={23}
          title="Drawer"
          does="Sheet inferior con título y onOpenChange."
          doesNot="No es Dialog centrado. No es bottom-sheet de Gorhom."
          solves="Acciones secundarias sin tapar toda la pantalla."
        >
          <Button
            variant="outline"
            label="Open drawer"
            onPress={() => setDrawerOpen(true)}
          />
        </CatalogCard>

        <CatalogCard
          n={24}
          title="Toast"
          does="Aviso nativo (Android Toast / iOS Alert) vía showToast."
          doesNot="No es un componente montado. No encola UI custom."
          solves="Feedback corto: guardado, error, warning."
        >
          <Button
            variant="ghost"
            label="Toast"
            onPress={() =>
              showToast({ title: 'Guardado', status: 'success', message: 'OK' })
            }
          />
        </CatalogCard>

        <CatalogCard
          n={25}
          title="device-lab"
          does="Hook que agrega chips de batería, red, OS, brillo, sensores."
          doesNot="No escribe settings. No sustituye cada módulo device."
          solves="Telemetría de lab en una sola suscripción."
        >
          <View className="flex-row flex-wrap gap-2">
            {deviceChips.map((item) => (
              <Chip
                key={item.id}
                label={item.label}
                status={item.status ?? 'default'}
              />
            ))}
          </View>
        </CatalogCard>

        <CatalogCard
          n={26}
          title="biometrics"
          does="Pide Face ID / huella con el copy de metadata."
          doesNot="No guarda PIN. No es login por sí mismo."
          solves="Confirmar una acción sensible en el dispositivo."
        >
          <Button
            icon={Fingerprint}
            label="Biometric"
            onPress={async () => {
              const result = await authenticateBiometric()
              if (result.ok) {
                showToast({
                  title: metadata.name,
                  status: 'success',
                  message: 'Autenticado',
                })
                return
              }
              showToast({
                title: metadata.name,
                status: 'warning',
                message: result.reason,
              })
            }}
          />
        </CatalogCard>

        <CatalogCard
          n={27}
          title="camera"
          does="Captura foto/video, galería y escáner de códigos."
          doesNot="No persiste en backend. No es el componente Image."
          solves="Tickets, KYC, cobro QR y adjuntos desde el device."
        >
          <CatalogVariant
            n={27}
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
            n={27}
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
            n={27}
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
          n={28}
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
          n={29}
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
          n={30}
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
          n={31}
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
          n={32}
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
          n={33}
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
          n={34}
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
          n={35}
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
          n={36}
          title="orientation"
          does="Bloquea portrait o libera la rotación."
          doesNot="No lee sensores de movimiento. No es keep-awake."
          solves="Forzar vertical en cobro o cine en un video."
        >
          <CatalogVariant
            n={36}
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
            n={36}
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
          n={37}
          title="haptics"
          does="Feedback háptico: impacto, éxito, warning."
          doesNot="No reproduce audio. No es un botón."
          solves="Confirmar tap o pago con el motor de vibración."
        >
          <CatalogVariant
            n={37}
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
            n={37}
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
            n={37}
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
          n={38}
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

      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen} title="Drawer">
        <Text.Subtitle className="mb-4">
          Sheet inferior para acciones secundarias.
        </Text.Subtitle>
        <Button label="Cerrar" onPress={() => setDrawerOpen(false)} />
      </Drawer>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <Dialog.Header>
          <Dialog.Title>Dialog</Dialog.Title>
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
          <Dialog.Title>Form dialog</Dialog.Title>
        </Dialog.Header>
        <Dialog.Content>
          <Input label="Note" placeholder="Outside tap does nothing" />
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

