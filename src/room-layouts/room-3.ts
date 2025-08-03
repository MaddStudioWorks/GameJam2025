import { Euler, Vector3 } from "three";
import { RoomProps } from "~/interfaces/room-props";
import { bgm } from "~/sound-design/index.sound-design";
import { addKeyToUI, triggerDialog } from "~/ui/index.ui";
import constellationPoster from "~/assets/textures/interactive-objects/constellationPoster1.png";

const roomLayout: RoomProps = {
  index: 3,
  isLocked: (gameEngine, room) => gameEngine.gameState.time <= (1 / 12) * 9,
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
          gameEngine.gameState.inventory.key1 = true;
          addKeyToUI(1, gameEngine.gameState.inventory);
        },
      },
      {
        id: 1,
        type: "constellationPoster",
        position: new Vector3(-0.25, 0.25, -0.49),
        rotation: new Euler(),
        onClick: (gameEngine) => {
          triggerDialog("url", constellationPoster);
        },
      },
    ],
    props: [
      {
        type: 'canvasDenial',
        position: new Vector3(0.49, 0.33, -0.15),
        rotation: new Euler(0, -Math.PI / 2, 0),
      }
    ],
    music: bgm.room1,
  },
};

export default roomLayout;
