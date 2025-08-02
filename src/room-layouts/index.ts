import { Euler, Vector3 } from 'three'
import { RoomProps } from '~/interfaces/room-props'

/*
  - Les Room Index sont 0-indexed (soit de 0 à 11)
  - Les keyObjects peuvent avoir le chiffre que tu veux 
    et peuvent être de type 'key' ou 'switch'
*/

const roomLayouts: RoomProps[] = [
  {
    index: 0,
    isLocked: () => false,
    doorType: 'default',
    content: {
      roomType: 'default',
      keyObjects: [
        { id: 1, type: "key", position: new Vector3(0, 0, -0.4), rotation: new Euler }
      ],
      props: [],
      music: 'default'
    }
  },
  {
    index: 1,
    isLocked: () => false,
    doorType: 'default',
    content: {
      roomType: 'default',
      keyObjects: [
        { id: 1, type: "key", position: new Vector3(0, 0, -0.4), rotation: new Euler }
      ],
      props: [],
      music: 'default'
    }
  },
  {
    index: 2,
    isLocked: () => false,
    doorType: 'default',
    content: {
      roomType: 'default',
      keyObjects: [
        { id: 1, type: "key", position: new Vector3(0, 0, -0.4), rotation: new Euler }
      ],
      props: [],
      music: 'default'
    }
  },
  {
    index: 3,
    isLocked: () => false,
    doorType: 'default',
    content: {
      roomType: 'default',
      keyObjects: [
        { id: 1, type: "key", position: new Vector3(0, 0, -0.4), rotation: new Euler }
      ],
      props: [],
      music: 'default'
    }
  },
  {
    index: 4,
    isLocked: () => false,
    doorType: 'default',
    content: {
      roomType: 'default',
      keyObjects: [
        { id: 1, type: "key", position: new Vector3(0, 0, -0.4), rotation: new Euler }
      ],
      props: [],
      music: 'default'
    }
  },
  {
    index: 5,
    isLocked: () => false,
    doorType: 'default',
    content: {
      roomType: 'default',
      keyObjects: [
        { id: 1, type: "key", position: new Vector3(0, 0, -0.4), rotation: new Euler }
      ],
      props: [],
      music: 'default'
    }
  },
  {
    index: 6,
    isLocked: () => false,
    doorType: 'default',
    content: {
      roomType: 'default',
      keyObjects: [
        { id: 1, type: "key", position: new Vector3(0, 0, -0.4), rotation: new Euler }
      ],
      props: [],
      music: 'default'
    }
  },
  {
    index: 7,
    isLocked: () => false,
    doorType: 'default',
    content: {
      roomType: 'default',
      keyObjects: [
        { id: 1, type: "key", position: new Vector3(0, 0, -0.4), rotation: new Euler }
      ],
      props: [],
      music: 'default'
    }
  },
  {
    index: 8,
    isLocked: () => false,
    doorType: 'default',
    content: {
      roomType: 'default',
      keyObjects: [
        { id: 1, type: "key", position: new Vector3(0, 0, -0.4), rotation: new Euler }
      ],
      props: [],
      music: 'default'
    }
  },
  {
    index: 9,
    isLocked: () => false,
    doorType: 'default',
    content: {
      roomType: 'default',
      keyObjects: [
        { id: 1, type: "key", position: new Vector3(0, 0, -0.4), rotation: new Euler }
      ],
      props: [],
      music: 'default'
    }
  },
  {
    index: 10,
    isLocked: () => false,
    doorType: 'default',
    content: {
      roomType: 'default',
      keyObjects: [
        { id: 1, type: "key", position: new Vector3(0, 0, -0.4), rotation: new Euler }
      ],
      props: [],
      music: 'default'
    }
  },
  {
    index: 11,
    isLocked: () => false,
    doorType: 'default',
    content: {
      roomType: 'default',
      keyObjects: [
        { id: 1, type: "key", position: new Vector3(0, 0, -0.4), rotation: new Euler }
      ],
      props: [],
      music: 'default'
    }
  },
]

export {
  roomLayouts
}