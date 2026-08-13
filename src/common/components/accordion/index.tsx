import { ChevronDown } from 'lucide-react-native';
import { type FC, useState } from 'react';
import { Pressable, View } from 'react-native';
import BRAND from '@/common/components/shared/brand';

import Text from '@/common/components/text';
import { cn } from '@/lib/utils';
import { useMcVar } from '@/theme/hooks/use-theme-var';

type Item = {
  id: string;
  title: string;
  content: string;
};

interface Props {
  items: Item[];
  type?: 'single' | 'multiple';
  className?: string;
}

/**
 * Accordion — pieza reutilizable del kit MiCoin.
 *
 * Caja negra lista para conectar en cualquier pantalla.
 *
 * @param props - Ver AccordionProps / Props del archivo
 *
 * @example
 * import Accordion from '@/common/components/accordion';
 * <Accordion />
 */
const Accordion: FC<Props> = ({
  items,
  type = 'single',
  className,
}) => {
  const [open, setOpen] = useState<string[]>([]);
  const iconColor = useMcVar(BRAND.native.textSecondary);

  const toggle = (id: string) => {
    const isOpen = open.includes(id);
    if (type === 'single') {
      if (isOpen) {
        setOpen([]);
        return;
      }
      setOpen([id]);
      return;
    }
    if (isOpen) {
      setOpen(open.filter((value) => value !== id));
      return;
    }
    setOpen([...open, id]);
  };

  return (
    <View className={cn('gap-2', className)}>
      {items.map((item) => {
        const isOpen = open.includes(item.id);

        return (
          <View
            key={item.id}
            className="overflow-hidden rounded-lg border border-border bg-card"
          >
            <Pressable
              onPress={() => toggle(item.id)}
              className="flex-row items-center justify-between px-4 py-3"
            >
              <Text.Title size="sm">{item.title}</Text.Title>
              <ChevronDown size={18} color={iconColor} />
            </Pressable>
            {isOpen && (
              <View className="border-t border-border px-4 py-3">
                <Text.Subtitle>{item.content}</Text.Subtitle>
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
};

export default Accordion;
