import { type FC } from 'react';
import { View, type ViewProps } from 'react-native';

import { radius } from '@/common/components/shared/radius';
import {
  statusBorder,
  statusSoftBg,
  type Status,
} from '@/common/components/shared/status';
import { cn } from '@/lib/utils';

interface Props extends ViewProps {
  className?: string;
  status?: Status;
}

const Card: FC<Props> = ({ className, status = 'default', ...props }) => {
  return (
    <View
      className={cn(
        'border border-border p-4',
        radius.surface,
        statusSoftBg({ status }),
        status !== 'default' && statusBorder({ status }),
        className
      )}
      {...props}
    />
  );
};

export { Card };
