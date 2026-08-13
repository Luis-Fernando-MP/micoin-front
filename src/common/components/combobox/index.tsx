import { Check, ChevronDown } from 'lucide-react-native';
import { type FC, useMemo, useState } from 'react';
import { Pressable, View } from 'react-native';

import { Icon } from '@/common/components/icon';
import { radius } from '@/common/components/shared/radius';
import { Text } from '@/common/components/text';
import { cn } from '@/lib/utils';

type Option = {
  value: string;
  label: string;
};

interface Props {
  options: Option[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const Combobox: FC<Props> = ({
  options,
  value,
  onChange,
  placeholder = 'Seleccionar…',
  className,
}) => {
  const [open, setOpen] = useState(false);
  const selected = options.find((option) => option.value === value);

  const label = useMemo(() => {
    if (selected) {
      return selected.label;
    }
    return placeholder;
  }, [placeholder, selected]);

  return (
    <View className={cn('z-20', className)}>
      <Pressable
        onPress={() => setOpen((current) => !current)}
        className={cn(
          'h-11 flex-row items-center justify-between border border-border bg-background px-4',
          radius.control,
          open && 'border-primary'
        )}
      >
        <Text
          className={cn(
            'text-sm',
            selected && 'text-foreground',
            !selected && 'text-secondary'
          )}
        >
          {label}
        </Text>
        <Icon icon={ChevronDown} tone="secondary" size={16} />
      </Pressable>

      {open && (
        <View
          className={cn(
            'absolute left-0 right-0 top-12 z-30 overflow-hidden border border-border bg-background shadow-lg',
            radius.surface
          )}
        >
          {options.map((item, index) => {
            const isSelected = item.value === value;
            const isLast = index === options.length - 1;

            return (
              <Pressable
                key={item.value}
                onPress={() => {
                  onChange(item.value);
                  setOpen(false);
                }}
                className={cn(
                  'h-11 flex-row items-center justify-between px-4 active:bg-card-hover',
                  !isLast && 'border-b border-border',
                  isSelected && 'bg-card'
                )}
              >
                <Text
                  className={cn(
                    'text-sm',
                    isSelected && 'font-semibold text-foreground',
                    !isSelected && 'text-secondary'
                  )}
                >
                  {item.label}
                </Text>
                {isSelected && <Icon icon={Check} tone="brand" size={16} />}
              </Pressable>
            );
          })}
        </View>
      )}
    </View>
  );
};

export { Combobox };
