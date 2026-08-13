import { type FC, useState } from 'react';
import { View } from 'react-native';
import {
  EmojiReactionBar as RnReactionBar,
  type EmojiSelection,
} from 'rn-expo-emoji-picker';

import { Text } from '@/common/components/text';

interface Props {
  emojis?: string[];
  onChange?: (emoji: string | null) => void;
}

const DEFAULT = ['👍', '❤️', '😂', '😮', '😢', '🔥'];

const EmojiReactionBar: FC<Props> = ({ emojis = DEFAULT, onChange }) => {
  const [active, setActive] = useState<string | null>(null);

  return (
    <View className="gap-2">
      <RnReactionBar
        emojis={emojis}
        selectedEmojis={active ? [active] : []}
        onEmojiSelected={(selection: EmojiSelection) => {
          const next = active === selection.emoji ? null : selection.emoji;
          setActive(next);
          onChange?.(next);
        }}
      />
      {active && (
        <Text className="text-sm text-secondary">Reacción: {active}</Text>
      )}
    </View>
  );
};

export { EmojiReactionBar };
