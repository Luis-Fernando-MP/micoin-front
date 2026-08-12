import { Link } from 'expo-router';
import { type FC } from 'react';
import { View } from 'react-native';

import { Button } from '@/common/button';
import { Text } from '@/common/text';

const Modal: FC = () => {
  return (
    <View className="flex-1 items-center justify-center gap-4 bg-background p-5">
      <Text className="text-2xl font-bold">Private modal</Text>
      <Link href="/" dismissTo asChild>
        <Button variant="outline" label="Back home" />
      </Link>
    </View>
  );
};

export { Modal };
