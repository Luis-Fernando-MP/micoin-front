import * as Contacts from 'expo-contacts'

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
