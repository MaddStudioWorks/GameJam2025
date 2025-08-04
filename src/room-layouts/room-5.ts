import { Euler, Vector3 } from "three";
import { RoomProps } from "~/interfaces/room-props";
import { bgm } from "~/sound-design/index.sound-design";
import { addKeyToUI, triggerDialog } from "~/ui/index.ui";

const roomLayout: RoomProps = {
  index: 5,
  isLocked: (gameEngine, room) => !gameEngine.gameState.inventory.switch2,
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
          if (!gameEngine.gameState.inventory.switch3) {
            switchObject.meshGroup.rotateZ(Math.PI);
            gameEngine.gameState.inventory.switch3 = true;
            triggerDialog(
              "text",
              gameEngine.translate().game.switchActivated
            );
          }
        },
      },
    ],
    props: [
      {
        type: 'pillarBrokenDenial',
        position: new Vector3(-0.45, 0, -0.33),
        rotation: new Euler(0, Math.PI * 0.33, 0),
      },
      {
        type: 'hearthDenial',
        position: new Vector3(0, 0, -0.49),
        rotation: new Euler,
      }
    ],
    music: bgm.secondary,
  },
};

export default roomLayout;
