import { Euler, Vector3 } from 'three'
import { RoomProps } from '~/interfaces/room-props'
import { bgm } from '~/sound-design/index.sound-design'
import { addKeyToUI, triggerDialog } from '~/ui/index.ui'
import note3 from '~/assets/textures/interactive-objects/note3.png'

const roomLayout: RoomProps = {
  index: 11,
  isLocked: (gameEngine, room) => !gameEngine.gameState.inventory.switch3,
  doorType: 'default',
  content: {
    roomType: 'default',
    keyObjects: [
      {
        id: 3,
        type: "note",
        position: new Vector3(0.25, 0.25, -0.49),
        rotation: new Euler,
        onClick: (gameEngine) => {
          triggerDialog('url', note3)
        }
      },
    ],
    props: [],
    music: bgm.secondary
  }
}

export default roomLayout