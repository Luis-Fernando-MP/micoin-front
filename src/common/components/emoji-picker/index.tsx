import { type FC, useState } from 'react';
import { View } from 'react-native';
import {
  EmojiPicker as RnEmojiPicker,
  lightTheme,
  type EmojiSelection,
} from 'rn-expo-emoji-picker';

import { Text } from '@/common/components/text';
import { useMcVar } from '@/theme/hooks/use-theme-var';

interface Props {
  height?: number;
  onSelect?: (emoji: string) => void;
}

const EmojiPicker: FC<Props> = ({ height = 280, onSelect }) => {
  const [selected, setSelected] = useState('🙂');
  const bg = useMcVar('card', '#ffffff');
  const text = useMcVar('textPrimary', '#171717');
  const border = useMcVar('border', '#eaeaea');
  const secondary = useMcVar('textSecondary', '#666666');
  const accent = useMcVar('brand', '#c9a227');

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
            setSelected(item.emoji);
            onSelect?.(item.emoji);
          }}
        />
      </View>
    </View>
  );
};

export { EmojiPicker };
