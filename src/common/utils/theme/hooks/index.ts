import { useColorScheme as useSystemColorScheme } from 'react-native'

import { useUnstableNativeVariable } from 'nativewind'

import { mcVars } from '@theme/css-vars'
import { type ThemeAppearance, useThemeStore } from '@theme/store'

type McVarKey = keyof typeof mcVars

/**
 * useTheme — lee la preferencia persistida y resuelve el esquema efectivo.
 *
 * @returns Preferencia, setter, `colorScheme` (light | gray | dark) y estilo de StatusBar
 *
 * @example
 * import { useTheme } from '@theme'
 * const { colorScheme, setPreference } = useTheme()
 */
const useTheme = () => {
  const preference = useThemeStore((state) => state.preference)
  const setPreference = useThemeStore((state) => state.setPreference)
  const systemScheme = useSystemColorScheme()

  let colorScheme: ThemeAppearance = 'light'
  if (systemScheme === 'dark') {
    colorScheme = 'dark'
  }
  if (preference !== 'system') {
    colorScheme = preference
  }

  let statusBarStyle: 'light' | 'dark' = 'dark'
  if (colorScheme !== 'light') {
    statusBarStyle = 'light'
  }

  let themeClass: 'dark' | 'gray' | undefined
  if (colorScheme === 'dark') {
    themeClass = 'dark'
  }
  if (colorScheme === 'gray') {
    themeClass = 'gray'
  }

  let nativeColorScheme: 'light' | 'dark' = 'light'
  if (colorScheme !== 'light') {
    nativeColorScheme = 'dark'
  }

  return {
    preference,
    setPreference,
    colorScheme,
    statusBarStyle,
    themeClass,
    nativeColorScheme,
  }
}

/**
 * useMcVar — resuelve una CSS variable `--mc-*` a color nativo.
 *
 * @param key - Token de `mcVars` / `BRAND.native`
 * @param fallback - Valor si NativeWind aún no resolvió. @default ''
 *
 * @example
 * import { useMcVar } from '@theme'
 * import BRAND from '@components/shared/brand'
 * const color = useMcVar(BRAND.native.brand)
 */
const useMcVar = (key: McVarKey, fallback = ''): string => {
  const value = useUnstableNativeVariable(mcVars[key]) as unknown

  if (typeof value === 'string' && value.length > 0) {
    return value
  }

  return fallback
}

const useThemeVar = useMcVar

export { useMcVar, useTheme, useThemeVar }
