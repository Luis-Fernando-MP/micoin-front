import { type FC } from 'react'
import { View } from 'react-native'

import { ChevronRight } from 'lucide-react-native'

import BRAND from '@/common/components/shared/brand'
import Text from '@/common/components/text'
import { cn } from '@/lib/utils'
import { useMcVar } from '@/theme/hooks/use-theme-var'

type Crumb = {
  label: string
}

interface Props {
  items: Crumb[]
  className?: string
}

/**
 * Breadcrumb — pieza reutilizable del kit MiCoin.
 *
 * Caja negra lista para conectar en cualquier pantalla.
 *
 * @param props - Ver BreadcrumbProps / Props del archivo
 *
 * @param props.items
 * @param props.className
 * @example
 * import Breadcrumb from '@/common/components/breadcrumb';
 * <Breadcrumb />
 */
const Breadcrumb: FC<Props> = ({ items, className }) => {
  const iconColor = useMcVar(BRAND.native.textSecondary)

  return (
    <View className={cn('flex-row flex-wrap items-center gap-1', className)}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1

        return (
          <View
            key={`${item.label}-${index}`}
            className="flex-row items-center gap-1"
          >
            <Text
              className={cn(
                'text-sm',
                isLast && 'font-semibold text-foreground',
                !isLast && 'text-secondary',
              )}
            >
              {item.label}
            </Text>
            {!isLast && <ChevronRight size={14} color={iconColor} />}
          </View>
        )
      })}
    </View>
  )
}

/**
 *
 */
export default Breadcrumb
