import { Euler, Vector3 } from "three";
import { RoomProps } from "~/interfaces/room-props";
import { bgm } from "~/controls/sound-handler";
import note2EN from '~/assets/textures/interactive-objects/note2-en.png'
import note2FR from '~/assets/textures/interactive-objects/note2-fr.png'

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
            gameEngine.uiHandler.triggerDialog(
              "text",
              gameEngine.translate().game.switchActivated
            );
          }
        },
      },
      {
        id: 2,
        type: "note",
        position: new Vector3(-0.1, 0.25, -0.49),
        rotation: new Euler,
        onClick: (gameEngine) => {
          const note2 = gameEngine.translationHandler.lang === 'en' ? note2EN : note2FR
          gameEngine.uiHandler.triggerDialog('url', note2)
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
      },
      {
        type: 'drapesAnger',
        position: new Vector3(0.25, 0.25, -0.49),
        rotation: new Euler,
      }
    ],
    music: bgm.secondary,
  },
};

export default roomLayout;
