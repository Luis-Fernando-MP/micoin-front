import { useUnstableNativeVariable } from 'nativewind'

import { THEME_VARIABLES, type ThemeVariable } from '@theme/themes'

/**
 * useMcVar — resuelve una CSS variable `--mc-*` a color nativo.
 *
 * @param key - Clave de `THEME_VARIABLES` / `BRAND.native`
 * @param fallback - Valor si NativeWind aún no resolvió. @default ''
 *
 * @example
 * import { useMcVar } from '@theme'
 * import BRAND from '@components/shared/brand'
 * const color = useMcVar(BRAND.native.brand)
 */
const useMcVar = (key: ThemeVariable, fallback = ''): string => {
  const value = useUnstableNativeVariable(THEME_VARIABLES[key]) as unknown

  if (typeof value === 'string' && value.length > 0) {
    return value
  }

  return fallback
}

export { useMcVar }
