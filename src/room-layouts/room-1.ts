import { Euler, Vector3 } from 'three'
import { RoomProps } from '~/interfaces/room-props'
import { bgm } from '~/sound-design/index.sound-design'
import { addKeyToUI, triggerDialog } from '~/ui/index.ui'
import note1 from '~/assets/textures/interactive-objects/note1.png'

const roomLayout: RoomProps = {
  index: 1,
  isLocked: (gameEngine, room) => !gameEngine.gameState.inventory.switch5,
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
          if(!gameEngine.gameState.inventory.switch1){
            switchObject.meshGroup.rotateZ(Math.PI)
            gameEngine.gameState.inventory.switch1 = true
            triggerDialog('text', 'You have activated a switch. You hear a distant click.')
          }
        }
      },
      {
        id: 1,
        type: "note",
        position: new Vector3(-0.25, 0.25, -0.49),
        rotation: new Euler,
        onClick: (gameEngine) => {
          triggerDialog('url', note1)
        }
      },
    ],
    props: [
      {
        type: 'pillarAltAnger',
        position: new Vector3(-0.49, 0, -0.25),
        rotation: new Euler(0, Math.PI/2, 0),
      },
      {
        type: 'windowGold',
        position: new Vector3(0.49, 0, -0.25),
        rotation: new Euler(0, -Math.PI/2, 0),
      },
      {
        type: 'drapesAnger',
        position: new Vector3(0, 0, -0.49),
        rotation: new Euler,
      }
    ],
    music: bgm.secondary
  }
}

export default roomLayout