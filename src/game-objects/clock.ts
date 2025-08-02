import GameEngine, { globalUniforms } from "~/game-engine"
import GameObject from "~/game-objects/game-object"
import {
  CylinderGeometry,
  Mesh,
  MeshBasicNodeMaterial,
  PlaneGeometry,
  Group,
  CircleGeometry,
  TextureLoader,
  SRGBColorSpace,
  Fn,
  texture,
  uv,
  mx_noise_float,
} from "three/webgpu"
import ClockFaceGoldTexture from '~/assets/textures/clock/face-gold.png'
import ClockFaceNebulaTexture from '~/assets/textures/clock/face-nebula.jpg'
import ClockFaceStarsTexture from '~/assets/textures/clock/face-stars.jpg'
import radialNoise from '~/shaders/util/radial-noise'

export default class GameClock extends GameObject {
  needleGroup: Group
  clockFaceStars: Mesh

  constructor(hubRadius: number) {
    super()

    const textureLoader = new TextureLoader()

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

    // Needle Structure
    this.needleGroup = new Group()
    this.needleGroup.add(needleMesh, pinMesh)

    // Clock Face Layers
    const clockFaceNebulaTextureMap = textureLoader.load(ClockFaceNebulaTexture)
    clockFaceNebulaTextureMap.anisotropy = 16
    clockFaceNebulaTextureMap.colorSpace = SRGBColorSpace
    const clockFaceNebulaGeometry = new CircleGeometry(hubRadius * 0.90, 32)
    clockFaceNebulaGeometry.rotateX(-Math.PI / 2)
    const nebulaMaterial = new MeshBasicNodeMaterial
    nebulaMaterial.colorNode = Fn(() => {
      const displacement = radialNoise(uv())
      const displacedUVs = uv().add(displacement.mul(0.09))
      const texel = texture(clockFaceNebulaTextureMap, displacedUVs)
      return texel
    })()

    const clockFaceNebula = new Mesh(
      clockFaceNebulaGeometry,
      nebulaMaterial
    )
    clockFaceNebula.position.y = 0.001

    const clockFaceStarsTextureMap = textureLoader.load(ClockFaceStarsTexture)
    clockFaceStarsTextureMap.anisotropy = 16
    clockFaceStarsTextureMap.colorSpace = SRGBColorSpace
    const clockFaceStarsGeometry = new CircleGeometry(hubRadius * 0.85, 32)
    clockFaceStarsGeometry.rotateX(-Math.PI / 2)
    this.clockFaceStars = new Mesh(
      clockFaceStarsGeometry,
      new MeshBasicNodeMaterial({
        map: clockFaceStarsTextureMap
      })
    )
    this.clockFaceStars.scale.setScalar(0.45)
    this.clockFaceStars.position.z = 0.39
    this.clockFaceStars.position.y = 0.002

    const clockFaceGoldTextureMap = textureLoader.load(ClockFaceGoldTexture)
    clockFaceGoldTextureMap.anisotropy = 16
    clockFaceGoldTextureMap.colorSpace = SRGBColorSpace
    const clockFaceGoldGeometry = new CircleGeometry(hubRadius * 0.95, 32)
    clockFaceGoldGeometry.rotateX(-Math.PI / 2)
    const clockFaceGold = new Mesh(
      clockFaceGoldGeometry,
      new MeshBasicNodeMaterial({
        map: clockFaceGoldTextureMap,
        transparent: true
      })
    )
    clockFaceGold.position.y = 0.003

    this.meshGroup.add(
      this.needleGroup,
      clockFaceNebula,
      this.clockFaceStars,
      clockFaceGold,
    )
  }

  tick(engine: GameEngine) {
    this.needleGroup.rotation.y = -Math.PI * 2 * engine.gameState.time
    this.clockFaceStars.rotateY(0.000125)
  }
}
