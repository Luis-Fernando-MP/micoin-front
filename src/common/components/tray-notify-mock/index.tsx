import { Bell, Music2, Radio } from 'lucide-react-native';
import { type FC } from 'react';
import { View } from 'react-native';

import { Button } from '@/common/components/button';
import { Icon } from '@/common/components/icon';
import { radius } from '@/common/components/shared/radius';
import { Text } from '@/common/components/text';
import { showToast } from '@/common/components/toast';
import { cn } from '@/lib/utils';

const TrayNotifyMock: FC = () => {
  return (
    <View className="gap-2">
      <View
        className={cn(
          'flex-row items-start gap-3 border border-border bg-card p-3',
          radius.surface
        )}
      >
        <Icon icon={Bell} size={18} />
        <View className="flex-1 gap-0.5">
          <Text className="text-sm font-semibold">MiCoin · Movimiento</Text>
          <Text className="text-xs text-secondary">
            Recibiste $12.50 · Mock de bandeja (Expo Go)
          </Text>
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

const OngoingNotifyMock: FC = () => {
  return (
    <View className="gap-2">
      <View
        className={cn(
          'flex-row items-center gap-3 border border-brand bg-card p-3',
          radius.surface
        )}
      >
        <Icon icon={Radio} size={18} />
        <View className="flex-1">
          <Text className="text-sm font-semibold">Cobro en curso</Text>
          <Text className="text-xs text-secondary">
            Notificación ongoing (inamovible) · mock UI
          </Text>
        </View>
        <Text className="text-xs text-brand">LIVE</Text>
      </View>
      <Text className="text-xs text-secondary">
        Fase 2: foreground service / ongoing notification en Dev Client.
      </Text>
    </View>
  );
};

const MediaStyleNotifyMock: FC = () => {
  return (
    <View className="gap-2">
      <View
        className={cn(
          'flex-row items-center gap-3 border border-border bg-card p-3',
          radius.surface
        )}
      >
        <View
          className={cn(
            'h-10 w-10 items-center justify-center bg-brand',
            radius.control
          )}
        >
          <Icon icon={Music2} size={18} tone="onBrand" />
        </View>
        <View className="flex-1">
          <Text className="text-sm font-semibold">MiCoin Pulse</Text>
          <Text className="text-xs text-secondary">
            MediaStyle colapsado · estilo YouTube Music
          </Text>
        </View>
      </View>
      <Text className="text-xs text-secondary">
        Fase 2: MediaSession nativo + Dev Client.
      </Text>
    </View>
  );
};

export { MediaStyleNotifyMock, OngoingNotifyMock, TrayNotifyMock };
