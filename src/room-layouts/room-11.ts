import { Euler, Vector3 } from 'three'
import { RoomProps } from '~/interfaces/room-props'
import { bgm } from '~/sound-design/index.sound-design'
import { addKeyToUI, triggerDialog } from '~/ui/index.ui'
import note1 from '~/assets/textures/interactive-objects/note1.png'
import note2 from '~/assets/textures/interactive-objects/note2.png'
import note3 from '~/assets/textures/interactive-objects/note3.png'

const roomLayout: RoomProps = {
  index: 11,
  isLocked: (gameEngine, room) => false,
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
            setTimeout(() => {
              triggerDialog('close')
            }, 3000)
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
      {
        id: 2,
        type: "note",
        position: new Vector3(0, 0.25, -0.49),
        rotation: new Euler,
        onClick: (gameEngine) => {
          triggerDialog('url', note2)
        }
      },
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
    music: bgm.room1
  }
}

export default roomLayout