import { type FC, memo } from 'react'
import { View } from 'react-native'

import { Canvas, Group, Rect } from '@shopify/react-native-skia'

import BRAND from '@components/shared/brand'
import { useMcVar } from '@theme'

interface Props {
  data?: number[]
  highlightIndex?: number
  width?: number
  height?: number
}

const DEFAULT = [40, 65, 35, 80, 55, 90, 48]

/**
 * BarChart — barras verticales de una serie.
 *
 * @param data - Valores 0–100. @default serie semanal
 * @param data.data
 * @param highlightIndex - Índice resaltado con color brand
 * @param data.highlightIndex
 * @param width - Ancho del canvas. @default 280
 * @param data.width
 * @param height - Alto del canvas. @default 100
 *
 * @param data.height
 * @example
 * import Charts from '@components/charts';
 * <Charts.BarChart data={[40, 65, 80]} highlightIndex={2} />
 */
const BarChart: FC<Props> = ({
  data = DEFAULT,
  highlightIndex = 5,
  width = 280,
  height = 100,
}) => {
  const brand = useMcVar(BRAND.native.brand)
  const muted = useMcVar(BRAND.native.border)
  const barW = 28
  const gap = 10

  return (
    <View>
      <Canvas style={{ width, height }}>
        {data.map((value, index) => {
          const x = index * (barW + gap) + 8
          const h = (value / 100) * 70
          return (
            <Group key={index}>
              <Rect
                x={x}
                y={78 - h}
                width={barW}
                height={h}
                color={index === highlightIndex ? brand : muted}
              />
            </Group>
          )
        })}
      </Canvas>
    </View>
  )
}

export type { Props as BarChartProps }
/**
 *
 */
export default memo(BarChart)
