import { type FC } from 'react'
import { Text as RNText, type TextProps as RNTextProps } from 'react-native'

import BRAND, { type BrandStatus } from '@components/shared/brand'

import { cn } from '@/lib/utils'

interface Props extends RNTextProps {
  className?: string
  status?: BrandStatus
}

const TextRoot: FC<Props> = ({ className, status, ...props }) => {
  return (
    <RNText
      className={cn(status && BRAND.colors.variants[status].text, className)}
      {...props}
    />
  )
}

export type { Props as TextRootProps }
export default TextRoot
