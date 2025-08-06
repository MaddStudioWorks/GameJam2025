import { Euler, Vector3 } from "three";
import { RoomProps } from "~/types/room-props";
import { bgm, sfx } from "~/controls/sound-handler";
import constellationPoster from "~/assets/textures/interactive-objects/constellationPoster3.png";

const roomLayout: RoomProps = {
  index: 9,
  isLocked: (gameEngine, room) => gameEngine.gameState.time <= (1 / 12) * 3,
  doorType: "sadness",
  content: {
    roomType: "sadness",
    keyObjects: [
      {
        id: 3,
        type: "key",
        position: new Vector3(0, 0, -0.4),
        rotation: new Euler(),
        onClick: (gameEngine) => {
          gameEngine.gameState.inventory.key3 = true;
          gameEngine.uiHandler.addKeyToUI(3);
          gameEngine.musicHandler.playSFX(sfx.keys)
        },
      },
      {
        id: 3,
        type: "constellationPoster",
        position: new Vector3(-0.25, 0.25, -0.49),
        rotation: new Euler(),
        onClick: (gameEngine) => {
          gameEngine.uiHandler.triggerDialog("url", constellationPoster);
          gameEngine.musicHandler.playSFX(sfx.note)
        },
      },
    ],
    props: [
      {
        type: 'pillarAltSadness',
        position: new Vector3(-0.45, 0, -0.33),
        rotation: new Euler(0, Math.PI * 0.33, 0),
      },
      {
        type: 'canvasSadness',
        position: new Vector3(0.49, 0.33, -0.15),
        rotation: new Euler(0, -Math.PI / 2, 0),
      }
    ],
    music: bgm.room3,
  },
};

export default roomLayout;
