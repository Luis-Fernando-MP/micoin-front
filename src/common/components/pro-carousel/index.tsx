import { type FC } from 'react';
import { Dimensions, View } from 'react-native';
import { Carousel } from 'react-native-reanimated-carousel';

import { radius } from '@/common/components/shared/radius';
import { Text } from '@/common/components/text';
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

const ProCarousel: FC<Props> = ({
  data = DEFAULT,
  height = 160,
  mode = 'parallax',
}) => {
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
      renderItem={({ item }) => (
        <View
          className={cn(
            'mx-1 flex-1 justify-center border border-border bg-background px-4',
            radius.surface
          )}
        >
          <Text className="text-base font-semibold">{item.title}</Text>
          <Text className="text-sm text-secondary">{item.body}</Text>
        </View>
      )}
    />
  );
};

const StackCarousel: FC<Omit<Props, 'mode'>> = (props) => (
  <ProCarousel {...props} mode="horizontal-stack" />
);

const PagedCarousel: FC<Omit<Props, 'mode'>> = ({
  data = DEFAULT,
  height = 160,
}) => {
  return (
    <Carousel
      style={{ width: WIDTH, height }}
      data={data}
      loop={false}
      snapMode="page"
      renderItem={({ item }) => (
        <View
          className={cn(
            'mx-1 flex-1 justify-center border border-border bg-background px-4',
            radius.surface
          )}
        >
          <Text className="text-lg font-semibold">{item.title}</Text>
          <Text className="mt-1 text-sm text-secondary">{item.body}</Text>
        </View>
      )}
    />
  );
};

export { PagedCarousel, ProCarousel, StackCarousel };
