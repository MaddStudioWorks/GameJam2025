import { Vector3, Vector2, Mesh, MeshNormalMaterial, SphereGeometry, MeshBasicMaterial } from 'three'
import GameEngine from '~/game-engine'
import GameObject from '~/game-objects/game-object'
import Room from '~/game-objects/room'
import RoomDoor from '~/game-objects/room-door'
import RoomDoorFrame from '~/game-objects/room-door-frame'
import { PointOfInterest } from '~/interfaces/point-of-interest'

export default class RoomEntry extends GameObject {
  poi: {
    outside: PointOfInterest
    inside: PointOfInterest
  }
  doorFrame: RoomDoorFrame
  doorLeft: RoomDoor
  doorRight: RoomDoor
  room: Room

  constructor() {
    super()

    this.poi = {
      outside: {
        position: new Vector3(0, 0.25, -0.33),
        lookAt: new Vector3(0, 0, 1),
        movementAmplitude: new Vector2(1, 0.75)
      },
      inside: {
        position: new Vector3(0, 0.25, 0.15),
        lookAt: new Vector3(0, 0, -1),
        movementAmplitude: new Vector2(1, 0.75)
      }
    }

    // temp: debug spheres for the POIs
    const outsideSphere = new Mesh(new SphereGeometry(0.025), new MeshBasicMaterial({ color: 0xff0000 }))
    outsideSphere.position.copy(this.poi.outside.position)
    this.meshGroup.add(outsideSphere)
    const insideSphere = new Mesh(new SphereGeometry(0.025), new MeshBasicMaterial({ color: 0xff0000 }))
    insideSphere.position.copy(this.poi.inside.position)
    this.meshGroup.add(insideSphere)

    // Room Entrance meshes
    this.doorFrame = new RoomDoorFrame
    this.doorLeft = new RoomDoor('left')
    this.doorRight = new RoomDoor('right')
    this.meshGroup.add(this.doorFrame.meshGroup)
    this.meshGroup.add(this.doorLeft.meshGroup)
    this.meshGroup.add(this.doorRight.meshGroup)

    // Room mesh
    this.room = new Room
    this.meshGroup.add(this.room.meshGroup)
  }

  tick(engine: GameEngine) {

  }
}