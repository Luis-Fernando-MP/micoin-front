import { type FC, type ReactNode, useState } from 'react'
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
import type { BrandStatus } from '@components/shared/brand'
import Switch from '@components/switch'
import Tabs from '@components/tabs'
import Text from '@components/text'
import ThemeToggle from '@components/theme-toggle'
import { showToast } from '@components/toast'
import { LabCatalog } from '@views/home/lab-catalog'

import { useSession } from '@/auth/use-session'
import { authenticateBiometric } from '@/common/device/biometrics'
import { setBrightness } from '@/common/device/brightness'
import { openCamera, pickImage } from '@/common/device/camera'
import { copyText } from '@/common/device/clipboard'
import { getContactsCount } from '@/common/device/contacts'
import { pickDocument } from '@/common/device/document-picker'
import { hapticSuccess } from '@/common/device/haptics'
import { setKeepAwake } from '@/common/device/keep-awake'
import { getLocationSnapshot } from '@/common/device/location'
import { openSupportMail } from '@/common/device/mail'
import { lockPortrait, unlockOrientation } from '@/common/device/orientation'
import { shareFile } from '@/common/device/sharing'
import { speakText } from '@/common/device/speech'
import { useDeviceLab } from '@/common/device/use-device-lab'
import { metadata } from '@/common/metadata'

interface SectionProps {
  title: string
  children: ReactNode
}

const Section: FC<SectionProps> = ({ title, children }) => {
  return (
    <Card className="gap-3">
      <Text.Title>{title}</Text.Title>
      <Separator />
      {children}
    </Card>
  )
}

const STATUSES: BrandStatus[] = [
  'default',
  'primary',
  'brand',
  'warning',
  'error',
  'info',
  'success',
]

