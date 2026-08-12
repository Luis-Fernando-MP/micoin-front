import { useColorScheme as useSystemColorScheme } from 'react-native';

import { useThemeStore } from '@/theme/store/theme-store';

const useTheme = () => {
  const preference = useThemeStore((state) => state.preference);
  const setPreference = useThemeStore((state) => state.setPreference);
  const systemScheme = useSystemColorScheme();

  let colorScheme: 'light' | 'dark' = systemScheme ?? 'light';
  if (preference !== 'system') {
    colorScheme = preference;
  }

  return {
    preference,
    setPreference,
    colorScheme,
  };
};

export { useTheme };
