import { type FC } from 'react'

import BRAND, { type BrandStatus } from '@/common/components/shared/brand'
import TextRoot, { type TextRootProps } from '@/common/components/text/root'
import { cn } from '@/lib/utils'

interface Props extends TextRootProps {
  status?: BrandStatus
}

/**
 * Subtitle — línea de apoyo bajo un título.
 *
 * Sin `status` usa tono muted; con `status` usa BRAND.colors.
 *
 * @param status.className
 * @param status - Variante semántica opcional
 * @param className - Clases NativeWind extra
 *
 * @param status.status
 * @example
 * import Text from '@/common/components/text';
 * <Text.Subtitle>Hoy · 10:24</Text.Subtitle>
 */
const Subtitle: FC<Props> = ({ className, status, ...props }) => {
  return (
    <TextRoot
      status={status}
      className={cn(
        BRAND.type.subtitle,
        !status && BRAND.type.muted,
        className,
      )}
      {...props}
    />
  )
}

export type { Props as SubtitleProps }
/**
 *
 */
export default Subtitle
