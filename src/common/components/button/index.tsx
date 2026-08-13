import { type FC, type ReactNode } from 'react'
import { Pressable, type PressableProps } from 'react-native'

import { cva, type VariantProps } from 'class-variance-authority'
import { type LucideIcon } from 'lucide-react-native'

import Icon from '@components/icon'
import BRAND, { type BrandSize } from '@components/shared/brand'
import Text from '@components/text'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  cn(
    'flex-row items-center justify-center gap-2',
    BRAND.radius.variants.control,
  ),
  {
    variants: {
      variant: {
        default: `${BRAND.colors.variants.primary.background} active:opacity-90`,
        outline: `border ${BRAND.colors.variants.default.border} bg-background active:bg-card-hover`,
        ghost: 'bg-transparent active:bg-card-hover',
        brand: `${BRAND.colors.variants.brand.background} active:opacity-90`,
      },
      disabled: {
        true: 'opacity-50',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

const buttonTextVariants = cva('', {
  variants: {
    variant: {
      default: BRAND.colors.variants.primary.foreground,
      outline: BRAND.colors.variants.default.text,
      ghost: BRAND.colors.variants.default.text,
      brand: BRAND.colors.variants.brand.foreground,
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

const iconTone = (
  variant: Props['variant'],
): 'onPrimary' | 'onBrand' | 'foreground' => {
  if (variant === 'default') {
    return 'onPrimary'
  }
  if (variant === 'brand') {
    return 'onBrand'
  }
  return 'foreground'
}

interface Props
  extends
    Omit<PressableProps, 'children'>,
    VariantProps<typeof buttonVariants> {
  className?: string
  label?: string
  children?: ReactNode
  size?: BrandSize
  icon?: LucideIcon
}

/**
 * Button — control de acción con variantes y tamaños BRAND.
 *
 * @param label.className
 * @param label.variant
 * @param label.disabled
 * @param label - Texto del botón
 * @param variant - Estilo visual. @default 'default'
 * @param label.label
 * @param label.children
 * @param size - Tamaño BRAND. @default 'md'
 * @param label.size
 * @param icon - Icono Lucide opcional
 * @param disabled - Deshabilitado
 * @param className - Clases NativeWind extra
 *
 * @param label.icon
 * @example
 * import Button from '@components/button';
 * <Button label="Pagar" variant="brand" size="sm" />
 */
const Button: FC<Props> = ({
  className,
  variant = 'default',
  disabled,
  label,
  children,
  size = BRAND.sizes.defaultVariant,
  icon,
  ...props
}) => {
  const sizing = BRAND.sizes.variants[size]

  return (
    <Pressable
      className={cn(
        buttonVariants({ variant, disabled: Boolean(disabled) }),
        sizing.height,
        className,
      )}
      disabled={disabled}
      {...props}
    >
      {icon && <Icon icon={icon} size={sizing.icon} tone={iconTone(variant)} />}
      {label && (
        <Text
          className={cn(
            sizing.text,
            'font-semibold',
            buttonTextVariants({ variant }),
          )}
        >
          {label}
        </Text>
      )}
      {!label && children}
    </Pressable>
  )
}

export type { Props as ButtonProps }
/**
 *
 */
export default Button
