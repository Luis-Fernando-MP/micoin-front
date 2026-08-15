const TIMEOUT_MS = 1200

const withTimeout = <T>(promise: Promise<T>): Promise<T | null> =>
  Promise.race([
    promise.then((value) => value).catch(() => null),
    new Promise<null>((resolve) => {
      setTimeout(() => resolve(null), TIMEOUT_MS)
    }),
  ])

export { withTimeout }
