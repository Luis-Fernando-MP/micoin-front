import { Bell } from 'lucide-react-native';
import { type FC } from 'react';
import { View } from 'react-native';

import Button from '@/common/components/button';
import Icon from '@/common/components/icon';
import BRAND from '@/common/components/shared/brand';
import Text from '@/common/components/text';
import { showToast } from '@/common/components/toast';
import MediaStyle from '@/common/components/tray-notify-mock/extensions/media-style';
import Ongoing from '@/common/components/tray-notify-mock/extensions/ongoing';
import { cn } from '@/lib/utils';

interface Props {
  title?: string;
  body?: string;
}

/**
 * TrayNotifyMock — mock de notificación en bandeja (Expo Go).
 *
 * Extensiones: `TrayNotifyMock.Ongoing`, `TrayNotifyMock.MediaStyle`.
 *
 * @param title - Título. @default 'MiCoin · Movimiento'
 * @param body - Cuerpo
 *
 * @example
 * import TrayNotifyMock from '@/common/components/tray-notify-mock';
 * <TrayNotifyMock />
 * <TrayNotifyMock.Ongoing />
 */
const TrayNotifyMockRoot: FC<Props> = ({
  title = 'MiCoin · Movimiento',
  body = 'Recibiste $12.50 · Mock de bandeja (Expo Go)',
}) => {
  return (
    <View className="gap-2">
      <View
        className={cn(
          'flex-row items-start gap-3 border border-border bg-card p-3',
          BRAND.radius.variants.surface
        )}
      >
        <Icon icon={Bell} size={18} />
        <View className="flex-1 gap-0.5">
          <Text className="text-sm font-semibold">{title}</Text>
          <Text className="text-xs text-secondary">{body}</Text>
        </View>
      </View>
      <Button
        size="sm"
        variant="outline"
        label="Simular en bandeja"
        onPress={() =>
          showToast({
            title: 'Mock bandeja',
            message: 'Push nativo = Fase 2 Dev Client',
            status: 'info',
          })
        }
      />
      <Text className="text-xs text-secondary">
        Fase 2: expo-notifications + Dev Client (no en Expo Go).
      </Text>
    </View>
  );
};

const TrayNotifyMock = Object.assign(TrayNotifyMockRoot, {
  Ongoing,
  MediaStyle,
});

export type { Props as TrayNotifyMockProps };
export default TrayNotifyMock;
