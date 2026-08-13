import * as Speech from 'expo-speech'

import { metadata } from '@/common/metadata'

/**
 * speakText — Lee texto en voz alta con TTS del sistema.
 *
 * @example
 * import { speakText } from '@device/speech'
 * await speakText()
 */
const speakText = async (text = metadata.tagline) => {
  const speaking = await Speech.isSpeakingAsync()
  if (speaking) {
    Speech.stop()
    return false
  }
  Speech.speak(text, { language: 'es-ES', rate: 0.95 })
  return true
}

export { speakText }
