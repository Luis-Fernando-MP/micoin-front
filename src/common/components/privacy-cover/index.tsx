import { Eye, EyeOff } from 'lucide-react-native';
import { type FC, useState } from 'react';
import { Pressable, View } from 'react-native';
import BRAND, { type BrandStatus, type BrandSize } from '@/common/components/shared/brand';

import Icon from '@/common/components/icon';
import Text from '@/common/components/text';
import { cn } from '@/lib/utils';

interface Props {
  amount?: string;
  label?: string;
}

/**
 * PrivacyCover — pieza reutilizable del kit MiCoin.
 *
 * Caja negra lista para conectar en cualquier pantalla.
 *
 * @param props - Ver PrivacyCoverProps / Props del archivo
 *
 * @example
 * import PrivacyCover from '@/common/components/privacy-cover';
 * <PrivacyCover />
 */
const PrivacyCover: FC<Props> = ({
  amount = '$1,248.90',
  label = 'Saldo disponible',
}) => {
  const [hidden, setHidden] = useState(true);

  return (
    <Pressable
      onPress={() => setHidden((value) => !value)}
      className={cn(
        'flex-row items-center justify-between border border-border bg-card px-4 py-3',
        BRAND.radius.variants.surface
      )}
    >
      <View className="gap-0.5">
        <Text.Caption>{label}</Text.Caption>
        <Text.Title size="lg">
          {hidden ? '••••••' : amount}
        </Text.Title>
      </View>
      <Icon icon={hidden ? EyeOff : Eye} size={20} />
    </Pressable>
  );
};

export default PrivacyCover;
