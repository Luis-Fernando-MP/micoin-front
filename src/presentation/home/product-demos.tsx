import { type FC, useEffect, useRef, useState } from 'react'
import { View } from 'react-native'
import ViewShot from 'react-native-view-shot'

import { type AudioPlayer } from 'expo-audio'
import { CardField } from '@stripe/stripe-react-native'

import Button from '@components/button'
import Image from '@components/image'
import BRAND from '@components/shared/brand'
import Text from '@components/text'
import { showToast } from '@components/toast'
import {
  playUri,
  releasePlayer,
  startRecording,
  stopRecording,
} from '@device/audio-recorder'
import { pickImage } from '@device/camera'
import { resizeImage } from '@device/image-manipulator'
import { addExpense, type Expense, listExpenses } from '@device/ledger'
import { saveToGallery } from '@device/media-library'
import { scheduleLocalAlert } from '@device/notifications'
import { setScreenProtected } from '@device/screen-capture'
import { shareFile } from '@device/sharing'
import { sendPaymentSms } from '@device/sms'
import { useMcVar } from '@theme'

import { metadata } from '@/common/metadata'

const LocalAlertDemo: FC = () => (
  <Button
    size="sm"
    label="Simular movimiento en 3s"
    onPress={async () => {
      const result = await scheduleLocalAlert()
      if (!result.ok) {
        showToast({ title: 'No se pudo agendar', status: 'warning' })
        return
      }
      showToast({
        title: 'Alerta en 3s',
        message: 'Push real requiere Dev Client',
        status: 'success',
      })
    }}
  />
)

const VoiceNoteDemo: FC = () => {
  const [recording, setRecording] = useState(false)
  const [audioUri, setAudioUri] = useState<string | null>(null)
  const playerRef = useRef<AudioPlayer | null>(null)

  useEffect(() => {
    return () => {
      releasePlayer(playerRef.current)
      playerRef.current = null
    }
  }, [])

  return (
    <View className="flex-row flex-wrap gap-2">
      <Button
        size="sm"
        label={recording ? 'Grabando…' : 'Grabar'}
        disabled={recording}
        onPress={async () => {
          const result = await startRecording()
          if (!result.ok) {
            showToast({ title: 'Mic denegado', status: 'warning' })
            return
          }
          setRecording(true)
        }}
      />
      <Button
        size="sm"
        variant="outline"
        label="Stop"
        disabled={!recording}
        onPress={async () => {
          const uri = await stopRecording()
          setRecording(false)
          setAudioUri(uri)
          showToast({ title: 'Audio listo', status: 'success' })
        }}
      />
      <Button
        size="sm"
        variant="ghost"
        label="Play"
        disabled={!audioUri}
        onPress={async () => {
          if (!audioUri) {
            return
          }
          releasePlayer(playerRef.current)
          playerRef.current = await playUri(audioUri)
        }}
      />
    </View>
  )
}

const ScreenProtectDemo: FC = () => {
  const [protectedScreen, setProtectedScreen] = useState(false)
  return (
    <Button
      size="sm"
      variant="outline"
      label={protectedScreen ? 'Desproteger' : 'Proteger pantalla'}
      onPress={async () => {
        const next = !protectedScreen
        await setScreenProtected(next)
        setProtectedScreen(next)
        showToast({
          title: next ? 'Captura bloqueada' : 'Captura permitida',
          status: 'info',
        })
      }}
    />
  )
}

const ReceiptDemo: FC = () => {
  const receiptRef = useRef<ViewShot>(null)
  return (
    <View className="gap-2">
      <ViewShot ref={receiptRef} options={{ format: 'png', quality: 0.9 }}>
        <View className="gap-1 rounded-control border border-border bg-background p-4">
          <Text.Title size="sm">{metadata.name}</Text.Title>
          <Text.Subtitle>Recibo demo</Text.Subtitle>
          <Text.Title>$12.50</Text.Title>
        </View>
      </ViewShot>
      <Button
        size="sm"
        variant="outline"
        label="Compartir recibo"
        onPress={async () => {
          const uri = await receiptRef.current?.capture?.()
          if (!uri) {
            return
          }
          await shareFile(uri, 'Comprobante MiCoin')
        }}
      />
    </View>
  )
}

