import { withTimeout } from '@device/device/with-timeout'
import { readSteps } from '@device/sensors'

type StepsSnapshot = number | null

/**
 * device.steps — pasos del día si el pedómetro está disponible.
 *
 * @example
 * import device from '@device/device'
 * await device.steps()
 */
const steps = (): Promise<StepsSnapshot> => withTimeout(readSteps())

export type { StepsSnapshot }
export default steps
