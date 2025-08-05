import GameEngine from '~/game-engine'
import GameObject from '~/game-objects/game-object'
import { Mesh, MeshBasicNodeMaterial, PlaneGeometry, SRGBColorSpace, TextureLoader } from 'three/webgpu'
import DoorNumbers from '~/assets/textures/doors/numbers.png?url'

const UVCoords = {
  1: { offsetX: 0, offsetY: 0.75 },      // Row 1, Col 1
  2: { offsetX: 0.25, offsetY: 0.75 },   // Row 1, Col 2
  3: { offsetX: 0.5, offsetY: 0.75 },    // Row 1, Col 3
  4: { offsetX: 0.75, offsetY: 0.75 },   // Row 1, Col 4
  5: { offsetX: 0, offsetY: 0.5 },       // Row 2, Col 1
  6: { offsetX: 0.25, offsetY: 0.5 },    // Row 2, Col 2
  7: { offsetX: 0.5, offsetY: 0.5 },     // Row 2, Col 3
  8: { offsetX: 0.75, offsetY: 0.5 },    // Row 2, Col 4
  9: { offsetX: 0, offsetY: 0.25 },      // Row 3, Col 1
  10: { offsetX: 0.25, offsetY: 0.25 },  // Row 3, Col 2
  11: { offsetX: 0.5, offsetY: 0.25 },   // Row 3, Col 3
  12: { offsetX: 0.75, offsetY: 0.25 },  // Row 3, Col 4
  0: { offsetX: 0.75, offsetY: 0.25 }    // Same as 12
}

export default class RoomNumber extends GameObject {
  material: MeshBasicNodeMaterial
  open = false

  constructor(number: number) {
    super()

    const uvCoord = UVCoords[number as keyof typeof UVCoords]
    console.log("Created Room Number", number, uvCoord)
    
    const numberTextureMap = new TextureLoader().load(DoorNumbers)
    numberTextureMap.onUpdate = () => {
      console.log("Loaded Room Number texture", number, uvCoord, numberTextureMap)
    }
    numberTextureMap.colorSpace = SRGBColorSpace
    numberTextureMap.anisotropy = 16
    
    // Set texture repeat and offset for atlas sampling
    numberTextureMap.repeat.set(0.25, 0.25) // Each tile is 1/4 of the texture
    numberTextureMap.offset.set(uvCoord.offsetX, uvCoord.offsetY)
    
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