const LedgerDemo: FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([])
  useEffect(() => {
    void listExpenses().then(setExpenses)
  }, [])
  return (
    <View className="gap-2">
      <Button
        size="sm"
        label="Agregar gasto $8.00"
        onPress={async () => {
          await addExpense('Café', 8)
          setExpenses(await listExpenses())
          showToast({ title: 'Gasto guardado', status: 'success' })
        }}
      />
      <View className="gap-1">
        {expenses.map((item) => (
          <Text.Subtitle key={item.id}>
            {item.title} · ${item.amount.toFixed(2)}
          </Text.Subtitle>
        ))}
        {!expenses.length && <Text.Subtitle>Sin gastos aún</Text.Subtitle>}
      </View>
    </View>
  )
}

const SmsPayDemo: FC = () => (
  <Button
    size="sm"
    variant="outline"
    label="Enviar cobro por SMS"
    onPress={async () => {
      const result = await sendPaymentSms()
      if (!result.ok) {
        showToast({ title: 'SMS no disponible', status: 'warning' })
      }
    }}
  />
)

const TicketPhotoDemo: FC = () => {
  const [ticketUri, setTicketUri] = useState<string | null>(null)
  return (
    <View className="gap-2">
      <Button
        size="sm"
        variant="outline"
        label="Pick + resize 800px"
        onPress={async () => {
          const image = await pickImage()
          if (!image?.uri) {
            return
          }
          const uri = await resizeImage(image.uri, 800)
          setTicketUri(uri)
          showToast({ title: 'Ticket procesado', status: 'success' })
        }}
      />
      {ticketUri && <Image source={{ uri: ticketUri }} aspectRatio="4/3" />}
      <Button
        size="sm"
        variant="outline"
        label="Guardar en galería"
        disabled={!ticketUri}
        onPress={async () => {
          if (!ticketUri) {
            showToast({
              title: 'Procesa un ticket primero',
              status: 'warning',
            })
            return
          }
          const result = await saveToGallery(ticketUri)
          if (!result.ok) {
            const title =
              result.reason === 'expo-go'
                ? 'Galería limitada en Expo Go'
                : 'Galería denegada'
            showToast({ title, status: 'warning' })
            return
          }
          showToast({ title: 'Guardado en Fotos', status: 'success' })
        }}
      />
    </View>
  )
}

const StripeCardDemo: FC = () => {
  const textColor = useMcVar(BRAND.native.textPrimary)
  const backgroundColor = useMcVar(BRAND.native.card)
  const borderColor = useMcVar(BRAND.native.border)
  const hasKey = Boolean(process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY)

  if (!hasKey) {
    return (
      <Text.Subtitle>
        Define EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY en .env para ver CardField.
      </Text.Subtitle>
    )
  }

  return (
    <View className="gap-2">
      <CardField
        postalCodeEnabled={false}
        style={{ height: 48, width: '100%' }}
        cardStyle={{
          backgroundColor,
          textColor,
          borderWidth: 1,
          borderColor,
          borderRadius: 16,
        }}
      />
      <Button
        size="sm"
        variant="outline"
        label="Pagar (demo UI)"
        onPress={() =>
          showToast({
            title: 'Stripe UI lista',
            message: 'PaymentIntent requiere backend',
            status: 'info',
          })
        }
      />
    </View>
  )
}

export {
  LedgerDemo,
  LocalAlertDemo,
  ReceiptDemo,
  ScreenProtectDemo,
  SmsPayDemo,
  StripeCardDemo,
  TicketPhotoDemo,
  VoiceNoteDemo,
}
