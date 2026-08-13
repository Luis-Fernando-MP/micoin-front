import { DarkTheme, DefaultTheme, type Theme } from '@react-navigation/native'

import BRAND from '@components/shared/brand'
import { useMcVar, useTheme } from '@theme/hooks'

/**
 * useNavTheme — paleta de React Navigation alineada a tokens BRAND.
 *
 * @returns Tema claro u oscuro con colores `--mc-*` resueltos
 *
 * @example
 * import { useNavTheme } from '@components/nav/theme'
 * const navTheme = useNavTheme()
 */
const useNavTheme = (): Theme => {
  const { colorScheme } = useTheme()
  const primary = useMcVar(BRAND.native.primary)
  const background = useMcVar(BRAND.native.background)
  const card = useMcVar(BRAND.native.card)
  const text = useMcVar(BRAND.native.textPrimary)
  const border = useMcVar(BRAND.native.border)
  const notification = useMcVar(BRAND.colors.variants.error.native)

  let base = DefaultTheme
  if (colorScheme === 'dark') {
    base = DarkTheme
  }

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
