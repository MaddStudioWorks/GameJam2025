import { Euler, Vector3 } from 'three'
import { RoomProps } from '~/interfaces/room-props'
import { addKeyToUI, triggerDialog } from '~/ui/index.ui'

/*
  - Les Room Index commence à 0 pour la 12ème heure, puis 1 pour l'heure 1, etc.
  - Les keyObjects peuvent être 
    - de type 'key' ou 'switch'
    - un id de 1-3
    - tu dois décrire ce que ça fait dans le onClick (voir les exemples pour les clés)
*/

const roomLayouts: RoomProps[] = [
  {
    index: 0,
    isLocked: (gameEngine, room) => false,
    doorType: 'acceptance',
    content: {
      roomType: 'default',
      keyObjects: [],
      props: [],
      music: 'default'
    }
  },
  {
    index: 1,
    isLocked: (gameEngine, room) => false,
    doorType: 'default',
    content: {
      roomType: 'default',
      keyObjects: [
        {
          id: 1,
          type: "key",
          position: new Vector3(0, 0, -0.4),
          rotation: new Euler,
          onClick: (gameEngine) => {
            gameEngine.gameState.inventory.key1 = true
            addKeyToUI(1)
            setTimeout(() => {
              triggerDialog('close')
            }, 3000)
          }
        }
      ],
      props: [],
      music: 'default'
    }
  },
  {
    index: 2,
    isLocked: (gameEngine, room) => false,
    doorType: 'default',
    content: {
      roomType: 'default',
      keyObjects: [
        {
          id: 2,
          type: "key",
          position: new Vector3(0, 0, -0.4),
          rotation: new Euler,
          onClick: (gameEngine) => {
            gameEngine.gameState.inventory.key2 = true
            addKeyToUI(2)
            setTimeout(() => {
              triggerDialog('close')
            }, 3000)
          }
        }
      ],
      props: [],
      music: 'default'
    }
  },
  {
    index: 3,
    isLocked: (gameEngine, room) => false,
    doorType: 'denial',
    content: {
      roomType: 'denial',
      keyObjects: [
        {
          id: 3,
          type: "key",
          position: new Vector3(0, 0, -0.4),
          rotation: new Euler,
          onClick: (gameEngine) => {
            gameEngine.gameState.inventory.key3 = true
            addKeyToUI(3)
            setTimeout(() => {
              triggerDialog('close')
            }, 3000)
          }
        }
      ],
      props: [],
      music: 'default'
    }
  },
  {
    index: 4,
    isLocked: (gameEngine, room) => false,
    doorType: 'default',
    content: {
      roomType: 'default',
      keyObjects: [
        {
          id: 1,
          type: "switch",
          position: new Vector3(0, 0, -0.4),
          rotation: new Euler,
          onClick: (gameEngine) => {
            gameEngine.gameState.inventory.switch1 = true
            triggerDialog('text', 'You have activated a switch. You hear a distant click.')
            setTimeout(() => {
              triggerDialog('close')
            }, 3000)
          }
        }
      ],
      props: [],
      music: 'default'
    }
  },
  {
    index: 5,
    isLocked: (gameEngine, room) => {
      return !gameEngine.gameState.inventory.switch1
    },
    doorType: 'default',
    content: {
      roomType: 'default',
      keyObjects: [],
      props: [],
      music: 'default'
    }
  },
  {
    index: 6,
    isLocked: (gameEngine, room) => gameEngine.gameState.time > 1/12,
    doorType: 'anger',
    content: {
      roomType: 'anger',
      keyObjects: [],
      props: [],
      music: 'default'
    }
  },
  {
    index: 7,
    isLocked: (gameEngine, room) => false,
    doorType: 'default',
    content: {
      roomType: 'default',
      keyObjects: [],
      props: [],
      music: 'default'
    }
  },
  {
    index: 8,
    isLocked: (gameEngine, room) => false,
    doorType: 'default',
    content: {
      roomType: 'default',
      keyObjects: [],
      props: [],
      music: 'default'
    }
  },
  {
    index: 9,
    isLocked: (gameEngine, room) => false,
    doorType: 'sadness',
    content: {
      roomType: 'sadness',
      keyObjects: [],
      props: [],
      music: 'default'
    }
  },
  {
    index: 10,
    isLocked: (gameEngine, room) => false,
    doorType: 'default',
    content: {
      roomType: 'default',
      keyObjects: [],
      props: [],
      music: 'default'
    }
  },
  {
    index: 11,
    isLocked: (gameEngine, room) => false,
    doorType: 'default',
    content: {
      roomType: 'default',
      keyObjects: [],
      props: [],
      music: 'default'
    }
  },
]

export {
  roomLayouts
}