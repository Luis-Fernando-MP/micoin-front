import { EncryptJWT, jwtDecrypt } from 'jose'

import { APP_KEY } from '@env'

type SealOptions = {
  exp?: string
  subject?: string
}

const getKey = async (): Promise<CryptoKey> => {
  if (!APP_KEY) {
    throw new Error('EXPO_PUBLIC_APP_KEY is not set')
  }

  const encoded = new TextEncoder().encode(APP_KEY)
  const keyBytes = new Uint8Array(32)
  keyBytes.set(encoded.slice(0, 32))

  return crypto.subtle.importKey(
    'raw',
    keyBytes,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt'],
  )
}

/**
 * seal — cifra un payload con JWE (AES-GCM).
 *
 * @param payload - Objeto a sellar
 * @param options.exp - Expiración JOSE. @default '1h'
 * @param options.subject - Subject opcional del JWT
 *
 * @example
 * import { seal } from '@core/lib/jose'
 * const token = await seal({ userId: '1' })
 */
const seal = async (
  payload: Record<string, unknown>,
  options: SealOptions = {},
): Promise<string> => {
  const { exp = '1h', subject } = options
  const key = await getKey()
  const jwt = new EncryptJWT(payload)
    .setProtectedHeader({ alg: 'dir', enc: 'A256GCM' })
    .setIssuedAt()
    .setExpirationTime(exp)

  if (subject) {
    jwt.setSubject(subject)
  }

  return jwt.encrypt(key)
}

/**
 * unseal — descifra un JWE emitido por `seal`.
 *
 * @param encrypted - Token JWE
 *
 * @example
 * import { unseal } from '@core/lib/jose'
 * const payload = await unseal<{ userId: string }>(token)
 */
const unseal = async <T = Record<string, unknown>>(
  encrypted: string,
): Promise<T> => {
  const key = await getKey()
  const { payload } = await jwtDecrypt(encrypted, key)
  return payload as T
}

export { seal, unseal }
export type { SealOptions }
