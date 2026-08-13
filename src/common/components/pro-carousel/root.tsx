import { type FC, memo, useCallback } from 'react';
import { Dimensions, View } from 'react-native';
import { Carousel } from 'react-native-reanimated-carousel';

import BRAND from '@/common/components/shared/brand';
import Text from '@/common/components/text';
import { cn } from '@/lib/utils';

type Slide = { title: string; body: string };
type LayoutMode = 'parallax' | 'horizontal-stack' | 'vertical-stack';

interface Props {
  data?: Slide[];
  height?: number;
  mode?: LayoutMode;
}

const DEFAULT: Slide[] = [
  { title: 'Cobro QR', body: 'Recibe al instante.' },
  { title: 'Privacidad', body: 'Oculta tu saldo.' },
  { title: 'Ledger', body: 'Gastos offline.' },
];

const WIDTH = Dimensions.get('window').width - 64;

const ProCarouselRoot: FC<Props> = ({
  data = DEFAULT,
  height = 160,
  mode = 'parallax',
}) => {
  const renderItem = useCallback(
    ({ item }: { item: Slide }) => (
      <View
        className={cn(
          'mx-1 flex-1 justify-center border border-border bg-background px-4',
          BRAND.radius.variants.surface
        )}
      >
        <Text className="text-base font-semibold">{item.title}</Text>
        <Text className="text-sm text-secondary">{item.body}</Text>
      </View>
    ),
    []
  );

  return (
    <Carousel
      style={{ width: WIDTH, height }}
      data={data}
      loop
      layout={
        mode === 'parallax'
          ? { type: 'parallax', scale: 0.9, offset: 50 }
          : { type: mode }
      }
      renderItem={renderItem}
    />
  );
};

export type { LayoutMode, Props as ProCarouselProps, Slide };
export default memo(ProCarouselRoot);
