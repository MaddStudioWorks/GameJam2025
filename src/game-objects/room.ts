import { Vector3, Mesh, MeshBasicMaterial, BoxGeometry } from 'three'
import GameEngine from '~/game-engine'
import GameObject from '~/game-objects/game-object'
import RoomInterior from '~/game-objects/room-interior'
import RoomDoor from '~/game-objects/room-door'
import RoomDoorFrame from '~/game-objects/room-door-frame'
import { PointOfInterest } from '~/interfaces/point-of-interest'
import { RoomProps } from '~/interfaces/room-props'
import { RaycastableCollection } from '~/controls/raycaster-handler'
import RoomNumber from '~/game-objects/room-number'

export default class Room extends GameObject {
  props: RoomProps
  poi: {
    outside: PointOfInterest
    inside: PointOfInterest
  }
  doorFrame: RoomDoorFrame
  doorLeft: RoomDoor
  doorRight: RoomDoor
  roomInterior: RoomInterior
  doorNumber: RoomNumber
  hitbox: Mesh
  interactableObjects: RaycastableCollection<GameObject> | null = null

  constructor(props: RoomProps) {
    super()

    this.props = props

    // Calculate the room's angle around the hub
    const roomAngle = this.props.index * -Math.PI * 2 / 12

    // Camera POIs
    //  - in front of the entrance
    //  - inside the room
    // Define the azimuth range (90 degrees total, 45 degrees each side)
    const azimuthRange = Math.PI / 4 // 45 degrees each side
    this.poi = {
      outside: {
        position: new Vector3(0, 0.25, 0),
        lookAt: new Vector3(0, 0, 1),
        movementAmplitude: {
          minPolarAngle: Math.PI/2 * 0.5,
          maxPolarAngle: Math.PI/2 * 1.05,
          minAzimuthAngle: roomAngle - azimuthRange,
          maxAzimuthAngle: roomAngle + azimuthRange
        }
      },
      inside: {
        position: new Vector3(0, 0.15, -0.15),
        lookAt: new Vector3(0, 0, -1),
        movementAmplitude: {
          minPolarAngle: Math.PI/2 * 0.5,
          maxPolarAngle: Math.PI/2 * 1.05,
          minAzimuthAngle: roomAngle - azimuthRange,
          maxAzimuthAngle: roomAngle + azimuthRange
        }
      }
    }
    // Debug spheres for the POIs
    // const outsideSphere = new Mesh(new SphereGeometry(0.025), new MeshBasicMaterial({ color: 0xff0000 }))
    // outsideSphere.position.copy(this.poi.outside.position)
    // this.meshGroup.add(outsideSphere)
    // const insideSphere = new Mesh(new SphereGeometry(0.025), new MeshBasicMaterial({ color: 0xff00ff }))
    // insideSphere.position.copy(this.poi.inside.position)
    // this.meshGroup.add(insideSphere)

    // Room Entrance meshes
    this.doorFrame = new RoomDoorFrame
    this.doorLeft = new RoomDoor('left', this.props.doorType)
    this.doorRight = new RoomDoor('right', this.props.doorType)
    this.doorNumber = new RoomNumber(this.props.index)
    this.meshGroup.add(this.doorFrame.meshGroup)
    this.meshGroup.add(this.doorLeft.meshGroup)
    this.meshGroup.add(this.doorRight.meshGroup)
    this.meshGroup.add(this.doorNumber.meshGroup)

    // Entrance Hitbox
    const hitboxHeight = 0.75
    this.hitbox = new Mesh(
      new BoxGeometry(0.45, hitboxHeight, 0.25),
      new MeshBasicMaterial({ color: 0x00ff00, transparent: true, opacity: 0.5 })
    )
    this.hitbox.translateY(hitboxHeight/2)
    this.hitbox.visible = false
    this.hitbox.userData = {
      index: this.props.index
    }
    this.meshGroup.add(this.hitbox)

    // Room mesh
    this.roomInterior = new RoomInterior(this.props)
    // Place the room behind the entrance
    this.roomInterior.meshGroup.position.z = -this.roomInterior.roomSize * 0.5
    this.roomInterior.meshGroup.translateY(0.001)

    this.meshGroup.add(this.roomInterior.meshGroup)
  }

  tick(engine: GameEngine) {

  }
}