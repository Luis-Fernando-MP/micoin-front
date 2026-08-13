import { cva, type VariantProps } from 'class-variance-authority';
import { type LucideIcon } from 'lucide-react-native';
import { type FC, type ReactNode } from 'react';
import { Pressable, type PressableProps } from 'react-native';

import { Icon } from '@/common/components/icon';
import { radius } from '@/common/components/shared/radius';
import {
  controlHeight,
  controlText,
  type Size,
} from '@/common/components/shared/size';
import { Text } from '@/common/components/text';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  cn('flex-row items-center justify-center gap-2', radius.control),
  {
    variants: {
      variant: {
        default: 'bg-primary-background active:opacity-90',
        outline: 'border border-border bg-background active:bg-card-hover',
        ghost: 'bg-transparent active:bg-card-hover',
        brand: 'bg-brand-background active:opacity-90',
      },
      disabled: {
        true: 'opacity-50',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const buttonTextVariants = cva('', {
  variants: {
    variant: {
      default: 'text-primary-foreground',
      outline: 'text-foreground',
      ghost: 'text-foreground',
      brand: 'text-brand-foreground',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const iconTone = (
  variant: Props['variant']
): 'onPrimary' | 'onBrand' | 'foreground' => {
  if (variant === 'default') {
    return 'onPrimary';
  }
  if (variant === 'brand') {
    return 'onBrand';
  }
  return 'foreground';
};

interface Props
  extends Omit<PressableProps, 'children'>,
    VariantProps<typeof buttonVariants> {
  className?: string;
  label?: string;
  children?: ReactNode;
  size?: Size;
  icon?: LucideIcon;
}

const Button: FC<Props> = ({
  className,
  variant = 'default',
  disabled,
  label,
  children,
  size = 'md',
  icon,
  ...props
}) => {
  return (
    <Pressable
      className={cn(
        buttonVariants({ variant, disabled: Boolean(disabled) }),
        controlHeight({ size }),
        className
      )}
      disabled={disabled}
      {...props}
    >
      {icon && (
        <Icon
          icon={icon}
          size={size === 'sm' ? 14 : 16}
          tone={iconTone(variant)}
        />
      )}
      {label && (
        <Text
          className={cn(
            controlText({ size }),
            'font-semibold',
            buttonTextVariants({ variant })
          )}
        >
          {label}
        </Text>
      )}
      {!label && children}
    </Pressable>
  );
};

export type { Props as ButtonProps };
export { Button };
