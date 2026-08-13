import { MotiView } from 'moti';
import { type FC } from 'react';
import { View } from 'react-native';

import { radius } from '@/common/components/shared/radius';
import { cn } from '@/lib/utils';

interface Props {
  rows?: number;
  className?: string;
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
    className={cn('h-14 bg-border', radius.surface)}
  />
);

const SkeletonList: FC<Props> = ({ rows = 4, className }) => {
  return (
    <View className={cn('gap-2', className)}>
      {Array.from({ length: rows }).map((_, index) => (
        <SkeletonRow key={index} />
      ))}
    </View>
  );
};

export { SkeletonList };
