import { Euler, Vector3 } from 'three'
import { RoomProps } from '~/interfaces/room-props'
import { bgm } from '~/sound-design/index.sound-design'
import { addKeyToUI, triggerDialog } from '~/ui/index.ui'

const roomLayout: RoomProps = {
  index: 9,
  isLocked: (gameEngine, room) => false,
  doorType: 'sadness',
  content: {
    roomType: 'sadness',
    keyObjects: [      {
        id: 2,
        type: "key",
        position: new Vector3(0, 0, -0.4),
        rotation: new Euler,
        onClick: (gameEngine) => {
          gameEngine.gameState.inventory.key2 = true
          addKeyToUI(3)
          setTimeout(() => {
            triggerDialog('close')
          }, 3000)
        }
      }],
    props: [],
    music: bgm.room3
  }
}

export default roomLayout