import { Platform } from 'react-native'

import * as Calendar from 'expo-calendar'

const ensureCalendarPermission = async () => {
  const current = await Calendar.getCalendarPermissionsAsync()
  if (current.granted) {
    return true
  }
  const asked = await Calendar.requestCalendarPermissionsAsync()
  return asked.granted
}

const resolveCalendarId = async () => {
  const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT)
  const writable = calendars.find((item) => item.allowsModifications)
  if (writable) {
    return writable.id
  }

  if (Platform.OS === 'ios') {
    try {
      const def = await Calendar.getDefaultCalendarAsync()
      if (def?.id) {
        return def.id
      }
    } catch {
      // continue to create
    }
  }

  const source =
    Platform.OS === 'ios'
      ? (calendars[0]?.source ?? {
          isLocalAccount: true,
          name: 'MiCoin',
          type: Calendar.SourceType.LOCAL,
        })
      : {
          isLocalAccount: true,
          name: 'MiCoin',
          type: 'LOCAL' as const,
        }

  return Calendar.createCalendarAsync({
    title: 'MiCoin',
    entityType: Calendar.EntityTypes.EVENT,
    sourceId: 'id' in source ? source.id : undefined,
    source,
    name: 'micoin',
    ownerAccount: 'personal',
    accessLevel: Calendar.CalendarAccessLevel.OWNER,
  })
}

/**
 * createPaymentReminder — Crea un recordatorio de pago en calendario.
 *
 * @example
 * import { createPaymentReminder } from '@device/calendar-reminder'
 * await createPaymentReminder()
 */
const createPaymentReminder = async (
  title = 'Pagar tarjeta',
  when = new Date(Date.now() + 24 * 60 * 60 * 1000),
) => {
  try {
    const granted = await ensureCalendarPermission()
    if (!granted) {
      return { ok: false as const, reason: 'denied' as const }
    }

    const calendarId = await resolveCalendarId()
    if (!calendarId) {
      return { ok: false as const, reason: 'no-calendar' as const }
    }

    const end = new Date(when.getTime() + 30 * 60 * 1000)
    const eventId = await Calendar.createEventAsync(calendarId, {
      title,
      startDate: when,
      endDate: end,
      notes: 'Recordatorio creado desde MiCoin',
      alarms: [{ relativeOffset: -60 }],
    })

    return { ok: true as const, eventId }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'error-desconocido'
    return { ok: false as const, reason: message }
  }
}

export { createPaymentReminder }
