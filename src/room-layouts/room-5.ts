import { Euler, Vector3 } from 'three'
import { RoomProps } from '~/interfaces/room-props'
import { bgm } from '~/sound-design/index.sound-design'
import { addKeyToUI, triggerDialog } from '~/ui/index.ui'

const roomLayout: RoomProps = {
  index: 5,
  isLocked: (gameEngine, room) => {
    return !gameEngine.gameState.inventory.switch1
  },
  doorType: 'default',
  content: {
    roomType: 'default',
    keyObjects: [],
    props: [],
    music: bgm.room1
  }
}

export default roomLayout