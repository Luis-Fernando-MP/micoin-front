import { cva, type VariantProps } from 'class-variance-authority';
import { type FC, type ReactNode } from 'react';
import { Pressable, type PressableProps } from 'react-native';

import { Text } from '@/common/text';
import { cn } from '@/lib/utils';

const buttonVariants = cva('items-center justify-center rounded-lg px-4 py-3', {
  variants: {
    variant: {
      default: 'bg-primary-background active:opacity-90',
      outline: 'border border-card-hover bg-card active:bg-card-hover',
      ghost: 'bg-transparent active:bg-card-hover',
    },
    disabled: {
      true: 'opacity-50',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const buttonTextVariants = cva('text-base font-semibold', {
  variants: {
    variant: {
      default: 'text-background',
      outline: 'text-foreground',
      ghost: 'text-foreground',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

interface Props
  extends Omit<PressableProps, 'children'>,
    VariantProps<typeof buttonVariants> {
  className?: string;
  label?: string;
  children?: ReactNode;
}

const Button: FC<Props> = ({
  className,
  variant,
  disabled,
  label,
  children,
  ...props
}) => {
  return (
    <Pressable
      className={cn(
        buttonVariants({ variant, disabled: Boolean(disabled) }),
        className
      )}
      disabled={disabled}
      {...props}
    >
      {label && <Text className={buttonTextVariants({ variant })}>{label}</Text>}
      {!label && children}
    </Pressable>
  );
};

export type { Props as ButtonProps };
export { Button };
