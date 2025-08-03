import GameEngine from '~/game-engine'
import {manageAll} from '~/ui/index.ui'

const gameEngine = new GameEngine
manageAll(gameEngine.musicHandler)
