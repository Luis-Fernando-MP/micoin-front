import {
  GlassView,
  isGlassEffectAPIAvailable,
  isLiquidGlassAvailable,
} from 'expo-glass-effect';
import { LinearGradient } from 'expo-linear-gradient';
import { type FC } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import BRAND, { type BrandStatus, type BrandSize } from '@/common/components/shared/brand';

import Text from '@/common/components/text';
import { cn } from '@/lib/utils';
import { useMcVar } from '@/theme/hooks/use-theme-var';

/**
 * FrostCard — pieza reutilizable del kit MiCoin.
 *
 * Caja negra lista para conectar en cualquier pantalla.
 *
 * @param props - Ver FrostCardProps / Props del archivo
 *
 * @example
 * import FrostCard from '@/common/components/frost-card';
 * <FrostCard />
 */
const FrostCard: FC = () => {
  const brand = useMcVar(BRAND.native.brand);
  const primary = useMcVar(BRAND.native.primary);
  const canGlass =
    Platform.OS === 'ios' &&
    isLiquidGlassAvailable() &&
    isGlassEffectAPIAvailable();

  return (
    <View className="flex-row gap-2">
      <View
        className={cn('flex-1 border border-border p-3', BRAND.radius.variants.control)}
        style={{ backgroundColor: brand, minHeight: 96 }}
      >
        <Text className="text-xs font-medium text-brand-foreground">
          Sin frosted
        </Text>
        <Text className="mt-2 text-lg font-bold text-brand-foreground">
          Card sólida
        </Text>
      </View>
      <View
        className={cn(
          'relative flex-1 overflow-hidden border border-border',
          BRAND.radius.variants.control
        )}
        style={{ minHeight: 96 }}
      >
        <LinearGradient
          colors={[brand, primary]}
          style={StyleSheet.absoluteFillObject}
        />
        {canGlass ? (
          <GlassView style={styles.pad} glassEffectStyle="regular">
            <Text className="text-xs font-medium">Glass nativo</Text>
            <Text className="mt-1 text-lg font-bold">•••• 4242</Text>
          </GlassView>
        ) : (
          <View style={[styles.pad, styles.frost]}>
            <Text className="text-xs font-medium">Frosted simulado</Text>
            <Text className="mt-1 text-lg font-bold">•••• 4242</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pad: {
    flex: 1,
    justifyContent: 'center',
    padding: 12,
  },
  frost: {
    backgroundColor: 'rgba(255,255,255,0.55)',
  },
});

export default FrostCard;
