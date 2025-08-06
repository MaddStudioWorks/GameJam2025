import GameEngine from "~/game-engine"
import key1 from '~/assets/textures/interactive-objects/key1.png'

export default class DebugHandler {
  gameEngine: GameEngine

  constructor(gameEngine: GameEngine) {
    this.gameEngine = gameEngine
    this.initializeDebugUI()
  }

  initializeDebugUI() {
    // Hide debug mode unless `#debug` is present in the URL
    if (window.location.hash === "#debug") {
      (document.querySelector(".debug-ui") as HTMLDivElement).style.display = "block"
    }

    this.setupDebugButtons()
  }

  setupDebugButtons() {
    // Dialog debug buttons
    this.setupButton("#dImage", () => {
      this.gameEngine.uiHandler.triggerDialog("url", key1)
    })

    this.setupButton("#dClose", () => {
      this.gameEngine.uiHandler.triggerDialog("close")
    })

    this.setupButton("#dText", () => {
      this.gameEngine.uiHandler.triggerDialog("text", "Vous avez récupéré un indice")
    })

    this.setupButton("#dImageText", () => {
      this.gameEngine.uiHandler.triggerDialog("both", "Vous avez récupéré un indice", key1)
    })

    // Game Debug buttons
    this.setupButton("#Key1", () => {
      this.gameEngine.gameState.inventory.key1 = true
      this.gameEngine.uiHandler.addKeyToUI(1)
    })
    this.setupButton("#Key2", () => {
      this.gameEngine.gameState.inventory.key2 = true
      this.gameEngine.uiHandler.addKeyToUI(2)
    })
    this.setupButton("#Key3", () => {
      this.gameEngine.gameState.inventory.key3 = true
      this.gameEngine.uiHandler.addKeyToUI(3)
    })

    // Music debug buttons
    this.setupButton("#theme", () => {
      this.gameEngine.musicHandler.playBGM(this.gameEngine.musicHandler.bgm.theme)
    })

    this.setupButton("#menu", () => {
      this.gameEngine.musicHandler.playBGM(this.gameEngine.musicHandler.bgm.menu)
    })

    this.setupButton("#roomSecondary", () => {
      this.gameEngine.musicHandler.playBGM(this.gameEngine.musicHandler.bgm.secondary)
    })

    this.setupButton("#room1", () => {
      this.gameEngine.musicHandler.playBGM(this.gameEngine.musicHandler.bgm.room1)
    })

    this.setupButton("#room2", () => {
      this.gameEngine.musicHandler.playBGM(this.gameEngine.musicHandler.bgm.room2)
    })

    this.setupButton("#room3", () => {
      this.gameEngine.musicHandler.playBGM(this.gameEngine.musicHandler.bgm.room3)
    })

    this.setupButton("#room4", () => {
      this.gameEngine.musicHandler.playBGM(this.gameEngine.musicHandler.bgm.room4)
    })

    this.setupButton("#pattern1", () => {
      this.gameEngine.musicHandler.instanciateAllPatterns()
    })

    this.setupButton("#mutehub", () => {
      this.gameEngine.musicHandler.fadeOutHubMusic()
    })

    this.setupButton("#unmutehub", () => {
      this.gameEngine.musicHandler.fadeInHubMusic()
    })

    this.setupButton("#mutebgm", () => {
      this.gameEngine.musicHandler.fadeOutBGMMusic()
    })
  }

  setupButton(selector: string, callback: () => void) {
    const button = document.querySelector(selector)
    if (button) {
      button.addEventListener("click", callback)
    }
  }
}