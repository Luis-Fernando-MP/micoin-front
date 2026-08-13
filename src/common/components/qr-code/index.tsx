import { type FC } from 'react';
import { View } from 'react-native';
import QRCodeSvg from 'react-native-qrcode-svg';
import BRAND, { type BrandStatus, type BrandSize } from '@/common/components/shared/brand';

import { cn } from '@/lib/utils';
import { useMcVar } from '@/theme/hooks/use-theme-var';

interface Props {
  value: string;
  size?: number;
  className?: string;
}

/**
 * QrCode — pieza reutilizable del kit MiCoin.
 *
 * Caja negra lista para conectar en cualquier pantalla.
 *
 * @param props - Ver QrCodeProps / Props del archivo
 *
 * @example
 * import QrCode from '@/common/components/qr-code';
 * <QrCode />
 */
const QrCode: FC<Props> = ({ value, size = 160, className }) => {
  const fg = useMcVar(BRAND.native.textPrimary);
  const bg = useMcVar(BRAND.native.background);

  return (
    <View
      className={cn(
        'items-center justify-center self-center border border-border bg-background p-3',
        BRAND.radius.variants.surface,
        className
      )}
    >
      <QRCodeSvg value={value} size={size} color={fg} backgroundColor={bg} />
    </View>
  );
};

export default QrCode;
