import { Image as ExpoImage, type ImageProps } from 'expo-image';
import { type FC } from 'react';
import { View, type DimensionValue } from 'react-native';

import { radius } from '@/common/components/shared/radius';
import {
  statusBorder,
  type Status,
} from '@/common/components/shared/status';
import { cn } from '@/lib/utils';

interface Props extends Omit<ImageProps, 'style'> {
  className?: string;
  status?: Status;
  frameClassName?: string;
  width?: DimensionValue;
  height?: DimensionValue;
  aspectRatio?: number;
}

const Image: FC<Props> = ({
  className,
  frameClassName,
  status = 'default',
  width = '100%',
  height,
  aspectRatio = 16 / 9,
  contentFit = 'cover',
  ...props
}) => {
  return (
    <View
      className={cn(
        'overflow-hidden border border-border bg-card',
        radius.surface,
        status !== 'default' && statusBorder({ status }),
        frameClassName
      )}
      style={{ width, height, aspectRatio: height ? undefined : aspectRatio }}
    >
      <ExpoImage
        className={cn('h-full w-full', className)}
        style={{ width: '100%', height: '100%' }}
        contentFit={contentFit}
        transition={200}
        {...props}
      />
    </View>
  );
};

export { Image };
export type { Props as ImageProps };
