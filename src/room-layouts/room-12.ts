import { Euler, Vector3 } from 'three'
import GameEngine from '~/game-engine'
import { RoomProps } from '~/types/room-props'
import { bgm } from '~/controls/sound-handler'

const checkStarsCombination = (gameEngine: GameEngine) => {
  const stars = gameEngine.gameState.stars
  const validCombination = stars.star1 && stars.star2 && stars.star3 && stars.star4
  const invalidStarsToggled = stars.star5 || stars.star6 || stars.star7 || stars.star8

  if (validCombination && !invalidStarsToggled) {
    gameEngine.gameState.hasWon = true
    const finalEvent = new CustomEvent('final')
    dispatchEvent(finalEvent)
    gameEngine.musicHandler.cleanAllMusic()
    gameEngine.musicHandler.playBGM(bgm.secondary, false)
  }
}

const roomLayout: RoomProps = {
  index: 0,
  isLocked: (gameEngine, room) => !gameEngine.gameState.inventory.lastDoorOpen(),
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
      // Clutter stars (interactive but don't contribute to solution)
      {
        id: 1,
        type: "star",
        position: new Vector3(-0.4, 0.2, -0.49),
        rotation: new Euler,
        onClick: (gameEngine) => {
          gameEngine.gameState.stars.star5 = !gameEngine.gameState.stars.star5
          checkStarsCombination(gameEngine)
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
        }
      },
    ],
    props: [
      {
        type: 'amphoraWithPlant1',
        position: new Vector3(-0.45, 0, -0.15),
        rotation: new Euler(0, Math.PI*0.4, 0),
      },
      {
        type: 'amphoraWithPlant2',
        position: new Vector3(0.45, 0, -0.15),
        rotation: new Euler(0, -Math.PI*0.4, 0),
      },
    ],
    music: bgm.room4
  }
}

export default roomLayout