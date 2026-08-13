import { Image } from 'expo-image';
import { type FC } from 'react';
import { type ImageStyle, type StyleProp } from 'react-native';

import { cn } from '@/lib/utils';

const SOURCES = {
  sm: require('../../../../assets/images/logo/logo-sm.svg'),
  md: require('../../../../assets/images/logo/logo-md.svg'),
  lg: require('../../../../assets/images/logo/logo-lg.svg'),
} as const;

const SIZES = {
  sm: 40,
  md: 96,
  lg: 160,
} as const;

type LogoSize = keyof typeof SOURCES;

interface Props {
  size?: LogoSize;
  className?: string;
  style?: StyleProp<ImageStyle>;
}

const BrandLogo: FC<Props> = ({ size = 'md', className, style }) => {
  const px = SIZES[size];

  return (
    <Image
      source={SOURCES[size]}
      style={[{ width: px, height: px }, style]}
      className={cn(className)}
      contentFit="contain"
      accessibilityLabel="MiCoin"
    />
  );
};

export type { LogoSize };
export { BrandLogo };
