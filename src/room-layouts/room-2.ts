import { Euler, Vector3 } from 'three'
import { RoomProps } from '~/interfaces/room-props'
import { bgm } from '~/sound-design/index.sound-design'
import { addKeyToUI, triggerDialog } from '~/ui/index.ui'

const roomLayout: RoomProps = {
  index: 2,
  isLocked: (gameEngine, room) => !gameEngine.gameState.inventory.switch4,
  doorType: 'default',
  content: {
    roomType: 'default',
    keyObjects: [
      {
        id: 1,
        type: "switch",
        position: new Vector3(0.49, 0.25, -0.25),
        rotation: new Euler(0, -Math.PI / 2, 0),
        onClick: (gameEngine, switchObject) => {
          if(!gameEngine.gameState.inventory.switch2){
            switchObject.meshGroup.rotateZ(Math.PI)
            gameEngine.gameState.inventory.switch2 = true
            triggerDialog('text', 'You have activated a switch. You hear a distant click.')
          }
        }
      },
    ],
    props: [],
    music: bgm.secondary
  }
}

export default roomLayout