import { type FC } from 'react';
import { Text as RNText, type TextProps as RNTextProps } from 'react-native';

import { cn } from '@/lib/utils';

interface Props extends RNTextProps {
  className?: string;
}

const Text: FC<Props> = ({ className, ...props }) => {
  return (
    <RNText className={cn('text-base text-foreground', className)} {...props} />
  );
};

export type { Props as TextProps };
export { Text };
