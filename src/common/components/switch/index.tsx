import { type FC } from 'react';
import { Pressable, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useEffect } from 'react';

import { Text } from '@/common/components/text';
import { statusBg, type Status } from '@/common/components/shared/status';
import { cn } from '@/lib/utils';

interface Props {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label?: string;
  className?: string;
  status?: Status;
}

const Switch: FC<Props> = ({
  checked,
  onCheckedChange,
  label,
  className,
  status = 'primary',
}) => {
  const translateX = useSharedValue(checked ? 20 : 2);

  useEffect(() => {
    translateX.value = withSpring(checked ? 20 : 2, {
      damping: 15,
      stiffness: 160,
    });
  }, [checked, translateX]);

  const knobStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <Pressable
      onPress={() => onCheckedChange(!checked)}
      className={cn('flex-row items-center gap-3', className)}
    >
      <View
        className={cn(
          'h-7 w-12 justify-center rounded-full bg-card-hover',
          checked && statusBg({ status })
        )}
      >
        <Animated.View
          style={knobStyle}
          className="h-5 w-5 rounded-full bg-background"
        />
      </View>
      {label && <Text>{label}</Text>}
    </Pressable>
  );
};

export { Switch };
