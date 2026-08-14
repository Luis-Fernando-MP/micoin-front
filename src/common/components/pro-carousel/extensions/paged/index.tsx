import { type FC, memo, useCallback } from 'react'
import { Dimensions, View } from 'react-native'
import { Carousel } from 'react-native-reanimated-carousel'

import type { Slide } from '@components/pro-carousel/root'
import BRAND from '@components/shared/brand'
import Text from '@components/text'

import { cn } from '@/lib/utils'

interface Props {
  data?: Slide[]
  height?: number
}

const DEFAULT: Slide[] = [
  { title: 'Cobro QR', body: 'Recibe al instante.' },
  { title: 'Privacidad', body: 'Oculta tu saldo.' },
  { title: 'Ledger', body: 'Gastos offline.' },
]

const WIDTH = Dimensions.get('window').width - 64

/**
 * PagedCarousel — onboarding con snap por página.
 *
 * @param data - Slides
 * @param data.data
 * @param height - Alto. @default 160
 *
 * @param data.height
 * @example
 * import ProCarousel from '@components/pro-carousel';
 * <ProCarousel.PagedCarousel />
 */
const PagedCarousel: FC<Props> = ({ data = DEFAULT, height = 160 }) => {
  const renderItem = useCallback(
    ({ item }: { item: Slide }) => (
      <View
        className={cn(
          'mx-1 flex-1 justify-center border border-border bg-background px-4',
          BRAND.radius.variants.surface,
        )}
      >
        <Text.Title>{item.title}</Text.Title>
        <Text.Subtitle className="mt-1">{item.body}</Text.Subtitle>
      </View>
    ),
    [],
  )

  return (
    <Carousel
      style={{ width: WIDTH, height }}
      data={data}
      loop={false}
      snapMode="page"
      renderItem={renderItem}
    />
  )
}

export type { Props as PagedCarouselProps }
export default memo(PagedCarousel)
