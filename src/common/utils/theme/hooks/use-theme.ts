import { useColorScheme as useSystemColorScheme } from 'react-native'

import { useThemeStore } from '@theme/store'
import {
  BRAND_THEMES,
  SYSTEM_PREFERENCE,
  type ThemeAppearance,
  type ThemeEntry,
  type ThemePreference,
  ThemeSystem,
} from '@theme/themes'

type ThemeResolved = {
  preference: ThemePreference
  colorScheme: ThemeAppearance
  theme: ThemeEntry
}

const appearances = () => Object.keys(BRAND_THEMES) as ThemeAppearance[]

const appearanceFromSystem = (osDark: boolean): ThemeAppearance => {
  const wanted = osDark ? ThemeSystem.Dark : ThemeSystem.Light
  const match = appearances().find((id) => BRAND_THEMES[id].system === wanted)
  if (match) {
    return match
  }
  const lightFallback = appearances().find(
    (id) => BRAND_THEMES[id].system === ThemeSystem.Light,
  )
  return lightFallback ?? appearances()[0]
}

/**
 * useTheme — estado resuelto del catálogo BRAND_THEMES con selector mínimo.
 *
 * Acciones del store: `useThemeStore((s) => s.setPreference)`.
 *
 * @param selector - Campo o proyección del estado resuelto
 *
 * @example
 * import { useTheme } from '@theme'
 * import { useThemeStore } from '@theme/store'
 * const colorScheme = useTheme((s) => s.colorScheme)
 * const setPreference = useThemeStore((s) => s.setPreference)
 */
const useTheme = <T>(selector: (state: ThemeResolved) => T): T => {
  const preference = useThemeStore((state) => state.preference)
  const systemScheme = useSystemColorScheme()

  let colorScheme = appearanceFromSystem(systemScheme === ThemeSystem.Dark)
  if (preference !== SYSTEM_PREFERENCE && preference in BRAND_THEMES) {
    colorScheme = preference
  }

  return selector({
    preference,
    colorScheme,
    theme: BRAND_THEMES[colorScheme],
  })
}

export { useTheme }
export type { ThemeResolved }
