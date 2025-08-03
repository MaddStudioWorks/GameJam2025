import { Euler, Vector3 } from 'three'
import GameEngine from '~/game-engine'
import { RoomProps } from '~/interfaces/room-props'
import { bgm } from '~/sound-design/index.sound-design'
import { addKeyToUI, triggerDialog } from '~/ui/index.ui'

const checkStarsCombination = (gameEngine: GameEngine) => {
  const stars = gameEngine.gameState.stars
  const validCombination = stars.star1 && stars.star2 && stars.star3 && stars.star4
  if (validCombination) {
    triggerDialog('text', 'You won the game!')
  }
}

const roomLayout: RoomProps = {
  index: 0,
  isLocked: (gameEngine, room) => false,
  doorType: 'acceptance',
  content: {
    roomType: 'acceptance',
    keyObjects: [
      {
        id: 1,
        type: "star",
        position: new Vector3(-0.25, 0.33, -0.49),
        rotation: new Euler,
        onClick: (gameEngine) => {
          gameEngine.gameState.stars.star1 = !gameEngine.gameState.stars.star1
          checkStarsCombination(gameEngine)
        }
      },
      {
        id: 1,
        type: "star",
        position: new Vector3(0, 0.075, -0.49),
        rotation: new Euler,
        onClick: (gameEngine) => {
          gameEngine.gameState.stars.star2 = !gameEngine.gameState.stars.star2
          checkStarsCombination(gameEngine)
        }
      },
      {
        id: 1,
        type: "star",
        position: new Vector3(0.25, 0.2, -0.49),
        rotation: new Euler,
        onClick: (gameEngine) => {
          gameEngine.gameState.stars.star3 = !gameEngine.gameState.stars.star3
          checkStarsCombination(gameEngine)
        }
      },
      {
        id: 1,
        type: "star",
        position: new Vector3(0.25, 0.66, -0.49),
        rotation: new Euler,
        onClick: (gameEngine) => {
          gameEngine.gameState.stars.star4 = !gameEngine.gameState.stars.star4
          checkStarsCombination(gameEngine)
        }
      },
    ],
    props: [],
    music: bgm.theme
  }
}

export default roomLayout