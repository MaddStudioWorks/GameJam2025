import GameEngine, { globalUniforms } from "~/game-engine"
import GameObject from "~/game-objects/game-object"
import {
  CylinderGeometry,
  Mesh,
  MeshBasicNodeMaterial,
  sin,
  distance,
  RingGeometry,
  uv,
  vec3,
  vec2,
  Fn,
  PlaneGeometry,
  Group,
  DoubleSide,
} from "three/webgpu"
import ClockFaceTentacles from '~/game-objects/clock-face-tentacles'

export default class GameClock extends GameObject {
  gearMesh: Mesh
  smallGearMesh: Mesh
  needleGroup: Group

  constructor(hubRadius: number) {
    super()

    /*
      Needle Structure
      - Needle Pin
      - Needle
      - Golden Gears
    */

    // Needle Pin
    const pinHeight = hubRadius * 0.05
    const pinRadius = hubRadius * 0.05
    const pinGeometry = new CylinderGeometry(pinRadius, pinRadius, pinHeight, 16)
    const pinMaterial = new MeshBasicNodeMaterial({ color: 0x856203 })
    const pinMesh = new Mesh(pinGeometry, pinMaterial)
    pinMesh.position.y = pinHeight / 2

    // Needle
    const needleLength = hubRadius * 0.75
    const needleGeometry = new PlaneGeometry(pinRadius, needleLength)
    const needleMaterial = new MeshBasicNodeMaterial({ color: 0xfcba03 })
    const needleMesh = new Mesh(needleGeometry, needleMaterial)
    needleMesh.translateY(pinHeight / 2)
    needleMesh.translateZ(-needleLength / 2)
    needleMesh.rotation.x = -Math.PI / 2

    // Gears
    const gearRadius = hubRadius * 0.15
    const gearGeometry = new RingGeometry(gearRadius * 0.5, gearRadius, 32)
    const gearMaterial = new MeshBasicNodeMaterial({
      wireframe: true,
      color: 0xfcba03,
    })
    this.gearMesh = new Mesh(gearGeometry, gearMaterial)
    this.gearMesh.rotation.x = -Math.PI / 2
    this.gearMesh.position.y = pinHeight * 1.5

    const smallGearRadius = gearRadius * 0.75
    const smallGearGeometry = new RingGeometry(smallGearRadius * 0.5, smallGearRadius, 32)
    this.smallGearMesh = new Mesh(smallGearGeometry, gearMaterial)
    this.smallGearMesh.rotation.x = -Math.PI / 2
    this.smallGearMesh.position.y = pinHeight * 2

    // Needle Structure
    this.needleGroup = new Group()
    this.needleGroup.add(needleMesh, pinMesh)

    // ClockFaceTentacles
    const tentacles = new ClockFaceTentacles(hubRadius, pinRadius)
    this.meshGroup.add(tentacles.meshGroup)
    
    this.meshGroup.add(
      this.gearMesh,
      this.smallGearMesh,
      this.needleGroup,
      tentacles.meshGroup
    )
  }

  tick(engine: GameEngine) {
    this.gearMesh.rotateZ(0.0025)
    this.smallGearMesh.rotateZ(-0.001)
    this.needleGroup.rotateY(-0.0002)
  }
}
