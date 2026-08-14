import { type FC, useRef } from 'react'
import { View } from 'react-native'

import LottieView from 'lottie-react-native'

import Button from '@components/button'

const SUCCESS_URI =
  'https://assets10.lottiefiles.com/packages/lf20_jbrw3hcz.json'

interface Props {
  uri?: string
  size?: number
}

/**
 * LottieSuccess — pieza reutilizable del kit MiCoin.
 *
 * Caja negra lista para conectar en cualquier pantalla.
 *
 * @param props - Ver LottieSuccessProps / Props del archivo
 *
 * @param props.uri
 * @param props.size
 * @example
 * import LottieSuccess from '@components/lottie-success';
 * <LottieSuccess />
 */
const LottieSuccess: FC<Props> = ({ uri = SUCCESS_URI, size = 120 }) => {
  const ref = useRef<LottieView>(null)

  return (
    <View className="items-center gap-2">
      <LottieView
        ref={ref}
        source={{ uri }}
        autoPlay
        loop={false}
        style={{ width: size, height: size }}
      />
      <Button
        size="sm"
        variant="outline"
        label="Replay"
        onPress={() => {
          ref.current?.reset()
          ref.current?.play()
        }}
      />
    </View>
  )
}

export default LottieSuccess
