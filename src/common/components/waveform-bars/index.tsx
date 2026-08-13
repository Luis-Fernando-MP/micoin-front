import { type FC, useEffect } from 'react'
import { View } from 'react-native'
import {
  type SharedValue,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated'

import { Canvas, Group, RoundedRect } from '@shopify/react-native-skia'

import BRAND from '@components/shared/brand'
import { useMcVar } from '@theme'

interface Props {
  bars?: number
  width?: number
  height?: number
  active?: boolean
}

/**
 * WaveformBars — pieza reutilizable del kit MiCoin.
 *
 * Caja negra lista para conectar en cualquier pantalla.
 *
 * @param props - Ver WaveformBarsProps / Props del archivo
 *
 * @param props.bars
 * @param props.width
 * @param props.height
 * @param props.active
 * @example
 * import WaveformBars from '@components/waveform-bars';
 * <WaveformBars />
 */
const WaveformBars: FC<Props> = ({
  bars = 24,
  width = 280,
  height = 56,
  active = true,
}) => {
  const brand = useMcVar(BRAND.native.brand)
  const muted = useMcVar(BRAND.native.border)
  const tick = useSharedValue(0)

  useEffect(() => {
    if (!active) {
      tick.value = 0
      return
    }
    tick.value = withRepeat(withTiming(1, { duration: 900 }), -1, true)
  }, [active, tick])

  const barWidth = (width - (bars - 1) * 3) / bars

  return (
    <View>
      <Canvas style={{ width, height }}>
        <Group>
          {Array.from({ length: bars }).map((_, index) => (
            <WaveBar
              key={index}
              index={index}
              phase={index / bars}
              tick={tick}
              barWidth={barWidth}
              height={height}
              color={active ? brand : muted}
            />
          ))}
        </Group>
      </Canvas>
    </View>
  )
}

type WaveBarProps = {
  index: number
  phase: number
  tick: SharedValue<number>
  barWidth: number
  height: number
  color: string
}

const WaveBar: FC<WaveBarProps> = ({
  index,
  phase,
  tick,
  barWidth,
  height,
  color,
}) => {
  const barHeight = useDerivedValue(() => {
    const wave = Math.sin((tick.value + phase) * Math.PI * 2)
    const normalized = 0.25 + ((wave + 1) / 2) * 0.75
    return height * normalized
  })
  const y = useDerivedValue(() => height - barHeight.value)
  const x = index * (barWidth + 3)

  return (
    <RoundedRect
      x={x}
      y={y}
      width={barWidth}
      height={barHeight}
      r={2}
      color={color}
    />
  )
}

/**
 *
 */
export default WaveformBars
