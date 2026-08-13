import { type FC } from 'react'

import BRAND, { type BrandStatus } from '@/common/components/shared/brand'
import TextRoot, { type TextRootProps } from '@/common/components/text/root'
import { cn } from '@/lib/utils'

interface Props extends TextRootProps {
  status?: BrandStatus
}

/**
 * Paragraph — bloque de lectura con leading relajado.
 *
 * @param status.className
 * @param status - Variante semántica. @default 'default'
 * @param className - Clases NativeWind extra
 *
 * @param status.status
 * @example
 * import Text from '@/common/components/text';
 * <Text.Paragraph>El cobro se acreditó en tu saldo.</Text.Paragraph>
 */
const Paragraph: FC<Props> = ({
  className,
  status = BRAND.colors.defaultVariant,
  ...props
}) => {
  return (
    <TextRoot
      status={status}
      className={cn(BRAND.type.paragraph, className)}
      {...props}
    />
  )
}

export type { Props as ParagraphProps }
/**
 *
 */
export default Paragraph
