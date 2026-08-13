import { useVideoPlayer, VideoView } from 'expo-video';
import { type FC } from 'react';
import { View } from 'react-native';
import BRAND, { type BrandStatus, type BrandSize } from '@/common/components/shared/brand';

import Text from '@/common/components/text';
import { cn } from '@/lib/utils';

const DEMO =
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';

interface Props {
  uri?: string;
  height?: number;
}

/**
 * VideoPlayer — pieza reutilizable del kit MiCoin.
 *
 * Caja negra lista para conectar en cualquier pantalla.
 *
 * @param props - Ver VideoPlayerProps / Props del archivo
 *
 * @example
 * import VideoPlayer from '@/common/components/video-player';
 * <VideoPlayer />
 */
const VideoPlayer: FC<Props> = ({ uri = DEMO, height = 180 }) => {
  const player = useVideoPlayer(uri, (instance) => {
    instance.loop = true;
  });

  return (
    <View className="gap-2">
      <VideoView
        player={player}
        style={{ width: '100%', height, borderRadius: 16 }}
        className={cn(BRAND.radius.variants.surface)}
        allowsFullscreen
        nativeControls
      />
      <Text className="text-xs text-secondary">
        expo-video · controles nativos
      </Text>
    </View>
  );
};

export default VideoPlayer;
