import { type FC, useState } from 'react'
import { View } from 'react-native'

import SegmentedControl from '@react-native-segmented-control/segmented-control'

import BRAND from '@components/shared/brand'
import Text from '@components/text'
import { useMcVar } from '@theme'

interface Props {
  values?: string[]
  onChange?: (value: string, index: number) => void
}

/**
 * SegmentedTabs — pieza reutilizable del kit MiCoin.
 *
 * Caja negra lista para conectar en cualquier pantalla.
 *
 * @param props - Ver SegmentedTabsProps / Props del archivo
 *
 * @param props.values
 * @param props.onChange
 * @example
 * import SegmentedTabs from '@components/segmented-tabs';
 * <SegmentedTabs />
 */
const SegmentedTabs: FC<Props> = ({
  values = ['Hoy', 'Semana', 'Mes'],
  onChange,
}) => {
  const [index, setIndex] = useState(0)
  const tint = useMcVar(BRAND.native.primary)
  const background = useMcVar(BRAND.native.border)
  const foreground = useMcVar(BRAND.native.primaryForeground)

  return (
    <View className="gap-2">
      <SegmentedControl
        values={values}
        selectedIndex={index}
        onChange={(event) => {
          const next = event.nativeEvent.selectedSegmentIndex
          setIndex(next)
          onChange?.(values[next] ?? '', next)
        }}
        tintColor={tint}
        backgroundColor={background}
        fontStyle={{ color: tint }}
        activeFontStyle={{ color: foreground }}
      />
      <Text className="text-sm text-secondary">Tab: {values[index]}</Text>
    </View>
  )
}

/**
 *
 */
export default SegmentedTabs
