import { type FC } from 'react'

import BRAND, {
  type BrandSize,
  type BrandStatus,
} from '@components/shared/brand'
import TextRoot, { type TextRootProps } from '@components/text/root'

import { cn } from '@/lib/utils'

interface Props extends TextRootProps {
  size?: BrandSize
  status?: BrandStatus
}

/**
 * Title — encabezado UI del design system.
 *
 * @param size.className
 * @param size - Escala BRAND.type.title. @default 'md'
 * @param size.size
 * @param status - Variante semántica. @default 'default'
 * @param className - Clases NativeWind extra
 *
 * @param size.status
 * @example
 * import Text from '@components/text';
 * <Text.Title size="md">Movimientos</Text.Title>
 */
const Title: FC<Props> = ({
  className,
  size = BRAND.type.defaultTitleSize,
  status = BRAND.colors.defaultVariant,
  ...props
}) => {
  return (
    <TextRoot
      status={status}
      className={cn(BRAND.type.title[size], className)}
      {...props}
    />
  )
}

export type { Props as TitleProps }
export default Title
