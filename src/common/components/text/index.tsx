import { type FC } from 'react';
import { Text as RNText, type TextProps as RNTextProps } from 'react-native';

import BRAND, { type BrandStatus } from '@/common/components/shared/brand';
import { cn } from '@/lib/utils';

interface Props extends RNTextProps {
  className?: string;
  status?: BrandStatus;
}

/**
 * Text — tipografía del design system con status BRAND.
 *
 * @param status - Variante semántica. @default 'default'
 * @param className - Clases NativeWind extra
 *
 * @example
 * import Text from '@/common/components/text';
 * <Text status="brand">Saldo</Text>
 */
const Text: FC<Props> = ({
  className,
  status = BRAND.colors.defaultVariant,
  ...props
}) => {
  return (
    <RNText
      className={cn(
        'text-base',
        BRAND.colors.variants[status].text,
        className
      )}
      {...props}
    />
  );
};

export type { Props as TextProps };
export default Text;
