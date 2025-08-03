import { Euler, Vector3 } from "three";
import { RoomProps } from "~/interfaces/room-props";
import { bgm } from "~/sound-design/index.sound-design";
import { addKeyToUI, triggerDialog } from "~/ui/index.ui";
import constellationPoster from '~/assets/textures/interactive-objects/constellationPoster3.png'

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
          addKeyToUI(3);
        },
      },
      {
        id: 3,
        type: "constellationPoster",
        position: new Vector3(-0.25, 0.25, -0.49),
        rotation: new Euler(),
        onClick: (gameEngine) => {
          triggerDialog("url", constellationPoster);
        },
      },
    ],
    props: [],
    music: bgm.room3,
  },
};

export default roomLayout;
