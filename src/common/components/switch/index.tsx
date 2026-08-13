import { type FC } from 'react'
import { Pressable, View } from 'react-native'

import BRAND, { type BrandStatus } from '@components/shared/brand'
import Text from '@components/text'

import { cn } from '@/lib/utils'

interface Props {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  label?: string
  className?: string
  status?: BrandStatus
}

/**
 * Switch — interruptor on/off con status BRAND.
 *
 * @param checked - Estado activo
 * @param onCheckedChange - Callback al togglear
 * @param label - Texto opcional
 * @param status - Tono semántico del track activo. @default 'primary'
 * @param className - Clases NativeWind extra
 *
 * @example
 * import Switch from '@components/switch'
 * <Switch checked={on} onCheckedChange={setOn} label="Notificaciones" />
 */
const Switch: FC<Props> = ({
  checked,
  onCheckedChange,
  label,
  className,
  status = 'primary',
}) => {
  const tone = BRAND.colors.variants[status]

  return (
    <Pressable
      onPress={() => onCheckedChange(!checked)}
      className={cn('flex-row items-center gap-3', className)}
    >
      <View
        className={cn(
          'h-7 w-11 flex-row items-center rounded-full px-0.5 transition-colors duration-200 ease-out',
          checked ? tone.background : 'bg-card-hover',
        )}
      >
        <View
          className={cn(
            'h-5 w-5 rounded-full bg-background transition-transform duration-200 ease-out',
            checked ? 'translate-x-5' : 'translate-x-0',
          )}
        />
      </View>
      {label && <Text>{label}</Text>}
    </Pressable>
  )
}

export type { Props as SwitchProps }
export default Switch
