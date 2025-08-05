import { Euler, Vector3 } from 'three'
import { RoomProps } from '~/types/room-props'
import { bgm } from '~/controls/sound-handler'

const roomLayout: RoomProps = {
  index: 8,
  isLocked: (gameEngine, room) => false,
  doorType: 'default',
  content: {
    roomType: 'default',
    keyObjects: [],
    props: [
      {
        type: 'pillarBrokenAnger',
        position: new Vector3(-0.45, 0, -0.33),
        rotation: new Euler(0, Math.PI * 0.33, 0),
      },
      {
        type: 'mirrorAnger',
        position: new Vector3(0.25, 0, -0.49),
        rotation: new Euler,
      }
    ],
    music: bgm.secondary
  }
}

export default roomLayout