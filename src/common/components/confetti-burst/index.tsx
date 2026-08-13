import { type FC, useRef, useState } from 'react'
import { View } from 'react-native'
import ConfettiCannon from 'react-native-confetti-cannon'

import Button from '@components/button'
import BRAND from '@components/shared/brand'
import { useMcVar } from '@theme'

interface Props {
  count?: number
}

/**
 * ConfettiBurst — pieza reutilizable del kit MiCoin.
 *
 * Caja negra lista para conectar en cualquier pantalla.
 *
 * @param props - Ver ConfettiBurstProps / Props del archivo
 *
 * @param props.count
 * @example
 * import ConfettiBurst from '@components/confetti-burst';
 * <ConfettiBurst />
 */
const ConfettiBurst: FC<Props> = ({ count = 80 }) => {
  const [key, setKey] = useState(0)
  const brand = useMcVar(BRAND.native.brand)
  const primary = useMcVar(BRAND.native.primary)
  const card = useMcVar(BRAND.native.card)
  const confettiRef = useRef<ConfettiCannon>(null)

  return (
    <View className="relative h-40 items-center justify-center overflow-hidden">
      <Button
        size="sm"
        variant="brand"
        label="Celebrar"
        onPress={() => {
          setKey((value) => value + 1)
          confettiRef.current?.start()
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
  )
}

/**
 *
 */
export default ConfettiBurst
