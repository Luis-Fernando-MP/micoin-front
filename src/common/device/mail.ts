import * as MailComposer from 'expo-mail-composer'

import { metadata } from '@/common/metadata'

const openSupportMail = async () => {
  const available = await MailComposer.isAvailableAsync()
  if (!available) {
    return { ok: false as const, reason: 'unavailable' as const }
  }

  await MailComposer.composeAsync({
    recipients: [metadata.supportEmail],
    subject: `${metadata.name} soporte`,
    body: 'Hola MiCoin,\n\n',
  })

  return { ok: true as const }
}

export { openSupportMail }
