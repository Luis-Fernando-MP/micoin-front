import * as SecureStore from 'expo-secure-store'
import { expoClient } from '@better-auth/expo/client'
import { createAuthClient } from 'better-auth/react'

import { API_URL } from '@env'

export const authClient = createAuthClient({
  baseURL: API_URL,
  plugins: [
    expoClient({
      scheme: 'micoin',
      storagePrefix: 'micoin',
      storage: SecureStore,
    }) as any,
  ],
})

const getAuthCookie = () => {
  return (
    authClient as typeof authClient & { getCookie: () => string }
  ).getCookie()
}

export const { useSession, signIn, signUp, signOut } = authClient

export { getAuthCookie }
