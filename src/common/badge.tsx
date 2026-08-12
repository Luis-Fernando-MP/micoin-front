import { type FC } from 'react';
import { View } from 'react-native';

import { Text } from '@/common/text';
import { cn } from '@/lib/utils';

interface Props {
  label: string;
  className?: string;
}

const Badge: FC<Props> = ({ label, className }) => {
  return (
    <View className={cn('self-start rounded-full bg-card px-3 py-1', className)}>
      <Text className="text-xs text-secondary">{label}</Text>
    </View>
  );
};

export { Badge };
