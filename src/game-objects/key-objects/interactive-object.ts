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
import note1EN from '~/assets/textures/interactive-objects/note1-en.png'
import note2EN from '~/assets/textures/interactive-objects/note2-en.png'
import note3EN from '~/assets/textures/interactive-objects/note3-en.png'
import note1FR from '~/assets/textures/interactive-objects/note1-fr.png'
import note2FR from '~/assets/textures/interactive-objects/note2-fr.png'
import note3FR from '~/assets/textures/interactive-objects/note3-fr.png'
import star from '~/assets/textures/interactive-objects/star.png'
import starToggled from '~/assets/textures/interactive-objects/starToggled.png'
import { KeyObject } from '~/types/room-props'

const textureName = {
  key : {
    1: (gameEngine: GameEngine) => key1,
    2: (gameEngine: GameEngine) => key2,
    3: (gameEngine: GameEngine) => key3,
  },
  switch: {
    1: (gameEngine: GameEngine) => switch1,
  },
  constellationPoster: {
    1: (gameEngine: GameEngine) => constellationPoster1,
    2: (gameEngine: GameEngine) => constellationPoster2,
    3: (gameEngine: GameEngine) => constellationPoster3,
  },
  note: {
    1: (gameEngine: GameEngine) => gameEngine.translationHandler.lang === 'en' ? note1EN : note1FR,
    2: (gameEngine: GameEngine) => gameEngine.translationHandler.lang === 'en' ? note2EN : note2FR,
    3: (gameEngine: GameEngine) => gameEngine.translationHandler.lang === 'en' ? note3EN : note3FR,
  },
  star: {
    1: (gameEngine: GameEngine) => star
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

  constructor({ id, type }: KeyObject, gameEngine: GameEngine) {
    super()
    this.id = id
    this.type = type

    const texturePath = textureName[type][id](gameEngine)
    const interactiveObjectTextureMap = new TextureLoader().load(texturePath)
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
        this.clicked = true
        if (this.type === 'key') {
          this.mesh.visible = false
        }
      }
    }
  }

  onHover(){

  }

  tick(engine: GameEngine) {
  }
}