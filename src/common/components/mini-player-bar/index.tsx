import { Pause, Play } from 'lucide-react-native';
import { type FC, useState } from 'react';
import { View } from 'react-native';

import { Icon } from '@/common/components/icon';
import { PressableScale } from '@/common/components/pressable-scale';
import { radius } from '@/common/components/shared/radius';
import { Text } from '@/common/components/text';
import { WaveformBars } from '@/common/components/waveform-bars';
import { cn } from '@/lib/utils';

interface Props {
  title?: string;
  subtitle?: string;
  onPress?: () => void;
}

const MiniPlayerBar: FC<Props> = ({
  title = 'MiCoin Pulse',
  subtitle = 'Now playing',
  onPress,
}) => {
  const [playing, setPlaying] = useState(true);

  return (
    <PressableScale
      onPress={() => {
        setPlaying((value) => !value);
        onPress?.();
      }}
    >
      <View
        className={cn(
          'flex-row items-center gap-3 border border-border bg-card px-3 py-2',
          radius.surface
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
  );
};

export { MiniPlayerBar };
