import { cva, type VariantProps } from 'class-variance-authority';
import { type FC } from 'react';
import { Pressable } from 'react-native';

import { radius } from '@/common/components/shared/radius';
import {
  chipPadding,
  controlText,
  type Size,
} from '@/common/components/shared/size';
import {
  statusBorder,
  statusSoftBg,
  statusText,
  type Status,
} from '@/common/components/shared/status';
import { Text } from '@/common/components/text';
import { cn } from '@/lib/utils';

const chipVariants = cva(radius.pill, {
  variants: {
    selected: {
      true: 'bg-primary-background',
      false: '',
    },
  },
  defaultVariants: {
    selected: false,
  },
});

interface Props extends VariantProps<typeof chipVariants> {
  label: string;
  className?: string;
  status?: Status;
  size?: Size;
  onPress?: () => void;
}

const Chip: FC<Props> = ({
  label,
  className,
  size = 'md',
  selected = false,
  status = 'default',
  onPress,
}) => {
  return (
    <Pressable
      onPress={onPress}
      className={cn(
        chipVariants({ selected }),
        chipPadding({ size }),
        !selected && statusSoftBg({ status }),
        !selected && statusBorder({ status }),
        className
      )}
    >
      <Text
        className={cn(
          controlText({ size }),
          selected && 'text-primary-foreground',
          !selected && statusText({ status })
        )}
      >
        {label}
      </Text>
    </Pressable>
  );
};

export { Chip };
