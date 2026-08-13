import { type FC } from 'react'
import { Pressable, View } from 'react-native'

import { Check } from 'lucide-react-native'

import BRAND, { type BrandStatus } from '@/common/components/shared/brand'
import Text from '@/common/components/text'
import { cn } from '@/lib/utils'
import { useMcVar } from '@/theme/hooks/use-theme-var'

interface Props {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  label?: string
  className?: string
  status?: BrandStatus
}

/**
 * Checkbox — control de selección con status BRAND.
 *
 * @param checked - Estado
 * @param checked.checked
 * @param onCheckedChange - Callback
 * @param checked.onCheckedChange
 * @param checked.label
 * @param checked.className
 * @param status - Variante semántica. @default 'primary'
 *
 * @param checked.status
 * @example
 * import Checkbox from '@/common/components/checkbox';
 * <Checkbox checked={ok} onCheckedChange={setOk} label="Acepto" />
 */
const Checkbox: FC<Props> = ({
  checked,
  onCheckedChange,
  label,
  className,
  status = 'primary',
}) => {
  const checkColor = useMcVar(BRAND.native.background)
  const tone = BRAND.colors.variants[status]

  return (
    <Pressable
      onPress={() => onCheckedChange(!checked)}
      className={cn('flex-row items-center gap-3', className)}
    >
      <View
        className={cn(
          'h-5 w-5 items-center justify-center rounded border',
          tone.border,
          checked && tone.background,
        )}
      >
        {checked && <Check size={14} color={checkColor} />}
      </View>
      {label && <Text>{label}</Text>}
    </Pressable>
  )
}

export type { Props as CheckboxProps }
/**
 *
 */
export default Checkbox
