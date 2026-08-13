import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { type FC, useState } from 'react';
import { View } from 'react-native';

import { Text } from '@/common/components/text';
import { useMcVar } from '@/theme/hooks/use-theme-var';

interface Props {
  values?: string[];
  onChange?: (value: string, index: number) => void;
}

const SegmentedTabs: FC<Props> = ({
  values = ['Hoy', 'Semana', 'Mes'],
  onChange,
}) => {
  const [index, setIndex] = useState(0);
  const tint = useMcVar('primary', '#171717');
  const background = useMcVar('border', '#eaeaea');

  return (
    <View className="gap-2">
      <SegmentedControl
        values={values}
        selectedIndex={index}
        onChange={(event) => {
          const next = event.nativeEvent.selectedSegmentIndex;
          setIndex(next);
          onChange?.(values[next] ?? '', next);
        }}
        tintColor={tint}
        backgroundColor={background}
        fontStyle={{ color: tint }}
        activeFontStyle={{ color: '#ffffff' }}
      />
      <Text className="text-sm text-secondary">
        Tab: {values[index]}
      </Text>
    </View>
  );
};

export { SegmentedTabs };
