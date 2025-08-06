import { Euler, Vector3 } from 'three'
import { RoomProps } from '~/types/room-props'
import { bgm, sfx } from '~/controls/sound-handler'
import note3EN from '~/assets/textures/interactive-objects/note3-en.png'
import note3FR from '~/assets/textures/interactive-objects/note3-fr.png'

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
          const note3 = gameEngine.translationHandler.lang === 'en' ? note3EN : note3FR
          gameEngine.uiHandler.triggerDialog('url', note3)
          gameEngine.musicHandler.playSFX(sfx.note)
        }
      },
    ],
    props: [
      {
        type: 'pillarSadness',
        position: new Vector3(-0.45, 0, -0.33),
        rotation: new Euler(0, Math.PI * 0.33, 0),
      },
      {
        type: 'mirrorSadness',
        position: new Vector3(0.49, 0, -0.15),
        rotation: new Euler(0, -Math.PI / 2, 0),
      }
    ],
    music: bgm.secondary
  }
}

export default roomLayout