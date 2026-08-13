import { type FC } from 'react'
import { View } from 'react-native'

import { cn } from '@/lib/utils'

interface Props {
  className?: string
  orientation?: 'horizontal' | 'vertical'
}

/**
 * Separator — línea divisoria horizontal o vertical.
 *
 * @param orientation - Dirección de la línea. @default 'horizontal'
 * @param className - Clases NativeWind extra
 *
 * @example
 * import Separator from '@components/separator';
 * <Separator />
 * <Separator orientation="vertical" />
 */
const Separator: FC<Props> = ({ className, orientation = 'horizontal' }) => {
  const isVertical = orientation === 'vertical'

  return (
    <View
      className={cn(
        'bg-border',
        isVertical && 'h-full w-px',
        !isVertical && 'h-px w-full',
        className,
      )}
    />
  )
}

/**
 *
 */
export default Separator
