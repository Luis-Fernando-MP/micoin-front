import * as Crypto from 'expo-crypto'

const hashPayload = async (payload: string) => {
  const digest = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    payload,
  )
  return digest
}

export { hashPayload }
