import { Stack } from 'expo-router';
import { type FC } from 'react';

const PublicLayout: FC = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ title: 'Login' }} />
      <Stack.Screen name="register" options={{ title: 'Register' }} />
    </Stack>
  );
};

export default PublicLayout;
