import { cva, type VariantProps } from 'class-variance-authority';
import { type FC } from 'react';
import { View } from 'react-native';

import { radius } from '@/common/components/shared/radius';
import {
  statusBorder,
  statusSoftBg,
  statusText,
  type Status,
} from '@/common/components/shared/status';
import { Text } from '@/common/components/text';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  cn('self-start px-2.5 py-1', radius.pill),
  {
    variants: {
      variant: {
        solid: '',
        soft: '',
        outline: 'bg-transparent',
      },
    },
    defaultVariants: {
      variant: 'soft',
    },
  }
);

interface Props extends VariantProps<typeof badgeVariants> {
  label: string;
  className?: string;
  status?: Status;
}

const Badge: FC<Props> = ({
  label,
  className,
  variant = 'soft',
  status = 'default',
}) => {
  const isOutline = variant === 'outline';
  const isSolid = variant === 'solid';

  let solidText = statusText({ status });
  if (status === 'primary') {
    solidText = 'text-primary-foreground';
  }
  if (status === 'brand') {
    solidText = 'text-brand-foreground';
  }

  return (
    <View
      className={cn(
        badgeVariants({ variant }),
        isSolid && statusBgSolid(status),
        !isSolid && !isOutline && statusSoftBg({ status }),
        isOutline && statusBorder({ status }),
        className
      )}
    >
      <Text
        className={cn(
          'text-xs font-medium',
          isSolid && solidText,
          !isSolid && statusText({ status })
        )}
      >
        {label}
      </Text>
    </View>
  );
};

const statusBgSolid = (status: Status) => {
  if (status === 'primary') {
    return 'bg-primary-background';
  }
  if (status === 'brand') {
    return 'bg-brand-background';
  }
  if (status === 'warning') {
    return 'bg-warning';
  }
  if (status === 'error') {
    return 'bg-error';
  }
  if (status === 'info') {
    return 'bg-info';
  }
  if (status === 'success') {
    return 'bg-success';
  }
  return 'bg-card';
};

export { Badge };
