import { Check } from 'lucide-react-native';
import { type FC } from 'react';
import { Pressable, View } from 'react-native';

import { Text } from '@/common/components/text';
import {
  statusBg,
  statusBorder,
  type Status,
} from '@/common/components/shared/status';
import { cn } from '@/lib/utils';
import { useMcVar } from '@/theme/hooks/use-theme-var';

interface Props {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label?: string;
  className?: string;
  status?: Status;
}

const Checkbox: FC<Props> = ({
  checked,
  onCheckedChange,
  label,
  className,
  status = 'primary',
}) => {
  const checkColor = useMcVar('background', '#ffffff');

  return (
    <Pressable
      onPress={() => onCheckedChange(!checked)}
      className={cn('flex-row items-center gap-3', className)}
    >
      <View
        className={cn(
          'h-5 w-5 items-center justify-center rounded',
          statusBorder({ status }),
          checked && statusBg({ status })
        )}
      >
        {checked && <Check size={14} color={checkColor} />}
      </View>
      {label && <Text>{label}</Text>}
    </Pressable>
  );
};

export { Checkbox };
