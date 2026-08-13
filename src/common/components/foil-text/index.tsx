import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { type FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BRAND from '@/common/components/shared/brand';

import { cn } from '@/lib/utils';
import { useMcVar } from '@/theme/hooks/use-theme-var';

interface Props {
  value?: string;
}

/**
 * FoilText — pieza reutilizable del kit MiCoin.
 *
 * Caja negra lista para conectar en cualquier pantalla.
 *
 * @param props - Ver FoilTextProps / Props del archivo
 *
 * @example
 * import FoilText from '@/common/components/foil-text';
 * <FoilText />
 */
const FoilText: FC<Props> = ({ value = '$1,248.90' }) => {
  const primary = useMcVar(BRAND.native.textPrimary);
  const shine = useMcVar(BRAND.native.primaryForeground);
  const brand = useMcVar(BRAND.native.brand);

  return (
    <View className={cn('overflow-hidden', BRAND.radius.variants.control)}>
      <MaskedView
        style={{ height: 48, width: '100%' }}
        maskElement={
          <View style={styles.maskRoot}>
            <Text style={[styles.maskText, { color: primary }]}>{value}</Text>
          </View>
        }
      >
        <LinearGradient
          colors={[brand, shine, primary, brand]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ flex: 1 }}
        />
      </MaskedView>
    </View>
  );
};

const styles = StyleSheet.create({
  maskRoot: {
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'center',
  },
  maskText: {
    fontSize: 28,
    fontWeight: '700',
  },
});

export default FoilText;
