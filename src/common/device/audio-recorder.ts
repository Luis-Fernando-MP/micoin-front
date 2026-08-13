import {
  AudioModule,
  type AudioPlayer,
  type AudioRecorder,
  createAudioPlayer,
  RecordingPresets,
  requestRecordingPermissionsAsync,
  setAudioModeAsync,
} from 'expo-audio'

const nativeAudio = AudioModule as {
  AudioRecorder: new (
    options: (typeof RecordingPresets)['HIGH_QUALITY'],
  ) => AudioRecorder
}

let activeRecorder: AudioRecorder | null = null
let activePlayer: AudioPlayer | null = null

const startRecording = async () => {
  const permission = await requestRecordingPermissionsAsync()
  if (!permission.granted) {
    return { ok: false as const, reason: 'denied' as const }
  }

  await setAudioModeAsync({
    allowsRecording: true,
    playsInSilentMode: true,
  })

  const recorder = new nativeAudio.AudioRecorder(RecordingPresets.HIGH_QUALITY)
  await recorder.prepareToRecordAsync()
  recorder.record()
  activeRecorder = recorder

  return { ok: true as const }
}

const stopRecording = async () => {
  if (!activeRecorder) {
    return null
  }

  await activeRecorder.stop()
  const uri = activeRecorder.uri
  activeRecorder = null

  await setAudioModeAsync({
    allowsRecording: false,
    playsInSilentMode: true,
  })

  return uri
}

const playUri = async (uri: string) => {
  activePlayer?.remove()
  const player = createAudioPlayer({ uri })
  activePlayer = player
  player.play()
  return player
}

const releasePlayer = (player: AudioPlayer | null) => {
  if (!player) {
    return
  }
  if (activePlayer === player) {
    activePlayer = null
  }
  player.remove()
}

export { playUri, releasePlayer, startRecording, stopRecording }
