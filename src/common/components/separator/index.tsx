import { type FC } from 'react';
import { View } from 'react-native';

import { cn } from '@/lib/utils';

interface Props {
  className?: string;
  orientation?: 'horizontal' | 'vertical';
}

/**
 * Separator — pieza reutilizable del kit MiCoin.
 *
 * Caja negra lista para conectar en cualquier pantalla.
 *
 * @param props - Ver SeparatorProps / Props del archivo
 *
 * @example
 * import Separator from '@/common/components/separator';
 * <Separator />
 */
const Separator: FC<Props> = ({
  className,
  orientation = 'horizontal',
}) => {
  const isVertical = orientation === 'vertical';

  return (
    <View
      className={cn(
        'bg-card-hover',
        isVertical && 'h-full w-px',
        !isVertical && 'h-px w-full',
        className
      )}
    />
  );
};

export default Separator;
