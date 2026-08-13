import { type FC, type ReactNode } from 'react';
import { View } from 'react-native';
import BRAND from '@/common/components/shared/brand';

import Chip from '@/common/components/chip';
import Text from '@/common/components/text';
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
        BRAND.radius.variants.surface,
        className
      )}
    >
      <View className="gap-1.5">
        <Text.Title size="sm">
          {id} · {title}
        </Text.Title>
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

export type { Props as LabModuleProps };
export default LabModule;
