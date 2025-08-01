import { globalUniforms } from "~/game-engine"
import GameObject from "~/game-objects/game-object"
import {
  Mesh,
  MeshBasicNodeMaterial,
  sin,
  distance,
  RingGeometry,
  uv,
  vec3,
  vec2,
  Fn,
  DoubleSide,
} from "three/webgpu"

export default class ClockFaceTentacles extends GameObject {
  constructor(hubRadius: number, pinRadius: number) {
    super()
    const tentaclesGeometry = new RingGeometry(pinRadius, hubRadius, 12)
    const tentaclesMaterial = new MeshBasicNodeMaterial({
      wireframe: true,
      side: DoubleSide,
      depthWrite: false,
    })
    tentaclesMaterial.colorNode = Fn(() => {
      const center = vec2(0.5, 0.5)
      const computeDist = distance(center, uv()).mul(2)
      const timed = computeDist.add(sin(globalUniforms.time))
      return vec3(timed, 0, 0)
    })()
    const tentaclesMesh = new Mesh(tentaclesGeometry, tentaclesMaterial)
    tentaclesMesh.rotation.x = -Math.PI / 2
    tentaclesMesh.position.y = 0.001

    this.meshGroup.add(tentaclesMesh)
  }
}
