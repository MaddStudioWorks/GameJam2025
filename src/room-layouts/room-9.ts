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
    keyObjects: [],
    props: [],
    music: bgm.room1
  }
}

export default roomLayout