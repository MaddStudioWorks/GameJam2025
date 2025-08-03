import GameEngine from '~/game-engine'
import GameObject from '~/game-objects/game-object'
import { BoxGeometry, Mesh, MeshBasicNodeMaterial, SRGBColorSpace, TextureLoader } from 'three/webgpu'
import PropTexture from '~/assets/textures/key.png'
import { Prop } from '~/interfaces/room-props'

export default class Bookshelf extends GameObject {
  constructor({ type }: Prop) {
    super()

    const propTextureMap = new TextureLoader().load(PropTexture)
    propTextureMap.anisotropy = 16
    propTextureMap.colorSpace = SRGBColorSpace
    const propMaterial = new MeshBasicNodeMaterial({
      transparent: true,
      color: 0xFF0000
      // map: propTextureMap
    })
    const propSize = 0.1
    const propGeometry = new BoxGeometry(propSize, propSize, propSize)
    const prop = new Mesh(propGeometry, propMaterial)
    prop.name = 'Prop' + type

    this.meshGroup.add(prop)
  }

  tick(engine: GameEngine) {
  }
}