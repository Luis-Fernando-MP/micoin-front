import { type FC } from 'react';
import { View } from 'react-native';

import { cn } from '@/lib/utils';

interface Props {
  className?: string;
}

const Separator: FC<Props> = ({ className }) => {
  return <View className={cn('h-px w-full bg-card-hover', className)} />;
};

export { Separator };
