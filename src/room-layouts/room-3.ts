import { Euler, Vector3 } from 'three'
import { RoomProps } from '~/interfaces/room-props'
import { bgm } from '~/sound-design/index.sound-design'
import { addKeyToUI, triggerDialog } from '~/ui/index.ui'

const roomLayout: RoomProps = {
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
    music: bgm.room1
  }
}

export default roomLayout