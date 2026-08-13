import { cva, type VariantProps } from 'class-variance-authority';
import { type FC } from 'react';
import { TextInput, type TextInputProps, View } from 'react-native';

import BRAND, {
  type BrandSize,
  type BrandSizeMap,
  type BrandStatus,
} from '@/common/components/shared/brand';
import Text from '@/common/components/text';
import { cn } from '@/lib/utils';
import { useMcVar } from '@/theme/hooks/use-theme-var';

const inputShell = cva(
  cn(
    'w-full border px-4 text-base text-foreground',
    BRAND.radius.variants.control
  ),
  {
    variants: {
      variant: {
        default: `${BRAND.colors.variants.default.border} bg-background`,
        outline: `${BRAND.colors.variants.default.border} bg-transparent`,
        filled: 'border-transparent bg-card',
        ghost: `rounded-none border-0 border-b ${BRAND.colors.variants.default.border} bg-transparent px-0`,
      },
      size: {
        xs: 'h-8 py-0',
        sm: 'h-9 py-0',
        md: 'h-11 py-0',
        lg: 'h-12 py-0',
        xl: 'h-14 py-0',
      } satisfies BrandSizeMap<string>,
    },
    defaultVariants: {
      variant: 'default',
      size: BRAND.sizes.defaultVariant,
    },
  }
);

interface Props extends TextInputProps, VariantProps<typeof inputShell> {
  label?: string;
  className?: string;
  status?: BrandStatus;
  size?: BrandSize;
}

/**
 * Input — campo de texto con status y size BRAND.
 *
 * @param label - Etiqueta
 * @param status - Variante semántica. @default 'default'
 * @param size - Tamaño BRAND. @default 'md'
 *
 * @example
 * import Input from '@/common/components/input';
 * <Input label="Monto" status="brand" />
 */
const Input: FC<Props> = ({
  label,
  className,
  variant = 'default',
  status = BRAND.colors.defaultVariant,
  size = BRAND.sizes.defaultVariant,
  ...props
}) => {
  const placeholderColor = useMcVar(BRAND.native.textSecondary);
  const isGhost = variant === 'ghost';
  const tone = BRAND.colors.variants[status];

  return (
    <View className="gap-2">
      {label && (
        <Text.Label status={status === 'default' ? undefined : status}>
          {label}
        </Text.Label>
      )}
      <TextInput
        className={cn(
          inputShell({ variant, size: isGhost ? undefined : size }),
          isGhost && 'h-11',
          status !== 'default' && tone.border,
          className
        )}
        placeholderTextColor={placeholderColor}
        {...props}
      />
    </View>
  );
};

export type { Props as InputProps };
export default Input;
