import GameEngine from '~/game-engine'
import GameObject from '~/game-objects/game-object'
import { Vector3 } from 'three/webgpu'
import Room from '~/game-objects/room'
import HubFloor from '~/game-objects/hub-floor'
import GameClock from '~/game-objects/clock'

export default class Hub extends GameObject {
  rooms: Room[] = []

  constructor() {
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
      const room = new Room(i)
      const angle = i * Math.PI*2 / 12
      room.meshGroup.rotateY(angle)
      const projectionVector = new Vector3(0, 0, -1).applyEuler(room.meshGroup.rotation)
      room.meshGroup.position.addScaledVector(projectionVector, radius)
      this.rooms.push(room)
      this.meshGroup.add(room.meshGroup)
    }
  }

  tick(engine: GameEngine) {
    this.children.forEach((child) => child.tick(engine))
  }
}