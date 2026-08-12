import { type FC, type ReactNode } from 'react';
import { Modal as RNModal, Pressable } from 'react-native';

import { Text } from '@/common/text';
import { cn } from '@/lib/utils';

interface Props {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
}

const AppModal: FC<Props> = ({
  visible,
  onClose,
  title,
  children,
  className,
}) => {
  return (
    <RNModal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable
        className="flex-1 items-center justify-center bg-foreground/50 px-6"
        onPress={onClose}
      >
        <Pressable
          className={cn(
            'w-full rounded-2xl border border-card-hover bg-card p-5',
            className
          )}
          onPress={(event) => event.stopPropagation()}
        >
          {title && (
            <Text className="mb-3 text-lg font-semibold">{title}</Text>
          )}
          {children}
        </Pressable>
      </Pressable>
    </RNModal>
  );
};

export { AppModal };
