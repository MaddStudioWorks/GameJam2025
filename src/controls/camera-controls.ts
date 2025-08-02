import { PerspectiveCamera, Vector3 } from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import Room from '~/game-objects/room'

export default class CameraControls {
  camera: PerspectiveCamera
  orbitControls: OrbitControls
  orbitingStart = 0
  isOrbiting = false

  constructor(camera: PerspectiveCamera, orbitControls: OrbitControls) {
    this.camera = camera
    this.orbitControls = orbitControls
  }

  wasOrbiting() {
    const orbitDuration = Date.now() - this.orbitingStart
    const wasOrbiting = orbitDuration > 300
    return wasOrbiting
  }

  /** Camera Constraints in Hub mode */
  enterHubMode(){
    this.orbitControls.target.set(0, 0.15, 0)
    this.orbitControls.minDistance = 1
    this.orbitControls.maxDistance = 1
    this.orbitControls.minPolarAngle = Math.PI * 0.25
    this.orbitControls.maxPolarAngle = Math.PI * 0.45
    this.orbitControls.minAzimuthAngle = Infinity
    this.orbitControls.maxAzimuthAngle = Infinity
    this.orbitControls.enablePan = false
    this.orbitControls.enableZoom = false
  }

  /** CameraConstraints when in Doorstep mode */
  enterDoorstepMode(room: Room){
    // Get the POI position in world coordinates
    const poiWorldPosition = room.meshGroup.localToWorld(room.poi.outside.position.clone())

    // Set the orbit target to the POI position
    this.orbitControls.target.copy(poiWorldPosition)

    // Set distance constraints
    this.orbitControls.minDistance = 1
    this.orbitControls.maxDistance = 1

    // Set angle constraints from the room's POI
    this.orbitControls.minPolarAngle = room.poi.outside.movementAmplitude.minPolarAngle
    this.orbitControls.maxPolarAngle = room.poi.outside.movementAmplitude.maxPolarAngle
    this.orbitControls.minAzimuthAngle = room.poi.outside.movementAmplitude.minAzimuthAngle
    this.orbitControls.maxAzimuthAngle = room.poi.outside.movementAmplitude.maxAzimuthAngle

    this.orbitControls.enablePan = false
    this.orbitControls.enableZoom = false

    // Force controls to update to apply the new constraints
    this.orbitControls.update()
  }

  /** CameraConstraints when in RoomInspection mode */
  enterRoomInspectionMode(room: Room){
    // Get the POI position in world coordinates
    const poiWorldPosition = room.meshGroup.localToWorld(room.poi.inside.position.clone())

    // Set the orbit target to the POI position
    this.orbitControls.target.copy(poiWorldPosition)

    // Set distance constraints
    this.orbitControls.minDistance = 0.25
    this.orbitControls.maxDistance = 0.25

    // Set angle constraints from the room's POI
    this.orbitControls.minPolarAngle = room.poi.inside.movementAmplitude.minPolarAngle
    this.orbitControls.maxPolarAngle = room.poi.inside.movementAmplitude.maxPolarAngle
    this.orbitControls.minAzimuthAngle = room.poi.inside.movementAmplitude.minAzimuthAngle
    this.orbitControls.maxAzimuthAngle = room.poi.inside.movementAmplitude.maxAzimuthAngle

    this.orbitControls.enablePan = false
    this.orbitControls.enableZoom = false

    // Force controls to update to apply the new constraints
    this.orbitControls.update()
  }
}