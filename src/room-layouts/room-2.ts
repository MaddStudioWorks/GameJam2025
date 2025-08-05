import { Euler, Vector3 } from 'three'
import { RoomProps } from '~/interfaces/room-props'
import { bgm, sfx } from '~/controls/sound-handler'

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
            gameEngine.uiHandler.triggerDialog('text', gameEngine.translate().game.switchActivated)
            gameEngine.musicHandler.playSFX(sfx.switch)
          }
        }
      },
    ],
    props: [
      {
        type: 'mirrorDenial',
        position: new Vector3(0, 0, -0.49),
        rotation: new Euler,
      }
    ],
    music: bgm.secondary
  }
}

export default roomLayout