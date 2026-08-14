import { type FC, useRef, useState } from 'react'
import { View } from 'react-native'

import { type BottomSheetModal } from '@gorhom/bottom-sheet'
import { Smile } from 'lucide-react-native'

import AppBottomSheetModal from '@components/bottom-sheet'
import Button from '@components/button'
import EmojiPicker from '@components/emoji-picker'
import Text from '@components/text'

interface Props {
  onSelect?: (emoji: string) => void
}

/**
 * EmojiSheet — pieza reutilizable del kit MiCoin.
 *
 * Caja negra lista para conectar en cualquier pantalla.
 *
 * @param props - Ver EmojiSheetProps / Props del archivo
 *
 * @param props.onSelect
 * @example
 * import EmojiSheet from '@components/emoji-sheet';
 * <EmojiSheet />
 */
const EmojiSheet: FC<Props> = ({ onSelect }) => {
  const ref = useRef<BottomSheetModal>(null)
  const [emoji, setEmoji] = useState('✨')

  return (
    <View className="gap-2">
      <Button
        size="sm"
        icon={Smile}
        label={`Elegir emoji ${emoji}`}
        onPress={() => ref.current?.present()}
      />
      <AppBottomSheetModal ref={ref} snapPoints={['70%', '90%']}>
        <View className="gap-2 pt-1">
          <Text.Title size="sm">Reaccionar</Text.Title>
          <EmojiPicker
            height={320}
            onSelect={(value) => {
              setEmoji(value)
              onSelect?.(value)
              ref.current?.dismiss()
            }}
          />
        </View>
      </AppBottomSheetModal>
    </View>
  )
}

export default EmojiSheet
