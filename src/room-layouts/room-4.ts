import { Euler, Vector3 } from 'three'
import { RoomProps } from '~/interfaces/room-props'
import { bgm } from '~/sound-design/index.sound-design'
import { addKeyToUI, triggerDialog } from '~/ui/index.ui'

const roomLayout: RoomProps = {
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
    music: bgm.room1
  }
}

export default roomLayout