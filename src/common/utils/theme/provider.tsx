import { type FC, type ReactNode, useEffect } from 'react'
import { View } from 'react-native'

import { StatusBar } from 'expo-status-bar'
import { ThemeProvider as NavigationThemeProvider } from '@react-navigation/native'
import { colorScheme as nativewindColorScheme } from 'nativewind'

import { useNavTheme } from '@components/nav/theme'
import { ThemeSystem } from '@theme/themes'

import { cn } from '@/lib/utils'

import { useTheme } from './hooks/use-theme'

interface Props {
  children: ReactNode
}

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
  const colorScheme = useTheme((state) => state.colorScheme)
  const theme = useTheme((state) => state.theme)
  const navTheme = useNavTheme()
  const nativeScheme = theme.system ?? ThemeSystem.Dark
  let statusBarStyle: ThemeSystem = ThemeSystem.Light
  if (theme.system === ThemeSystem.Light) {
    statusBarStyle = ThemeSystem.Dark
  }

  useEffect(() => {
    nativewindColorScheme.set(nativeScheme)
  }, [nativeScheme])

  return (
    <NavigationThemeProvider value={navTheme}>
      <View className={cn('flex-1 bg-background', colorScheme)}>
        {children}
        <StatusBar style={statusBarStyle} />
      </View>
    </NavigationThemeProvider>
  )
}

export type { Props as ThemeProviderProps }
export default ThemeProvider
