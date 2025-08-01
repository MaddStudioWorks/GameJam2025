import GameEngine from '~/game-engine'
import GameObject from '~/game-objects/game-object'
import { Mesh, MeshBasicNodeMaterial, CircleGeometry, Vector3 } from 'three/webgpu'
import RoomEntry from '~/game-objects/room'

export default class Hub extends GameObject {
  material: MeshBasicNodeMaterial
  rooms: RoomEntry[] = []

  constructor() {
    super()

    const radius = 1

    // Hub Geometry
    const geometry = new CircleGeometry(radius, 24)
    geometry.rotateX(-Math.PI/2)
    this.material = new MeshBasicNodeMaterial({
      color: 0x000000
    })
    const mesh = new Mesh(geometry, this.material)
    this.meshGroup.add(mesh)

    // Doors
    for(let i = 0; i < 12; i++) {
      const roomEntry = new RoomEntry
      const angle = i * -Math.PI*2 / 12
      roomEntry.meshGroup.rotateY(angle)
      const projectionVector = new Vector3(0, 0, 1).applyEuler(roomEntry.meshGroup.rotation);
      roomEntry.meshGroup.position.addScaledVector(projectionVector, radius)
      this.rooms.push(roomEntry)
      this.meshGroup.add(roomEntry.meshGroup)
    }
  }



  tick(engine: GameEngine) {
  }
}