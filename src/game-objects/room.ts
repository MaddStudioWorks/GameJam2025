import { Vector3, Mesh, SphereGeometry, MeshBasicMaterial, BoxGeometry, Box3 } from 'three'
import GameEngine from '~/game-engine'
import GameObject from '~/game-objects/game-object'
import RoomInterior from '~/game-objects/room-interior'
import RoomDoor from '~/game-objects/room-door'
import RoomDoorFrame from '~/game-objects/room-door-frame'
import { PointOfInterest } from '~/interfaces/point-of-interest'

export default class Room extends GameObject {
  index: number
  poi: {
    outside: PointOfInterest
    inside: PointOfInterest
  }
  doorFrame: RoomDoorFrame
  doorLeft: RoomDoor
  doorRight: RoomDoor
  roomInterior: RoomInterior
  hitbox: Mesh

  constructor(index: number) {
    super()

    this.index = index

    // Calculate the room's angle around the hub
    const roomAngle = index * Math.PI * 2 / 12

    // Define the azimuth range (90 degrees total, 45 degrees each side)
    const azimuthRange = Math.PI / 4 // 45 degrees each side

    this.poi = {
      outside: {
        position: new Vector3(0, 0.25, 0.25),
        lookAt: new Vector3(0, 0, 1),
        movementAmplitude: {
          minPolarAngle: Math.PI/2 * 0.5,
          maxPolarAngle: Math.PI/2 * 1.05,
          // Fix: Correct the azimuth angles relative to room rotation
          minAzimuthAngle: roomAngle - azimuthRange,
          maxAzimuthAngle: roomAngle + azimuthRange
        }
      },
      inside: {
        position: new Vector3(0, 0.25, -0.15),
        lookAt: new Vector3(0, 0, -1),
        movementAmplitude: {
          minPolarAngle: Math.PI/2 * 0.5,
          maxPolarAngle: Math.PI/2 * 1.05,
          // Fix: Correct the azimuth angles relative to room rotation
          minAzimuthAngle: roomAngle - azimuthRange,
          maxAzimuthAngle: roomAngle + azimuthRange
        }
      }
    }

    // temp: debug spheres for the POIs
    // const outsideSphere = new Mesh(new SphereGeometry(0.025), new MeshBasicMaterial({ color: 0xff0000 }))
    // outsideSphere.position.copy(this.poi.outside.position)
    // this.meshGroup.add(outsideSphere)
    // const insideSphere = new Mesh(new SphereGeometry(0.025), new MeshBasicMaterial({ color: 0xff00ff }))
    // insideSphere.position.copy(this.poi.inside.position)
    // this.meshGroup.add(insideSphere)

    // Room Entrance meshes
    this.doorFrame = new RoomDoorFrame
    this.doorLeft = new RoomDoor('left')
    this.doorRight = new RoomDoor('right')
    this.meshGroup.add(this.doorFrame.meshGroup)
    this.meshGroup.add(this.doorLeft.meshGroup)
    this.meshGroup.add(this.doorRight.meshGroup)

    // Entrance Hitbox
    const hitboxHeight = 0.75
    this.hitbox = new Mesh(
      new BoxGeometry(0.45, hitboxHeight, 0.25),
      new MeshBasicMaterial({ color: 0x00ff00, transparent: true, opacity: 0.5 })
    )
    this.hitbox.translateY(hitboxHeight/2)
    this.hitbox.userData = {
      index: this.index
    }
    this.meshGroup.add(this.hitbox)

    // Room mesh
    this.roomInterior = new RoomInterior
    this.meshGroup.add(this.roomInterior.meshGroup)
  }

  tick(engine: GameEngine) {

  }
}