import { type FC, useState } from 'react'
import { View } from 'react-native'

import {
  type EmojiSelection,
  EmojiReactionBar as RnReactionBar,
} from 'rn-expo-emoji-picker'

import Text from '@components/text'

interface Props {
  emojis?: string[]
  onChange?: (emoji: string | null) => void
}

const DEFAULT = ['👍', '❤️', '😂', '😮', '😢', '🔥']

/**
 * EmojiReactionBar — pieza reutilizable del kit MiCoin.
 *
 * Caja negra lista para conectar en cualquier pantalla.
 *
 * @param props - Ver EmojiReactionBarProps / Props del archivo
 *
 * @param props.emojis
 * @param props.onChange
 * @example
 * import EmojiReactionBar from '@components/emoji-reaction-bar';
 * <EmojiReactionBar />
 */
const EmojiReactionBar: FC<Props> = ({ emojis = DEFAULT, onChange }) => {
  const [active, setActive] = useState<string | null>(null)

  return (
    <View className="gap-2">
      <RnReactionBar
        emojis={emojis}
        selectedEmojis={active ? [active] : []}
        onEmojiSelected={(selection: EmojiSelection) => {
          const next = active === selection.emoji ? null : selection.emoji
          setActive(next)
          onChange?.(next)
        }}
      />
      {active && (
        <Text className="text-sm text-secondary">Reacción: {active}</Text>
      )}
    </View>
  )
}

export default EmojiReactionBar
