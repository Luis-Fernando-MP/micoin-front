import { Image } from 'expo-image';
import { type FC } from 'react';
import { type ImageStyle, type StyleProp } from 'react-native';

import {
  type BrandSize,
  type BrandSizeMap,
} from '@/common/components/shared/brand';
import { cn } from '@/lib/utils';

const SOURCES = {
  xs: require('../../../../assets/images/logo/logo-sm.svg'),
  sm: require('../../../../assets/images/logo/logo-sm.svg'),
  md: require('../../../../assets/images/logo/logo-md.svg'),
  lg: require('../../../../assets/images/logo/logo-lg.svg'),
  xl: require('../../../../assets/images/logo/logo-lg.svg'),
} as const satisfies BrandSizeMap<number>;

const SIZES = {
  xs: 28,
  sm: 40,
  md: 96,
  lg: 160,
  xl: 200,
} as const satisfies BrandSizeMap<number>;

interface Props {
  size?: BrandSize;
  className?: string;
  style?: StyleProp<ImageStyle>;
}

/**
 * BrandLogo — pieza reutilizable del kit MiCoin.
 *
 * Caja negra lista para conectar en cualquier pantalla.
 *
 * @param props - Ver BrandLogoProps / Props del archivo
 *
 * @example
 * import BrandLogo from '@/common/components/brand-logo';
 * <BrandLogo />
 */
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

export type { Props as BrandLogoProps };
export default BrandLogo;
