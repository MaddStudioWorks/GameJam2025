import { Euler, Vector3 } from "three";
import { RoomProps } from "~/types/room-props";
import { bgm, sfx } from "~/controls/sound-handler";

const roomLayout: RoomProps = {
  index: 10,
  isLocked: (gameEngine, room) => false,
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
          if (!gameEngine.gameState.inventory.switch5) {
            switchObject.meshGroup.rotateZ(Math.PI);
            gameEngine.gameState.inventory.switch5 = true;
            gameEngine.uiHandler.triggerDialog(
              "text",
              gameEngine.translate().game.switchActivated
            );
            gameEngine.musicHandler.playSFX(sfx.switch)
          }
        },
      },
    ],
    props: [
      {
        type: 'pillarAltAnger',
        position: new Vector3(-0.45, 0, -0.33),
        rotation: new Euler(0, Math.PI * 0.33, 0),
      },
      {
        type: 'amphoraWithPlant1',
        position: new Vector3(0.25, 0, -0.49),
        rotation: new Euler,
      }
    ],
    music: bgm.secondary,
  },
};

export default roomLayout;
