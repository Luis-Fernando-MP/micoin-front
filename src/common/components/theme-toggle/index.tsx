import { type FC, useEffect } from 'react'
import { Pressable, View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'

import { Moon, Sun } from 'lucide-react-native'

import BRAND from '@/common/components/shared/brand'
import { cn } from '@/lib/utils'
import { useTheme } from '@/theme/hooks/use-theme'
import { useMcVar } from '@/theme/hooks/use-theme-var'

/**
 * ThemeToggle — pieza reutilizable del kit MiCoin.
 *
 * Caja negra lista para conectar en cualquier pantalla.
 *
 * @param props - Ver ThemeToggleProps / Props del archivo
 *
 * @example
 * import ThemeToggle from '@/common/components/theme-toggle';
 * <ThemeToggle />
 */
const ThemeToggle: FC = () => {
  const { colorScheme, setPreference } = useTheme()
  const isDark = colorScheme === 'dark'
  const translateX = useSharedValue(isDark ? 36 : 4)
  const iconColor = useMcVar(BRAND.native.textPrimary)

  useEffect(() => {
    translateX.value = withSpring(isDark ? 36 : 4, {
      damping: 15,
      stiffness: 150,
    })
  }, [isDark, translateX])

  const knobStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }))

  const onToggle = () => {
    if (isDark) {
      setPreference('light')
      return
    }
    setPreference('dark')
  }

  return (
    <Pressable
      onPress={onToggle}
      className="relative h-10 w-20 flex-row items-center justify-between rounded-full bg-card p-1"
    >
      <View className="z-10 h-9 w-9 items-center justify-center">
        <Sun size={16} color={iconColor} />
      </View>
      <View className="z-10 h-9 w-9 items-center justify-center">
        <Moon size={16} color={iconColor} />
      </View>
      <Animated.View
        style={knobStyle}
        className={cn(
          'absolute h-9 w-9 rounded-full border border-border bg-background',
        )}
      />
    </Pressable>
  )
}

/**
 *
 */
export default ThemeToggle
