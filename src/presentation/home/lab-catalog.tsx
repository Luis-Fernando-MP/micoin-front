import { type FC, type ReactNode } from 'react';
import { View } from 'react-native';

import AudioPlayer from '@/common/components/audio-player';
import ConfettiBurst from '@/common/components/confetti-burst';
import EmojiPicker from '@/common/components/emoji-picker';
import EmojiReactionBar from '@/common/components/emoji-reaction-bar';
import EmojiSheet from '@/common/components/emoji-sheet';
import FoilText from '@/common/components/foil-text';
import FrostCard from '@/common/components/frost-card';
import KeyboardAwareComposer from '@/common/components/keyboard-aware-composer';
import LabModule from '@/common/components/lab-module';
import LottieSuccess from '@/common/components/lottie-success';
import MiniPlayerBar from '@/common/components/mini-player-bar';
import PressableScale from '@/common/components/pressable-scale';
import ProCarousel from '@/common/components/pro-carousel';
import PrivacyCover from '@/common/components/privacy-cover';
import RichOverflowSheet from '@/common/components/rich-overflow-sheet';
import SegmentedTabs from '@/common/components/segmented-tabs';
import SharePaySheet from '@/common/components/share-pay-sheet';
import SkeletonList from '@/common/components/skeleton-list';
import Text from '@/common/components/text';
import TrayNotifyMock from '@/common/components/tray-notify-mock';
import VideoPlayer from '@/common/components/video-player';
import WaveformBars from '@/common/components/waveform-bars';
import { showToast } from '@/common/components/toast';
import {
  BarcodeDemo,
  LedgerDemo,
  LocalAlertDemo,
  PayQrDemo,
  ReceiptDemo,
  ScannerDemo,
  ScreenProtectDemo,
  SmsPayDemo,
  StripeCardDemo,
  TicketPhotoDemo,
  VoiceNoteDemo,
} from '@/presentation/home/product-demos';
import MapsGallery from '@/presentation/home/wow-maps';
import SkiaGallery from '@/presentation/home/wow-skia';

type Entry = {
  id: number;
  title: string;
  what: string;
  why: string;
  pack?: string;
  children: ReactNode;
};

