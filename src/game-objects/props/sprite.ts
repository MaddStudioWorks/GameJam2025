import GameEngine from '~/game-engine'
import GameObject from '~/game-objects/game-object'
import { BoxGeometry, Mesh, MeshBasicNodeMaterial, PlaneGeometry, SRGBColorSpace, TextureLoader } from 'three/webgpu'
import PropTexture from '~/assets/textures/key.png'
import { Prop } from '~/interfaces/room-props'
import amphora from '~/assets/textures/props/amphora.png'
import bookshelfDenial from '~/assets/textures/props/bookshelfDenial.png'
import canvasDenial from '~/assets/textures/props/canvasDenial.png'
import drapesSadness from '~/assets/textures/props/drapesSadness.png'
import mirrorAnger from '~/assets/textures/props/mirrorAnger.png'
import pillarAltDenial from '~/assets/textures/props/pillarAltDenial.png'
import pillarBrokenDenial from '~/assets/textures/props/pillarBrokenDenial.png'
import windowGold from '~/assets/textures/props/windowGold.png'
import amphoraWithPlant1 from '~/assets/textures/props/amphoraWithPlant1.png'
import bookshelfSadness from '~/assets/textures/props/bookshelfSadness.png'
import canvasSadness from '~/assets/textures/props/canvasSadness.png'
import hearthAnger from '~/assets/textures/props/hearthAnger.png'
import mirrorDenial from '~/assets/textures/props/mirrorDenial.png'
import pillarAltSadness from '~/assets/textures/props/pillarAltSadness.png'
import pillarBrokenSadness from '~/assets/textures/props/pillarBrokenSadness.png'
import windowSilver from '~/assets/textures/props/windowSilver.png'
import amphoraWithPlant2 from '~/assets/textures/props/amphoraWithPlant2.png'
import canvasAcceptance from '~/assets/textures/props/canvasAcceptance.png'
import drapesAnger from '~/assets/textures/props/drapesAnger.png'
import hearthDenial from '~/assets/textures/props/hearthDenial.png'
import mirrorSadness from '~/assets/textures/props/mirrorSadness.png'
import pillarAnger from '~/assets/textures/props/pillarAnger.png'
import pillarDenial from '~/assets/textures/props/pillarDenial.png'
import bookshelfAnger from '~/assets/textures/props/bookshelfAnger.png'
import canvasAnger from '~/assets/textures/props/canvasAnger.png'
import drapesDenial from '~/assets/textures/props/drapesDenial.png'
import hearthSadness from '~/assets/textures/props/hearthSadness.png'
import pillarAltAnger from '~/assets/textures/props/pillarAltAnger.png'
import pillarBrokenAnger from '~/assets/textures/props/pillarBrokenAnger.png'
import pillarSadness from '~/assets/textures/props/pillarSadness.png'

const textures: Record<string, { src: string, size: number }> = {
  amphora: {
    src: amphora,
    size: 1
  },
  bookshelfDenial: {
    src: bookshelfDenial,
    size: 1
  },
  canvasDenial: {
    src: canvasDenial,
    size: 1
  },
  drapesSadness: {
    src: drapesSadness,
    size: 1
  },
  mirrorAnger: {
    src: mirrorAnger,
    size: 1
  },
  pillarAltDenial: {
    src: pillarAltDenial,
    size: 1
  },
  pillarBrokenDenial: {
    src: pillarBrokenDenial,
    size: 1
  },
  windowGold: {
    src: windowGold,
    size: 1
  },
  amphoraWithPlant1: {
    src: amphoraWithPlant1,
    size: 1
  },
  bookshelfSadness: {
    src: bookshelfSadness,
    size: 1
  },
  canvasSadness: {
    src: canvasSadness,
    size: 1
  },
  hearthAnger: {
    src: hearthAnger,
    size: 1
  },
  mirrorDenial: {
    src: mirrorDenial,
    size: 1
  },
  pillarAltSadness: {
    src: pillarAltSadness,
    size: 1
  },
  pillarBrokenSadness: {
    src: pillarBrokenSadness,
    size: 1
  },
  windowSilver: {
    src: windowSilver,
    size: 1
  },
  amphoraWithPlant2: {
    src: amphoraWithPlant2,
    size: 1
  },
  canvasAcceptance: {
    src: canvasAcceptance,
    size: 1
  },
  drapesAnger: {
    src: drapesAnger,
    size: 1
  },
  hearthDenial: {
    src: hearthDenial,
    size: 1
  },
  mirrorSadness: {
    src: mirrorSadness,
    size: 1
  },
  pillarAnger: {
    src: pillarAnger,
    size: 1
  },
  pillarDenial: {
    src: pillarDenial,
    size: 1
  },
  bookshelfAnger: {
    src: bookshelfAnger,
    size: 1
  },
  canvasAnger: {
    src: canvasAnger,
    size: 1
  },
  drapesDenial: {
    src: drapesDenial,
    size: 1
  },
  hearthSadness: {
    src: hearthSadness,
    size: 1
  },
  pillarAltAnger: {
    src: pillarAltAnger,
    size: 1
  },
  pillarBrokenAnger: {
    src: pillarBrokenAnger,
    size: 1
  },
  pillarSadness: {
    src: pillarSadness,
    size: 1
  },
}

export default class SpriteProp extends GameObject {
  constructor({ type }: Prop) {
    super()

    const propTextureMap = new TextureLoader().load(textures[type].src)
    propTextureMap.anisotropy = 16
    propTextureMap.colorSpace = SRGBColorSpace
    const propMaterial = new MeshBasicNodeMaterial({
      transparent: true,
      map: propTextureMap,
      depthWrite: false
    })
    const propSize = textures[type].size
    const propGeometry = new PlaneGeometry(propSize, propSize)
    const prop = new Mesh(propGeometry, propMaterial)
    prop.name = 'Prop' + type
    prop.translateY(propSize / 2)

    this.meshGroup.add(prop)
  }

  tick(engine: GameEngine) {
  }
}