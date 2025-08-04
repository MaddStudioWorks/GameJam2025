import GameEngine from "~/game-engine"

export default class DebugHandler {
  gameEngine: GameEngine

  constructor(gameEngine: GameEngine) {
    this.gameEngine = gameEngine
    this.initializeDebugUI()
  }

  initializeDebugUI() {
    // Hide debug mode unless `#debug` is present in the URL
    if (window.location.hash !== "#debug") {
      (document.querySelector(".debug-ui") as HTMLDivElement).style.display = "none"
      return
    }

    this.setupDebugButtons()
  }

  setupDebugButtons() {
    // Dialog debug buttons
    this.setupButton("#dImage", () => {
      this.gameEngine.uiHandler.triggerDialog("url", "/key1.png")
    })

    this.setupButton("#dClose", () => {
      this.gameEngine.uiHandler.triggerDialog("close")
    })

    this.setupButton("#dText", () => {
      this.gameEngine.uiHandler.triggerDialog("text", "Vous avez récupéré un indice")
    })

    this.setupButton("#dImageText", () => {
      this.gameEngine.uiHandler.triggerDialog("both", "Vous avez récupéré un indice", "/key2.png")
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