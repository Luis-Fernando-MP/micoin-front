import { type FC } from 'react';
import { Pressable, View } from 'react-native';

import { Text } from '@/common/text';
import { cn } from '@/lib/utils';
import { useTheme } from '@/theme/hooks/use-theme';
import type { ThemePreference } from '@/theme/store/theme-store';

const OPTIONS: { value: ThemePreference; label: string }[] = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'system', label: 'System' },
];

const ThemeToggle: FC = () => {
  const { preference, setPreference } = useTheme();

  return (
    <View className="flex-row gap-2">
      {OPTIONS.map((option) => {
        const selected = preference === option.value;

        return (
          <Pressable
            key={option.value}
            onPress={() => setPreference(option.value)}
            className={cn(
              'rounded-full border border-card-hover px-3 py-2',
              selected && 'border-primary bg-primary-background'
            )}
          >
            <Text
              className={cn(
                'text-sm font-medium text-foreground',
                selected && 'text-background'
              )}
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export { ThemeToggle };
