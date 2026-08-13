import { DarkTheme, DefaultTheme, type Theme } from '@react-navigation/native'

import BRAND from '@components/shared/brand'
import { useMcVar } from '@theme/hooks/use-mc-var'
import { useTheme } from '@theme/hooks/use-theme'
import { ThemeSystem } from '@theme/themes'

/**
 * useNavTheme — paleta de React Navigation alineada a tokens BRAND.
 *
 * Usa `theme.system` del catálogo: light → DefaultTheme, resto → DarkTheme.
 *
 * @returns Tema con colores `--mc-*` resueltos
 *
 * @example
 * import { useNavTheme } from '@components/nav/theme'
 * const navTheme = useNavTheme()
 */
const useNavTheme = (): Theme => {
  const theme = useTheme((state) => state.theme)
  const primary = useMcVar(BRAND.native.primary)
  const background = useMcVar(BRAND.native.background)
  const card = useMcVar(BRAND.native.card)
  const text = useMcVar(BRAND.native.textPrimary)
  const border = useMcVar(BRAND.native.border)
  const notification = useMcVar(BRAND.colors.variants.error.native)

  const chrome = theme.system ?? ThemeSystem.Dark
  const base = chrome === ThemeSystem.Light ? DefaultTheme : DarkTheme

  return {
    ...base,
    colors: {
      ...base.colors,
      primary,
      background,
      card,
      text,
      border,
      notification,
    },
  }
}

export { useNavTheme }
