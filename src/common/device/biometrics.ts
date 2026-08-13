import * as LocalAuthentication from 'expo-local-authentication';

import { metadata } from '@/common/metadata';

const authenticateBiometric = async (
  promptMessage = metadata.biometricPrompt
) => {
  const hasHardware = await LocalAuthentication.hasHardwareAsync();
  if (!hasHardware) {
    return { ok: false as const, reason: 'no_hardware' as const };
  }

  const enrolled = await LocalAuthentication.isEnrolledAsync();
  if (!enrolled) {
    return { ok: false as const, reason: 'not_enrolled' as const };
  }

  const result = await LocalAuthentication.authenticateAsync({
    promptMessage,
    cancelLabel: metadata.biometricCancel,
    disableDeviceFallback: false,
  });

  if (!result.success) {
    return { ok: false as const, reason: 'failed' as const };
  }

  return { ok: true as const };
};

export { authenticateBiometric };
