import * as Contacts from 'expo-contacts'

/**
 * getContactsCount — Cuenta contactos accesibles con permiso.
 *
 * @example
 * import { getContactsCount } from '@device/contacts'
 * await getContactsCount()
 */
const getContactsCount = async () => {
  const permission = await Contacts.requestPermissionsAsync()
  if (!permission.granted) {
    return { ok: false as const, reason: 'denied' as const }
  }

  const result = await Contacts.getContactsAsync({
    fields: [Contacts.Fields.Name],
  })

  return {
    ok: true as const,
    total: result.data.length,
  }
}

export { getContactsCount }
