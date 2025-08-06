import { Euler, Vector3 } from 'three'
import { RoomProps } from '~/interfaces/room-props'
import { bgm, sfx } from '~/controls/sound-handler'
import note1EN from '~/assets/textures/interactive-objects/note1-en.png'
import note1FR from '~/assets/textures/interactive-objects/note1-fr.png'

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
            gameEngine.uiHandler.triggerDialog('text', gameEngine.translate().game.switchActivated)
            gameEngine.musicHandler.playSFX(sfx.switch)
          }
        }
      },
      {
        id: 1,
        type: "note",
        position: new Vector3(-0.25, 0.25, -0.49),
        rotation: new Euler,
        onClick: (gameEngine) => {
          const note = gameEngine.translationHandler.lang === 'en' ? note1EN : note1FR
          gameEngine.uiHandler.triggerDialog('url', note)
          gameEngine.musicHandler.playSFX(sfx.note)
        }
      },
    ],
    props: [
      {
        type: 'pillarAltDenial',
        position: new Vector3(-0.45, 0, -0.33),
        rotation: new Euler(0, Math.PI * 0.33, 0),
      },
      {
        type: 'bookshelfDenial',
        position: new Vector3(0.25, 0, -0.49),
        rotation: new Euler,
      }
    ],
    music: bgm.secondary
  }
}

export default roomLayout