const ENTRIES: Entry[] = [
  {
    id: 1,
    title: 'Alertas locales',
    what: 'Agenda un Alert nativo a 3s (simula movimiento).',
    why: 'Aviso inmediato sin push remoto en Expo Go.',
    pack: 'Alert',
    children: <LocalAlertDemo />,
  },
  {
    id: 2,
    title: 'Cobrar con QR',
    what: 'Genera un QR con deep link de cobro.',
    why: 'POS / P2P sin hardware extra.',
    pack: 'qrcode-svg',
    children: <PayQrDemo />,
  },
  {
    id: 3,
    title: 'Código de barras',
    what: 'Renderiza EAN/Code128 en SVG.',
    why: 'Tickets y POS con código 1D.',
    pack: 'jsbarcode',
    children: <BarcodeDemo />,
  },
  {
    id: 4,
    title: 'Scanner QR / barcode',
    what: 'Abre cámara con viewfinder de escaneo.',
    why: 'Leer cobros o productos en caja.',
    pack: 'expo-camera',
    children: <ScannerDemo />,
  },
  {
    id: 5,
    title: 'Nota de voz',
    what: 'Graba y reproduce audio local.',
    why: 'Comprobantes orales / notas de gasto.',
    pack: 'expo-audio',
    children: <VoiceNoteDemo />,
  },
  {
    id: 6,
    title: 'Pantalla segura',
    what: 'Bloquea screenshots en la pantalla actual.',
    why: 'Proteger saldo y datos sensibles.',
    pack: 'screen-capture',
    children: <ScreenProtectDemo />,
  },
  {
    id: 7,
    title: 'Comprobante visual',
    what: 'Captura un recibo y lo comparte.',
    why: 'Enviar prueba de pago por share sheet.',
    pack: 'view-shot',
    children: <ReceiptDemo />,
  },
  {
    id: 8,
    title: 'Ledger offline',
    what: 'Guarda gastos en SQLite local.',
    why: 'Historial aunque no haya red.',
    pack: 'expo-sqlite',
    children: <LedgerDemo />,
  },
  {
    id: 9,
    title: 'SMS de cobro',
    what: 'Abre el composer SMS con link de pago.',
    why: 'Cobrar por mensaje a quien no tiene la app.',
    pack: 'expo-sms',
    children: <SmsPayDemo />,
  },
  {
    id: 10,
    title: 'Ticket photo',
    what: 'Pick + resize de foto de ticket.',
    why: 'Subir menos peso a backend.',
    pack: 'image-manipulator',
    children: <TicketPhotoDemo />,
  },
  {
    id: 11,
    title: 'Pagar con tarjeta',
    what: 'CardField nativo de Stripe (UI).',
    why: 'Checkout con tarjeta; cobro real = backend.',
    pack: 'stripe',
    children: <StripeCardDemo />,
  },
  {
    id: 12,
    title: 'Charts Skia',
    what: 'Galería de gráficos vectoriales.',
    why: 'Dashboards de gasto / tendencias.',
    pack: 'react-native-skia',
    children: <SkiaGallery />,
  },
  {
    id: 13,
    title: 'Mapas A→B',
    what: 'Ruta con autocomplete y polyline.',
    why: 'Sucursales, delivery, encuentro P2P.',
    pack: 'react-native-maps',
    children: <MapsGallery />,
  },
  {
    id: 14,
    title: 'Ocultar saldo',
    what: 'Tap para revelar/ocultar monto.',
    why: 'Privacidad en transporte público.',
    pack: 'PrivacyCover',
    children: <PrivacyCover />,
  },
  {
    id: 15,
    title: 'Texto foil',
    what: 'Monto con degradado MaskedView.',
    why: 'Highlight premium del balance.',
    pack: 'MaskedView',
    children: <FoilText />,
  },
  {
    id: 16,
    title: 'Frost card',
    what: 'Compara sólido vs frosted/glass.',
    why: 'Cards de tarjeta con look nativo.',
    pack: 'expo-glass-effect',
    children: <FrostCard />,
  },
  {
    id: 17,
    title: 'Emoji picker',
    what: 'Grid de emojis con FlashList.',
    why: 'Notas, categorías, chat de soporte.',
    pack: 'rn-expo-emoji-picker',
    children: <EmojiPicker />,
  },
  {
    id: 18,
    title: 'Reaction bar',
    what: 'Barra rápida de reacciones.',
    why: 'Feedback 1-tap en movimientos.',
    pack: 'rn-expo-emoji-picker',
    children: <EmojiReactionBar />,
  },
  {
    id: 19,
    title: 'Menú ⋯ rico',
    what: 'Bottom sheet modal con acciones.',
    why: 'Overflow menus sin salir de contexto.',
    pack: '@gorhom/bottom-sheet',
    children: <RichOverflowSheet />,
  },
  {
    id: 20,
    title: 'Compartir cobro',
    what: 'Sheet con QR + copiar link.',
    why: 'Flujo de cobro compartible.',
    pack: 'SharePaySheet',
    children: <SharePaySheet />,
  },
  {
    id: 21,
    title: 'Carrusel parallax',
    what: 'Slides con efecto parallax.',
    why: 'Promos / features onboarding.',
    pack: 'reanimated-carousel',
    children: <ProCarousel />,
  },
  {
    id: 22,
    title: 'Carrusel stack',
    what: 'Tarjetas apiladas horizontales.',
    why: 'Wallets / métodos de pago.',
    pack: 'reanimated-carousel',
    children: <ProCarousel.StackCarousel />,
  },
  {
    id: 23,
    title: 'Carrusel paging',
    what: 'Onboarding con snap por página.',
    why: 'Tutoriales de primer uso.',
    pack: 'reanimated-carousel',
    children: <ProCarousel.PagedCarousel />,
  },
  {
    id: 24,
    title: 'Audio player',
    what: 'Play/pause de stream remoto.',
    why: 'Notas o podcasts in-app.',
    pack: 'expo-audio',
    children: <AudioPlayer />,
  },
  {
    id: 25,
    title: 'Waveform',
    what: 'Barras animadas con Skia.',
    why: 'Feedback visual de audio activo.',
    pack: 'Skia + Reanimated',
    children: <WaveformBars active />,
  },
  {
    id: 26,
    title: 'Mini player',
    what: 'Barra now-playing con waveform.',
    why: 'Persistir audio mientras navegas.',
    pack: 'MiniPlayerBar',
    children: <MiniPlayerBar />,
  },
  {
    id: 27,
    title: 'Video player',
    what: 'Reproductor nativo con controles.',
    why: 'Tutoriales / comprobantes en video.',
    pack: 'expo-video',
    children: <VideoPlayer />,
  },
  {
    id: 28,
    title: 'Lottie success',
    what: 'Animación de éxito reutilizable.',
    why: 'Confirmación de pago memorable.',
    pack: 'lottie-react-native',
    children: <LottieSuccess />,
  },
  {
    id: 29,
    title: 'Confetti',
    what: 'Ráfaga de confetti on demand.',
    why: 'Celebrar primer cobro / meta.',
    pack: 'confetti-cannon',
    children: <ConfettiBurst />,
  },
  {
    id: 30,
    title: 'Press scale',
    what: 'Pressable con scale Moti.',
    why: 'Micro-interacción táctil.',
    pack: 'moti',
    children: (
      <PressableScale
        onPress={() =>
          showToast({ title: 'Tap!', status: 'success' })
        }
      >
        <View className="items-center rounded-control border border-border bg-card px-4 py-3">
          <Text className="font-medium">Pulsa aquí</Text>
        </View>
      </PressableScale>
    ),
  },
  {
    id: 31,
    title: 'Segmented tabs',
    what: 'Control segmentado nativo.',
    why: 'Filtros Hoy / Semana / Mes.',
    pack: 'segmented-control',
    children: <SegmentedTabs />,
  },
  {
    id: 32,
    title: 'Keyboard composer',
    what: 'Input que sube con el teclado.',
    why: 'Notas de cobro sin tapar el campo.',
    pack: 'keyboard-controller',
    children: <KeyboardAwareComposer />,
  },
  {
    id: 33,
    title: 'Skeleton list',
    what: 'Placeholders animados de carga.',
    why: 'Perceived performance en listas.',
    pack: 'moti',
    children: <SkeletonList />,
  },
  {
    id: 34,
    title: 'Overflow movimiento',
    what: '⋯ abre detalle del movimiento.',
    why: 'Acciones contextuales en historial.',
    pack: 'bottom-sheet',
    children: <SharePaySheet.MovementOverflow />,
  },
  {
    id: 35,
    title: 'Emoji sheet',
    what: 'Sheet + picker compuestos.',
    why: 'Elegir emoji sin navegar de pantalla.',
    pack: 'EmojiSheet',
    children: <EmojiSheet />,
  },
  {
    id: 36,
    title: 'Bandeja mock',
    what: 'UI de notificación en bandeja.',
    why: 'Diseñar copy antes de Dev Client.',
    pack: 'Fase 2 mock',
    children: <TrayNotifyMock />,
  },
  {
    id: 37,
    title: 'Ongoing mock',
    what: 'Notificación inamovible simulada.',
    why: 'Cobros en curso / foreground.',
    pack: 'Fase 2 mock',
    children: <TrayNotifyMock.Ongoing />,
  },
  {
    id: 38,
    title: 'MediaStyle mock',
    what: 'Chip artwork + título colapsado.',
    why: 'Estilo YouTube Music para audio.',
    pack: 'Fase 2 mock',
    children: <TrayNotifyMock.MediaStyle />,
  },
];

const LabCatalog: FC = () => {
  return (
    <View className="gap-4">
      {ENTRIES.map((entry) => (
        <LabModule
          key={entry.id}
          id={entry.id}
          title={entry.title}
          what={entry.what}
          why={entry.why}
          pack={entry.pack}
        >
          {entry.children}
        </LabModule>
      ))}
    </View>
  );
};

export { LabCatalog };
