import { type FC, type ReactNode, useEffect } from 'react'
import { View } from 'react-native'

import { ThemeProvider as NavigationThemeProvider } from '@react-navigation/native'
import { colorScheme as nativewindColorScheme } from 'nativewind'

import { cn } from '@/lib/utils'
import { useTheme } from '@/theme/hooks/use-theme'
import { useNavTheme } from '@/theme/nav-theme'

interface Props {
  children: ReactNode
}

const ThemeProvider: FC<Props> = ({ children }) => {
  const { colorScheme } = useTheme()
  const navTheme = useNavTheme()
  const isDark = colorScheme === 'dark'

  useEffect(() => {
    nativewindColorScheme.set(colorScheme)
  }, [colorScheme])

  return (
    <NavigationThemeProvider value={navTheme}>
      <View className={cn('flex-1 bg-background', isDark && 'dark')}>
        {children}
      </View>
    </NavigationThemeProvider>
  )
}

export { ThemeProvider }
