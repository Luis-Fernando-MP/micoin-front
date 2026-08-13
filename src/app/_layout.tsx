import 'react-native-reanimated'
import '../global.css'

import { type FC, Fragment, type ReactNode, useEffect, useState } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { KeyboardProvider } from 'react-native-keyboard-controller'

import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { PortalHost } from '@rn-primitives/portal'
import { StripeProvider } from '@stripe/stripe-react-native'
import { QueryClientProvider } from '@tanstack/react-query'

import { useSession } from '@/auth/use-session'
import { queryClient } from '@/common/core'
import { CameraHost } from '@/common/device/camera'
import { useTheme } from '@/theme/hooks/use-theme'
import { ThemeProvider } from '@/theme/provider'

export const unstable_settings = {
  anchor: '(public)',
}

const stripeKey = process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ''

const StripeGate: FC<{ children: ReactNode }> = ({ children }) => {
  const content = <Fragment>{children}</Fragment>
  if (!stripeKey) {
    return content
  }
  return <StripeProvider publishableKey={stripeKey}>{content}</StripeProvider>
}

const RootLayout: FC = () => {
  const { isAuthenticated, isPending } = useSession()
  const { colorScheme } = useTheme()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!isPending) {
      setReady(true)
    }
  }, [isPending])

  let statusStyle: 'light' | 'dark' = 'dark'
  if (colorScheme === 'dark') {
    statusStyle = 'light'
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <BottomSheetModalProvider>
              <StripeGate>
                {ready && (
                  <Stack>
                    <Stack.Screen
                      name="(public)"
                      options={{ headerShown: false }}
                    />
                    <Stack.Protected guard={isAuthenticated}>
                      <Stack.Screen
                        name="(private)"
                        options={{ headerShown: false }}
                      />
                    </Stack.Protected>
                  </Stack>
                )}
                <StatusBar style={statusStyle} />
                <PortalHost />
                <CameraHost />
              </StripeGate>
            </BottomSheetModalProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </KeyboardProvider>
    </GestureHandlerRootView>
  )
}

export default RootLayout
