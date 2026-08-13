import * as MailComposer from 'expo-mail-composer'

import { metadata } from '@/common/metadata'

/**
 * openSupportMail — Abre el cliente de correo con destino de soporte.
 *
 * @example
 * import { openSupportMail } from '@device/mail'
 * await openSupportMail()
 */
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
