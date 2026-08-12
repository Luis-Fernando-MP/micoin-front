import { expoClient } from '@better-auth/expo/client';
import { createAuthClient } from 'better-auth/react';
import * as SecureStore from 'expo-secure-store';

const baseURL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:8000';

export const authClient = createAuthClient({
  baseURL,
  plugins: [
    expoClient({
      scheme: 'micoin',
      storagePrefix: 'micoin',
      storage: SecureStore,
    }) as any,
  ],
});

const getAuthCookie = () => {
  return (
    authClient as typeof authClient & { getCookie: () => string }
  ).getCookie();
};

export const { useSession, signIn, signUp, signOut } = authClient;

export { getAuthCookie };
