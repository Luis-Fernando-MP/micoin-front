import {
  Canvas,
  Path,
  Skia,
} from '@shopify/react-native-skia';
import { memo, type FC, useMemo } from 'react';
import { View } from 'react-native';

import AreaChart from '@/common/components/charts/extensions/area';
import BarChart from '@/common/components/charts/extensions/bars';
import DonutChart from '@/common/components/charts/extensions/donut';
import GaugeChart from '@/common/components/charts/extensions/gauge';
import HeatmapChart from '@/common/components/charts/extensions/heat';
import BRAND from '@/common/components/shared/brand';
import { useMcVar } from '@/theme/hooks/use-theme-var';

interface Props {
  data?: number[];
  width?: number;
  height?: number;
}

const DEFAULT = [12, 18, 14, 22, 19, 28, 24, 31, 27, 35];

/**
 * Charts — sparkline vectorial de una serie numérica.
 *
 * Las variantes viven en el mismo default: Charts.AreaChart, Charts.BarChart,
 * Charts.DonutChart, Charts.GaugeChart, Charts.HeatmapChart.
 *
 * @param data - Serie de valores. @default sparkline demo
 * @param width - Ancho del canvas. @default 280
 * @param height - Alto del canvas. @default 64
 *
 * @example
 * import Charts from '@/common/components/charts';
 * <Charts data={[12, 18, 22, 31]} />
 * <Charts.AreaChart data={[12, 22, 31]} />
 */
const ChartsRoot: FC<Props> = ({
  data = DEFAULT,
  width = 280,
  height = 64,
}) => {
  const brand = useMcVar(BRAND.native.brand);
  const path = useMemo(() => {
    const p = Skia.Path.Make();
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    data.forEach((value, index) => {
      const x = (index / Math.max(data.length - 1, 1)) * width;
      const y = height - ((value - min) / range) * (height - 8) - 4;
      if (index === 0) {
        p.moveTo(x, y);
        return;
      }
      p.lineTo(x, y);
    });
    return p;
  }, [data, height, width]);

  return (
    <View>
      <Canvas style={{ width, height }}>
        <Path
          path={path}
          color={brand}
          style="stroke"
          strokeWidth={3}
          strokeCap="round"
        />
      </Canvas>
    </View>
  );
};

const Charts = Object.assign(memo(ChartsRoot), {
  AreaChart,
  BarChart,
  DonutChart,
  GaugeChart,
  HeatmapChart,
});

export type { Props as ChartsProps };
export default Charts;
