import { type FC } from 'react';
import { TextInput, type TextInputProps, View } from 'react-native';

import { Text } from '@/common/text';
import { cn } from '@/lib/utils';
import { useMcVar } from '@/theme/hooks/use-theme-var';

interface Props extends TextInputProps {
  label?: string;
  className?: string;
}

const Input: FC<Props> = ({ label, className, ...props }) => {
  const placeholderColor = useMcVar('textSecondary', '#666666');

  return (
    <View className="gap-2">
      {label && <Text className="text-sm text-secondary">{label}</Text>}
      <TextInput
        className={cn(
          'rounded-lg border border-card-hover bg-background px-4 py-3 text-base text-foreground',
          className
        )}
        placeholderTextColor={placeholderColor}
        {...props}
      />
    </View>
  );
};

export type { Props as InputProps };
export { Input };
