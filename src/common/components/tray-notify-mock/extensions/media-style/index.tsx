import { Music2 } from 'lucide-react-native';
import { type FC } from 'react';
import { View } from 'react-native';

import Icon from '@/common/components/icon';
import BRAND from '@/common/components/shared/brand';
import Text from '@/common/components/text';
import { cn } from '@/lib/utils';

interface Props {
  title?: string;
  body?: string;
}

/**
 * MediaStyleNotifyMock — mock MediaStyle colapsado (chip + título).
 *
 * @param title - Título. @default 'MiCoin Pulse'
 * @param body - Cuerpo
 *
 * @example
 * import TrayNotifyMock from '@/common/components/tray-notify-mock';
 * <TrayNotifyMock.MediaStyle />
 */
const MediaStyleNotifyMock: FC<Props> = ({
  title = 'MiCoin Pulse',
  body = 'MediaStyle colapsado · estilo YouTube Music',
}) => {
  return (
    <View className="gap-2">
      <View
        className={cn(
          'flex-row items-center gap-3 border border-border bg-card p-3',
          BRAND.radius.variants.surface
        )}
      >
        <View
          className={cn(
            'h-10 w-10 items-center justify-center bg-brand',
            BRAND.radius.variants.control
          )}
        >
          <Icon icon={Music2} size={18} tone="onBrand" />
        </View>
        <View className="flex-1">
          <Text className="text-sm font-semibold">{title}</Text>
          <Text className="text-xs text-secondary">{body}</Text>
        </View>
      </View>
      <Text className="text-xs text-secondary">
        Fase 2: MediaSession nativo + Dev Client.
      </Text>
    </View>
  );
};

export default MediaStyleNotifyMock;
