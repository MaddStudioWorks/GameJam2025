import { PerspectiveCamera } from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import Room from '~/game-objects/room'

export default class CameraControls {
  camera: PerspectiveCamera
  orbitControls: OrbitControls

  constructor(camera: PerspectiveCamera, orbitControls: OrbitControls) {
    this.camera = camera
    this.orbitControls = orbitControls
  }

  /** Camera Constraints in Hub mode */
  enterHubMode(){
    this.orbitControls.target.set(0, 0.15, 0)
    this.orbitControls.minDistance = 1.1
    this.orbitControls.maxDistance = 1.1
    this.orbitControls.minPolarAngle = Math.PI * 0.25
    this.orbitControls.maxPolarAngle = Math.PI * 0.45
    this.orbitControls.minAzimuthAngle = Infinity
    this.orbitControls.maxAzimuthAngle = Infinity
    this.orbitControls.enablePan = false
    this.orbitControls.enableZoom = false
  }

  /** CameraConstraints when in Doorstep mode */
  enterDoorstepMode(room: Room){
    const newCameraPosition = room.meshGroup.position.clone().add(room.poi.outside.position)
    this.orbitControls.target = newCameraPosition
    this.orbitControls.minDistance = 1
    this.orbitControls.maxDistance = 1
    this.orbitControls.minPolarAngle = room.poi.outside.movementAmplitude.minPolarAngle
    this.orbitControls.maxPolarAngle = room.poi.outside.movementAmplitude.maxPolarAngle
    this.orbitControls.minAzimuthAngle = room.poi.outside.movementAmplitude.minAzimuthAngle
    this.orbitControls.maxAzimuthAngle = room.poi.outside.movementAmplitude.maxAzimuthAngle
    this.orbitControls.enablePan = false
    this.orbitControls.enableZoom = false
  }
}