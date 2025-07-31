import { Vector2, Vector3 } from 'three'

export interface PointOfInterest {
  position: Vector3
  lookAt: Vector3
  movementAmplitude: Vector2
}