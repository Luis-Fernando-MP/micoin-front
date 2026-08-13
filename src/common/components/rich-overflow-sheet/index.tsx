import { type FC, type ReactNode, useRef } from 'react'
import { View } from 'react-native'

import { type BottomSheetModal } from '@gorhom/bottom-sheet'
import { MoreHorizontal } from 'lucide-react-native'

import AppBottomSheetModal from '@components/bottom-sheet'
import Button from '@components/button'
import Text from '@components/text'
import { showToast } from '@components/toast'

type Action = {
  label: string
  onPress?: () => void
}

interface Props {
  title?: string
  description?: ReactNode
  actions?: Action[]
  triggerLabel?: string
}

/**
 * RichOverflowSheet — pieza reutilizable del kit MiCoin.
 *
 * Caja negra lista para conectar en cualquier pantalla.
 *
 * @param props - Ver RichOverflowSheetProps / Props del archivo
 *
 * @param props.title
 * @param props.description
 * @param props.actions
 * @param props.triggerLabel
 * @example
 * import RichOverflowSheet from '@components/rich-overflow-sheet';
 * <RichOverflowSheet />
 */
const RichOverflowSheet: FC<Props> = ({
  title = 'Acciones',
  description = 'Menú ⋯ con contenido rico (QR, texto, acciones).',
  actions,
  triggerLabel = 'Abrir ⋯',
}) => {
  const ref = useRef<BottomSheetModal>(null)
  const items = actions ?? [
    {
      label: 'Duplicar cobro',
      onPress: () => showToast({ title: 'Duplicado', status: 'success' }),
    },
    {
      label: 'Archivar',
      onPress: () => showToast({ title: 'Archivado', status: 'info' }),
    },
  ]

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
          <Text.Title>{title}</Text.Title>
          {typeof description === 'string' ? (
            <Text.Subtitle>{description}</Text.Subtitle>
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
                item.onPress?.()
                ref.current?.dismiss()
              }}
            />
          ))}
        </View>
      </AppBottomSheetModal>
    </View>
  )
}

/**
 *
 */
export default RichOverflowSheet
