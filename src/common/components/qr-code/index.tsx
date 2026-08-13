import { type FC } from 'react';
import { View } from 'react-native';
import QRCodeSvg from 'react-native-qrcode-svg';

import { radius } from '@/common/components/shared/radius';
import { cn } from '@/lib/utils';
import { useMcVar } from '@/theme/hooks/use-theme-var';

interface Props {
  value: string;
  size?: number;
  className?: string;
}

const QrCode: FC<Props> = ({ value, size = 160, className }) => {
  const fg = useMcVar('textPrimary', '#171717');
  const bg = useMcVar('background', '#ffffff');

  return (
    <View
      className={cn(
        'items-center justify-center self-center border border-border bg-background p-3',
        radius.surface,
        className
      )}
    >
      <QRCodeSvg value={value} size={size} color={fg} backgroundColor={bg} />
    </View>
  );
};

export { QrCode };
