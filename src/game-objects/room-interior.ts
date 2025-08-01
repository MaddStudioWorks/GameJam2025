import GameEngine from '~/game-engine'
import GameObject from '~/game-objects/game-object'
import { Box3, BoxGeometry, Mesh, MeshBasicNodeMaterial, Vector3 } from 'three/webgpu'

export default class RoomInterior extends GameObject {
  material: MeshBasicNodeMaterial
  mesh: Mesh
  geometry: BoxGeometry

  constructor() {
    super()
        
    this.geometry = new BoxGeometry(0.5, 0.5, 0.5)
    this.material = new MeshBasicNodeMaterial({ color: 0x333300 })
    this.mesh = new Mesh(this.geometry, this.material)
    this.meshGroup.add(this.mesh)

    const box = new Box3().setFromObject(this.mesh)
    const size = new Vector3
    box.getSize(size)
    this.mesh.position.y = size.y / 2
    this.mesh.position.z = size.z / 2
  }

  tick(engine: GameEngine) {
  }
}