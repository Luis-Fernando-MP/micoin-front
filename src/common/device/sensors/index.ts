import { Accelerometer, Gyroscope, Pedometer } from 'expo-sensors'

type AxisSample = {
  x: number
  y: number
  z: number
}

const SENSOR_TIMEOUT_MS = 800

const readAxisSensor = (
  Sensor: typeof Accelerometer | typeof Gyroscope,
): Promise<AxisSample | null> =>
  new Promise((resolve) => {
    let settled = false
    let sub: { remove: () => void } | null = null

    const finish = (value: AxisSample | null) => {
      if (settled) {
        return
      }

      settled = true
      sub?.remove()
      clearTimeout(timer)
      resolve(value)
    }

    const timer = setTimeout(() => finish(null), SENSOR_TIMEOUT_MS)

    void Sensor.isAvailableAsync()
      .then((available) => {
        if (!available) {
          finish(null)
          return
        }

        Sensor.setUpdateInterval(100)
        sub = Sensor.addListener((data) => {
          finish({
            x: Number(data.x.toFixed(2)),
            y: Number(data.y.toFixed(2)),
            z: Number(data.z.toFixed(2)),
          })
        })
      })
      .catch(() => finish(null))
  })

/**
 * readAccelerometer — Lee una muestra del acelerómetro.
 *
 * @example
 * import { readAccelerometer } from '@device/sensors'
 * await readAccelerometer()
 */
const readAccelerometer = () => readAxisSensor(Accelerometer)

/**
 * readGyroscope — Lee una muestra del giroscopio.
 *
 * @example
 * import { readGyroscope } from '@device/sensors'
 * await readGyroscope()
 */
const readGyroscope = () => readAxisSensor(Gyroscope)

/**
 * readSteps — Lee pasos del contador de actividad si está disponible.
 *
 * @example
 * import { readSteps } from '@device/sensors'
 * await readSteps()
 */
const readSteps = async () => {
  const available = await Pedometer.isAvailableAsync().catch(() => false)

  if (!available) {
    return null
  }

  const end = new Date()
  const start = new Date()
  start.setHours(0, 0, 0, 0)

  const result = await Promise.race([
    Pedometer.getStepCountAsync(start, end),
    new Promise<null>((resolve) =>
      setTimeout(() => resolve(null), SENSOR_TIMEOUT_MS),
    ),
  ])

  if (!result) {
    return null
  }

  return result.steps
}

export { readAccelerometer, readGyroscope, readSteps }
