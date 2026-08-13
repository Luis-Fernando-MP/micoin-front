import { type FC, type ReactNode } from 'react'
import { Pressable, type PressableProps, View } from 'react-native'

import BRAND, { type BrandStatus } from '@components/shared/brand'
import Text from '@components/text'

import { cn } from '@/lib/utils'

type ChipVariant = 'solid' | 'soft' | 'outline'

interface Props {
  label?: string
  children?: ReactNode
  className?: string
  status?: BrandStatus
  variant?: ChipVariant
  selected?: boolean
  onPress?: PressableProps['onPress']
}

const resolveChipStyle = (
  variant: ChipVariant,
  status: BrandStatus,
  selected: boolean,
) => {
  const resolvedVariant = selected ? 'solid' : variant
  const resolvedStatus = selected ? 'primary' : status
  const tone = BRAND.colors.variants[resolvedStatus]
  const isOutline = resolvedVariant === 'outline'
  const isSolid = resolvedVariant === 'solid'

  return {
    shell: cn(
      'self-start px-2.5 py-1',
      BRAND.radius.variants.pill,
      isSolid && tone.background,
      !isSolid && !isOutline && tone.soft,
      isOutline && `border ${tone.border}`,
    ),
    text: cn(
      'text-xs font-medium',
      isSolid && tone.foreground,
      !isSolid && tone.text,
    ),
  }
}

/**
 * Chip — etiqueta compacta con variantes semánticas BRAND.
 *
 * No requiere onPress; opcional para filtros o toggles.
 *
 * @param label - Texto corto; alternativa a children
 * @param children - Contenido; string hereda tipografía del chip o ReactNode libre
 * @param variant - Relleno. @default 'soft'
 * @param status - Tono semántico. @default 'default'
 * @param selected - Resalta como primary solid. @default false
 * @param onPress - Handler opcional; sin él renderiza View estático
 * @param className - Clases NativeWind extra
 *
 * @example
 * import Chip from '@components/chip'
 * <Chip label="OK" status="success" />
 * <Chip variant="soft">Hoy</Chip>
 * <Chip label="Hoy" selected onPress={() => {}} />
 */
const Chip: FC<Props> = ({
  label,
  children,
  className,
  variant = 'soft',
  status = BRAND.colors.defaultVariant,
  selected = false,
  onPress,
}) => {
  const { shell, text } = resolveChipStyle(variant, status, selected)
  const rootClass = cn(shell, onPress && 'active:opacity-90', className)
  const body = (
    <>
      {label && <Text className={text}>{label}</Text>}
      {!label && typeof children === 'string' && (
        <Text className={text}>{children}</Text>
      )}
      {!label && typeof children !== 'string' && children}
    </>
  )

  if (onPress) {
    return (
      <Pressable onPress={onPress} className={rootClass}>
        {body}
      </Pressable>
    )
  }

  return <View className={rootClass}>{body}</View>
}

export type { Props as ChipProps, ChipVariant }
export default Chip
