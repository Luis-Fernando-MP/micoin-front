import * as Crypto from 'expo-crypto'

/**
 * hashPayload — Genera hash criptográfico de un payload.
 *
 * @example
 * import { hashPayload } from '@device/crypto-hash'
 * await hashPayload()
 */
const hashPayload = async (payload: string) => {
  const digest = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    payload,
  )
  return digest
}

export { hashPayload }
