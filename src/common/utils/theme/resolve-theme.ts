import {
  BRAND_THEMES,
  SYSTEM_PREFERENCE,
  type ThemeAppearance,
  type ThemeEntry,
  type ThemePreference,
  ThemeSystem,
} from '@theme/themes'

type ThemeResolved = {
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
 * resolveTheme — resuelve apariencia activa del catálogo BRAND_THEMES.
 *
 * @param preference - Preferencia persistida
 * @param systemScheme - Esquema del sistema (`light` / `dark`)
 *
 * @example
 * resolveTheme('dark', 'light')
 */
const resolveTheme = (
  preference: ThemePreference,
  systemScheme: 'light' | 'dark' | null | undefined,
): ThemeResolved => {
  let colorScheme = appearanceFromSystem(systemScheme === ThemeSystem.Dark)
  if (preference !== SYSTEM_PREFERENCE && preference in BRAND_THEMES) {
    colorScheme = preference as ThemeAppearance
  }

  return {
    colorScheme,
    theme: BRAND_THEMES[colorScheme],
  }
}

export { resolveTheme }
export type { ThemeResolved }
