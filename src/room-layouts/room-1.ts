import { Euler, Vector3 } from 'three'
import { RoomProps } from '~/interfaces/room-props'
import { bgm } from '~/sound-design/index.sound-design'
import { addKeyToUI, triggerDialog } from '~/ui/index.ui'

const roomLayout: RoomProps = {
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
    props: [
      {
        type: 'mirrorDenial',
        position: new Vector3(-0.49, 0, -0.25),
        rotation: new Euler(0, Math.PI/2, 0),
      },
      {
        type: 'bookshelfAnger',
        position: new Vector3(0.49, 0, -0.25),
        rotation: new Euler(0, -Math.PI/2, 0),
      },
      {
        type: 'hearthDenial',
        position: new Vector3(0, 0, -0.49),
        rotation: new Euler,
      }
    ],
    music: bgm.room1
  }
}

export default roomLayout