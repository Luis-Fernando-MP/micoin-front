import {
  GlassView,
  isGlassEffectAPIAvailable,
  isLiquidGlassAvailable,
} from 'expo-glass-effect';
import { LinearGradient } from 'expo-linear-gradient';
import { type FC } from 'react';
import { Platform, StyleSheet, View } from 'react-native';

import { radius } from '@/common/components/shared/radius';
import { Text } from '@/common/components/text';
import { cn } from '@/lib/utils';
import { useMcVar } from '@/theme/hooks/use-theme-var';

const FrostCard: FC = () => {
  const brand = useMcVar('brand', '#c9a227');
  const primary = useMcVar('primary', '#171717');
  const canGlass =
    Platform.OS === 'ios' &&
    isLiquidGlassAvailable() &&
    isGlassEffectAPIAvailable();

  return (
    <View className="flex-row gap-2">
      <View
        className={cn('flex-1 border border-border p-3', radius.control)}
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
          radius.control
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

export { FrostCard };
