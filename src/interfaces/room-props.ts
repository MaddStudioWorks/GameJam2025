import { Euler, Vector3 } from 'three'
import GameEngine from '~/game-engine'
import GameObject from '~/game-objects/game-object'
import Room from '~/game-objects/room'

export interface KeyObject{
  id: number
  type: 'key' | 'switch' | 'constellationPoster' | 'note'
  position: Vector3
  rotation: Euler
  onClick: (engine: GameEngine, gameObject: GameObject) => void
}

/*
  Denial=brown
  Anger=red
  Sadness=blue
*/

export interface Prop{
  type: 
    'bookshelfDenial' | 'bookshelfSadness' | 'bookshelfAnger' | 
    'pillarDenial' | 'pillarSadness' |  'pillarAnger' | 
    'pillarAltDenial' | 'pillarAltSadness' |  'pillarAltAnger' | 
    'pillarBrokenDenial' | 'pillarBrokenSadness' |  'pillarBrokenAnger' | 
    'mirrorDenial' | 'mirrorSadness' |  'mirrorAnger' | 
    'canvasDenial' | 'canvasSadness' | 'canvasAnger' | 'canvasAcceptance' | 
    'hearthDenial' | 'hearthSadness' | 'hearthAnger' | 
    'amphora' | 'amphoraWithPlant1' | 'amphoraWithPlant2' | 
    'drapesDenial' | 'drapesSadness' | 'drapesAnger' | 
    'windowSilver' | 'windowGold'
  position: Vector3
  rotation: Euler
}

export interface RoomProps{
  index: number
  isLocked: (gameEngine: GameEngine, room: Room) => boolean
  doorType: 'default' | 'denial' | 'sadness' | 'anger' | 'acceptance'
  content: {
    roomType: 'default' | 'denial' | 'sadness' | 'anger' | 'acceptance'
    keyObjects: KeyObject[]
    props: Prop[]
    music: string
  }
}