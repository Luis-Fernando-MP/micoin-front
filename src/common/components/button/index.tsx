import { type FC, type ReactNode } from 'react'
import { Pressable, type PressableProps } from 'react-native'

import { cva, type VariantProps } from 'class-variance-authority'
import { type LucideIcon } from 'lucide-react-native'

import Icon from '@components/icon'
import BRAND, {
  type BrandSize,
  type BrandStatus,
  type NativeToken,
} from '@components/shared/brand'
import Text from '@components/text'
import { useMcVar } from '@theme'

import { cn } from '@/lib/utils'

type ButtonVariant = 'default' | 'outline' | 'ghost' | 'brand'

type ButtonSize = BrandSize | 'icon'

const BUTTON_SIZES = {
  ...BRAND.sizes.variants,
  icon: {
    height: 'h-9 w-9 p-0',
    text: 'text-xs',
    icon: 16,
    chip: 'px-2 py-0.5',
  },
} as const

const buttonVariants = cva('', {
  variants: {
    disabled: {
      true: 'opacity-50',
    },
  },
})

const isSolidVariant = (variant: ButtonVariant) =>
  variant === 'default' || variant === 'brand'

const resolveStatus = (
  variant: ButtonVariant,
  status: BrandStatus,
): BrandStatus => {
  if (variant === 'brand') {
    return 'brand'
  }

  return status
}

const iconNativeToken = (
  status: BrandStatus,
  variant: ButtonVariant,
): NativeToken => {
  if (!isSolidVariant(variant)) {
    return BRAND.colors.variants[status].native
  }

  if (status === 'primary') {
    return 'primaryForeground'
  }

  if (status === 'active') {
    return 'primaryForeground'
  }

  if (status === 'brand') {
    return 'brandForeground'
  }

  return BRAND.colors.variants[status].nativeBg
}

interface Props
  extends
    Omit<PressableProps, 'children'>,
    VariantProps<typeof buttonVariants> {
  className?: string
  label?: string
  children?: ReactNode
  size?: ButtonSize
  icon?: LucideIcon
  variant?: ButtonVariant
  status?: BrandStatus
  center?: boolean
  active?: boolean
}

/**
 * Button — control de acción con variantes, status semántico y tamaños BRAND.
 *
 * @param label - Texto del botón
 * @param variant - Estilo visual. @default 'default'
 * @param status - Tono semántico BRAND. @default 'primary'
 * @param size - Escala BRAND o `icon` cuadrado. @default 'md'
 * @param icon - Icono Lucide opcional
 * @param center - Centra el contenido. @default true
 * @param active - Estilo active solid; pisa variant y status. @default false
 * @param disabled - Deshabilitado
 * @param className - Clases NativeWind extra
 *
 * @example
 * import Button from '@components/button'
 * <Button label="Pagar" variant="brand" size="sm" />
 * <Button icon={Camera} size="icon" variant="outline" />
 * <Button label="Hoy" active />
 */
const Button: FC<Props> = ({
  className,
  variant = 'default',
  status = 'primary',
  center = true,
  active = false,
  disabled,
  label,
  children,
  size = BRAND.sizes.defaultVariant,
  icon,
  ...props
}) => {
  const effectiveVariant = active ? 'default' : variant
  const effectiveStatus = active ? 'active' : resolveStatus(variant, status)
  const tone = BRAND.colors.variants[effectiveStatus]
  const sizing = BUTTON_SIZES[size]
  const solid = isSolidVariant(effectiveVariant)
  const iconToken = iconNativeToken(effectiveStatus, effectiveVariant)
  const iconColor = useMcVar(iconToken)

  let surface = ''
  if (solid) {
    surface = cn(tone.background, 'active:opacity-90')
  }
  if (effectiveVariant === 'outline') {
    surface = cn('border bg-background active:bg-card-hover', tone.border)
  }
  if (effectiveVariant === 'ghost') {
    surface = 'bg-transparent active:bg-card-hover'
  }

  const textClass = solid ? tone.foreground : tone.text
  const align = center
    ? 'items-center justify-center'
    : 'items-center justify-start'

  return (
    <Pressable
      className={cn(
        'flex-row gap-2 transition-colors duration-200 ease-out',
        align,
        BRAND.radius.variants.control,
        surface,
        sizing.height,
        buttonVariants({ disabled: Boolean(disabled) }),
        className,
      )}
      disabled={disabled}
      {...props}
    >
      {icon && <Icon icon={icon} size={sizing.icon} color={iconColor} />}
      {label && (
        <Text className={cn(sizing.text, 'font-semibold', textClass)}>
          {label}
        </Text>
      )}
      {!label && children}
    </Pressable>
  )
}

export type { Props as ButtonProps, ButtonSize, ButtonVariant }
export default Button
