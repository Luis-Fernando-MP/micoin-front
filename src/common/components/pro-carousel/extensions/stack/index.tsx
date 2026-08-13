import { type FC, memo } from 'react'

import Root, {
  type ProCarouselProps,
} from '@/common/components/pro-carousel/root'

/**
 * StackCarousel — tarjetas apiladas horizontales.
 *
 * @param data - Slides
 * @param height - Alto. @default 160
 *
 * @param props
 * @example
 * import ProCarousel from '@/common/components/pro-carousel';
 * <ProCarousel.StackCarousel />
 */
const StackCarousel: FC<Omit<ProCarouselProps, 'mode'>> = (props) => (
  <Root {...props} mode="horizontal-stack" />
)

/**
 *
 */
export default memo(StackCarousel)
