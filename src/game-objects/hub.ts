import GameEngine from '~/game-engine'
import GameObject from '~/game-objects/game-object'
import { Vector3 } from 'three/webgpu'
import Room from '~/game-objects/room'
import HubFloor from '~/game-objects/hub-floor'
import GameClock from '~/game-objects/clock'
import { InteractableObject, RaycastableCollection } from '~/controls/raycaster-handler'
import { roomLayouts } from '~/room-layouts/room-layouts'
import { triggerDialog } from '~/ui/index.ui'

export default class Hub extends GameObject {
  rooms: Room[] = []
  interactableDoors: RaycastableCollection<Room> | null = null

  constructor(gameEngine: GameEngine) {
    super()

    const radius = 1

    // Hub Geometry
    const hubFloor = new HubFloor(1)
    this.meshGroup.add(hubFloor.meshGroup)
    const clock = new GameClock(radius)
    this.children.push(clock)
    this.meshGroup.add(clock.meshGroup)

    // Rooms
    roomLayouts.forEach(roomProps => {
      const room = new Room(roomProps)
      // Place each room on the clock
      const angle = roomProps.index * -Math.PI * 2 / 12
      room.meshGroup.rotateY(angle)
      const projectionVector = new Vector3(0, 0, -1).applyEuler(room.meshGroup.rotation)
      room.meshGroup.position.addScaledVector(projectionVector, radius)
      this.rooms.push(room)
      this.meshGroup.add(room.meshGroup)
    })

    // Register the collection of clickable RoomDoors
    this.interactableDoors = gameEngine.raycasterHandler.addCollection({
      id: `room-doors`,
      enabled: true,
      list: this.rooms.map((room) => ({
        gameObject: room,
        hitbox: room.hitbox,
        hovered: false,
        onClick: (interactableObject: InteractableObject<Room>) => {
          if (gameEngine.activeMode === 'doorstep') {
            if(room.props.isLocked(gameEngine, room)){
              triggerDialog('text', gameEngine.translate().game.doorLocked)
            }else{
              interactableObject.gameObject.doorLeft.meshGroup.rotateOnAxis(new Vector3(0, 1, 0), -Math.PI/2)
              interactableObject.gameObject.doorRight.meshGroup.rotateOnAxis(new Vector3(0, 1, 0), Math.PI/2)
              setTimeout(() => {
                gameEngine.cameraControls.enterRoomInspectionMode(interactableObject.gameObject)
                gameEngine.activeMode = 'roomInspection'
              }, 500)
            }
          } else {
            gameEngine.cameraControls.enterDoorstepMode(interactableObject.gameObject)
            gameEngine.activeMode = 'doorstep'
          }
        },
        onHover: (interactableObject: InteractableObject<Room>) => {
          // interactableObject.gameObject.hitbox.visible = interactableObject.hovered
        },
        onBlur: (interactableObject: InteractableObject<Room>) => {
          // interactableObject.gameObject.hitbox.visible = interactableObject.hovered
        },
      }))
    })

    // Register the clickable objects inside each room
    this.rooms.forEach(room => {
      const interactableCollection = gameEngine.raycasterHandler.addCollection({
        id: `room-${room.props.index}-interactableObjects`,
        enabled: false,
        list: room.roomInterior.interactableObjects
      })
      room.interactableObjects = interactableCollection
    })
  }

  tick(engine: GameEngine) {
    this.children.forEach((child) => child.tick(engine))
  }
}