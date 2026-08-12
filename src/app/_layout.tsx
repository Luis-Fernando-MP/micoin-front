import { PortalHost } from '@rn-primitives/portal';
import { QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { type FC } from 'react';
import 'react-native-reanimated';

import '../global.css';

import { useSession } from '@/auth/use-session';
import { queryClient } from '@/common/core';
import { useTheme } from '@/theme/hooks/use-theme';
import { ThemeProvider } from '@/theme/provider';

export const unstable_settings = {
  anchor: '(public)',
};

const RootLayout: FC = () => {
  const { isAuthenticated, isPending } = useSession();
  const { colorScheme } = useTheme();

  if (isPending) {
    return null;
  }

  let statusStyle: 'light' | 'dark' = 'dark';
  if (colorScheme === 'dark') {
    statusStyle = 'light';
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Stack>
          <Stack.Screen name="(public)" options={{ headerShown: false }} />
          <Stack.Protected guard={isAuthenticated}>
            <Stack.Screen name="(private)" options={{ headerShown: false }} />
          </Stack.Protected>
        </Stack>
        <StatusBar style={statusStyle} />
        <PortalHost />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default RootLayout;
