import { Vector3 } from 'three'

export interface PointOfInterest {
  position: Vector3
  lookAt: Vector3
  movementAmplitude: {
    minPolarAngle: number
    maxPolarAngle: number
    maxAzimuthAngle: number
    minAzimuthAngle: number
  }
}