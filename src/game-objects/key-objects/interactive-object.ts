import GameEngine from '~/game-engine'
import GameObject from '~/game-objects/game-object'
import { Mesh, MeshBasicNodeMaterial, PlaneGeometry, SRGBColorSpace, Texture, TextureLoader } from 'three/webgpu'
import key1 from '~/assets/textures/interactive-objects/key1.png'
import key2 from '~/assets/textures/interactive-objects/key2.png'
import key3 from '~/assets/textures/interactive-objects/key3.png'
import switch1 from '~/assets/textures/interactive-objects/switch1.png'
import constellationPoster1 from '~/assets/textures/interactive-objects/constellationPoster1.png'
import constellationPoster2 from '~/assets/textures/interactive-objects/constellationPoster2.png'
import constellationPoster3 from '~/assets/textures/interactive-objects/constellationPoster3.png'
import note1 from '~/assets/textures/interactive-objects/note1.png'
import note2 from '~/assets/textures/interactive-objects/note2.png'
import note3 from '~/assets/textures/interactive-objects/note3.png'
import star from '~/assets/textures/interactive-objects/star.png'
import starToggled from '~/assets/textures/interactive-objects/starToggled.png'
import { KeyObject } from '~/interfaces/room-props'

const textureName = {
  key : {
    1: key1,
    2: key2,
    3: key3,
  },
  switch: {
    1: switch1,
  },
  constellationPoster: {
    1: constellationPoster1,
    2: constellationPoster2,
    3: constellationPoster3,
  },
  note: {
    1: note1,
    2: note2,
    3: note3,
  },
  star: {
    1: star
  }
}

export default class InteractiveObject extends GameObject {
  clicked = false
  material: MeshBasicNodeMaterial
  id: KeyObject['id']
  type: KeyObject['type']
  mesh: Mesh
  starTexture: Texture
  toggledStarTexture: Texture

  constructor({ id, type }: KeyObject) {
    super()
    this.id = id
    this.type = type

    const interactiveObjectTextureMap = new TextureLoader().load(textureName[type][id])
    this.starTexture = new TextureLoader().load(star)
    this.toggledStarTexture = new TextureLoader().load(starToggled)
    interactiveObjectTextureMap.anisotropy = 16
    interactiveObjectTextureMap.colorSpace = SRGBColorSpace

    this.material = new MeshBasicNodeMaterial({
      transparent: true,
      map: interactiveObjectTextureMap,
      depthWrite: false
    })
    const InteractiveObjectGeometry = new PlaneGeometry(1, 1)
    this.mesh = new Mesh(InteractiveObjectGeometry, this.material)

    if(this.type === 'key') this.mesh.scale.setScalar(0.1)
    if(this.type === 'switch') this.mesh.scale.setScalar(0.1)
    if(this.type === 'constellationPoster') this.mesh.scale.setScalar(0.25)
    if(this.type === 'note') this.mesh.scale.setScalar(0.1)
    if(this.type === 'star') this.mesh.scale.setScalar(0.05)

    this.mesh.name = 'InteractiveObject' + id

    this.meshGroup.add(this.mesh)
  }

  onClick() {
    if(this.type === 'star'){
      this.clicked = !this.clicked
      this.material.map = this.clicked ? this.toggledStarTexture : this.starTexture
    }else{
      if (!this.clicked){
        this.clicked = !this.clicked
      }
    }
  }

  onHover(){
    console.log('InteractiveObject hovered', this)
  }

  tick(engine: GameEngine) {
  }
}