import { Euler, Vector3 } from 'three'
import { RoomProps } from '~/interfaces/room-props'
import { bgm } from '~/sound-design/index.sound-design'
import { addKeyToUI, triggerDialog } from '~/ui/index.ui'

const roomLayout: RoomProps = {
  index: 3,
  isLocked: (gameEngine, room) => true,
  doorType: 'denial',
  content: {
    roomType: 'denial',
    keyObjects: [

    ],
    props: [],
    music: bgm.room3
  }
}

export default roomLayout