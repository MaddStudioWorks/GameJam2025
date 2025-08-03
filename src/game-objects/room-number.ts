import GameEngine from '~/game-engine'
import GameObject from '~/game-objects/game-object'
import { Mesh, MeshBasicNodeMaterial, PlaneGeometry, SRGBColorSpace, TextureLoader } from 'three/webgpu'
import DoorNumber1 from '~/assets/textures/doors/numbers/number-1.png?url'
import DoorNumber2 from '~/assets/textures/doors/numbers/number-2.png?url'
import DoorNumber3 from '~/assets/textures/doors/numbers/number-3.png?url'
import DoorNumber4 from '~/assets/textures/doors/numbers/number-4.png?url'
import DoorNumber5 from '~/assets/textures/doors/numbers/number-5.png?url'
import DoorNumber6 from '~/assets/textures/doors/numbers/number-6.png?url'
import DoorNumber7 from '~/assets/textures/doors/numbers/number-7.png?url'
import DoorNumber8 from '~/assets/textures/doors/numbers/number-8.png?url'
import DoorNumber9 from '~/assets/textures/doors/numbers/number-9.png?url'
import DoorNumber10 from '~/assets/textures/doors/numbers/number-10.png?url'
import DoorNumber11 from '~/assets/textures/doors/numbers/number-11.png?url'
import DoorNumber12 from '~/assets/textures/doors/numbers/number-12.png?url'

const doorTextures = {
  1: DoorNumber1,
  2: DoorNumber2,
  3: DoorNumber3,
  4: DoorNumber4,
  5: DoorNumber5,
  6: DoorNumber6,
  7: DoorNumber7,
  8: DoorNumber8,
  9: DoorNumber9,
  10: DoorNumber10,
  11: DoorNumber11,
  0: DoorNumber12
}

export default class RoomNumber extends GameObject {
  material: MeshBasicNodeMaterial
  open = false

  constructor(number: number) {
    super()

    const doorTexture = doorTextures[number]
    const numberTextureMap = new TextureLoader().load(doorTexture)
    numberTextureMap.colorSpace = SRGBColorSpace
    numberTextureMap.anisotropy = 16
    this.material = new MeshBasicNodeMaterial({
      map: numberTextureMap,
      transparent: true
    })
    const geometry = new PlaneGeometry(1, 1)
    const mesh = new Mesh(geometry, this.material)
    this.meshGroup.add(mesh)
    this.meshGroup.scale.setScalar(0.1)
    this.meshGroup.translateZ(0.01)
    this.meshGroup.translateY(0.5)
  }
  
  tick(engine: GameEngine) {
  }
}