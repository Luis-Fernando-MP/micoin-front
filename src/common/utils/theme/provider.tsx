import { type FC, type ReactNode, useEffect } from 'react'
import { View } from 'react-native'

import { StatusBar } from 'expo-status-bar'
import { ThemeProvider as NavigationThemeProvider } from '@react-navigation/native'
import { colorScheme as nativewindColorScheme } from 'nativewind'

import { useNavTheme } from '@components/nav/theme'

import { cn } from '@/lib/utils'

import { useTheme } from './hooks'

interface Props {
  children: ReactNode
}

/**
 * ThemeProvider — aplica preferencia de tema, NativeWind, React Navigation y StatusBar.
 *
 * @param children - Árbol de la app
 *
 * @example
 * import ThemeProvider from '@theme'
 * <ThemeProvider>{children}</ThemeProvider>
 */
const ThemeProvider: FC<Props> = ({ children }) => {
  const { colorScheme, statusBarStyle } = useTheme()
  const navTheme = useNavTheme()
  const isDark = colorScheme === 'dark'

  useEffect(() => {
    nativewindColorScheme.set(colorScheme)
  }, [colorScheme])

  return (
    <NavigationThemeProvider value={navTheme}>
      <View className={cn('flex-1 bg-background', isDark && 'dark')}>
        {children}
        <StatusBar style={statusBarStyle} />
      </View>
    </NavigationThemeProvider>
  )
}

export type { Props as ThemeProviderProps }
export default ThemeProvider
