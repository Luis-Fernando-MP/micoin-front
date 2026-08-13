import { type FC } from 'react'
import { View } from 'react-native'

import BRAND, { type BrandStatus } from '@/common/components/shared/brand'
import Text from '@/common/components/text'
import { cn } from '@/lib/utils'

interface Props {
  label: string
  className?: string
  status?: BrandStatus
  variant?: 'solid' | 'soft' | 'outline'
}

/**
 * Badge — etiqueta de estado semántico.
 *
 * @param label - Texto
 * @param label.label
 * @param label.className
 * @param label.variant
 * @param status - Variante semántica. @default 'default'
 * @param variant - Relleno. @default 'soft'
 *
 * @param label.status
 * @example
 * import Badge from '@/common/components/badge';
 * <Badge label="OK" status="success" />
 */
const Badge: FC<Props> = ({
  label,
  className,
  variant = 'soft',
  status = BRAND.colors.defaultVariant,
}) => {
  const tone = BRAND.colors.variants[status]
  const isOutline = variant === 'outline'
  const isSolid = variant === 'solid'

  return (
    <View
      className={cn(
        'self-start px-2.5 py-1',
        BRAND.radius.variants.pill,
        isSolid && tone.background,
        !isSolid && !isOutline && tone.soft,
        isOutline && `border ${tone.border}`,
        className,
      )}
    >
      <Text
        className={cn(
          'text-xs font-medium',
          isSolid && tone.foreground,
          !isSolid && tone.text,
        )}
      >
        {label}
      </Text>
    </View>
  )
}

export type { Props as BadgeProps }
/**
 *
 */
export default Badge
