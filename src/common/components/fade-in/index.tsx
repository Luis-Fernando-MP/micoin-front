import { type FC, type ReactNode, useEffect } from 'react'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

interface Props {
  children: ReactNode
  delay?: number
  className?: string
}

/**
 * FadeIn — entrada con fade y translateY.
 *
 * @param children - Contenido
 * @param children.children
 * @param delay - Retraso en ms. @default 0
 * @param children.delay
 * @param className - Clases NativeWind extra
 *
 * @param children.className
 * @example
 * import FadeIn from '@components/fade-in';
 * <FadeIn delay={80}>{children}</FadeIn>
 */
const FadeIn: FC<Props> = ({ children, delay = 0, className }) => {
  const opacity = useSharedValue(0)
  const translateY = useSharedValue(8)

  useEffect(() => {
    const timeout = setTimeout(() => {
      opacity.value = withTiming(1, { duration: 280 })
      translateY.value = withTiming(0, { duration: 280 })
    }, delay)

    return () => clearTimeout(timeout)
  }, [delay, opacity, translateY])

  const style = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }))

  return (
    <Animated.View className={className} style={style}>
      {children}
    </Animated.View>
  )
}

export type { Props as FadeInProps }
/**
 *
 */
export default FadeIn
