import { useUnstableNativeVariable } from 'nativewind';

import { mcVars } from '@/theme/css-vars';

type McVarKey = keyof typeof mcVars;

const useMcVar = (key: McVarKey, fallback = ''): string => {
  const value = useUnstableNativeVariable(mcVars[key]) as unknown;

  if (typeof value === 'string' && value.length > 0) {
    return value;
  }

  return fallback;
};

const useThemeVar = useMcVar;

export { useMcVar, useThemeVar };
