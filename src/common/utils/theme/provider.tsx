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
 * Esquemas: `light`, `gray` (carbón Vercel) y `dark` (OLED).
 *
 * @param children - Árbol de la app
 *
 * @example
 * import ThemeProvider from '@theme'
 * <ThemeProvider>{children}</ThemeProvider>
 */
const ThemeProvider: FC<Props> = ({ children }) => {
  const { statusBarStyle, themeClass, nativeColorScheme } = useTheme()
  const navTheme = useNavTheme()

  useEffect(() => {
    nativewindColorScheme.set(nativeColorScheme)
  }, [nativeColorScheme])

  return (
    <NavigationThemeProvider value={navTheme}>
      <View className={cn('flex-1 bg-background', themeClass)}>
        {children}
        <StatusBar style={statusBarStyle} />
      </View>
    </NavigationThemeProvider>
  )
}

export type { Props as ThemeProviderProps }
export default ThemeProvider
