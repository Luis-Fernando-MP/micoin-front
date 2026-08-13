import { Accelerometer, Gyroscope, Pedometer } from 'expo-sensors'

const readAccelerometer = async () => {
  Accelerometer.setUpdateInterval(200)
  return new Promise<{ x: number; y: number; z: number }>((resolve) => {
    const sub = Accelerometer.addListener((data) => {
      sub.remove()
      resolve({
        x: Number(data.x.toFixed(2)),
        y: Number(data.y.toFixed(2)),
        z: Number(data.z.toFixed(2)),
      })
    })
  })
}

const readGyroscope = async () => {
  Gyroscope.setUpdateInterval(200)
  return new Promise<{ x: number; y: number; z: number }>((resolve) => {
    const sub = Gyroscope.addListener((data) => {
      sub.remove()
      resolve({
        x: Number(data.x.toFixed(2)),
        y: Number(data.y.toFixed(2)),
        z: Number(data.z.toFixed(2)),
      })
    })
  })
}

const readSteps = async () => {
  const available = await Pedometer.isAvailableAsync()
  if (!available) {
    return null
  }
  const end = new Date()
  const start = new Date()
  start.setHours(0, 0, 0, 0)
  const result = await Pedometer.getStepCountAsync(start, end)
  return result.steps
}

export { readAccelerometer, readGyroscope, readSteps }
