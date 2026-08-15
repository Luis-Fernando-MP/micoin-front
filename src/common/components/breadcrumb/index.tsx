import { type FC, type ReactNode } from 'react'
import { Pressable, type PressableProps, View } from 'react-native'

import { ChevronRight } from 'lucide-react-native'

import BRAND from '@components/shared/brand'
import Text from '@components/text'
import { useMcVar } from '@theme'

import { cn } from '@/lib/utils'

type BreadcrumbSlot = string | ReactNode

type Crumb = {
  id: string
  content: BreadcrumbSlot
  onPress?: PressableProps['onPress']
}

interface Props {
  items: Crumb[]
  className?: string
}

const renderSlot = (slot: BreadcrumbSlot, textClass: string) => {
  if (typeof slot === 'string') {
    return <Text className={textClass}>{slot}</Text>
  }

  return slot
}

/**
 * Breadcrumb — ruta de migas con slots flexibles y tap opcional por ítem.
 *
 * Cada ítem acepta string o ReactNode. `onPress` en ítems intermedios
 * permite navegar o cambiar vista; el último ítem no dispara tap.
 *
 * @param items - Migas con id, content y onPress opcional
 * @param className - Clases NativeWind extra
 *
 * @example
 * import Breadcrumb from '@components/breadcrumb'
 * <Breadcrumb
 *   items={[
 *     { id: 'home', content: 'Home', onPress: () => go('/') },
 *     { id: 'lab', content: <Chip label="Lab" />, onPress: () => go('/lab') },
 *     { id: 'ui', content: 'UI' },
 *   ]}
 * />
 */
const Breadcrumb: FC<Props> = ({ items, className }) => {
  const iconColor = useMcVar(BRAND.native.textSecondary)

  return (
    <View className={cn('flex-row flex-wrap items-center gap-1', className)}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1
        const textClass = cn(
          'text-sm',
          isLast && 'font-semibold text-foreground',
          !isLast && 'text-secondary',
        )
        const slot = renderSlot(item.content, textClass)
        const pressable = !isLast && item.onPress

        return (
          <View key={item.id} className="flex-row items-center gap-1">
            {pressable && (
              <Pressable onPress={item.onPress} className="active:opacity-90">
                {slot}
              </Pressable>
            )}
            {!pressable && slot}
            {!isLast && <ChevronRight size={14} color={iconColor} />}
          </View>
        )
      })}
    </View>
  )
}

export type {
  Crumb as BreadcrumbItem,
  Props as BreadcrumbProps,
  BreadcrumbSlot,
}
export default Breadcrumb
