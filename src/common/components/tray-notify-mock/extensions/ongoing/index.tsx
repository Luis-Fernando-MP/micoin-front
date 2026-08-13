import { Radio } from 'lucide-react-native';
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
 * OngoingNotifyMock — mock de notificación ongoing inamovible.
 *
 * @param title - Título. @default 'Cobro en curso'
 * @param body - Cuerpo
 *
 * @example
 * import TrayNotifyMock from '@/common/components/tray-notify-mock';
 * <TrayNotifyMock.Ongoing />
 */
const OngoingNotifyMock: FC<Props> = ({
  title = 'Cobro en curso',
  body = 'Notificación ongoing (inamovible) · mock UI',
}) => {
  return (
    <View className="gap-2">
      <View
        className={cn(
          'flex-row items-center gap-3 border border-brand bg-card p-3',
          BRAND.radius.variants.surface
        )}
      >
        <Icon icon={Radio} size={18} />
        <View className="flex-1">
          <Text.Title size="xs">{title}</Text.Title>
          <Text.Caption>{body}</Text.Caption>
        </View>
        <Text.Caption status="brand">LIVE</Text.Caption>
      </View>
      <Text.Caption>
        Fase 2: foreground service / ongoing notification en Dev Client.
      </Text.Caption>
    </View>
  );
};

export default OngoingNotifyMock;
