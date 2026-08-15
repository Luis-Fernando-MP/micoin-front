import { type FC } from 'react'
import { TextInput, type TextInputProps, View } from 'react-native'

import BRAND, {
  type BrandSize,
  type BrandSizeMap,
  type BrandStatus,
} from '@components/shared/brand'
import Text from '@components/text'
import { useMcVar } from '@theme'

import { cn } from '@/lib/utils'

type InputVariant = 'default' | 'outline' | 'filled' | 'ghost'

const INPUT_SIZES = {
  xs: cn(BRAND.sizes.variants.xs.height, BRAND.sizes.variants.xs.text, 'py-0'),
  sm: cn(BRAND.sizes.variants.sm.height, BRAND.sizes.variants.sm.text, 'py-0'),
  md: cn(BRAND.sizes.variants.md.height, BRAND.sizes.variants.md.text, 'py-0'),
  lg: cn(BRAND.sizes.variants.lg.height, BRAND.sizes.variants.lg.text, 'py-0'),
  xl: cn(BRAND.sizes.variants.xl.height, BRAND.sizes.variants.xl.text, 'py-0'),
} satisfies BrandSizeMap<string>

const resolveInputClasses = (
  variant: InputVariant,
  status: BrandStatus,
  size: BrandSize,
) => {
  const tone = BRAND.colors.variants[status]
  const defaultTone = BRAND.colors.variants.default
  const semantic = status !== 'default'

  if (variant === 'ghost') {
    return cn(
      'w-full rounded-none border-0 border-b bg-transparent px-0 py-0 text-foreground',
      BRAND.sizes.variants.md.text,
      'h-10',
      semantic ? tone.border : defaultTone.border,
    )
  }

  if (variant === 'filled') {
    return cn(
      'w-full border-0 py-0 text-foreground',
      BRAND.radius.variants.control,
      INPUT_SIZES[size],
      semantic ? tone.soft : 'bg-card',
    )
  }

  if (variant === 'outline') {
    return cn(
      'w-full border bg-transparent py-0 text-foreground',
      BRAND.radius.variants.control,
      INPUT_SIZES[size],
      semantic ? tone.border : defaultTone.border,
    )
  }

  return cn(
    'w-full border bg-background py-0 text-foreground',
    BRAND.radius.variants.control,
    INPUT_SIZES[size],
    semantic ? tone.border : defaultTone.border,
  )
}

interface Props extends TextInputProps {
  label?: string
  className?: string
  variant?: InputVariant
  status?: BrandStatus
  size?: BrandSize
}

/**
 * Input — campo de texto con variant, status y size BRAND.
 *
 * @param label - Etiqueta opcional
 * @param variant - Estilo visual. @default 'default'
 * @param status - Tono semántico BRAND. @default 'default'
 * @param size - Escala BRAND. @default 'md'
 * @param className - Clases NativeWind extra
 *
 * @example
 * import Input from '@components/input'
 * <Input label="Monto" variant="filled" status="success" size="sm" />
 */
const Input: FC<Props> = ({
  label,
  className,
  variant = 'default',
  status = BRAND.colors.defaultVariant,
  size = BRAND.sizes.defaultVariant,
  ...props
}) => {
  const placeholderColor = useMcVar(BRAND.native.textSecondary)

  return (
    <View className="gap-2">
      {label && (
        <Text.Label status={status === 'default' ? undefined : status}>
          {label}
        </Text.Label>
      )}
      <TextInput
        className={cn(resolveInputClasses(variant, status, size), className)}
        placeholderTextColor={placeholderColor}
        {...props}
      />
    </View>
  )
}

export type { Props as InputProps, InputVariant }
export default Input
