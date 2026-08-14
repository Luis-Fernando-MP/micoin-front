import { type FC } from 'react'
import { View } from 'react-native'

import { MotiView } from 'moti'

import BRAND from '@components/shared/brand'

import { cn } from '@/lib/utils'

interface Props {
  rows?: number
  className?: string
}

const SkeletonRow: FC = () => (
  <MotiView
    from={{ opacity: 0.35 }}
    animate={{ opacity: 1 }}
    transition={{
      type: 'timing',
      duration: 700,
      loop: true,
    }}
    className={cn('h-14 bg-border', BRAND.radius.variants.surface)}
  />
)

/**
 * SkeletonList — pieza reutilizable del kit MiCoin.
 *
 * Caja negra lista para conectar en cualquier pantalla.
 *
 * @param props - Ver SkeletonListProps / Props del archivo
 *
 * @param props.rows
 * @param props.className
 * @example
 * import SkeletonList from '@components/skeleton-list';
 * <SkeletonList />
 */
const SkeletonList: FC<Props> = ({ rows = 4, className }) => {
  return (
    <View className={cn('gap-2', className)}>
      {Array.from({ length: rows }).map((_, index) => (
        <SkeletonRow key={index} />
      ))}
    </View>
  )
}

export default SkeletonList
