import { type FC } from 'react';
import { Pressable } from 'react-native';

import BRAND, {
  type BrandSize,
  type BrandStatus,
} from '@/common/components/shared/brand';
import Text from '@/common/components/text';
import { cn } from '@/lib/utils';

interface Props {
  label: string;
  className?: string;
  status?: BrandStatus;
  size?: BrandSize;
  selected?: boolean;
  onPress?: () => void;
}

/**
 * Chip — filtro o etiqueta táctil del design system.
 *
 * @param label - Texto
 * @param status - Variante semántica. @default 'default'
 * @param size - Tamaño BRAND. @default 'md'
 * @param selected - Estado activo
 *
 * @example
 * import Chip from '@/common/components/chip';
 * <Chip label="Hoy" status="brand" selected />
 */
const Chip: FC<Props> = ({
  label,
  className,
  size = BRAND.sizes.defaultVariant,
  selected = false,
  status = BRAND.colors.defaultVariant,
  onPress,
}) => {
  const tone = BRAND.colors.variants[status];
  const sizing = BRAND.sizes.variants[size];

  return (
    <Pressable
      onPress={onPress}
      className={cn(
        BRAND.radius.variants.pill,
        sizing.chip,
        'items-center justify-center',
        selected && BRAND.colors.variants.primary.background,
        !selected && tone.soft,
        !selected && tone.border,
        className
      )}
    >
      <Text
        className={cn(
          sizing.text,
          selected && BRAND.colors.variants.primary.foreground,
          !selected && tone.text
        )}
      >
        {label}
      </Text>
    </Pressable>
  );
};

export type { Props as ChipProps };
export default Chip;
