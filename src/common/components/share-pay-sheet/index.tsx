import { type FC, useRef } from 'react'
import { View } from 'react-native'

import { type BottomSheetModal } from '@gorhom/bottom-sheet'
import { Share2 } from 'lucide-react-native'

import AppBottomSheetModal from '@components/bottom-sheet'
import Button from '@components/button'
import QrCode from '@components/qr-code'
import MovementOverflow from '@components/share-pay-sheet/extensions/movement-overflow'
import Text from '@components/text'
import { showToast } from '@components/toast'

import { copyText } from '@/common/device/clipboard'
import { metadata } from '@/common/metadata'

interface Props {
  amountLabel?: string
  link?: string
}

/**
 * SharePaySheet — sheet para compartir un cobro con QR y link.
 *
 * Extensiones: `SharePaySheet.MovementOverflow`.
 *
 * @param amountLabel - Monto visible. @default '$12.50'
 * @param amountLabel.amountLabel
 * @param link - Deep link o URL de cobro
 *
 * @param amountLabel.link
 * @example
 * import SharePaySheet from '@components/share-pay-sheet';
 * <SharePaySheet amountLabel="$20" link="micoin://pay?amount=20" />
 * <SharePaySheet.MovementOverflow />
 */
const SharePaySheetRoot: FC<Props> = ({
  amountLabel = '$12.50',
  link = 'micoin://pay?amount=12.50',
}) => {
  const ref = useRef<BottomSheetModal>(null)

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
          <Text.Title>Cobrar {amountLabel}</Text.Title>
          <Text.Subtitle>
            Comparte el link o muestra el QR de {metadata.name}.
          </Text.Subtitle>
          <View className="items-center py-2">
            <QrCode value={link} size={160} />
          </View>
          <Button
            variant="outline"
            label="Copiar link"
            onPress={async () => {
              await copyText(link)
              showToast({ title: 'Link copiado', status: 'success' })
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
  )
}

const SharePaySheet = Object.assign(SharePaySheetRoot, {
  MovementOverflow,
})

export type { Props as SharePaySheetProps }
/**
 *
 */
export default SharePaySheet
