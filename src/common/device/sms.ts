import * as SMS from 'expo-sms'

import { metadata } from '@/common/metadata'

const sendPaymentSms = async (
  message = `Cobra con ${metadata.name}: micoin://pay?amount=12.50`,
) => {
  const available = await SMS.isAvailableAsync()
  if (!available) {
    return { ok: false as const, reason: 'unavailable' as const }
  }

  const result = await SMS.sendSMSAsync([], message)
  return { ok: true as const, result }
}

export { sendPaymentSms }
