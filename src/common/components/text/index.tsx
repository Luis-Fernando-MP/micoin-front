import { type FC } from 'react';
import { Text as RNText, type TextProps as RNTextProps } from 'react-native';

import {
  statusText,
  type Status,
} from '@/common/components/shared/status';
import { cn } from '@/lib/utils';

interface Props extends RNTextProps {
  className?: string;
  status?: Status;
}

const Text: FC<Props> = ({ className, status = 'default', ...props }) => {
  return (
    <RNText
      className={cn('text-base', statusText({ status }), className)}
      {...props}
    />
  );
};

export type { Props as TextProps };
export { Text };
