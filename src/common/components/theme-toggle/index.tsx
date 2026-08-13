import { type FC } from 'react'
import { useColorScheme as useSystemColorScheme, View } from 'react-native'

import Button from '@components/button'
import { BRAND_THEMES, resolveTheme } from '@theme'
import { useThemeStore } from '@theme/store'
import { type ThemeAppearance } from '@theme/themes'

const APPEARANCES = Object.keys(BRAND_THEMES) as ThemeAppearance[]

/**
 * ThemeToggle — selector de apariencias de BRAND_THEMES.
 *
 * Botones icon-only; el activo usa variant outline sin animaciones.
 *
 * @example
 * import ThemeToggle from '@components/theme-toggle'
 * <ThemeToggle />
 */
const ThemeToggle: FC = () => {
  const preference = useThemeStore((state) => state.preference)
  const setPreference = useThemeStore((state) => state.setPreference)
  const systemScheme = useSystemColorScheme()
  const activeAppearance = resolveTheme(preference, systemScheme).colorScheme

  return (
    <View className="flex-row gap-1 rounded-full bg-card p-1">
      {APPEARANCES.map((appearance) => {
        const active = appearance === activeAppearance

        return (
          <Button
            key={appearance}
            icon={BRAND_THEMES[appearance].icon}
            size="icon"
            variant={active ? 'brand' : 'ghost'}
            onPress={() => setPreference(appearance)}
            accessibilityLabel={BRAND_THEMES[appearance].label}
          />
        )
      })}
    </View>
  )
}

export default ThemeToggle
