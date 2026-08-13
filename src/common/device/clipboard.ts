import * as Clipboard from 'expo-clipboard'

const copyText = async (value: string) => {
  await Clipboard.setStringAsync(value)
  return true
}

const readText = async () => {
  return Clipboard.getStringAsync()
}

export { copyText, readText }
