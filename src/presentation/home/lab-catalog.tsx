import { type FC, type ReactNode } from 'react'
import { View } from 'react-native'

import AudioPlayer from '@components/audio-player'
import Barcode from '@components/barcode'
import Charts from '@components/charts'
import ConfettiBurst from '@components/confetti-burst'
import EmojiPicker from '@components/emoji-picker'
import EmojiReactionBar from '@components/emoji-reaction-bar'
import EmojiSheet from '@components/emoji-sheet'
import FoilText from '@components/foil-text'
import FrostCard from '@components/frost-card'
import KeyboardAwareComposer from '@components/keyboard-aware-composer'
import LabModule from '@components/lab-module'
import LottieSuccess from '@components/lottie-success'
import Maps from '@components/maps'
import MiniPlayerBar from '@components/mini-player-bar'
import PressableScale from '@components/pressable-scale'
import PrivacyCover from '@components/privacy-cover'
import ProCarousel from '@components/pro-carousel'
import QrCode from '@components/qr-code'
import RichOverflowSheet from '@components/rich-overflow-sheet'
import SegmentedTabs from '@components/segmented-tabs'
import SharePaySheet from '@components/share-pay-sheet'
import SkeletonList from '@components/skeleton-list'
import Text from '@components/text'
import { showToast } from '@components/toast'
import TrayNotifyMock from '@components/tray-notify-mock'
import VideoPlayer from '@components/video-player'
import WaveformBars from '@components/waveform-bars'
import { CatalogCard, CatalogVariant } from '@views/home/catalog-card'
import {
  LedgerDemo,
  LocalAlertDemo,
  ReceiptDemo,
  ScreenProtectDemo,
  SmsPayDemo,
  StripeCardDemo,
  TicketPhotoDemo,
  VoiceNoteDemo,
} from '@views/home/product-demos'

const SV = { latitude: 13.69, longitude: -89.22 }

type Variant = {
  title: string
  description: string
  children: ReactNode
}

type Entry = {
  title: string
  does: string
  doesNot: string
  solves: string
  children?: ReactNode
  variants?: Variant[]
}

interface Props {
  startId: number
}

