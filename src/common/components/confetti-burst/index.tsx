import { type FC, useRef, useState } from 'react';
import { View } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';

import { Button } from '@/common/components/button';
import { useMcVar } from '@/theme/hooks/use-theme-var';

interface Props {
  count?: number;
}

const ConfettiBurst: FC<Props> = ({ count = 80 }) => {
  const [key, setKey] = useState(0);
  const brand = useMcVar('brand', '#c9a227');
  const primary = useMcVar('primary', '#171717');
  const card = useMcVar('card', '#ffffff');
  const confettiRef = useRef<ConfettiCannon>(null);

  return (
    <View className="relative h-40 items-center justify-center overflow-hidden">
      <Button
        size="sm"
        variant="brand"
        label="Celebrar"
        onPress={() => {
          setKey((value) => value + 1);
          confettiRef.current?.start();
        }}
      />
      <ConfettiCannon
        key={key}
        ref={confettiRef}
        count={count}
        origin={{ x: 140, y: 0 }}
        fadeOut
        autoStart={false}
        colors={[brand, primary, card]}
      />
    </View>
  );
};

export { ConfettiBurst };
