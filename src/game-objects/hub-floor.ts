import GameObject from '~/game-objects/game-object'
import { Mesh, MeshBasicNodeMaterial, CircleGeometry, TextureLoader } from 'three/webgpu'

export default class HubFloor extends GameObject {
  material: MeshBasicNodeMaterial

  constructor(radius: number) {
    super()

    const geometry = new CircleGeometry(radius * 1.1, 24)
    geometry.rotateX(-Math.PI / 2)
    this.material = new MeshBasicNodeMaterial({
      color: 0x000000,
    })
    const mesh = new Mesh(geometry, this.material)
    this.meshGroup.add(mesh)
  }
}