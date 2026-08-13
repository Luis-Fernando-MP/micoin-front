import { type BottomSheetModal } from '@gorhom/bottom-sheet';
import { MoreHorizontal } from 'lucide-react-native';
import { type FC, type ReactNode, useRef } from 'react';
import { View } from 'react-native';

import { AppBottomSheetModal } from '@/common/components/bottom-sheet';
import { Button } from '@/common/components/button';
import { Text } from '@/common/components/text';
import { showToast } from '@/common/components/toast';

type Action = {
  label: string;
  onPress?: () => void;
};

interface Props {
  title?: string;
  description?: ReactNode;
  actions?: Action[];
  triggerLabel?: string;
}

const RichOverflowSheet: FC<Props> = ({
  title = 'Acciones',
  description = 'Menú ⋯ con contenido rico (QR, texto, acciones).',
  actions,
  triggerLabel = 'Abrir ⋯',
}) => {
  const ref = useRef<BottomSheetModal>(null);
  const items =
    actions ??
    [
      {
        label: 'Duplicar cobro',
        onPress: () => showToast({ title: 'Duplicado', status: 'success' }),
      },
      {
        label: 'Archivar',
        onPress: () => showToast({ title: 'Archivado', status: 'info' }),
      },
    ];

  return (
    <View className="gap-2">
      <Button
        size="sm"
        icon={MoreHorizontal}
        variant="outline"
        label={triggerLabel}
        onPress={() => ref.current?.present()}
      />
      <AppBottomSheetModal ref={ref} snapPoints={['42%', '65%']}>
        <View className="gap-3 pt-2">
          <Text className="text-lg font-semibold">{title}</Text>
          {typeof description === 'string' ? (
            <Text className="text-sm text-secondary">{description}</Text>
          ) : (
            description
          )}
          {items.map((item) => (
            <Button
              key={item.label}
              size="sm"
              variant="outline"
              label={item.label}
              onPress={() => {
                item.onPress?.();
                ref.current?.dismiss();
              }}
            />
          ))}
        </View>
      </AppBottomSheetModal>
    </View>
  );
};

export { RichOverflowSheet };
