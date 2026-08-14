import { type FC } from 'react'

import BRAND, { type BrandStatus } from '@components/shared/brand'
import TextRoot, { type TextRootProps } from '@components/text/root'

import { cn } from '@/lib/utils'

interface Props extends TextRootProps {
  status?: BrandStatus
}

/**
 * Highlight — énfasis tipográfico (no es una caja).
 *
 * @param status.className
 * @param status - Variante semántica. @default 'default'
 * @param className - Clases NativeWind extra
 *
 * @param status.status
 * @example
 * import Text from '@components/text';
 * <Text.Highlight status="brand">$12.50</Text.Highlight>
 */
const Highlight: FC<Props> = ({
  className,
  status = BRAND.colors.defaultVariant,
  ...props
}) => {
  return (
    <TextRoot
      status={status}
      className={cn(BRAND.type.highlight, className)}
      {...props}
    />
  )
}

export type { Props as HighlightProps }
export default Highlight
