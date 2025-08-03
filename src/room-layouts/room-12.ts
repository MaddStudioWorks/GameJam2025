import { Euler, Vector3 } from 'three'
import GameEngine from '~/game-engine'
import { RoomProps } from '~/interfaces/room-props'
import { bgm } from '~/sound-design/index.sound-design'
import { addKeyToUI, triggerDialog } from '~/ui/index.ui'
import final4 from '~/assets/textures/final/final4.png'

const checkStarsCombination = (gameEngine: GameEngine) => {
  const stars = gameEngine.gameState.stars
  const validCombination = stars.star1 && stars.star2 && stars.star3 && stars.star4
  const invalidStarsToggled = stars.star5 || stars.star6 || stars.star7 || stars.star8

  if (validCombination && !invalidStarsToggled) {
    triggerDialog('url', final4)
  }
}

const roomLayout: RoomProps = {
  index: 0,
  isLocked: (gameEngine, room) => false,
  doorType: 'acceptance',
  content: {
    roomType: 'acceptance',
    keyObjects: [
      // Solution stars (keep unchanged)
      {
        id: 1,
        type: "star",
        position: new Vector3(-0.25, 0.33, -0.49),
        rotation: new Euler,
        onClick: (gameEngine) => {
          gameEngine.gameState.stars.star1 = !gameEngine.gameState.stars.star1
          checkStarsCombination(gameEngine)
          console.log('star1')
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
          console.log('star2')
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
          console.log('star3')
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
          console.log('star4')
        }
      },
      // Clutter stars (interactive but don't contribute to solution)
      {
        id: 1,
        type: "star",
        position: new Vector3(-0.4, 0.2, -0.49),
        rotation: new Euler,
        onClick: (gameEngine) => {
          gameEngine.gameState.stars.star5 = !gameEngine.gameState.stars.star5
          checkStarsCombination(gameEngine)
          console.log('star5')
        }
      },
      {
        id: 1,
        type: "star",
        position: new Vector3(-0.4, 0.66, -0.49),
        rotation: new Euler,
        onClick: (gameEngine) => {
          gameEngine.gameState.stars.star6 = !gameEngine.gameState.stars.star6
          checkStarsCombination(gameEngine)
          console.log('star6')
        }
      },
      {
        id: 1,
        type: "star",
        position: new Vector3(0.4, 0.4, -0.49),
        rotation: new Euler,
        onClick: (gameEngine) => {
          gameEngine.gameState.stars.star7 = !gameEngine.gameState.stars.star7
          checkStarsCombination(gameEngine)
          console.log('star7')
        }
      },
      {
        id: 1,
        type: "star",
        position: new Vector3(-0.15, 0.6, -0.49),
        rotation: new Euler,
        onClick: (gameEngine) => {
          gameEngine.gameState.stars.star8 = !gameEngine.gameState.stars.star8
          checkStarsCombination(gameEngine)
          console.log('star8')
        }
      },
      {
        id: 1,
        type: "star",
        position: new Vector3(0.4, 0.1, -0.49),
        rotation: new Euler,
        onClick: (gameEngine) => {
          gameEngine.gameState.stars.star9 = !gameEngine.gameState.stars.star9
          checkStarsCombination(gameEngine)
          console.log('star9')
        }
      },
    ],
    props: [],
    music: bgm.room4
  }
}

export default roomLayout