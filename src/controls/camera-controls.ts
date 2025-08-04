import GameEngine from '~/game-engine'
import Room from '~/game-objects/room'

export default class CameraControls {
  gameEngine: GameEngine
  orbitingStart = 0
  isOrbiting = false

  constructor(gameEngine: GameEngine) {
    this.gameEngine = gameEngine
  }

  wasOrbiting() {
    const orbitDuration = Date.now() - this.orbitingStart
    const wasOrbiting = orbitDuration > 300
    return wasOrbiting
  }

  /** Camera Constraints in Hub mode */
  enterHubMode(){
    this.gameEngine.activeMode = 'hub'
    this.gameEngine.orbitControls.target.set(0, 0.15, 0)
    this.gameEngine.orbitControls.minDistance = 1
    this.gameEngine.orbitControls.maxDistance = 1
    this.gameEngine.orbitControls.minPolarAngle = Math.PI * 0.25
    this.gameEngine.orbitControls.maxPolarAngle = Math.PI * 0.45
    this.gameEngine.orbitControls.minAzimuthAngle = Infinity
    this.gameEngine.orbitControls.maxAzimuthAngle = Infinity
    this.gameEngine.orbitControls.enablePan = false
    this.gameEngine.orbitControls.enableZoom = false

    // Play the Hub music
    this.gameEngine.musicHandler.transitionFromRoomToHub()

    // Enable interactions in the Hub
    this.gameEngine.hub.interactableDoors!.enabled = true
    // Disable interactions inside the Rooms
    this.gameEngine.hub.rooms.forEach(room => room.interactableObjects!.enabled = false)
  }

  /** CameraConstraints when in Doorstep mode */
  enterDoorstepMode(room: Room) {
    this.gameEngine.activeMode = 'doorstep'

    // Get the POI position in world coordinates
    const poiWorldPosition = room.meshGroup.localToWorld(room.poi.outside.position.clone())

    // Set the orbit target to the POI position
    this.gameEngine.orbitControls.target.copy(poiWorldPosition)

    // Set distance constraints
    this.gameEngine.orbitControls.minDistance = 1
    this.gameEngine.orbitControls.maxDistance = 1

    // Set angle constraints from the room's POI
    this.gameEngine.orbitControls.minPolarAngle = room.poi.outside.movementAmplitude.minPolarAngle
    this.gameEngine.orbitControls.maxPolarAngle = room.poi.outside.movementAmplitude.maxPolarAngle
    this.gameEngine.orbitControls.minAzimuthAngle = room.poi.outside.movementAmplitude.minAzimuthAngle
    this.gameEngine.orbitControls.maxAzimuthAngle = room.poi.outside.movementAmplitude.maxAzimuthAngle

    this.gameEngine.orbitControls.enablePan = false
    this.gameEngine.orbitControls.enableZoom = false

    // Force controls to update to apply the new constraints
    this.gameEngine.orbitControls.update()

    // Enable interactions in the Hub
    this.gameEngine.hub.interactableDoors!.enabled = true
    // Disable interactions inside the Rooms
    this.gameEngine.hub.rooms.forEach(room => room.interactableObjects!.enabled = false)
  }

  /** CameraConstraints when in RoomInspection mode */
  enterRoomInspectionMode(room: Room){
    this.gameEngine.activeMode = 'roomInspection'

    // Get the POI position in world coordinates
    const poiWorldPosition = room.meshGroup.localToWorld(room.poi.inside.position.clone())

    // Set the orbit target to the POI position
    this.gameEngine.orbitControls.target.copy(poiWorldPosition)

    // Set distance constraints
    this.gameEngine.orbitControls.minDistance = 0.25
    this.gameEngine.orbitControls.maxDistance = 0.25

    // Set angle constraints from the room's POI
    this.gameEngine.orbitControls.minPolarAngle = room.poi.inside.movementAmplitude.minPolarAngle
    this.gameEngine.orbitControls.maxPolarAngle = room.poi.inside.movementAmplitude.maxPolarAngle
    this.gameEngine.orbitControls.minAzimuthAngle = room.poi.inside.movementAmplitude.minAzimuthAngle
    this.gameEngine.orbitControls.maxAzimuthAngle = room.poi.inside.movementAmplitude.maxAzimuthAngle

    this.gameEngine.orbitControls.enablePan = false
    this.gameEngine.orbitControls.enableZoom = false

    // Force controls to update to apply the new constraints
    this.gameEngine.orbitControls.update()

    // Play the Room music
    this.gameEngine.musicHandler.transitionFromHubToRoom(room.props.content.music)

    // Disable interactions in the Hub
    this.gameEngine.hub.interactableDoors!.enabled = false
    // Enable interactions inside the room 
    room.interactableObjects!.enabled = true
  }
}