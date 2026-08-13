import { type FC, useRef } from 'react'
import { View } from 'react-native'

import { type BottomSheetModal } from '@gorhom/bottom-sheet'
import { MoreHorizontal } from 'lucide-react-native'

import AppBottomSheetModal from '@components/bottom-sheet'
import Button from '@components/button'
import Text from '@components/text'
import { showToast } from '@components/toast'

interface Props {
  title?: string
  subtitle?: string
  detail?: string
}

/**
 * MovementOverflowMenu — fila de movimiento con ⋯ y sheet de detalle.
 *
 * @param title - Título de la fila. @default 'Café · -$3.50'
 * @param title.title
 * @param subtitle - Subtítulo. @default 'Hoy · 10:24'
 * @param title.subtitle
 * @param detail - Texto del sheet
 *
 * @param title.detail
 * @example
 * import SharePaySheet from '@components/share-pay-sheet';
 * <SharePaySheet.MovementOverflow />
 */
const MovementOverflowMenu: FC<Props> = ({
  title = 'Café · -$3.50',
  subtitle = 'Hoy · 10:24',
  detail = 'Comercio: Café Central · Categoría: Food · Método: QR',
}) => {
  const ref = useRef<BottomSheetModal>(null)

  return (
    <View className="gap-2">
      <View className="flex-row items-center justify-between">
        <View>
          <Text.Highlight>{title}</Text.Highlight>
          <Text.Caption>{subtitle}</Text.Caption>
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
          <Text.Title>Detalle del movimiento</Text.Title>
          <Text.Subtitle>{detail}</Text.Subtitle>
          <Button
            size="sm"
            variant="outline"
            label="Compartir recibo"
            onPress={() => {
              showToast({ title: 'Recibo listo', status: 'info' })
              ref.current?.dismiss()
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
  )
}

export type { Props as MovementOverflowMenuProps }
/**
 *
 */
export default MovementOverflowMenu
