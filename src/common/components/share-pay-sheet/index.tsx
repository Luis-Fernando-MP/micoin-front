import {
  type BottomSheetModal,
} from '@gorhom/bottom-sheet';
import { MoreHorizontal, Share2 } from 'lucide-react-native';
import { type FC, useRef } from 'react';
import { View } from 'react-native';

import { AppBottomSheetModal } from '@/common/components/bottom-sheet';
import { Button } from '@/common/components/button';
import { QrCode } from '@/common/components/qr-code';
import { Text } from '@/common/components/text';
import { showToast } from '@/common/components/toast';
import { copyText } from '@/common/device/clipboard';
import { metadata } from '@/common/metadata';

const PAY_LINK = 'micoin://pay?amount=12.50';

interface Props {
  amountLabel?: string;
  link?: string;
}

const SharePaySheet: FC<Props> = ({
  amountLabel = '$12.50',
  link = PAY_LINK,
}) => {
  const ref = useRef<BottomSheetModal>(null);

  return (
    <View className="gap-2">
      <Button
        size="sm"
        icon={Share2}
        label="Compartir cobro"
        onPress={() => ref.current?.present()}
      />
      <AppBottomSheetModal ref={ref} snapPoints={['55%', '80%']}>
        <View className="gap-3 pt-2">
          <Text className="text-lg font-semibold">Cobrar {amountLabel}</Text>
          <Text className="text-sm text-secondary">
            Comparte el link o muestra el QR de {metadata.name}.
          </Text>
          <View className="items-center py-2">
            <QrCode value={link} size={160} />
          </View>
          <Button
            variant="outline"
            label="Copiar link"
            onPress={async () => {
              await copyText(link);
              showToast({ title: 'Link copiado', status: 'success' });
            }}
          />
          <Button
            variant="ghost"
            label="Cerrar"
            onPress={() => ref.current?.dismiss()}
          />
        </View>
      </AppBottomSheetModal>
    </View>
  );
};

const MovementOverflowMenu: FC = () => {
  const ref = useRef<BottomSheetModal>(null);

  return (
    <View className="gap-2">
      <View className="flex-row items-center justify-between">
        <View>
          <Text className="font-medium">Café · -$3.50</Text>
          <Text className="text-xs text-secondary">Hoy · 10:24</Text>
        </View>
        <Button
          size="sm"
          variant="ghost"
          icon={MoreHorizontal}
          label=""
          onPress={() => ref.current?.present()}
        />
      </View>
      <AppBottomSheetModal ref={ref} snapPoints={['45%']}>
        <View className="gap-3 pt-2">
          <Text className="text-lg font-semibold">Detalle del movimiento</Text>
          <Text className="text-sm text-secondary">
            Comercio: Café Central · Categoría: Food · Método: QR
          </Text>
          <Button
            size="sm"
            variant="outline"
            label="Compartir recibo"
            onPress={() => {
              showToast({ title: 'Recibo listo', status: 'info' });
              ref.current?.dismiss();
            }}
          />
          <Button
            size="sm"
            variant="ghost"
            label="Reportar"
            onPress={() => ref.current?.dismiss()}
          />
        </View>
      </AppBottomSheetModal>
    </View>
  );
};

export { MovementOverflowMenu, SharePaySheet };
