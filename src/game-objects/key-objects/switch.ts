import GameEngine from '~/game-engine'
import GameObject from '~/game-objects/game-object'
import { Mesh, MeshBasicNodeMaterial, PlaneGeometry, SRGBColorSpace, TextureLoader } from 'three/webgpu'
import SwitchTexture from '~/assets/textures/switch.png'
import { KeyObject } from '~/interfaces/room-props'

export default class Switch extends GameObject {
  constructor({ id }: KeyObject) {
    super()

    const switchTextureMap = new TextureLoader().load(SwitchTexture)
    switchTextureMap.anisotropy = 16
    switchTextureMap.colorSpace = SRGBColorSpace
    const switchMaterial = new MeshBasicNodeMaterial({
      transparent: true,
      map: switchTextureMap
    })
    const switchSize = 0.1
    const switchGeometry = new PlaneGeometry(switchSize, switchSize)
    const switchMesh = new Mesh(switchGeometry, switchMaterial)
    switchMesh.name = 'Switch' + id

    this.meshGroup.add(switchMesh)
  }
}