import { type FC } from 'react'
import { type DimensionValue, View } from 'react-native'

import { Image as ExpoImage, type ImageProps } from 'expo-image'

import BRAND, { type BrandStatus } from '@components/shared/brand'

import { cn } from '@/lib/utils'

const IMAGE_ASPECTS = {
  variants: {
    '1/1': 1,
    '4/3': 4 / 3,
    '3/4': 3 / 4,
    '16/9': 16 / 9,
    '9/16': 9 / 16,
    '21/9': 21 / 9,
  },
  defaultVariant: '16/9' as const,
} as const

type ImageAspect = keyof typeof IMAGE_ASPECTS.variants
type ImageAspectRatio = ImageAspect | number

const resolveAspectRatio = (value?: ImageAspectRatio): number => {
  if (value === undefined) {
    return IMAGE_ASPECTS.variants[IMAGE_ASPECTS.defaultVariant]
  }

  if (typeof value === 'number') {
    return value
  }

  return (
    IMAGE_ASPECTS.variants[value] ??
    IMAGE_ASPECTS.variants[IMAGE_ASPECTS.defaultVariant]
  )
}

interface Props extends Omit<ImageProps, 'style'> {
  className?: string
  status?: BrandStatus
  frameClassName?: string
  width?: DimensionValue
  height?: DimensionValue
  aspectRatio?: ImageAspectRatio
}

/**
 * Image — frame expo-image con ratio, radius surface y borde BRAND.
 *
 * @param aspectRatio - Clave de IMAGE_ASPECTS, número libre u omitido. @default '16/9'
 * @param status - Borde semántico del frame. @default 'default'
 * @param width - Ancho del frame. @default '100%'
 * @param height - Alto fijo; anula aspectRatio
 * @param frameClassName - Clases del contenedor
 * @param className - Clases de la imagen
 *
 * @example
 * import Image from '@components/image'
 * <Image source={{ uri: photo }} aspectRatio="16/9" />
 * <Image source={{ uri: thumb }} aspectRatio={1.2} />
 * <Image source={{ uri: banner }} />
 */
const Image: FC<Props> = ({
  className,
  frameClassName,
  status = BRAND.colors.defaultVariant,
  width = '100%',
  height,
  aspectRatio,
  contentFit = 'cover',
  ...props
}) => {
  const resolvedRatio = height ? undefined : resolveAspectRatio(aspectRatio)

  return (
    <View
      className={cn(
        'overflow-hidden border border-border bg-card',
        BRAND.radius.variants.surface,
        status !== 'default' && BRAND.colors.variants[status].border,
        frameClassName,
      )}
      style={{ width, height, aspectRatio: resolvedRatio }}
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

export type { ImageAspect, ImageAspectRatio, Props as ImageProps }
export { IMAGE_ASPECTS }
export default Image
