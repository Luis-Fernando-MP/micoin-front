import {
  createAudioPlayer,
  setAudioModeAsync,
  type AudioPlayer as ExpoAudioPlayer,
} from 'expo-audio';
import { Pause, Play } from 'lucide-react-native';
import { type FC, useEffect, useRef, useState } from 'react';
import { View } from 'react-native';

import Button from '@/common/components/button';
import Text from '@/common/components/text';

const DEMO_URI =
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

interface Props {
  uri?: string;
  title?: string;
}

/**
 * AudioPlayer — pieza reutilizable del kit MiCoin.
 *
 * Caja negra lista para conectar en cualquier pantalla.
 *
 * @param props - Ver AudioPlayerProps / Props del archivo
 *
 * @example
 * import AudioPlayer from '@/common/components/audio-player';
 * <AudioPlayer />
 */
const AudioPlayer: FC<Props> = ({
  uri = DEMO_URI,
  title = 'Demo track',
}) => {
  const playerRef = useRef<ExpoAudioPlayer | null>(null);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const setup = async () => {
      try {
        await setAudioModeAsync({ playsInSilentMode: true });
        const player = createAudioPlayer({ uri });
        if (!mounted) {
          player.remove();
          return;
        }
        playerRef.current = player;
      } catch {
        if (mounted) {
          setError('No se pudo cargar el audio');
        }
      }
    };
    void setup();
    return () => {
      mounted = false;
      playerRef.current?.remove();
      playerRef.current = null;
    };
  }, [uri]);

  if (error) {
    return <Text className="text-sm text-error">{error}</Text>;
  }

  return (
    <View className="flex-row items-center gap-3">
      <Button
        size="sm"
        icon={playing ? Pause : Play}
        label={playing ? 'Pausa' : 'Play'}
        onPress={() => {
          const player = playerRef.current;
          if (!player) {
            return;
          }
          if (playing) {
            player.pause();
            setPlaying(false);
            return;
          }
          player.play();
          setPlaying(true);
        }}
      />
      <Text className="flex-1 text-sm text-secondary" numberOfLines={1}>
        {title}
      </Text>
    </View>
  );
};

export default AudioPlayer;
