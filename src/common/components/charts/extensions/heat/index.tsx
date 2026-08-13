import { Canvas, Rect } from '@shopify/react-native-skia';
import { memo, type FC, useMemo } from 'react';
import { View } from 'react-native';
import BRAND from '@/common/components/shared/brand';

import { useMcVar } from '@/theme/hooks/use-theme-var';

interface Props {
  cells?: number;
  columns?: number;
}

/**
 * HeatmapChart — grilla de actividad por opacidad.
 *
 * @param cells - Número de celdas. @default 28
 * @param columns - Columnas. @default 7
 *
 * @example
 * import Charts from '@/common/components/charts';
 * <Charts.HeatmapChart cells={28} />
 */
const HeatmapChart: FC<Props> = ({ cells = 28, columns = 7 }) => {
  const brand = useMcVar(BRAND.native.brand);
  const items = useMemo(
    () =>
      Array.from({ length: cells }, (_, index) => ({
        id: index,
        v: ((index * 37) % 100) / 100,
      })),
    [cells]
  );

  return (
    <View>
      <Canvas style={{ width: 280, height: 72 }}>
        {items.map((cell, index) => {
          const col = index % columns;
          const row = Math.floor(index / columns);
          const opacity = 0.15 + cell.v * 0.85;
          return (
            <Rect
              key={cell.id}
              x={col * 38 + 4}
              y={row * 16 + 4}
              width={32}
              height={12}
              color={brand}
              opacity={opacity}
            />
          );
        })}
      </Canvas>
    </View>
  );
};

export type { Props as HeatmapChartProps };
export default memo(HeatmapChart);
