import GameEngine from '~/game-engine'
import GameObject from '~/game-objects/game-object'
import { Euler, Vector3 } from 'three/webgpu'
import Room from '~/game-objects/room'
import HubFloor from '~/game-objects/hub-floor'
import GameClock from '~/game-objects/clock'
import { RoomProps } from '~/interfaces/room-props'
import { InteractableObject, RaycastableCollection } from '~/controls/raycaster-handler'

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
    for(let i = 0; i < 12; i++) {
      const roomProps: RoomProps = {
        index: i,
        isLocked: () => false,
        doorType: 'default',
        content: {
          roomType: 'default',
          keyObjects: [
            { type: "key", position: new Vector3(0, 0, -0.4), rotation: new Euler }
          ],
          props: [],
          music: 'default'
        }
      }
      const room = new Room(roomProps)
      // Place each room on the clock
      const angle = i * -Math.PI*2 / 12
      room.meshGroup.rotateY(angle)
      const projectionVector = new Vector3(0, 0, -1).applyEuler(room.meshGroup.rotation)
      room.meshGroup.position.addScaledVector(projectionVector, radius)
      this.rooms.push(room)
      this.meshGroup.add(room.meshGroup)
    }

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
            interactableObject.gameObject.doorLeft.meshGroup.visible = false
            interactableObject.gameObject.doorRight.meshGroup.visible = false
            setTimeout(() => {
              gameEngine.cameraControls.enterRoomInspectionMode(interactableObject.gameObject)
              gameEngine.activeMode = 'roomInspection'
            }, 500);
          } else {
            gameEngine.cameraControls.enterDoorstepMode(interactableObject.gameObject)
            gameEngine.activeMode = 'doorstep'
          }
        },
        onHover: (interactableObject: InteractableObject<Room>) => {
          interactableObject.gameObject.hitbox.visible = interactableObject.hovered
        },
        onBlur: (interactableObject: InteractableObject<Room>) => {
          interactableObject.gameObject.hitbox.visible = interactableObject.hovered
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