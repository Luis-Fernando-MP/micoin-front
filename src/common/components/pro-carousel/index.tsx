import { type FC } from 'react';

import PagedCarousel from '@/common/components/pro-carousel/extensions/paged';
import StackCarousel from '@/common/components/pro-carousel/extensions/stack';
import Root, {
  type LayoutMode,
  type ProCarouselProps,
  type Slide,
} from '@/common/components/pro-carousel/root';

/**
 * ProCarousel — carrusel Reanimated con layout parallax o stack.
 *
 * Extensiones: `ProCarousel.StackCarousel`, `ProCarousel.PagedCarousel`.
 *
 * @param data - Slides { title, body }
 * @param height - Alto. @default 160
 * @param mode - Layout. @default 'parallax'
 *
 * @example
 * import ProCarousel from '@/common/components/pro-carousel';
 * <ProCarousel data={slides} />
 * <ProCarousel.StackCarousel />
 * <ProCarousel.PagedCarousel />
 */
const ProCarousel = Object.assign(Root, {
  StackCarousel,
  PagedCarousel,
}) as typeof Root & {
  StackCarousel: FC;
  PagedCarousel: FC;
};

export type { LayoutMode, ProCarouselProps, Slide };
export default ProCarousel;
