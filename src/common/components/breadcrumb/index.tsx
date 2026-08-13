import { ChevronRight } from 'lucide-react-native';
import { type FC } from 'react';
import { View } from 'react-native';

import { Text } from '@/common/components/text';
import { cn } from '@/lib/utils';
import { useMcVar } from '@/theme/hooks/use-theme-var';

type Crumb = {
  label: string;
};

interface Props {
  items: Crumb[];
  className?: string;
}

const Breadcrumb: FC<Props> = ({ items, className }) => {
  const iconColor = useMcVar('textSecondary', '#666666');

  return (
    <View className={cn('flex-row flex-wrap items-center gap-1', className)}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <View
            key={`${item.label}-${index}`}
            className="flex-row items-center gap-1"
          >
            <Text
              className={cn(
                'text-sm',
                isLast && 'font-semibold text-foreground',
                !isLast && 'text-secondary'
              )}
            >
              {item.label}
            </Text>
            {!isLast && <ChevronRight size={14} color={iconColor} />}
          </View>
        );
      })}
    </View>
  );
};

export { Breadcrumb };
