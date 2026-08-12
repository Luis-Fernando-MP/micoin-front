import { Stack } from 'expo-router';
import { type FC } from 'react';

const PrivateLayout: FC = () => {
  return (
    <Stack>
      <Stack.Screen name="explore" options={{ headerShown: false }} />
      <Stack.Screen
        name="modal"
        options={{ presentation: 'modal', title: 'Modal' }}
      />
    </Stack>
  );
};

export default PrivateLayout;