const ENTRIES: Entry[] = [
  {
    title: 'notifications · alerta local',
    does: 'Agenda un Alert nativo a 3s (simula un movimiento).',
    doesNot: 'No es push remoto ni bandeja del sistema.',
    solves: 'Aviso inmediato en Expo Go sin servidor.',
    children: <LocalAlertDemo />,
  },
  {
    title: 'QrCode',
    does: 'Renderiza un QR SVG a partir de un string.',
    doesNot: 'No escanea. No genera el deep link de negocio.',
    solves: 'Mostrar un cobro o deep link para que otro device lo lea.',
    children: (
      <View className="items-center gap-2">
        <QrCode value="micoin://pay?amount=12.50" />
        <Text.Caption>micoin://pay?amount=12.50</Text.Caption>
      </View>
    ),
  },
  {
    title: 'Barcode',
    does: 'Renderiza EAN/Code128 en SVG.',
    doesNot: 'No escanea. No valida checksum de negocio.',
    solves: 'Tickets y POS con código 1D.',
    children: <Barcode value="5901234123457" format="EAN13" />,
  },
  {
    title: 'audio-recorder',
    does: 'Graba y reproduce audio local con permisos.',
    doesNot: 'No es el AudioPlayer de stream. No transcribe.',
    solves: 'Notas de voz o comprobantes orales.',
    children: <VoiceNoteDemo />,
  },
  {
    title: 'screen-capture',
    does: 'Bloquea o permite screenshots en la pantalla actual.',
    doesNot: 'No oculta el saldo en UI. No es PrivacyCover.',
    solves: 'Proteger saldo y datos sensibles en captura.',
    children: <ScreenProtectDemo />,
  },
  {
    title: 'print-receipt / view-shot',
    does: 'Captura un recibo visual y lo manda al share sheet.',
    doesNot: 'No imprime en térmica. No guarda en galería solo.',
    solves: 'Enviar prueba de pago sin PDF de backend.',
    children: <ReceiptDemo />,
  },
  {
    title: 'ledger',
    does: 'Inserta y lista gastos en SQLite local.',
    doesNot: 'No sincroniza con servidor. No es un bank ledger.',
    solves: 'Historial de gastos aunque no haya red.',
    children: <LedgerDemo />,
  },
  {
    title: 'sms',
    does: 'Abre el composer SMS con un link de pago prefijado.',
    doesNot: 'No envía solo. No es WhatsApp.',
    solves: 'Cobrar por mensaje a quien no tiene la app.',
    children: <SmsPayDemo />,
  },
  {
    title: 'image-manipulator',
    does: 'Pick + resize de una foto de ticket.',
    doesNot: 'No es el visor Image. No sube al backend.',
    solves: 'Adjuntar tickets con menos peso.',
    children: <TicketPhotoDemo />,
  },
  {
    title: 'Stripe CardField',
    does: 'Campo nativo de tarjeta (UI Stripe).',
    doesNot: 'No cobra. El cargo real vive en backend.',
    solves: 'Checkout con tarjeta sin PCI en el cliente.',
    children: <StripeCardDemo />,
  },
  {
    title: 'Charts',
    does: 'Sparkline Skia y extensiones de gráfica.',
    doesNot: 'No consulta APIs. No es tabla. No anima trading.',
    solves: 'Dashboards de gasto y tendencias in-app.',
    variants: [
      {
        title: 'Sparkline',
        description: 'Default: línea de una serie.',
        children: <Charts />,
      },
      {
        title: 'BarChart',
        description: 'Barras verticales.',
        children: <Charts.BarChart />,
      },
      {
        title: 'DonutChart',
        description: 'Proporciones en anillo.',
        children: <Charts.DonutChart />,
      },
      {
        title: 'AreaChart',
        description: 'Área rellena bajo la serie.',
        children: <Charts.AreaChart />,
      },
      {
        title: 'GaugeChart',
        description: 'Indicador de meta / límite.',
        children: <Charts.GaugeChart />,
      },
      {
        title: 'HeatmapChart',
        description: 'Intensidad por celda.',
        children: <Charts.HeatmapChart />,
      },
    ],
  },
  {
    title: 'Maps',
    does: 'Mapa nativo con un punto. Extensiones de ruta y pines.',
    doesNot: 'No es GPS tracking. No calcula tarifas.',
    solves: 'Sucursales, delivery o encuentro P2P.',
    variants: [
      {
        title: 'Punto único',
        description: 'Un marcador. Región lista.',
        children: <Maps coordinate={SV} title="SV" />,
      },
      {
        title: 'RoutePlanner',
        description: 'Origen → destino con polyline.',
        children: <Maps.RoutePlanner />,
      },
      {
        title: 'PlacePins',
        description: 'Varios pines en el mapa.',
        children: <Maps.PlacePins />,
      },
      {
        title: 'DropPin',
        description: 'Soltar un pin arrastrable.',
        children: <Maps.DropPin />,
      },
    ],
  },
  {
    title: 'PrivacyCover',
    does: 'Tap para revelar u ocultar un monto.',
    doesNot: 'No bloquea screenshots (eso es screen-capture).',
    solves: 'Privacidad del saldo en transporte público.',
    children: <PrivacyCover />,
  },
  {
    title: 'FoilText',
    does: 'Monto con degradado MaskedView.',
    doesNot: 'No es Text.Title. No anima foil real de metal.',
    solves: 'Highlight premium del balance.',
    children: <FoilText />,
  },
  {
    title: 'FrostCard',
    does: 'Compara sólido vs vidrio (expo-glass-effect).',
    doesNot: 'No sustituye Card del kit. No es blur de toda la app.',
    solves: 'Look de tarjeta nativa sobre fondos.',
    children: <FrostCard />,
  },
  {
    title: 'EmojiPicker',
    does: 'Grid de emojis con FlashList.',
    doesNot: 'No es EmojiSheet ni ReactionBar.',
    solves: 'Notas, categorías o chat de soporte.',
    children: <EmojiPicker />,
  },
  {
    title: 'EmojiReactionBar',
    does: 'Barra rápida de reacciones.',
    doesNot: 'No abre el picker completo.',
    solves: 'Feedback 1-tap en un movimiento.',
    children: <EmojiReactionBar />,
  },
  {
    title: 'RichOverflowSheet',
    does: 'Bottom sheet Gorhom con acciones.',
    doesNot: 'No es Drawer del kit. No es Dialog.',
    solves: 'Menú ⋯ sin salir de contexto.',
    children: <RichOverflowSheet />,
  },
  {
    title: 'SharePaySheet',
    does: 'Sheet de cobro con QR y overflow de movimiento.',
    doesNot: 'No cobra en backend. No es el módulo sharing.',
    solves: 'Flujo de cobro compartible y detalle de historial.',
    variants: [
      {
        title: 'Sheet de cobro',
        description: 'QR + copiar link.',
        children: <SharePaySheet />,
      },
      {
        title: 'MovementOverflow',
        description: '⋯ abre detalle del movimiento.',
        children: <SharePaySheet.MovementOverflow />,
      },
    ],
  },
  {
    title: 'ProCarousel',
    does: 'Carrusel Reanimated: parallax, stack o paging.',
    doesNot: 'No es lista infinita. No carga páginas remotas.',
    solves: 'Promos, wallets u onboarding.',
    variants: [
      {
        title: 'Parallax',
        description: 'Default. Slides con parallax.',
        children: <ProCarousel />,
      },
      {
        title: 'StackCarousel',
        description: 'Tarjetas apiladas horizontales.',
        children: <ProCarousel.StackCarousel />,
      },
      {
        title: 'PagedCarousel',
        description: 'Snap por página.',
        children: <ProCarousel.PagedCarousel />,
      },
    ],
  },
  {
    title: 'AudioPlayer',
    does: 'Play/pause de un stream remoto.',
    doesNot: 'No graba. No es MiniPlayerBar.',
    solves: 'Notas o podcasts in-app.',
    children: <AudioPlayer />,
  },
  {
    title: 'WaveformBars',
    does: 'Barras animadas Skia para audio activo.',
    doesNot: 'No reproduce audio. No es el player.',
    solves: 'Feedback visual de que hay sonido.',
    children: <WaveformBars active />,
  },
  {
    title: 'MiniPlayerBar',
    does: 'Barra now-playing con waveform.',
    doesNot: 'No es el VideoPlayer. No gestiona cola.',
    solves: 'Persistir audio mientras navegas.',
    children: <MiniPlayerBar />,
  },
  {
    title: 'VideoPlayer',
    does: 'Reproductor nativo con controles.',
    doesNot: 'No graba video (eso es camera). No es AudioPlayer.',
    solves: 'Tutoriales o comprobantes en video.',
    children: <VideoPlayer />,
  },
  {
    title: 'LottieSuccess',
    does: 'Animación Lottie de éxito reutilizable.',
    doesNot: 'No es ConfettiBurst. No confirma un pago en backend.',
    solves: 'Confirmación de pago memorable.',
    children: <LottieSuccess />,
  },
  {
    title: 'ConfettiBurst',
    does: 'Ráfaga de confetti on demand.',
    doesNot: 'No es Lottie. No persiste la celebración.',
    solves: 'Celebrar primer cobro o una meta.',
    children: <ConfettiBurst />,
  },
  {
    title: 'PressableScale',
    does: 'Pressable con scale Moti.',
    doesNot: 'No es Button del kit. No trae label ni variant.',
    solves: 'Micro-interacción táctil en superficies custom.',
    children: (
      <PressableScale
        onPress={() => showToast({ title: 'Tap!', status: 'success' })}
      >
        <View className="items-center border border-border bg-card px-4 py-3">
          <Text.Highlight>Pulsa aquí</Text.Highlight>
        </View>
      </PressableScale>
    ),
  },
  {
    title: 'SegmentedTabs',
    does: 'Control segmentado nativo.',
    doesNot: 'No es Tabs del kit. No monta paneles complejos.',
    solves: 'Filtros Hoy / Semana / Mes.',
    children: <SegmentedTabs />,
  },
  {
    title: 'KeyboardAwareComposer',
    does: 'Input que sube con el teclado.',
    doesNot: 'No es el Input del kit solo. No envía mensajes.',
    solves: 'Notas de cobro sin que el teclado tape el campo.',
    children: <KeyboardAwareComposer />,
  },
  {
    title: 'SkeletonList',
    does: 'Placeholders animados de carga.',
    doesNot: 'No fetchea datos. No es lista real.',
    solves: 'Perceived performance mientras llega el historial.',
    children: <SkeletonList />,
  },
  {
    title: 'EmojiSheet',
    does: 'Sheet + picker compuestos.',
    doesNot: 'No es EmojiPicker a pantalla completa.',
    solves: 'Elegir emoji sin salir de la pantalla.',
    children: <EmojiSheet />,
  },
  {
    title: 'TrayNotifyMock',
    does: 'UI mock de notificación en bandeja, ongoing y media.',
    doesNot: 'No dispara notificaciones reales del OS.',
    solves: 'Diseñar copy de bandeja antes de Dev Client.',
    variants: [
      {
        title: 'Bandeja',
        description: 'Notificación colapsada mock.',
        children: <TrayNotifyMock />,
      },
      {
        title: 'Ongoing',
        description: 'Inamovible simulada (cobro en curso).',
        children: <TrayNotifyMock.Ongoing />,
      },
      {
        title: 'MediaStyle',
        description: 'Chip artwork + título colapsado.',
        children: <TrayNotifyMock.MediaStyle />,
      },
    ],
  },
  {
    title: 'LabModule',
    does: 'Ficha de lab con id, título, qué hace y para qué.',
    doesNot: 'No es Card del kit. Este catálogo usa Card.',
    solves: 'Documentar un experimento si se prefiere esta ficha.',
    children: (
      <LabModule
        id={0}
        title="Ejemplo"
        what="Envoltorio de demo."
        why="Aislar un experimento."
        pack="LabModule"
      >
        <Text.Caption>Hijo de ejemplo.</Text.Caption>
      </LabModule>
    ),
  },
]

const LabCatalog: FC<Props> = ({ startId }) => {
  return (
    <View className="gap-4">
      {ENTRIES.map((entry, index) => {
        const n = startId + index
        return (
          <CatalogCard
            key={entry.title}
            n={n}
            title={entry.title}
            does={entry.does}
            doesNot={entry.doesNot}
            solves={entry.solves}
          >
            {entry.variants?.map((variant, subIndex) => (
              <CatalogVariant
                key={variant.title}
                n={n}
                sub={subIndex + 1}
                title={variant.title}
                description={variant.description}
              >
                {variant.children}
              </CatalogVariant>
            ))}
            {!entry.variants && entry.children}
          </CatalogCard>
        )
      })}
    </View>
  )
}

export { LabCatalog }
