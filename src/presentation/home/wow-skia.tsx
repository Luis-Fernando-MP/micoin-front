import { type FC } from 'react';
import { View } from 'react-native';

import Charts from '@/common/components/charts';
import Text from '@/common/components/text';

/**
 * SkiaGallery — monta Charts + extensions para el lab.
 *
 * @example
 * import SkiaGallery from '@/presentation/home/wow-skia';
 * <SkiaGallery />
 */
const SkiaGallery: FC = () => {
  return (
    <View className="gap-5">
      <View>
        <Text className="mb-1 text-xs font-medium text-secondary">
          Sparkline
        </Text>
        <Charts />
      </View>
      <View>
        <Text className="mb-1 text-xs font-medium text-secondary">Barras</Text>
        <Charts.BarChart />
      </View>
      <View>
        <Text className="mb-1 text-xs font-medium text-secondary">Donut</Text>
        <Charts.DonutChart />
      </View>
      <View>
        <Text className="mb-1 text-xs font-medium text-secondary">Área</Text>
        <Charts.AreaChart />
      </View>
      <View>
        <Text className="mb-1 text-xs font-medium text-secondary">Gauge</Text>
        <Charts.GaugeChart />
      </View>
      <View>
        <Text className="mb-1 text-xs font-medium text-secondary">Heatmap</Text>
        <Charts.HeatmapChart />
      </View>
    </View>
  );
};

export default SkiaGallery;
