import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { SYSTEM_PREFERENCE, type ThemePreference } from '@theme/themes'

type ThemeState = {
  preference: ThemePreference
  setPreference: (preference: ThemePreference) => void
}

/**
 * Store persistido de preferencia de tema (apariencia del catálogo o sistema).
 *
 * @example
 * import { useThemeStore } from '@theme/store'
 * const preference = useThemeStore((state) => state.preference)
 */
export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      preference: SYSTEM_PREFERENCE,
      setPreference: (preference) => set({ preference }),
    }),
    {
      name: 'micoin-theme',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
)

export type { ThemePreference }
