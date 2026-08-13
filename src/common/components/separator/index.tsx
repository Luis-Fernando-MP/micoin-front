import { type FC } from 'react';
import { View } from 'react-native';

import { cn } from '@/lib/utils';

interface Props {
  className?: string;
  orientation?: 'horizontal' | 'vertical';
}

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

export { Separator };
