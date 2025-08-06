import { Euler, Vector3 } from "three"
import { RoomProps } from "~/types/room-props"
import { bgm, sfx } from "~/controls/sound-handler"
import constellationPoster from "~/assets/textures/interactive-objects/constellationPoster1.png"

const roomLayout: RoomProps = {
  index: 3,
  isLocked: (gameEngine, room) => false,//gameEngine.gameState.time <= (1 / 12) * 9,
  doorType: "denial",
  content: {
    roomType: "denial",
    keyObjects: [
      {
        id: 1,
        type: "key",
        position: new Vector3(0, 0, -0.4),
        rotation: new Euler(),
        onClick: (gameEngine) => {
          gameEngine.gameState.inventory.key1 = true
          gameEngine.uiHandler.addKeyToUI(1)
          gameEngine.musicHandler.playSFX(sfx.keys)
        },
      },
      {
        id: 1,
        type: "constellationPoster",
        position: new Vector3(-0.25, 0.25, -0.49),
        rotation: new Euler(),
        onClick: (gameEngine) => {
          gameEngine.uiHandler.triggerDialog("url", constellationPoster)
          gameEngine.musicHandler.playSFX(sfx.note)
        },
      },
    ],
    props: [
      {
        type: 'pillarAltDenial',
        position: new Vector3(-0.45, 0, -0.33),
        rotation: new Euler(0, Math.PI * 0.33, 0),
      },
      {
        type: 'canvasDenial',
        position: new Vector3(0.49, 0.33, -0.15),
        rotation: new Euler(0, -Math.PI / 2, 0),
      }
    ],
    music: bgm.room1,
  },
}

export default roomLayout
