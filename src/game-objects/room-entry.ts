import GameEngine from '~/game-engine'
import GameObject from '~/game-objects/game-object'
import RoomDoor from '~/game-objects/room-door'
import RoomDoorFrame from '~/game-objects/room-door-frame'

export default class RoomEntry extends GameObject {
  doorFrame: RoomDoorFrame
  doorLeft: RoomDoor
  doorRight: RoomDoor

  constructor() {
    super()

    this.doorFrame = new RoomDoorFrame
    this.doorLeft = new RoomDoor('left')
    this.doorRight = new RoomDoor('right')
    this.meshGroup.add(this.doorFrame.meshGroup)
    this.meshGroup.add(this.doorLeft.meshGroup)
    this.meshGroup.add(this.doorRight.meshGroup)
  }

  tick(engine: GameEngine) {

  }
}