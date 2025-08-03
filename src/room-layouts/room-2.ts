import { Euler, Vector3 } from 'three'
import { RoomProps } from '~/interfaces/room-props'
import { bgm } from '~/sound-design/index.sound-design'
import { addKeyToUI, triggerDialog } from '~/ui/index.ui'

const roomLayout: RoomProps = {
  index: 2,
  isLocked: (gameEngine, room) => true,
  doorType: 'default',
  content: {
    roomType: 'default',
    keyObjects: [

    ],
    props: [
      {
        type: 'pillarAltAnger',
        position: new Vector3(-0.49, 0, -0.25),
        rotation: new Euler(0, Math.PI/2, 0),
      },
      {
        type: 'windowGold',
        position: new Vector3(0, 0.2, -0.25),
        rotation: new Euler(0, 0, 0),
      },
      /*{
        type: 'drapesAnger',
        position: new Vector3(0, 0, -0.49),
        rotation: new Euler,
      }*/
    ],
    music: bgm.secondary
  }
}

export default roomLayout