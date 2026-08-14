import { type FC } from 'react'

import BRAND, { type BrandStatus } from '@components/shared/brand'
import TextRoot, { type TextRootProps } from '@components/text/root'

import { cn } from '@/lib/utils'

interface Props extends TextRootProps {
  status?: BrandStatus
}

/**
 * Caption — meta, hints y texto de apoyo pequeño.
 *
 * Sin `status` usa tono muted; con `status` usa BRAND.colors.
 *
 * @param status.className
 * @param status - Variante semántica opcional
 * @param className - Clases NativeWind extra
 *
 * @param status.status
 * @example
 * import Text from '@components/text';
 * <Text.Caption>Mock de bandeja (Expo Go)</Text.Caption>
 */
const Caption: FC<Props> = ({ className, status, ...props }) => {
  return (
    <TextRoot
      status={status}
      className={cn(BRAND.type.caption, !status && BRAND.type.muted, className)}
      {...props}
    />
  )
}

export type { Props as CaptionProps }
export default Caption
