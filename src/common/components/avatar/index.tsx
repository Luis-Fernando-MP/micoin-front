import { Image as ExpoImage } from 'expo-image';
import { type FC, useState } from 'react';
import { View } from 'react-native';

import { radius } from '@/common/components/shared/radius';
import {
  statusBorder,
  type Status,
} from '@/common/components/shared/status';
import { Text } from '@/common/components/text';
import { cn } from '@/lib/utils';

interface Props {
  uri?: string;
  source?: string;
  fallback?: string;
  size?: number;
  className?: string;
  status?: Status;
}

const Avatar: FC<Props> = ({
  uri,
  source,
  fallback = '?',
  size = 40,
  className,
  status = 'default',
}) => {
  const [failed, setFailed] = useState(false);
  const imageUri = uri ?? source;
  const showImage = Boolean(imageUri) && !failed;
  const initials = fallback.slice(0, 2).toUpperCase();

  return (
    <View
      className={cn(
        'items-center justify-center overflow-hidden border bg-card',
        radius.pill,
        statusBorder({ status }),
        className
      )}
      style={{ width: size, height: size }}
    >
      {showImage && (
        <ExpoImage
          source={{ uri: imageUri }}
          style={{ width: size, height: size }}
          contentFit="cover"
          onError={() => setFailed(true)}
        />
      )}
      {!showImage && (
        <Text className="text-sm font-semibold">{initials}</Text>
      )}
    </View>
  );
};

export { Avatar };
