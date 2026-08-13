import { cva, type VariantProps } from 'class-variance-authority';
import { type FC } from 'react';
import { TextInput, type TextInputProps, View } from 'react-native';

import { radius } from '@/common/components/shared/radius';
import { type Size } from '@/common/components/shared/size';
import {
  statusBorder,
  statusText,
  type Status,
} from '@/common/components/shared/status';
import { Text } from '@/common/components/text';
import { cn } from '@/lib/utils';
import { useMcVar } from '@/theme/hooks/use-theme-var';

const inputShell = cva(
  cn('w-full border px-4 text-base text-foreground', radius.control),
  {
    variants: {
      variant: {
        default: 'border-border bg-background',
        outline: 'border-border bg-transparent',
        filled: 'border-transparent bg-card',
        ghost: 'rounded-none border-0 border-b border-border bg-transparent px-0',
      },
      size: {
        sm: 'h-9 py-0',
        md: 'h-11 py-0',
        lg: 'h-12 py-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

interface Props
  extends TextInputProps, VariantProps<typeof inputShell> {
  label?: string;
  className?: string;
  status?: Status;
  size?: Size;
}

const Input: FC<Props> = ({
  label,
  className,
  variant = 'default',
  status = 'default',
  size = 'md',
  ...props
}) => {
  const placeholderColor = useMcVar('textSecondary', '#666666');
  const isGhost = variant === 'ghost';

  return (
    <View className="gap-2">
      {label && (
        <Text className={cn('text-sm', statusText({ status }))}>{label}</Text>
      )}
      <TextInput
        className={cn(
          inputShell({ variant, size: isGhost ? undefined : size }),
          isGhost && 'h-11',
          status !== 'default' && statusBorder({ status }),
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
