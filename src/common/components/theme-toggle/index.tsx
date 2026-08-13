import { type FC, useEffect } from 'react'
import { Pressable, View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'

import { Moon, Square, Sun } from 'lucide-react-native'

import BRAND from '@components/shared/brand'
import { type ThemeAppearance, useMcVar, useTheme } from '@theme'

import { cn } from '@/lib/utils'

const SLOT = 36
const KNOB_INSET = 4
const KNOB_X = {
  light: KNOB_INSET,
  gray: KNOB_INSET + SLOT,
  dark: KNOB_INSET + SLOT * 2,
} as const

const OPTIONS = [
  { appearance: 'light' as const, icon: Sun },
  { appearance: 'gray' as const, icon: Square },
  { appearance: 'dark' as const, icon: Moon },
]

/**
 * ThemeToggle — selector light / gray / dark del kit MiCoin.
 *
 * El control se suscribe al store; el padre no pasa el esquema por props.
 *
 * @param props - Sin props; el control lee el store de tema
 *
 * @example
 * import ThemeToggle from '@components/theme-toggle'
 * <ThemeToggle />
 */
const ThemeToggle: FC = () => {
  const { colorScheme, setPreference } = useTheme()
  const translateX = useSharedValue(KNOB_X[colorScheme])
  const iconColor = useMcVar(BRAND.native.textPrimary)

  useEffect(() => {
    translateX.value = withSpring(KNOB_X[colorScheme], {
      damping: 15,
      stiffness: 150,
    })
  }, [colorScheme, translateX])

  const knobStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }))

  const onSelect = (appearance: ThemeAppearance) => {
    setPreference(appearance)
  }

  return (
    <View className="relative h-10 flex-row rounded-full bg-card p-1">
      {OPTIONS.map((option) => {
        const Icon = option.icon
        return (
          <Pressable
            key={option.appearance}
            onPress={() => onSelect(option.appearance)}
            className="z-10 h-9 w-9 items-center justify-center"
          >
            <Icon size={16} color={iconColor} />
          </Pressable>
        )
      })}
      <Animated.View
        style={knobStyle}
        className={cn(
          'absolute h-9 w-9 rounded-full border border-border bg-background',
        )}
      />
    </View>
  )
}

/**
 *
 */
export default ThemeToggle
