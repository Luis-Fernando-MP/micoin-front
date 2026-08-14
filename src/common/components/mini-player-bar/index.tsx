import { type FC, useState } from 'react'
import { View } from 'react-native'

import { Pause, Play } from 'lucide-react-native'

import Icon from '@components/icon'
import PressableScale from '@components/pressable-scale'
import BRAND from '@components/shared/brand'
import Text from '@components/text'
import WaveformBars from '@components/waveform-bars'

import { cn } from '@/lib/utils'

interface Props {
  title?: string
  subtitle?: string
  onPress?: () => void
}

/**
 * MiniPlayerBar — pieza reutilizable del kit MiCoin.
 *
 * Caja negra lista para conectar en cualquier pantalla.
 *
 * @param props - Ver MiniPlayerBarProps / Props del archivo
 *
 * @param props.title
 * @param props.subtitle
 * @param props.onPress
 * @example
 * import MiniPlayerBar from '@components/mini-player-bar';
 * <MiniPlayerBar />
 */
const MiniPlayerBar: FC<Props> = ({
  title = 'MiCoin Pulse',
  subtitle = 'Now playing',
  onPress,
}) => {
  const [playing, setPlaying] = useState(true)

  return (
    <PressableScale
      onPress={() => {
        setPlaying((value) => !value)
        onPress?.()
      }}
    >
      <View
        className={cn(
          'flex-row items-center gap-3 border border-border bg-card px-3 py-2',
          BRAND.radius.variants.surface,
        )}
      >
        <Icon icon={playing ? Pause : Play} size={18} />
        <View className="min-w-0 flex-1 gap-0.5">
          <Text className="text-sm font-medium" numberOfLines={1}>
            {title}
          </Text>
          <Text className="text-xs text-secondary" numberOfLines={1}>
            {subtitle}
          </Text>
        </View>
        <WaveformBars bars={12} width={72} height={28} active={playing} />
      </View>
    </PressableScale>
  )
}

export default MiniPlayerBar
