import { type FC, memo, useMemo, useState } from 'react'
import { View } from 'react-native'

import { Canvas, Path, Skia } from '@shopify/react-native-skia'

import Button from '@components/button'
import BRAND from '@components/shared/brand'
import Text from '@components/text'
import { useMcVar } from '@theme'

interface Props {
  value?: number
  interactive?: boolean
}

/**
 * DonutChart — anillo de progreso 0–1.
 *
 * @param value - Progreso inicial 0–1. @default 0.72
 * @param value.value
 * @param interactive - Muestra controles ±. @default true
 *
 * @param value.interactive
 * @example
 * import Charts from '@components/charts';
 * <Charts.DonutChart value={0.5} />
 */
const DonutChart: FC<Props> = ({ value = 0.72, interactive = true }) => {
  const brand = useMcVar(BRAND.native.brand)
  const muted = useMcVar(BRAND.native.border)
  const [pct, setPct] = useState(value)
  const path = useMemo(() => {
    const p = Skia.Path.Make()
    p.addCircle(70, 70, 48)
    return p
  }, [])

  return (
    <View className="gap-2">
      <View className="flex-row items-center gap-3">
        <Canvas style={{ width: 140, height: 140 }}>
          <Path
            path={path}
            color={muted}
            style="stroke"
            strokeWidth={14}
            strokeCap="round"
          />
          <Path
            path={path}
            color={brand}
            style="stroke"
            strokeWidth={14}
            strokeCap="round"
            start={0}
            end={pct}
          />
        </Canvas>
        <View className="gap-2">
          <Text className="text-2xl font-bold">{Math.round(pct * 100)}%</Text>
          {interactive && (
            <View className="flex-row gap-2">
              <Button
                size="sm"
                variant="outline"
                label="−"
                onPress={() => setPct((v) => Math.max(0.05, v - 0.08))}
              />
              <Button
                size="sm"
                label="+"
                onPress={() => setPct((v) => Math.min(1, v + 0.08))}
              />
            </View>
          )}
        </View>
      </View>
    </View>
  )
}

export type { Props as DonutChartProps }
/**
 *
 */
export default memo(DonutChart)
