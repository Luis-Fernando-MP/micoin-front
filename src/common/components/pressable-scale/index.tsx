import { MotiPressable } from 'moti/interactions';
import { type FC, type ReactNode } from 'react';
import { View } from 'react-native';

interface Props {
  children: ReactNode;
  onPress?: () => void;
}

const PressableScale: FC<Props> = ({ children, onPress }) => {
  return (
    <MotiPressable
      onPress={onPress}
      animate={({ pressed }) => {
        'worklet';
        return {
          scale: pressed ? 0.96 : 1,
        };
      }}
      transition={{ type: 'timing', duration: 120 }}
    >
      <View>{children}</View>
    </MotiPressable>
  );
};

export { PressableScale };
