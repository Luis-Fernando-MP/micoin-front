import { type FC } from 'react';
import { View, type ViewProps } from 'react-native';

import { cn } from '@/lib/utils';

interface Props extends ViewProps {
  className?: string;
}

const Card: FC<Props> = ({ className, ...props }) => {
  return (
    <View
      className={cn('rounded-lg border border-card-hover bg-card p-4', className)}
      {...props}
    />
  );
};

export { Card };
