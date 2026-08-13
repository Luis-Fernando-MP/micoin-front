import { type FC } from 'react';
import { View } from 'react-native';

import Maps from '@/common/components/maps';

/**
 * MapsGallery — composición de Maps + extensions para el lab.
 *
 * @example
 * import MapsGallery from '@/presentation/home/wow-maps';
 * <MapsGallery />
 */
const MapsGallery: FC = () => {
  return (
    <View className="gap-6">
      <Maps.RoutePlanner />
      <Maps.PlacePins />
      <Maps.DropPin />
    </View>
  );
};

export default MapsGallery;
