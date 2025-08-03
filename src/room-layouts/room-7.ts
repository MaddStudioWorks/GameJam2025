import { Euler, Vector3 } from "three";
import { RoomProps } from "~/interfaces/room-props";
import { bgm } from "~/sound-design/index.sound-design";
import { addKeyToUI, triggerDialog } from "~/ui/index.ui";
import note2 from '~/assets/textures/interactive-objects/note2.png'

const roomLayout: RoomProps = {
  index: 7,
  isLocked: (gameEngine, room) => !gameEngine.gameState.inventory.switch1,
  doorType: "default",
  content: {
    roomType: "default",
    keyObjects: [
      {
        id: 1,
        type: "switch",
        position: new Vector3(0.49, 0.25, -0.25),
        rotation: new Euler(0, -Math.PI / 2, 0),
        onClick: (gameEngine, switchObject) => {
          if (!gameEngine.gameState.inventory.switch4) {
            switchObject.meshGroup.rotateZ(Math.PI);
            gameEngine.gameState.inventory.switch4 = true;
            triggerDialog(
              "text",
              "You have activated a switch. You hear a distant click."
            );
          }
        },
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
    ],
    props: [],
    music: bgm.secondary,
  },
};

export default roomLayout;
