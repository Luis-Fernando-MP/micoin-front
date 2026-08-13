import { type FC } from 'react'
import { View } from 'react-native'

import Charts from '@components/charts'
import Text from '@components/text'

/**
 * SkiaGallery — monta Charts + extensions para el lab.
 *
 * @example
 * import SkiaGallery from '@views/home/wow-skia';
 * <SkiaGallery />
 */
const SkiaGallery: FC = () => {
  return (
    <View className="gap-5">
      <View>
        <Text.Label className="mb-1">Sparkline</Text.Label>
        <Charts />
      </View>
      <View>
        <Text.Label className="mb-1">Barras</Text.Label>
        <Charts.BarChart />
      </View>
      <View>
        <Text.Label className="mb-1">Donut</Text.Label>
        <Charts.DonutChart />
      </View>
      <View>
        <Text.Label className="mb-1">Área</Text.Label>
        <Charts.AreaChart />
      </View>
      <View>
        <Text.Label className="mb-1">Gauge</Text.Label>
        <Charts.GaugeChart />
      </View>
      <View>
        <Text.Label className="mb-1">Heatmap</Text.Label>
        <Charts.HeatmapChart />
      </View>
    </View>
  )
}

export default SkiaGallery
