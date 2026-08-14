import { type FC, memo, type ReactNode } from 'react'
import { useColorScheme as useSystemColorScheme, View } from 'react-native'

import { StatusBar } from 'expo-status-bar'
import {
  DarkTheme,
  ThemeProvider as NavigationThemeProvider,
} from '@react-navigation/native'

import { resolveTheme } from '@theme'
import { useThemeStore } from '@theme/store'
import { ThemeSystem } from '@theme/themes'

import { cn } from '@/lib/utils'

interface Props {
  children: ReactNode
}

const ThemeShell = memo(({ children }: { children: ReactNode }) => children)

ThemeShell.displayName = 'ThemeShell'

/**
 * ThemeProvider
 *
 * @param children - Árbol de la app
 *
 * @example
 * import ThemeProvider from '@theme'
 * <ThemeProvider>{children}</ThemeProvider>
 */
const ThemeProvider: FC<Props> = ({ children }) => {
  const preference = useThemeStore((state) => state.preference)
  const systemScheme = useSystemColorScheme()
  const { colorScheme, theme } = resolveTheme(preference, systemScheme)
  let statusBarStyle: ThemeSystem = ThemeSystem.Light
  if (theme.system === ThemeSystem.Light) {
    statusBarStyle = ThemeSystem.Dark
  }

  return (
    <NavigationThemeProvider value={DarkTheme}>
      <View className={cn('flex-1 bg-background', colorScheme)}>
        <ThemeShell>{children}</ThemeShell>
        <StatusBar style={statusBarStyle} />
      </View>
    </NavigationThemeProvider>
  )
}

export type { Props as ThemeProviderProps }
export default ThemeProvider
