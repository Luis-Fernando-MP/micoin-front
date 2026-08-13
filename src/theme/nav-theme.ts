import { DarkTheme, DefaultTheme, type Theme } from '@react-navigation/native'

import { useTheme } from '@/theme/hooks/use-theme'
import { useMcVar } from '@/theme/hooks/use-theme-var'

const useNavTheme = (): Theme => {
  const { colorScheme } = useTheme()
  const primary = useMcVar('primary', DefaultTheme.colors.primary)
  const background = useMcVar('background', DefaultTheme.colors.background)
  const card = useMcVar('card', DefaultTheme.colors.card)
  const text = useMcVar('textPrimary', DefaultTheme.colors.text)
  const border = useMcVar('cardHover', DefaultTheme.colors.border)
  const notification = useMcVar(
    'semanticTextError',
    DefaultTheme.colors.notification,
  )

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
