import { type FC, useState } from 'react'
import { ScrollView, View } from 'react-native'

import { type Href, Link } from 'expo-router'
import {
  Camera,
  Check,
  ClipboardCopy,
  FileUp,
  Fingerprint,
  Info,
  Mail,
  MapPin,
  Moon,
  Share2,
  SunMedium,
  Volume2,
  Wifi,
} from 'lucide-react-native'

import Accordion from '@components/accordion'
import Avatar from '@components/avatar'
import Badge from '@components/badge'
import BrandLogo from '@components/brand-logo'
import Breadcrumb from '@components/breadcrumb'
import Button from '@components/button'
import Card from '@components/card'
import Checkbox from '@components/checkbox'
import Chip from '@components/chip'
import Combobox from '@components/combobox'
import Dialog from '@components/dialog'
import Drawer from '@components/drawer'
import FadeIn from '@components/fade-in'
import Header from '@components/header'
import Icon from '@components/icon'
import Image from '@components/image'
import Input from '@components/input'
import MultiStep from '@components/multi-step'
import AppNav from '@components/nav'
import Separator from '@components/separator'
import BRAND, {
  type BrandSize,
  type BrandStatus,
} from '@components/shared/brand'
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

const KIT_LAST = 39

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
  const [chip, setChip] = useState<BrandSize>('md')
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
        <Text.Title size="lg">Catálogo numerado</Text.Title>
        <Text.Caption>
          Cada pieza de common/components o common/device en su Card. Di qué
          número se queda y cuál se va. Sesión: {statusLabel}.
        </Text.Caption>

        <CatalogCard
          n={1}
          title="Card"
          does="Superficie con padding, radius surface y tono BRAND."
          doesNot="No es layout, lista ni contenedor de navegación."
          solves="Agrupar un bloque de contenido con borde y fondo semántico."
        >
          <CatalogVariant
            n={1}
            sub={1}
            title="Default"
            description="Tono neutro del kit."
          >
            <Card>
              <Text.Caption>Contenido</Text.Caption>
            </Card>
          </CatalogVariant>
          <CatalogVariant
            n={1}
            sub={2}
            title="Status"
            description="Variantes semánticas del borde y fondo suave."
          >
            <View className="gap-2">
              {STATUSES.map((status) => (
                <Card key={status} status={status}>
                  <Text.Caption>{status}</Text.Caption>
                </Card>
              ))}
            </View>
          </CatalogVariant>
        </CatalogCard>

        <CatalogCard
          n={2}
          title="Text"
          does="Tipografía del design system con roles, size y status BRAND."
          doesNot="No sustituye Input ni Badge. No es un editor rico."
          solves="Copy de UI sin hardcodear text-lg / font-semibold."
        >
          <CatalogVariant
            n={2}
            sub={1}
            title="Body"
            description="Text() — párrafo por defecto."
          >
            <Text>Saldo disponible</Text>
          </CatalogVariant>
          <CatalogVariant
            n={2}
            sub={2}
            title="Body · status"
            description="Todas las semánticas BRAND."
          >
            <View className="gap-1">
              {STATUSES.map((status) => (
                <Text key={status} status={status}>
                  Body {status}
                </Text>
              ))}
            </View>
          </CatalogVariant>
          <CatalogVariant
            n={2}
            sub={3}
            title="Title xs"
            description="Text.Title size xs — text-sm font-semibold."
          >
            <Text.Title size="xs">Movimientos</Text.Title>
          </CatalogVariant>
          <CatalogVariant
            n={2}
            sub={4}
            title="Title sm"
            description="Text.Title size sm — text-base font-semibold."
          >
            <Text.Title size="sm">Movimientos</Text.Title>
          </CatalogVariant>
          <CatalogVariant
            n={2}
            sub={5}
            title="Title md"
            description="Text.Title size md — default. text-lg font-semibold."
          >
            <Text.Title size="md">Movimientos</Text.Title>
          </CatalogVariant>
          <CatalogVariant
            n={2}
            sub={6}
            title="Title lg"
            description="Text.Title size lg — text-2xl font-bold."
          >
            <Text.Title size="lg">Movimientos</Text.Title>
          </CatalogVariant>
          <CatalogVariant
            n={2}
            sub={7}
            title="Title xl"
            description="Text.Title size xl — text-3xl font-bold."
          >
            <Text.Title size="xl">Movimientos</Text.Title>
          </CatalogVariant>
          <CatalogVariant
            n={2}
            sub={8}
            title="Title · status"
            description="Text.Title md en cada semántica."
          >
            <View className="gap-1">
              {STATUSES.map((status) => (
                <Text.Title key={status} size="md" status={status}>
                  Title {status}
                </Text.Title>
              ))}
            </View>
          </CatalogVariant>
          <CatalogVariant
            n={2}
            sub={9}
            title="Subtitle"
            description="Text.Subtitle — apoyo muted bajo un título."
          >
            <Text.Subtitle>Hoy · 10:24</Text.Subtitle>
          </CatalogVariant>
          <CatalogVariant
            n={2}
            sub={10}
            title="Subtitle · status"
            description="Con status deja de ser muted y usa BRAND."
          >
            <View className="gap-1">
              {STATUSES.map((status) => (
                <Text.Subtitle key={status} status={status}>
                  Subtitle {status}
                </Text.Subtitle>
              ))}
            </View>
          </CatalogVariant>
          <CatalogVariant
            n={2}
            sub={11}
            title="Paragraph"
            description="Text.Paragraph — lectura con leading relajado."
          >
            <Text.Paragraph>{metadata.description}</Text.Paragraph>
          </CatalogVariant>
          <CatalogVariant
            n={2}
            sub={12}
            title="Paragraph · status"
            description="Cuerpo largo teñido."
          >
            <View className="gap-2">
              {STATUSES.map((status) => (
                <Text.Paragraph key={status} status={status}>
                  Paragraph {status}
                </Text.Paragraph>
              ))}
            </View>
          </CatalogVariant>
          <CatalogVariant
            n={2}
            sub={13}
            title="Caption"
            description="Text.Caption — meta y hints muted."
          >
            <Text.Caption>Mock de bandeja</Text.Caption>
          </CatalogVariant>
          <CatalogVariant
            n={2}
            sub={14}
            title="Caption · status"
            description="Hints semánticos."
          >
            <View className="gap-1">
              {STATUSES.map((status) => (
                <Text.Caption key={status} status={status}>
                  Caption {status}
                </Text.Caption>
              ))}
            </View>
          </CatalogVariant>
          <CatalogVariant
            n={2}
            sub={15}
            title="Label"
            description="Text.Label — eyebrow de campo o sección."
          >
            <Text.Label>Monto</Text.Label>
          </CatalogVariant>
          <CatalogVariant
            n={2}
            sub={16}
            title="Label · status"
            description="Etiqueta teñida junto al Input."
          >
            <View className="gap-1">
              {STATUSES.map((status) => (
                <Text.Label key={status} status={status}>
                  Label {status}
                </Text.Label>
              ))}
            </View>
          </CatalogVariant>
          <CatalogVariant
            n={2}
            sub={17}
            title="Highlight"
            description="Text.Highlight — énfasis, no es una caja."
          >
            <Text.Highlight>$12.50</Text.Highlight>
          </CatalogVariant>
          <CatalogVariant
            n={2}
            sub={18}
            title="Highlight · status"
            description="Monto o CTA tipográfico teñido."
          >
            <View className="gap-1">
              {STATUSES.map((status) => (
                <Text.Highlight key={status} status={status}>
                  Highlight {status}
                </Text.Highlight>
              ))}
            </View>
          </CatalogVariant>
        </CatalogCard>

        <CatalogCard
          n={3}
          title="Icon"
          does="Pinta un glifo Lucide con tono BRAND nativo."
          doesNot="No es botón. No gestiona press ni badge."
          solves="Iconografía consistente sin hex ni color suelto."
        >
          <CatalogVariant
            n={3}
            sub={1}
            title="foreground"
            description="Tono por defecto. textPrimary."
          >
            <Icon icon={Check} />
          </CatalogVariant>
          <CatalogVariant
            n={3}
            sub={2}
            title="secondary"
            description="Texto secundario."
          >
            <Icon icon={Info} tone="secondary" />
          </CatalogVariant>
          <CatalogVariant
            n={3}
            sub={3}
            title="primary"
            description="Token primary."
          >
            <Icon icon={Wifi} tone="primary" />
          </CatalogVariant>
          <CatalogVariant
            n={3}
            sub={4}
            title="brand"
            description="Token brand (oro)."
          >
            <Icon icon={Camera} tone="brand" />
          </CatalogVariant>
          <CatalogVariant
            n={3}
            sub={5}
            title="background"
            description="Sobre superficie invertida."
          >
            <View
              className={cn(
                'self-start p-3',
                BRAND.colors.variants.primary.background,
              )}
            >
              <Icon icon={Check} tone="background" />
            </View>
          </CatalogVariant>
          <CatalogVariant
            n={3}
            sub={6}
            title="onPrimary"
            description="Glifo sobre fondo primary. Lo usa Button default."
          >
            <View
              className={cn(
                'self-start p-3',
                BRAND.colors.variants.primary.background,
              )}
            >
              <Icon icon={Check} tone="onPrimary" />
            </View>
          </CatalogVariant>
          <CatalogVariant
            n={3}
            sub={7}
            title="onBrand"
            description="Glifo sobre fondo brand. Lo usa Button brand."
          >
            <View
              className={cn(
                'self-start p-3',
                BRAND.colors.variants.brand.background,
              )}
            >
              <Icon icon={Check} tone="onBrand" />
            </View>
          </CatalogVariant>
        </CatalogCard>

        <CatalogCard
          n={4}
          title="Badge"
          does="Etiqueta de estado semántico (solid, soft, outline)."
          doesNot="No es Chip táctil ni filtro. No navega."
          solves="Marcar estado: Guest, OK, error, brand."
        >
          <CatalogVariant
            n={4}
            sub={1}
            title="Soft · status"
            description="Relleno suave por semántica BRAND."
          >
            <View className="flex-row flex-wrap gap-2">
              {STATUSES.map((status) => (
                <Badge key={status} label={status} status={status} />
              ))}
            </View>
          </CatalogVariant>
          <CatalogVariant
            n={4}
            sub={2}
            title="Solid · status"
            description="Fondo lleno en cada semántica."
          >
            <View className="flex-row flex-wrap gap-2">
              {STATUSES.map((status) => (
                <Badge
                  key={status}
                  label={status}
                  status={status}
                  variant="solid"
                />
              ))}
            </View>
          </CatalogVariant>
          <CatalogVariant
            n={4}
            sub={3}
            title="Outline · status"
            description="Solo borde en cada semántica."
          >
            <View className="flex-row flex-wrap gap-2">
              {STATUSES.map((status) => (
                <Badge
                  key={status}
                  label={status}
                  status={status}
                  variant="outline"
                />
              ))}
            </View>
          </CatalogVariant>
        </CatalogCard>

        <CatalogCard
          n={5}
          title="BrandLogo"
          does="Muestra el isotipo SVG en escala BRAND (xs–xl)."
          doesNot="No incluye wordmark ni tagline. No es Avatar."
          solves="Identidad de marca lista en splash, header o empty state."
        >
          <CatalogVariant n={5} sub={1} title="xs" description="28 px.">
            <BrandLogo size="xs" />
          </CatalogVariant>
          <CatalogVariant n={5} sub={2} title="sm" description="40 px.">
            <BrandLogo size="sm" />
          </CatalogVariant>
          <CatalogVariant
            n={5}
            sub={3}
            title="md"
            description="96 px. Default."
          >
            <BrandLogo size="md" />
          </CatalogVariant>
          <CatalogVariant n={5} sub={4} title="lg" description="160 px.">
            <BrandLogo size="lg" />
          </CatalogVariant>
          <CatalogVariant n={5} sub={5} title="xl" description="200 px.">
            <BrandLogo size="xl" />
          </CatalogVariant>
        </CatalogCard>

        <CatalogCard
          n={6}
          title="FadeIn"
          does="Anima entrada con fade y translateY. Delay opcional."
          doesNot="No orquesta listas ni gestos. No es un player."
          solves="Primera pintura suave sin que el consumidor toque Reanimated."
        >
          <FadeIn>
            <Text.Subtitle>Este bloque entra con fade.</Text.Subtitle>
          </FadeIn>
        </CatalogCard>

        <CatalogCard
          n={7}
          title="Separator"
          does="Línea divisoria horizontal o vertical."
          doesNot="No es layout spacer con gap. No tiene texto."
          solves="Cortar bloques visuales dentro de una Card o form."
        >
          <CatalogVariant
            n={7}
            sub={1}
            title="Horizontal"
            description="Ancho completo, 1 px."
          >
            <Separator />
          </CatalogVariant>
          <CatalogVariant
            n={7}
            sub={2}
            title="Vertical"
            description="Alto del contenedor."
          >
            <View className="h-8 flex-row items-center gap-3">
              <Text.Caption>A</Text.Caption>
              <Separator orientation="vertical" />
              <Text.Caption>B</Text.Caption>
            </View>
          </CatalogVariant>
        </CatalogCard>

        <CatalogCard
          n={8}
          title="Header"
          does="Barra superior con título, back opcional y slot derecho."
          doesNot="No es Tab bar. No gestiona rutas ni tema por props."
          solves="Chrome de pantalla. El ejemplo en vivo es la barra de esta page."
        >
          <Text.Caption>
            Instancia viva: título {metadata.name} + ThemeToggle a la derecha.
          </Text.Caption>
        </CatalogCard>

        <CatalogCard
          n={9}
          title="AppNav"
          does="Tab bar inferior. Lee sesión y rutas internamente."
          doesNot="No es Header. No recibe items por props."
          solves="Navegación primaria. El ejemplo en vivo es la barra de abajo."
        >
          <Text.Caption>Instancia viva al pie de esta pantalla.</Text.Caption>
        </CatalogCard>

        <CatalogCard
          n={10}
          title="ThemeToggle"
          does="Cambia apariencia BRAND_THEMES. Se suscribe al store solo."
          doesNot="No recibe colorScheme por props. No es un Switch genérico."
          solves="El usuario elige tema sin que el padre redistribuya estado."
        >
          <ThemeToggle />
        </CatalogCard>

        <CatalogCard
          n={11}
          title="Button"
          does="Control de acción con size, variant e icono Lucide."
          doesNot="No es Link. No dispara device APIs por sí mismo."
          solves="CTA, outline, ghost y brand con la escala BRAND."
        >
          <CatalogVariant
            n={11}
            sub={1}
            title="Size"
            description="Escala BRAND xs–xl."
          >
            <View className="flex-row flex-wrap gap-2">
              {SIZES.map((size) => (
                <Button key={size} size={size} label={size} />
              ))}
            </View>
          </CatalogVariant>
          <CatalogVariant
            n={11}
            sub={2}
            title="Variant"
            description="default, outline, ghost, brand."
          >
            <View className="gap-2">
              <Button label="Default" />
              <Button variant="outline" label="Outline" />
              <Button variant="ghost" label="Ghost" />
              <Button variant="brand" label="Brand" />
            </View>
          </CatalogVariant>
          <CatalogVariant
            n={11}
            sub={3}
            title="Con icono"
            description="Lucide a la izquierda del label."
          >
            <View className="flex-row flex-wrap gap-2">
              <Button icon={Camera} label="Camera" size="sm" />
              <Button
                icon={FileUp}
                variant="outline"
                label="Upload"
                size="sm"
              />
              <Button icon={Share2} variant="brand" label="Share" size="sm" />
            </View>
          </CatalogVariant>
          <CatalogVariant
            n={11}
            sub={4}
            title="Disabled"
            description="Bloquea press y baja opacidad."
          >
            <Button disabled label="Disabled" />
          </CatalogVariant>
        </CatalogCard>

        <CatalogCard
          n={12}
          title="Input"
          does="Campo de texto con label, variant, size y status BRAND."
          doesNot="No es Combobox ni OTP. No valida reglas de negocio."
          solves="Formularios con el mismo radius y padding que Button."
        >
          <CatalogVariant
            n={12}
            sub={1}
            title="Default"
            description="Borde + fondo background."
          >
            <Input
              label="Default"
              variant="default"
              placeholder="Default"
              value={inputValue}
              onChangeText={setInputValue}
            />
          </CatalogVariant>
          <CatalogVariant
            n={12}
            sub={2}
            title="Outline"
            description="Transparente. Status info."
          >
            <Input
              label="Outline"
              variant="outline"
              status="info"
              placeholder="Outline"
            />
          </CatalogVariant>
          <CatalogVariant
            n={12}
            sub={3}
            title="Filled"
            description="Fondo card. Status success."
          >
            <Input
              label="Filled"
              variant="filled"
              status="success"
              placeholder="Filled"
            />
          </CatalogVariant>
          <CatalogVariant
            n={12}
            sub={4}
            title="Ghost"
            description="Solo línea inferior. Status warning."
          >
            <Input
              label="Ghost"
              variant="ghost"
              status="warning"
              placeholder="Ghost"
            />
          </CatalogVariant>
          <CatalogVariant
            n={12}
            sub={5}
            title="Error"
            description="Status error sobre variant default."
          >
            <Input
              label="Error"
              variant="default"
              status="error"
              placeholder="Error"
            />
          </CatalogVariant>
          <CatalogVariant
            n={12}
            sub={6}
            title="Size"
            description="Escala BRAND xs–xl (no aplica a ghost)."
          >
            <View className="gap-2">
              {SIZES.map((size) => (
                <Input key={size} label={size} size={size} placeholder={size} />
              ))}
            </View>
          </CatalogVariant>
        </CatalogCard>

        <CatalogCard
          n={13}
          title="Chip"
          does="Filtro o etiqueta táctil con size, status y selected."
          doesNot="No es Badge pasivo. No es Tab."
          solves="Elegir Hoy / Semana / tamaño sin un segmented nativo."
        >
          <CatalogVariant
            n={13}
            sub={1}
            title="Size"
            description="Escala BRAND xs–xl. Uno seleccionado."
          >
            <View className="flex-row flex-wrap items-center gap-2">
              {SIZES.map((size) => (
                <Chip
                  key={size}
                  label={size}
                  size={size}
                  selected={chip === size}
                  onPress={() => setChip(size)}
                />
              ))}
            </View>
          </CatalogVariant>
          <CatalogVariant
            n={13}
            sub={2}
            title="Status"
            description="Semántica BRAND sin selected."
          >
            <View className="flex-row flex-wrap items-center gap-2">
              {STATUSES.map((status) => (
                <Chip key={status} label={status} size="sm" status={status} />
              ))}
            </View>
          </CatalogVariant>
        </CatalogCard>

        <CatalogCard
          n={14}
          title="Avatar"
          does="Imagen circular con fallback de iniciales si falla la carga."
          doesNot="No es BrandLogo. No recorta galería. No es picker."
          solves="Identidad de usuario/comercio sin gestionar onError."
        >
          <CatalogVariant
            n={14}
            sub={1}
            title="Fallback"
            description="Sin uri: iniciales."
          >
            <Avatar fallback="MC" status="brand" size={48} />
          </CatalogVariant>
          <CatalogVariant
            n={14}
            sub={2}
            title="Con foto"
            description="uri remota."
          >
            <Avatar uri={AVATAR_DEMO} fallback="JD" size={48} />
          </CatalogVariant>
          <CatalogVariant
            n={14}
            sub={3}
            title="Status"
            description="Borde semántico. Mismo size 48."
          >
            <View className="flex-row flex-wrap items-center gap-3">
              {STATUSES.map((status) => (
                <Avatar
                  key={status}
                  fallback={status.slice(0, 2).toUpperCase()}
                  status={status}
                  size={48}
                />
              ))}
            </View>
          </CatalogVariant>
          <CatalogVariant
            n={14}
            sub={4}
            title="Size"
            description="Diámetro en px: 32 / 40 / 48 / 64 / 80."
          >
            <View className="flex-row flex-wrap items-end gap-3">
              <Avatar uri={AVATAR_DEMO} fallback="XS" size={32} />
              <Avatar uri={AVATAR_DEMO} fallback="SM" size={40} />
              <Avatar uri={AVATAR_DEMO} fallback="MD" size={48} />
              <Avatar uri={AVATAR_DEMO} fallback="LG" size={64} />
              <Avatar uri={AVATAR_DEMO} fallback="XL" size={80} />
            </View>
          </CatalogVariant>
        </CatalogCard>

        <CatalogCard
          n={15}
          title="Image"
          does="Frame expo-image con aspect ratio, radius y status de borde."
          doesNot="No abre cámara ni galería. No recorta ni comprime."
          solves="Mostrar fotos de producto o tickets con recorte listo."
        >
          <CatalogVariant
            n={15}
            sub={1}
            title="16:9"
            description="Default. Producto / hero."
          >
            <Image source={{ uri: IMAGE_DEMO }} aspectRatio={16 / 9} />
          </CatalogVariant>
          <CatalogVariant n={15} sub={2} title="1:1" description="Cuadrado.">
            <Image source={{ uri: IMAGE_DEMO }} aspectRatio={1} />
          </CatalogVariant>
          <CatalogVariant
            n={15}
            sub={3}
            title="4:3"
            description="Ticket / documento."
          >
            <Image source={{ uri: IMAGE_DEMO }} aspectRatio={4 / 3} />
          </CatalogVariant>
          <CatalogVariant
            n={15}
            sub={4}
            title="Status"
            description="Borde semántico del frame."
          >
            <View className="gap-2">
              {STATUSES.map((status) => (
                <Image
                  key={status}
                  source={{ uri: IMAGE_DEMO }}
                  aspectRatio={16 / 9}
                  status={status}
                />
              ))}
            </View>
          </CatalogVariant>
        </CatalogCard>

        <CatalogCard
          n={16}
          title="Checkbox"
          does="Selección binaria con label y status BRAND."
          doesNot="No es Switch. No agrupa opciones (no es radio)."
          solves="Aceptar términos u opciones puntuales en un form."
        >
          <CatalogVariant
            n={16}
            sub={1}
            title="Default"
            description="Status primary."
          >
            <Checkbox
              checked={checked}
              onCheckedChange={setChecked}
              label="Accept terms"
            />
          </CatalogVariant>
          <CatalogVariant
            n={16}
            sub={2}
            title="Status"
            description="Todas las semánticas, checked."
          >
            <View className="gap-2">
              {STATUSES.map((status) => (
                <Checkbox
                  key={status}
                  checked
                  onCheckedChange={() => undefined}
                  label={status}
                  status={status}
                />
              ))}
            </View>
          </CatalogVariant>
        </CatalogCard>

        <CatalogCard
          n={17}
          title="Switch"
          does="Interruptor on/off con label y status BRAND."
          doesNot="No es Checkbox. No cambia el tema de la app."
          solves="Preferencias inmediatas: notificaciones, keep awake, etc."
        >
          <CatalogVariant
            n={17}
            sub={1}
            title="Default"
            description="Status primary."
          >
            <Switch
              checked={switched}
              onCheckedChange={setSwitched}
              label="Notifications"
            />
          </CatalogVariant>
          <CatalogVariant
            n={17}
            sub={2}
            title="Status"
            description="Todas las semánticas, on."
          >
            <View className="gap-2">
              {STATUSES.map((status) => (
                <Switch
                  key={status}
                  checked
                  onCheckedChange={() => undefined}
                  label={status}
                  status={status}
                />
              ))}
            </View>
          </CatalogVariant>
        </CatalogCard>

        <CatalogCard
          n={18}
          title="Tabs"
          does="Paneles con trigger de texto. Un tab activo."
          doesNot="No es SegmentedTabs nativo. No persiste ruta."
          solves="Cambiar de vista in-place sin navegar."
        >
          <Tabs
            tabs={[
              {
                id: 'one',
                label: 'One',
                content: <Text.Subtitle>Panel one</Text.Subtitle>,
              },
              {
                id: 'two',
                label: 'Two',
                content: <Text.Subtitle>Panel two</Text.Subtitle>,
              },
            ]}
          />
        </CatalogCard>

        <CatalogCard
          n={19}
          title="Accordion"
          does="Lista colapsable. type single o multiple."
          doesNot="No es Dialog. No navega. El contenido es string."
          solves="FAQ o detalle largo sin ocupar la pantalla entera."
        >
          <CatalogVariant
            n={19}
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
            n={19}
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
          n={20}
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
          n={21}
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
          n={22}
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
          n={23}
          title="Dialog"
          does="Modal compuesto: Header, Title, Content, Footer."
          doesNot="No es Drawer ni Toast. closeOnOutside es false por defecto."
          solves="Confirmar, formularios cortos o bloqueo de contexto."
        >
          <CatalogVariant
            n={23}
            sub={1}
            title="Default"
            description="Compound: Dialog.Header, Dialog.Title, Dialog.Content, Dialog.Footer. Overlay. Tap fuera no cierra."
          >
            <Button label="Open dialog" onPress={() => setDialogOpen(true)} />
          </CatalogVariant>
          <CatalogVariant
            n={23}
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
          n={24}
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
          n={25}
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
          n={26}
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
                size="sm"
                status={item.status ?? 'default'}
              />
            ))}
          </View>
        </CatalogCard>

        <CatalogCard
          n={27}
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
          n={28}
          title="camera"
          does="Captura foto/video, galería y escáner de códigos."
          doesNot="No persiste en backend. No es el componente Image."
          solves="Tickets, KYC, cobro QR y adjuntos desde el device."
        >
          <CatalogVariant
            n={28}
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
                <Image source={{ uri: previewUri }} aspectRatio={3 / 4} />
              )}
            </View>
          </CatalogVariant>
          <CatalogVariant
            n={28}
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
            n={28}
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
          n={29}
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
          n={30}
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
          n={31}
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
          n={32}
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
          n={33}
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
          n={34}
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
          n={35}
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
          n={36}
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
          n={37}
          title="orientation"
          does="Bloquea portrait o libera la rotación."
          doesNot="No lee sensores de movimiento. No es keep-awake."
          solves="Forzar vertical en cobro o cine en un video."
        >
          <CatalogVariant
            n={37}
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
            n={37}
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
          n={38}
          title="haptics"
          does="Feedback háptico: impacto, éxito, warning."
          doesNot="No reproduce audio. No es un botón."
          solves="Confirmar tap o pago con el motor de vibración."
        >
          <CatalogVariant
            n={38}
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
            n={38}
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
            n={38}
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
          n={39}
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
