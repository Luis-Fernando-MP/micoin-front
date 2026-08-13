import { type FC, useMemo } from 'react'
import { View } from 'react-native'
import Svg, { Rect } from 'react-native-svg'

import barcodes from 'jsbarcode/src/barcodes'

import BRAND from '@components/shared/brand'
import Text from '@components/text'
import { useMcVar } from '@theme'

import { cn } from '@/lib/utils'

type Format = 'CODE128' | 'EAN13' | 'CODE39'

interface Props {
  value: string
  format?: Format
  className?: string
  height?: number
  barWidth?: number
}

/**
 * Barcode — pieza reutilizable del kit MiCoin.
 *
 * Caja negra lista para conectar en cualquier pantalla.
 *
 * @param props - Ver BarcodeProps / Props del archivo
 *
 * @param props.value
 * @param props.format
 * @param props.className
 * @param props.height
 * @param props.barWidth
 * @example
 * import Barcode from '@components/barcode';
 * <Barcode />
 */
const Barcode: FC<Props> = ({
  value,
  format = 'CODE128',
  className,
  height = 64,
  barWidth = 2,
}) => {
  const fg = useMcVar(BRAND.native.textPrimary)

  const encoded = useMemo(() => {
    try {
      const Encoder = barcodes[format]
      if (!Encoder) {
        return null
      }
      const instance = new Encoder(value, {})
      const result = instance.encode()
      if (Array.isArray(result)) {
        return result.map((item) => item.data).join('')
      }
      return result.data as string
    } catch {
      return null
    }
  }, [format, value])

  const width = (encoded?.length ?? 0) * barWidth

  if (!encoded) {
    return (
      <View
        className={cn(
          'items-center border border-border bg-background px-3 py-4',
          BRAND.radius.variants.surface,
          className,
        )}
      >
        <Text className="text-sm text-secondary">Barcode inválido</Text>
      </View>
    )
  }

  return (
    <View
      className={cn(
        'items-center gap-2 border border-border bg-background px-3 py-3',
        BRAND.radius.variants.surface,
        className,
      )}
    >
      <Svg width={width} height={height}>
        {encoded.split('').map((bit, index) => {
          if (bit !== '1') {
            return null
          }
          return (
            <Rect
              key={`${index}-${bit}`}
              x={index * barWidth}
              y={0}
              width={barWidth}
              height={height}
              fill={fg}
            />
          )
        })}
      </Svg>
      <Text className="text-xs text-secondary">{value}</Text>
    </View>
  )
}

/**
 *
 */
export default Barcode
