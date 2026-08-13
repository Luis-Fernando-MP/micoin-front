import { type FC, memo, useMemo } from 'react'
import { View } from 'react-native'

import { Canvas, Path, Skia } from '@shopify/react-native-skia'

import BRAND from '@/common/components/shared/brand'
import { useMcVar } from '@/theme/hooks/use-theme-var'

interface Props {
  data?: number[]
  width?: number
  height?: number
}

const DEFAULT = [12, 18, 14, 22, 19, 28, 24, 31, 27, 35]

/**
 * AreaChart — área rellena bajo una serie.
 *
 * @param data - Serie de valores
 * @param data.data
 * @param width - Ancho. @default 280
 * @param data.width
 * @param height - Alto. @default 72
 *
 * @param data.height
 * @example
 * import Charts from '@/common/components/charts';
 * <Charts.AreaChart data={[12, 22, 31]} />
 */
const AreaChart: FC<Props> = ({ data = DEFAULT, width = 280, height = 72 }) => {
  const brand = useMcVar(BRAND.native.brand)
  const path = useMemo(() => {
    const p = Skia.Path.Make()
    const max = Math.max(...data)
    const min = Math.min(...data)
    const range = max - min || 1
    const ys = data.map((value, index) => {
      const x = (index / Math.max(data.length - 1, 1)) * width
      const y = height - ((value - min) / range) * (height - 10) - 6
      return { x, y }
    })
    p.moveTo(0, height)
    p.lineTo(ys[0]?.x ?? 0, ys[0]?.y ?? height)
    ys.forEach((point) => p.lineTo(point.x, point.y))
    p.lineTo(width, height)
    p.close()
    return p
  }, [data, height, width])

  return (
    <View>
      <Canvas style={{ width, height: height + 8 }}>
        <Path path={path} color={brand} opacity={0.35} />
      </Canvas>
    </View>
  )
}

export type { Props as AreaChartProps }
/**
 *
 */
export default memo(AreaChart)
