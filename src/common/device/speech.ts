import * as Speech from 'expo-speech';

import { metadata } from '@/common/metadata';

const speakText = async (text = metadata.tagline) => {
  const speaking = await Speech.isSpeakingAsync();
  if (speaking) {
    Speech.stop();
    return false;
  }
  Speech.speak(text, { language: 'es-ES', rate: 0.95 });
  return true;
};

export { speakText };
