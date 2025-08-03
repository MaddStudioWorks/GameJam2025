import GameEngine from '~/game-engine'
import GameObject from '~/game-objects/game-object'
import { Mesh, MeshBasicNodeMaterial, PlaneGeometry, SRGBColorSpace, TextureLoader } from 'three/webgpu'
import KeyTexture from '~/assets/textures/key.png'
import { KeyObject } from '~/interfaces/room-props'

export default class Key extends GameObject {
  constructor({ id }: KeyObject) {
    super()

    const keyTextureMap = new TextureLoader().load(KeyTexture)
    keyTextureMap.anisotropy = 16
    keyTextureMap.colorSpace = SRGBColorSpace
    const keyMaterial = new MeshBasicNodeMaterial({
      transparent: true,
      map: keyTextureMap,
      depthWrite: false
    })
    const keySize = 0.1
    const keyGeometry = new PlaneGeometry(keySize, keySize)
    const key = new Mesh(keyGeometry, keyMaterial)
    key.name = 'Key' + id

    this.meshGroup.add(key)
  }

  tick(engine: GameEngine) {
  }
}