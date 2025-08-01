import GameEngine from '~/game-engine'
import GameObject from '~/game-objects/game-object'
import { Mesh, MeshBasicNodeMaterial, CircleGeometry, Vector3, TextureLoader } from 'three/webgpu'
import Room from '~/game-objects/room'
import TextureClockFace from '~/assets/textures/clock-face.png?url'

export default class Hub extends GameObject {
  material: MeshBasicNodeMaterial
  rooms: Room[] = []

  constructor() {
    super()

    const radius = 1

    // Hub Geometry
    const geometry = new CircleGeometry(radius, 24)
    geometry.rotateX(-Math.PI/2)
    const map = new TextureLoader().load(TextureClockFace)
    map.anisotropy = 16
    this.material = new MeshBasicNodeMaterial({
      map
    })
    const mesh = new Mesh(geometry, this.material)
    this.meshGroup.add(mesh)

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
  }
}