import { type FC } from 'react'

import { type LucideIcon, type LucideProps } from 'lucide-react-native'

import BRAND from '@components/shared/brand'
import { useMcVar } from '@theme'

type Tone =
  | 'foreground'
  | 'secondary'
  | 'primary'
  | 'brand'
  | 'background'
  | 'onBrand'
  | 'onPrimary'

interface Props extends Omit<LucideProps, 'color'> {
  icon: LucideIcon
  tone?: Tone
  color?: string
}

const toneToNative: Record<Tone, keyof typeof BRAND.native> = {
  foreground: 'textPrimary',
  secondary: 'textSecondary',
  primary: 'primary',
  brand: 'brand',
  background: 'background',
  onBrand: 'brandForeground',
  onPrimary: 'primaryForeground',
}

/**
 * Icon — glifo Lucide con tono BRAND.
 *
 * @param icon - Componente Lucide
 * @param icon.icon
 * @param tone - Tono semántico. @default 'foreground'
 * @param icon.tone
 * @param color - Override nativo
 * @param icon.color
 * @param size - Tamaño en px. @default 18
 *
 * @param icon.size
 * @param icon.strokeWidth
 * @example
 * import Icon from '@components/icon';
 * import { Camera } from 'lucide-react-native';
 * <Icon icon={Camera} tone="brand" />
 */
const Icon: FC<Props> = ({
  icon: Glyph,
  tone = 'foreground',
  color,
  size = 18,
  strokeWidth = 1.75,
  ...props
}) => {
  const themeColor = useMcVar(BRAND.native[toneToNative[tone]])
  const resolved = color ?? themeColor

  return (
    <Glyph size={size} strokeWidth={strokeWidth} color={resolved} {...props} />
  )
}

export type { Props as IconProps }
export default Icon
