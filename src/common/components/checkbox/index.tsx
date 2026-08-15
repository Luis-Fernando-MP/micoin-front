import { type FC } from 'react'
import { Pressable, View } from 'react-native'

import { Check } from 'lucide-react-native'

import BRAND, { type BrandStatus } from '@components/shared/brand'
import Text from '@components/text'
import { useMcVar } from '@theme'

import { cn } from '@/lib/utils'

type CheckboxVariant = 'default' | 'outline'

interface Props {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  label?: string
  className?: string
  status?: BrandStatus
  variant?: CheckboxVariant
}

const resolveBoxClass = (
  variant: CheckboxVariant,
  checked: boolean,
  tone: (typeof BRAND.colors.variants)[BrandStatus],
) => {
  if (variant === 'outline') {
    return cn(
      'h-5 w-5 items-center justify-center rounded border bg-background',
      tone.border,
    )
  }

  return cn(
    'h-5 w-5 items-center justify-center rounded border',
    tone.border,
    checked && tone.background,
  )
}

/**
 * Checkbox — control de selección con status y variant BRAND.
 *
 * @param checked - Estado marcado
 * @param onCheckedChange - Callback al togglear
 * @param label - Texto opcional
 * @param variant - default rellena al marcar; outline solo borde. @default 'default'
 * @param status - Tono semántico. @default 'primary'
 * @param className - Clases NativeWind extra
 *
 * @example
 * import Checkbox from '@components/checkbox'
 * <Checkbox checked={ok} onCheckedChange={setOk} label="Acepto" />
 * <Checkbox checked={ok} onCheckedChange={setOk} variant="outline" />
 */
const Checkbox: FC<Props> = ({
  checked,
  onCheckedChange,
  label,
  className,
  status = 'primary',
  variant = 'default',
}) => {
  const tone = BRAND.colors.variants[status]
  const solidCheckColor = useMcVar(BRAND.native.background)
  const outlineCheckColor = useMcVar(tone.native)
  const checkColor = variant === 'outline' ? outlineCheckColor : solidCheckColor

  return (
    <Pressable
      onPress={() => onCheckedChange(!checked)}
      className={cn('flex-row items-center gap-3', className)}
    >
      <View className={resolveBoxClass(variant, checked, tone)}>
        {checked && <Check size={14} color={checkColor} />}
      </View>
      {label && <Text>{label}</Text>}
    </Pressable>
  )
}

export type { Props as CheckboxProps, CheckboxVariant }
export default Checkbox
