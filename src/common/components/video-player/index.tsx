import { useVideoPlayer, VideoView } from 'expo-video';
import { type FC } from 'react';
import { View } from 'react-native';

import { radius } from '@/common/components/shared/radius';
import { Text } from '@/common/components/text';
import { cn } from '@/lib/utils';

const DEMO =
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';

interface Props {
  uri?: string;
  height?: number;
}

const VideoPlayer: FC<Props> = ({ uri = DEMO, height = 180 }) => {
  const player = useVideoPlayer(uri, (instance) => {
    instance.loop = true;
  });

  return (
    <View className="gap-2">
      <VideoView
        player={player}
        style={{ width: '100%', height, borderRadius: 16 }}
        className={cn(radius.surface)}
        allowsFullscreen
        nativeControls
      />
      <Text className="text-xs text-secondary">
        expo-video · controles nativos
      </Text>
    </View>
  );
};

export { VideoPlayer };
