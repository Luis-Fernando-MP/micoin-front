import 'react-native-reanimated'
import '../global.css'

import { type FC, Fragment, type ReactNode } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { KeyboardProvider } from 'react-native-keyboard-controller'

import { Stack } from 'expo-router'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { PortalHost } from '@rn-primitives/portal'
import { StripeProvider } from '@stripe/stripe-react-native'
import { QueryClientProvider } from '@tanstack/react-query'

import { queryClient } from '@core'
import ThemeProvider from '@theme'

import { useSession } from '@/auth/use-session'
import { CameraHost } from '@/common/device/camera'

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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <BottomSheetModalProvider>
              <StripeGate>
                <RootNavigator />
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
