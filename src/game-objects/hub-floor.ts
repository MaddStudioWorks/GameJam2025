import GameObject from '~/game-objects/game-object'
import { Mesh, MeshBasicNodeMaterial, CircleGeometry, TextureLoader } from 'three/webgpu'
import TextureClockFace from '~/assets/textures/clock-face.png?url'

export default class HubFloor extends GameObject {
  material: MeshBasicNodeMaterial

  constructor(radius: number) {
    super()

    const geometry = new CircleGeometry(radius, 24)
    geometry.rotateX(-Math.PI / 2)
    const map = new TextureLoader().load(TextureClockFace)
    map.anisotropy = 16
    this.material = new MeshBasicNodeMaterial({
      map
    })
    const mesh = new Mesh(geometry, this.material)
    this.meshGroup.add(mesh)
  }
}