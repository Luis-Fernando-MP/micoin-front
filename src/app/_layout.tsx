import 'react-native-reanimated'
import '../global.css'

import { type FC, Fragment, type ReactNode } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { KeyboardProvider } from 'react-native-keyboard-controller'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { PortalHost } from '@rn-primitives/portal'
import { StripeProvider } from '@stripe/stripe-react-native'
import { QueryClientProvider } from '@tanstack/react-query'
import { Stack } from 'expo-router'

import { queryClient } from '@core'
import CameraHost from '@device/camera'
import ScannerHost from '@device/scanner'
import { STRIPE_PUBLISHABLE_KEY } from '@env'
import ThemeProvider from '@theme'

import { useSession } from '@/auth/use-session'

export const unstable_settings = {
  anchor: '(public)',
}

const stripeKey = STRIPE_PUBLISHABLE_KEY

const StripeGate: FC<{ children: ReactNode }> = ({ children }) => {
  const content = <Fragment>{children}</Fragment>
  if (!stripeKey) {
    return content
  }
  return <StripeProvider publishableKey={stripeKey}>{content}</StripeProvider>
}

const RootNavigator: FC = () => {
  const { isAuthenticated, isPending } = useSession()

  if (isPending) {
    return null
  }

  return (
    <Stack>
      <Stack.Screen name="(public)" options={{ headerShown: false }} />
      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen name="(private)" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  )
}

const RootLayout: FC = () => {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <KeyboardProvider>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider>
              <BottomSheetModalProvider>
                <StripeGate>
                  <RootNavigator />
                  <PortalHost />
                  <CameraHost />
                  <ScannerHost />
                </StripeGate>
              </BottomSheetModalProvider>
            </ThemeProvider>
          </QueryClientProvider>
        </KeyboardProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  )
}

export default RootLayout
