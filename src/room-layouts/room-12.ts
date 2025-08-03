import { Euler, Vector3 } from 'three'
import { RoomProps } from '~/interfaces/room-props'
import { bgm } from '~/sound-design/index.sound-design'
import { addKeyToUI, triggerDialog } from '~/ui/index.ui'

const roomLayout: RoomProps = {
  index: 0,
  isLocked: (gameEngine, room) => false,
  doorType: 'acceptance',
  content: {
    roomType: 'acceptance',
    keyObjects: [],
    props: [],
    music: bgm.theme
  }
}

export default roomLayout