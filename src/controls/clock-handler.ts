import GameEngine from '~/game-engine'
import { triggerDialog } from '~/ui/index.ui'

export default class ClockHandler{
  gameEngine: GameEngine
  hasReachedGameOver = false

  constructor(gameEngine: GameEngine) {
    this.gameEngine = gameEngine
  }

  onGameOver(){
    this.hasReachedGameOver = true
    triggerDialog('text', 'Game Over')
    setTimeout(() => {
      triggerDialog('close')
    }, 3000)
  }

  tick(){
    if (this.gameEngine.gameState.time === 1 && !this.hasReachedGameOver) {
      this.onGameOver()
    }
  }
}