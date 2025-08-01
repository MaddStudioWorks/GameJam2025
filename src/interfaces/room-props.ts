import { Euler, Vector3 } from 'three'
import GameEngine from '~/game-engine'
import Room from '~/game-objects/room'

export interface KeyObject{
  id: number
  type: 'key' | 'switch'
  position: Vector3
  rotation: Euler
}

export interface Prop{
  type: 'bookshelf' | 'pillar' | 'mirror' | 'canvas' | 'hearth'
  position: Vector3
  rotation: Euler
}

export interface RoomProps{
  index: number
  isLocked: (gameEngine: GameEngine, room: Room) => boolean
  doorType: 'default' | 'denial' | 'sadness' | 'anger' | 'acceptation'
  content: {
    roomType: 'default' | 'denial' | 'sadness' | 'anger' | 'acceptation'
    keyObjects: KeyObject[]
    props: Prop[]
    music: string // replace with typeof musicBGM objects from Acker
  }
}