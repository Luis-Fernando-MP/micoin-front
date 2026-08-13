import { Eye, EyeOff } from 'lucide-react-native';
import { type FC, useState } from 'react';
import { Pressable, View } from 'react-native';

import { Icon } from '@/common/components/icon';
import { radius } from '@/common/components/shared/radius';
import { Text } from '@/common/components/text';
import { cn } from '@/lib/utils';

interface Props {
  amount?: string;
  label?: string;
}

const PrivacyCover: FC<Props> = ({
  amount = '$1,248.90',
  label = 'Saldo disponible',
}) => {
  const [hidden, setHidden] = useState(true);

  return (
    <Pressable
      onPress={() => setHidden((value) => !value)}
      className={cn(
        'flex-row items-center justify-between border border-border bg-card px-4 py-3',
        radius.surface
      )}
    >
      <View className="gap-0.5">
        <Text className="text-xs text-secondary">{label}</Text>
        <Text className="text-2xl font-bold">
          {hidden ? '••••••' : amount}
        </Text>
      </View>
      <Icon icon={hidden ? EyeOff : Eye} size={20} />
    </Pressable>
  );
};

export { PrivacyCover };
