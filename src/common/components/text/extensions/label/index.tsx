import { type FC } from 'react'

import BRAND, { type BrandStatus } from '@components/shared/brand'
import TextRoot, { type TextRootProps } from '@components/text/root'

import { cn } from '@/lib/utils'

interface Props extends TextRootProps {
  status?: BrandStatus
}

/**
 * Label — eyebrow o etiqueta de campo / sección.
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
 * <Text.Label>Monto</Text.Label>
 */
const Label: FC<Props> = ({ className, status, ...props }) => {
  return (
    <TextRoot
      status={status}
      className={cn(BRAND.type.label, !status && BRAND.type.muted, className)}
      {...props}
    />
  )
}

export type { Props as LabelProps }
/**
 *
 */
export default Label
