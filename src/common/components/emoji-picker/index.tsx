import { type FC, useState } from 'react'
import { View } from 'react-native'

import {
  EmojiPicker as RnEmojiPicker,
  type EmojiSelection,
  lightTheme,
} from 'rn-expo-emoji-picker'

import BRAND from '@components/shared/brand'
import Text from '@components/text'
import { useMcVar } from '@theme'

interface Props {
  height?: number
  onSelect?: (emoji: string) => void
}

/**
 * EmojiPicker — pieza reutilizable del kit MiCoin.
 *
 * Caja negra lista para conectar en cualquier pantalla.
 *
 * @param props - Ver EmojiPickerProps / Props del archivo
 *
 * @param props.height
 * @param props.onSelect
 * @example
 * import EmojiPicker from '@components/emoji-picker';
 * <EmojiPicker />
 */
const EmojiPicker: FC<Props> = ({ height = 280, onSelect }) => {
  const [selected, setSelected] = useState('🙂')
  const bg = useMcVar(BRAND.native.card)
  const text = useMcVar(BRAND.native.textPrimary)
  const border = useMcVar(BRAND.native.border)
  const secondary = useMcVar(BRAND.native.textSecondary)
  const accent = useMcVar(BRAND.native.brand)

  return (
    <View className="gap-2">
      <Text className="text-sm text-secondary">Seleccionado: {selected}</Text>
      <View style={{ height }}>
        <RnEmojiPicker
          theme={{
            colors: {
              ...lightTheme.colors,
              background: bg,
              text,
              secondaryText: secondary,
              accent,
              searchBackground: border,
              searchText: text,
              searchPlaceholder: secondary,
              divider: border,
              categoryBarBackground: bg,
              categoryActiveBackground: border,
            },
          }}
          onEmojiSelected={(item: EmojiSelection) => {
            setSelected(item.emoji)
            onSelect?.(item.emoji)
          }}
        />
      </View>
    </View>
  )
}

export default EmojiPicker
