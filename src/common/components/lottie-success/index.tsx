import LottieView from 'lottie-react-native';
import { type FC, useRef } from 'react';
import { View } from 'react-native';

import { Button } from '@/common/components/button';

const SUCCESS_URI =
  'https://assets10.lottiefiles.com/packages/lf20_jbrw3hcz.json';

interface Props {
  uri?: string;
  size?: number;
}

const LottieSuccess: FC<Props> = ({ uri = SUCCESS_URI, size = 120 }) => {
  const ref = useRef<LottieView>(null);

  return (
    <View className="items-center gap-2">
      <LottieView
        ref={ref}
        source={{ uri }}
        autoPlay
        loop={false}
        style={{ width: size, height: size }}
      />
      <Button
        size="sm"
        variant="outline"
        label="Replay"
        onPress={() => {
          ref.current?.reset();
          ref.current?.play();
        }}
      />
    </View>
  );
};

export { LottieSuccess };
