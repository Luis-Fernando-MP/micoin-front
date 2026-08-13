import { type FC } from 'react'
import { View, type ViewProps } from 'react-native'

import BRAND, { type BrandStatus } from '@components/shared/brand'

import { cn } from '@/lib/utils'

interface Props extends ViewProps {
  className?: string
  status?: BrandStatus
}

/**
 * Card — superficie de contenido del design system.
 *
 * @param status.className
 * @param status - Variante semántica. @default 'default'
 * @param className - Clases NativeWind extra
 *
 * @param status.status
 * @example
 * import Card from '@components/card';
 * <Card status="brand">…</Card>
 */
const Card: FC<Props> = ({
  className,
  status = BRAND.colors.defaultVariant,
  ...props
}) => {
  const tone = BRAND.colors.variants[status]

  return (
    <View
      className={cn(
        'border p-4',
        BRAND.radius.variants.surface,
        tone.soft,
        status !== 'default' && tone.border,
        className,
      )}
      {...props}
    />
  )
}

export type { Props as CardProps }
/**
 *
 */
export default Card
