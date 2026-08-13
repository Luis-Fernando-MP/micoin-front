import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { type FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { radius } from '@/common/components/shared/radius';
import { cn } from '@/lib/utils';
import { useMcVar } from '@/theme/hooks/use-theme-var';

interface Props {
  value?: string;
}

const FoilText: FC<Props> = ({ value = '$1,248.90' }) => {
  const primary = useMcVar('textPrimary', '#171717');
  const brand = useMcVar('brand', '#c9a227');

  return (
    <View className={cn('overflow-hidden', radius.control)}>
      <MaskedView
        style={{ height: 48, width: '100%' }}
        maskElement={
          <View style={styles.maskRoot}>
            <Text style={[styles.maskText, { color: primary }]}>{value}</Text>
          </View>
        }
      >
        <LinearGradient
          colors={[brand, '#ffffff', primary, brand]}
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

export { FoilText };
