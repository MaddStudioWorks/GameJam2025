import { Euler, Vector3 } from 'three'
import { RoomProps } from '~/interfaces/room-props'
import { bgm } from '~/sound-design/index.sound-design'
import { addKeyToUI, triggerDialog } from '~/ui/index.ui'

const roomLayout: RoomProps = {
  index: 6,
  isLocked: (gameEngine, room) => gameEngine.gameState.time > 1 / 12,
  doorType: 'anger',
  content: {
    roomType: 'anger',
    keyObjects: [],
    props: [],
    music: bgm.room1
  }
}

export default roomLayout