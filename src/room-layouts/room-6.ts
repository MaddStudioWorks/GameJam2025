import { Euler, Vector3 } from "three";
import { RoomProps } from "~/interfaces/room-props";
import { bgm } from "~/sound-design/index.sound-design";
import { addKeyToUI, triggerDialog } from "~/ui/index.ui";
import constellationPoster from '~/assets/textures/interactive-objects/constellationPoster2.png'

const roomLayout: RoomProps = {
  index: 6,
  isLocked: (gameEngine, room) => gameEngine.gameState.time <= (1 / 12) * 2,
  doorType: "anger",
  content: {
    roomType: "anger",
    keyObjects: [
      {
        id: 2,
        type: "key",
        position: new Vector3(0, 0, -0.4),
        rotation: new Euler(),
        onClick: (gameEngine) => {
          gameEngine.gameState.inventory.key2 = true;
          addKeyToUI(2, gameEngine.gameState.inventory);
        },
      },
      {
        id: 2,
        type: "constellationPoster",
        position: new Vector3(-0.25, 0.25, -0.49),
        rotation: new Euler(),
        onClick: (gameEngine) => {
          triggerDialog("url", constellationPoster);
        },
      },
    ],
    props: [],
    music: bgm.room2,
  },
};

export default roomLayout;