const AVATAR_DEMO =
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop'

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
  const [chip, setChip] = useState('md')
  const [previewUri, setPreviewUri] = useState<string | null>(null)
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
        <FadeIn>
          <View className="items-start gap-2">
            <BrandLogo size="md" />
            <Text.Title size="xl">{metadata.name}</Text.Title>
            <Text.Subtitle>{metadata.tagline}</Text.Subtitle>
            <Badge label={statusLabel} status="brand" />
          </View>
        </FadeIn>

        <Section title="Icons · Lucide">
          <View className="flex-row flex-wrap gap-4">
            <Icon icon={Check} tone="brand" />
            <Icon icon={Info} tone="brand" />
            <Icon icon={Camera} />
            <Icon icon={Fingerprint} tone="secondary" />
            <Icon icon={Wifi} tone="primary" />
          </View>
          <View className="flex-row flex-wrap gap-2">
            <Button icon={Camera} label="Camera" size="sm" />
            <Button icon={FileUp} variant="outline" label="Upload" size="sm" />
            <Button icon={Share2} variant="brand" label="Share" size="sm" />
          </View>
        </Section>

        <Section title="Status colors">
          <View className="flex-row flex-wrap gap-2">
            {STATUSES.map((status) => (
              <Badge key={status} label={status} status={status} />
            ))}
          </View>
        </Section>

        <Section title="ThemeToggle">
          <ThemeToggle />
        </Section>

        <Section title="Button · size sm / md / lg">
          <View className="flex-row flex-wrap gap-2">
            <Button size="sm" label="Small" />
            <Button size="md" label="Medium" />
            <Button size="lg" label="Large" />
          </View>
          <Button variant="outline" label="Outline" />
          <Button variant="ghost" label="Ghost" />
          <Button variant="brand" label="Brand" />
          <Button disabled label="Disabled" />
        </Section>

        <Section title="Input · same radius / padding">
          <Input
            label="Default"
            variant="default"
            placeholder="Default"
            value={inputValue}
            onChangeText={setInputValue}
          />
          <Input
            label="Outline"
            variant="outline"
            status="info"
            placeholder="Outline"
          />
          <Input
            label="Filled"
            variant="filled"
            status="success"
            placeholder="Filled"
          />
          <Input
            label="Ghost"
            variant="ghost"
            status="warning"
            placeholder="Ghost"
          />
          <Input
            label="Error"
            variant="default"
            status="error"
            placeholder="Error"
          />
        </Section>

        <Section title="Chip · size sm / md / lg">
          <View className="flex-row flex-wrap items-center gap-2">
            <Chip
              label="sm"
              size="sm"
              selected={chip === 'sm'}
              onPress={() => setChip('sm')}
            />
            <Chip
              label="md"
              size="md"
              selected={chip === 'md'}
              onPress={() => setChip('md')}
            />
            <Chip
              label="lg"
              size="lg"
              status="brand"
              selected={chip === 'lg'}
              onPress={() => setChip('lg')}
            />
          </View>
        </Section>

        <Section title="Avatar">
          <View className="flex-row items-center gap-3">
            <Avatar fallback="MC" status="brand" size={48} />
            <Avatar uri={AVATAR_DEMO} fallback="JD" size={48} />
            <Avatar uri={AVATAR_DEMO} fallback="AB" size={64} status="info" />
          </View>
        </Section>

        <Section title="Image · expo-image">
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
            }}
            aspectRatio={16 / 9}
          />
          {previewUri && (
            <Image source={{ uri: previewUri }} aspectRatio={3 / 4} />
          )}
          {!previewUri && (
            <Text.Subtitle>Captura una foto para verla aquí.</Text.Subtitle>
          )}
        </Section>

        <Section title="Dialog / Drawer / Toast">
          <Button label="Open dialog" onPress={() => setDialogOpen(true)} />
          <Button
            variant="outline"
            label="Form dialog"
            onPress={() => setDialogLocked(true)}
          />
          <Button
            variant="outline"
            label="Open drawer"
            onPress={() => setDrawerOpen(true)}
          />
          <Button
            variant="ghost"
            label="Toast"
            onPress={() =>
              showToast({ title: 'Guardado', status: 'success', message: 'OK' })
            }
          />
        </Section>

        <Section title="Avatar / Checkbox / Switch">
          <Checkbox
            checked={checked}
            onCheckedChange={setChecked}
            label="Accept terms"
          />
          <Switch
            checked={switched}
            onCheckedChange={setSwitched}
            label="Notifications"
          />
        </Section>

        <Section title="Tabs">
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
        </Section>

        <Section title="Accordion">
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
        </Section>

        <Section title="Breadcrumb">
          <Breadcrumb
            items={[{ label: 'Home' }, { label: 'Lab' }, { label: 'UI' }]}
          />
        </Section>

        <Section title="Combobox · dropdown in-place">
          <Combobox
            value={combo}
            onChange={setCombo}
            options={[
              { value: 'pen', label: 'Pens' },
              { value: 'food', label: 'Food' },
              { value: 'rent', label: 'Rent' },
            ]}
          />
        </Section>

        <Section title="MultiStep">
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
        </Section>

        <Section title="Labs · capacidades">
          <LabCatalog />
        </Section>

        <Section title="Device · info chips">
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
        </Section>

        <Section title="Device · actions">
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
          <Button
            icon={ClipboardCopy}
            variant="outline"
            label="Clipboard"
            onPress={async () => {
              await copyText(metadata.name)
              showToast({ title: 'Copiado', status: 'success' })
            }}
          />
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
          <Button
            icon={Volume2}
            variant="outline"
            label="Speech"
            onPress={async () => {
              await speakText()
            }}
          />
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
          <Button
            icon={SunMedium}
            variant="outline"
            label="Brightness 80%"
            onPress={async () => {
              const value = await setBrightness(80)
              showToast({ title: `Bright ${value}%`, status: 'info' })
            }}
          />
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
          <Button
            variant="outline"
            label="Lock portrait"
            onPress={async () => {
              await lockPortrait()
              showToast({ title: 'Portrait lock', status: 'info' })
            }}
          />
          <Button
            variant="ghost"
            label="Unlock orientation"
            onPress={async () => {
              await unlockOrientation()
              showToast({ title: 'Orientation free', status: 'info' })
            }}
          />
          <Button
            icon={Share2}
            variant="outline"
            label="Haptic + Share"
            onPress={async () => {
              await hapticSuccess()
              if (!previewUri) {
                showToast({
                  title: 'Sin archivo',
                  status: 'warning',
                  message: 'Captura una foto primero',
                })
                return
              }
              const result = await shareFile(previewUri)
              if (!result.ok) {
                showToast({ title: 'Share no disponible', status: 'warning' })
              }
            }}
          />
        </Section>

        <Section title="Auth">
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
        </Section>
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
