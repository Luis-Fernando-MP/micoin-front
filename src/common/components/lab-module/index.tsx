import { type FC, type ReactNode } from 'react';
import { View } from 'react-native';

import { Chip } from '@/common/components/chip';
import { radius } from '@/common/components/shared/radius';
import { Text } from '@/common/components/text';
import { cn } from '@/lib/utils';

interface Props {
  id: number;
  title: string;
  what: string;
  why: string;
  pack?: string;
  children: ReactNode;
  className?: string;
}

const LabModule: FC<Props> = ({
  id,
  title,
  what,
  why,
  pack,
  children,
  className,
}) => {
  return (
    <View
      className={cn(
        'gap-3 border border-border bg-card p-4',
        radius.surface,
        className
      )}
    >
      <View className="gap-1.5">
        <Text className="text-base font-semibold">
          {id} · {title}
        </Text>
        {pack && <Chip label={pack} size="sm" status="info" />}
        <Text className="text-sm text-secondary">
          <Text className="font-medium text-primary">Qué hace: </Text>
          {what}
        </Text>
        <Text className="text-sm text-secondary">
          <Text className="font-medium text-primary">Para qué: </Text>
          {why}
        </Text>
      </View>
      {children}
    </View>
  );
};

export { LabModule };
export type { Props as LabModuleProps };
