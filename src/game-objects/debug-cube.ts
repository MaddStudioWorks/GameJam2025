import GameEngine, { globalUniforms } from '~/game-engine'
import GameObject from '~/game-objects/game-object'
import { BoxGeometry, Mesh, MeshBasicNodeMaterial, uv, vec3, fract, Fn } from 'three/webgpu'

export default class DebugCube extends GameObject {
  material: MeshBasicNodeMaterial

  constructor() {
    super()

    const geometry = new BoxGeometry(1, 1, 1)
    this.material = new MeshBasicNodeMaterial

    // Basic TSL example
    this.material.colorNode = Fn(() => {
      const loopingTime = fract(globalUniforms.time).add(-0.5).abs().mul(2)
      return vec3(uv(), loopingTime)
    })()
    
    const mesh = new Mesh(geometry, this.material)
    this.meshGroup.add(mesh)
  }

  tick(engine: GameEngine) {
  }
}