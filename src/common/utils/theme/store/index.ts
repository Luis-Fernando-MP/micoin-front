import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export type ThemeAppearance = 'light' | 'gray' | 'dark'
export type ThemePreference = ThemeAppearance | 'system'

type ThemeState = {
  preference: ThemePreference
  setPreference: (preference: ThemePreference) => void
}

/**
 * Store persistido de preferencia de tema (claro / gray / oscuro / sistema).
 *
 * @example
 * import { useThemeStore } from '@theme/store'
 * const preference = useThemeStore((state) => state.preference)
 */
export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      preference: 'system',
      setPreference: (preference) => set({ preference }),
    }),
    {
      name: 'micoin-theme',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
)
