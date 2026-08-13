import { type FC, memo, useMemo, useState } from 'react'
import { View } from 'react-native'

import {
  Canvas,
  Circle,
  Line,
  Path,
  Skia,
  vec,
} from '@shopify/react-native-skia'

import Button from '@/common/components/button'
import BRAND from '@/common/components/shared/brand'
import Text from '@/common/components/text'
import { useMcVar } from '@/theme/hooks/use-theme-var'

interface Props {
  value?: number
  min?: number
  max?: number
}

/**
 * GaugeChart — semicírculo de score con aguja.
 *
 * @param value - Valor inicial. @default 780
 * @param value.value
 * @param min - Mínimo. @default 300
 * @param value.min
 * @param max - Máximo. @default 850
 *
 * @param value.max
 * @example
 * import Charts from '@/common/components/charts';
 * <Charts.GaugeChart value={720} />
 */
const GaugeChart: FC<Props> = ({ value = 780, min = 300, max = 850 }) => {
  const brand = useMcVar(BRAND.native.brand)
  const muted = useMcVar(BRAND.native.border)
  const [score, setScore] = useState(value)
  const angle = ((score - min) / (max - min)) * Math.PI
  const cx = 90
  const cy = 90
  const r = 70
  const needleX = cx + Math.cos(Math.PI - angle) * (r - 12)
  const needleY = cy - Math.sin(Math.PI - angle) * (r - 12)
  const track = useMemo(() => {
    const p = Skia.Path.Make()
    p.addArc({ x: cx - r, y: cy - r, width: r * 2, height: r * 2 }, 180, 180)
    return p
  }, [])
  const fill = useMemo(() => {
    const p = Skia.Path.Make()
    p.addArc(
      { x: cx - r, y: cy - r, width: r * 2, height: r * 2 },
      180,
      ((score - min) / (max - min)) * 180,
    )
    return p
  }, [max, min, score])

  return (
    <View className="flex-row items-center gap-3">
      <Canvas style={{ width: 180, height: 110 }}>
        <Path path={track} color={muted} style="stroke" strokeWidth={12} />
        <Path
          path={fill}
          color={brand}
          style="stroke"
          strokeWidth={12}
          strokeCap="round"
        />
        <Line
          p1={vec(cx, cy)}
          p2={vec(needleX, needleY)}
          color={brand}
          strokeWidth={3}
        />
        <Circle cx={cx} cy={cy} r={5} color={brand} />
      </Canvas>
      <View className="gap-2">
        <Text className="text-2xl font-bold">{score}</Text>
        <Button
          size="sm"
          variant="outline"
          label="Simular score"
          onPress={() =>
            setScore(min + Math.floor(Math.random() * (max - min)))
          }
        />
      </View>
    </View>
  )
}

export type { Props as GaugeChartProps }
/**
 *
 */
export default memo(GaugeChart)
