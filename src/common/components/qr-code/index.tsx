import { type FC } from 'react'
import { View } from 'react-native'
import QRCodeSvg from 'react-native-qrcode-svg'

import BRAND from '@components/shared/brand'
import { useMcVar } from '@theme'

import { cn } from '@/lib/utils'

interface Props {
  value: string
  size?: number
  className?: string
}

/**
 * QrCode — pieza reutilizable del kit MiCoin.
 *
 * Caja negra lista para conectar en cualquier pantalla.
 *
 * @param props - Ver QrCodeProps / Props del archivo
 *
 * @param props.value
 * @param props.size
 * @param props.className
 * @example
 * import QrCode from '@components/qr-code';
 * <QrCode />
 */
const QrCode: FC<Props> = ({ value, size = 160, className }) => {
  const fg = useMcVar(BRAND.native.textPrimary)
  const bg = useMcVar(BRAND.native.background)

  return (
    <View
      className={cn(
        'items-center justify-center self-center border border-border bg-background p-3',
        BRAND.radius.variants.surface,
        className,
      )}
    >
      <QRCodeSvg value={value} size={size} color={fg} backgroundColor={bg} />
    </View>
  )
}

export default QrCode
