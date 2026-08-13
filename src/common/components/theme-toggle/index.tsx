import { type FC, useEffect } from 'react'
import { Pressable, View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'

import BRAND from '@components/shared/brand'
import { BRAND_THEMES, useMcVar, useTheme } from '@theme'
import { useThemeStore } from '@theme/store'

import { cn } from '@/lib/utils'

const SLOT = 36
const KNOB_INSET = 4
const APPEARANCES = Object.keys(BRAND_THEMES) as (keyof typeof BRAND_THEMES)[]

/**
 * ThemeToggle — selector de apariencias de BRAND_THEMES.
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
  const colorScheme = useTheme((state) => state.colorScheme)
  const setPreference = useThemeStore((state) => state.setPreference)
  const translateX = useSharedValue(
    KNOB_INSET + SLOT * APPEARANCES.indexOf(colorScheme),
  )
  const iconColor = useMcVar(BRAND.native.textPrimary)

  useEffect(() => {
    translateX.value = withSpring(
      KNOB_INSET + SLOT * APPEARANCES.indexOf(colorScheme),
      { damping: 15, stiffness: 150 },
    )
  }, [colorScheme, translateX])

  const knobStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }))

  return (
    <View className="relative h-10 flex-row rounded-full bg-card p-1">
      {APPEARANCES.map((appearance) => {
        const Icon = BRAND_THEMES[appearance].icon
        return (
          <Pressable
            key={appearance}
            onPress={() => setPreference(appearance)}
            accessibilityLabel={BRAND_THEMES[appearance].label}
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
