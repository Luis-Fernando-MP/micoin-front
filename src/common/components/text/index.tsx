import { type FC } from 'react'

import BRAND, { type BrandStatus } from '@/common/components/shared/brand'
import Caption from '@/common/components/text/extensions/caption'
import Highlight from '@/common/components/text/extensions/highlight'
import Label from '@/common/components/text/extensions/label'
import Paragraph from '@/common/components/text/extensions/paragraph'
import Subtitle from '@/common/components/text/extensions/subtitle'
import Title from '@/common/components/text/extensions/title'
import TextRoot, { type TextRootProps } from '@/common/components/text/root'
import { cn } from '@/lib/utils'

interface Props extends TextRootProps {
  status?: BrandStatus
}

/**
 * Text — body del design system con status BRAND.
 *
 * Extensiones: `Text.Title`, `Text.Subtitle`, `Text.Paragraph`,
 * `Text.Caption`, `Text.Label`, `Text.Highlight`.
 *
 * @param status.className
 * @param status - Variante semántica. @default 'default'
 * @param className - Clases NativeWind extra
 *
 * @param status.status
 * @example
 * import Text from '@/common/components/text';
 * <Text status="brand">Saldo</Text>
 * <Text.Title>Movimientos</Text.Title>
 * <Text.Subtitle>Hoy · 10:24</Text.Subtitle>
 */
const TextBody: FC<Props> = ({
  className,
  status = BRAND.colors.defaultVariant,
  ...props
}) => {
  return (
    <TextRoot
      status={status}
      className={cn(BRAND.type.body, className)}
      {...props}
    />
  )
}

const Text = Object.assign(TextBody, {
  Title,
  Subtitle,
  Paragraph,
  Caption,
  Label,
  Highlight,
})

export type { Props as TextProps }
/**
 *
 */
export default Text
