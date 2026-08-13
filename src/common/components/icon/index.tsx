import { type LucideIcon, type LucideProps } from 'lucide-react-native';
import { type FC } from 'react';

import { useMcVar } from '@/theme/hooks/use-theme-var';

type Tone =
  | 'foreground'
  | 'secondary'
  | 'primary'
  | 'brand'
  | 'background'
  | 'onBrand'
  | 'onPrimary';

interface Props extends Omit<LucideProps, 'color'> {
  icon: LucideIcon;
  tone?: Tone;
  color?: string;
}

const toneToVar: Record<
  Tone,
  { key: Parameters<typeof useMcVar>[0]; fallback: string }
> = {
  foreground: { key: 'textPrimary', fallback: '#171717' },
  secondary: { key: 'textSecondary', fallback: '#666666' },
  primary: { key: 'primary', fallback: '#171717' },
  brand: { key: 'brand', fallback: '#ca9138' },
  background: { key: 'background', fallback: '#ffffff' },
  onBrand: { key: 'brandForeground', fallback: '#171717' },
  onPrimary: { key: 'primaryForeground', fallback: '#fafafa' },
};

const Icon: FC<Props> = ({
  icon: Glyph,
  tone = 'foreground',
  color,
  size = 18,
  strokeWidth = 1.75,
  ...props
}) => {
  const mapped = toneToVar[tone];
  const themeColor = useMcVar(mapped.key, mapped.fallback);
  const resolved = color ?? themeColor;

  return (
    <Glyph
      size={size}
      strokeWidth={strokeWidth}
      color={resolved}
      {...props}
    />
  );
};

export { Icon };
export type { Props as IconProps };
