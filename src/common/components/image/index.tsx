import { type FC } from 'react'
import { type DimensionValue, View } from 'react-native'

import { Image as ExpoImage, type ImageProps } from 'expo-image'

import BRAND, { type BrandStatus } from '@components/shared/brand'

import { cn } from '@/lib/utils'

interface Props extends Omit<ImageProps, 'style'> {
  className?: string
  status?: BrandStatus
  frameClassName?: string
  width?: DimensionValue
  height?: DimensionValue
  aspectRatio?: number
}

const Image: FC<Props> = ({
  className,
  frameClassName,
  status = BRAND.colors.defaultVariant,
  width = '100%',
  height,
  aspectRatio = 16 / 9,
  contentFit = 'cover',
  ...props
}) => {
  return (
    <View
      className={cn(
        'overflow-hidden border border-border bg-card',
        BRAND.radius.variants.surface,
        status !== 'default' && BRAND.colors.variants[status].border,
        frameClassName,
      )}
      style={{ width, height, aspectRatio: height ? undefined : aspectRatio }}
    >
      <ExpoImage
        className={cn('h-full w-full', className)}
        style={{ width: '100%', height: '100%' }}
        contentFit={contentFit}
        transition={200}
        {...props}
      />
    </View>
  )
}

export type { Props as ImageProps }
/**
 *
 */
export default Image
