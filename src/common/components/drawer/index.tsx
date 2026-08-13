import { type FC, type ReactNode, useEffect } from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BRAND, { type BrandStatus, type BrandSize } from '@/common/components/shared/brand';

import Text from '@/common/components/text';
import { cn } from '@/lib/utils';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  children: ReactNode;
  className?: string;
}

/**
 * Drawer — pieza reutilizable del kit MiCoin.
 *
 * Caja negra lista para conectar en cualquier pantalla.
 *
 * @param props - Ver DrawerProps / Props del archivo
 *
 * @example
 * import Drawer from '@/common/components/drawer';
 * <Drawer />
 */
const Drawer: FC<Props> = ({
  open,
  onOpenChange,
  title,
  children,
  className,
}) => {
  const insets = useSafeAreaInsets();
  const translateY = useSharedValue(40);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (!open) {
      translateY.value = 40;
      opacity.value = 0;
      return;
    }
    opacity.value = withTiming(1, { duration: 180 });
    translateY.value = withTiming(0, { duration: 220 });
  }, [open, opacity, translateY]);

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Modal
      transparent
      visible={open}
      animationType="none"
      onRequestClose={() => onOpenChange(false)}
    >
      <View className="flex-1 justify-end">
        <Animated.View
          pointerEvents="none"
          style={[StyleSheet.absoluteFillObject, styles.overlay, backdropStyle]}
        />
        <Pressable
          style={StyleSheet.absoluteFillObject}
          onPress={() => onOpenChange(false)}
        />
        <Animated.View
          className={cn(
            'border-t border-border bg-background px-4 pt-3',
            BRAND.radius.variants.surface,
            className
          )}
          style={[{ paddingBottom: insets.bottom + 16 }, sheetStyle]}
        >
          <View className="mb-3 items-center">
            <View className="h-1 w-10 rounded-full bg-border" />
          </View>
          {title && (
            <Text className="mb-3 text-base font-semibold">{title}</Text>
          )}
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});

export default Drawer;
