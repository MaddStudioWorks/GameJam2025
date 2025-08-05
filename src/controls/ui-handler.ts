import GameEngine from "~/game-engine"
import key1 from '~/assets/textures/interactive-objects/key1.png'
import key2 from '~/assets/textures/interactive-objects/key2.png'
import key3 from '~/assets/textures/interactive-objects/key3.png'
import { languages } from '~/translations/translations'

const keysTextures = {
  1: key1,
  2: key2,
  3: key3
}

export default class UIHandler {
  gameEngine: GameEngine
  keys: string[] = []

  constructor(gameEngine: GameEngine) {
    this.gameEngine = gameEngine
    this.initializeUI()
  }

  initializeUI() {
    this.setupUIButtons()
    this.setupLanguageSelector()
    // Translate UI on initialization
    this.gameEngine.translationHandler.translateUI()
  }

  setupUIButtons() {
    // Dialog close button
    this.setupButton(".dialog-close", () => {
      this.triggerDialog("close")
    })

    // Escape menu buttons
    this.setupButton("#escape", () => {
      this.toggleEscape(true)
    })

    this.setupButton("#escapehide", () => {
      this.toggleEscape(false)
    })

    this.setupButton(".escape", () => {
      this.triggerEscape()
    })
  }

  setupLanguageSelector() {
    // Create language selector if it doesn't exist
    let langSelector = document.querySelector('#language-selector') as HTMLSelectElement
    if (!langSelector) {
      langSelector = document.createElement('select')
      langSelector.id = 'language-selector'
      langSelector.className = 'language-selector'

      // Add options for each language
      Object.entries(languages).forEach(([code, lang]) => {
        const option = document.createElement('option')
        option.value = code
        option.textContent = lang.label
        option.selected = code === this.gameEngine.translationHandler.lang
        langSelector.appendChild(option)
      })

      // Insert into menu
      const menuContainer = document.querySelector('.menu-container .logo')
      if (menuContainer) {
        menuContainer.appendChild(langSelector)
      }
    }

    // Add event listener for language change
    langSelector.addEventListener('change', (event) => {
      const target = event.target as HTMLSelectElement
      this.gameEngine.translationHandler.setLanguage(target.value as keyof typeof languages)
    })
  }

  setupButton(selector: string, callback: () => void) {
    const button = document.querySelector(selector)
    if (button) {
      button.addEventListener("click", callback)
    }
  }

  triggerEscape() {
    this.gameEngine.cameraControls.enterHubMode()
    this.toggleEscape(false)
  }

  toggleEscape(show: boolean) {
    const escape = document.querySelector(".escape")
    if (escape) {
      show
        ? escape.classList.add("escape-show")
        : escape.classList.remove("escape-show")
    }
  }

  triggerDialog(type: "url" | "text" | "close" | "both", text?: string, url?: string) {
    const dialog = document.querySelector(".dialog")
    const dialogContent = document.querySelector(".dialogContent")
    if (type === "close") {
      if (dialog && dialogContent) {
        dialog.classList.remove("dialog-displayed")
        dialogContent.innerHTML = ""
      }
    }
    if (type === "url") {
      if (dialog && text && dialogContent) {
        dialogContent.innerHTML = ""
        dialog.classList.add("dialog-displayed")
        const image = document.createElement("img")
        image.src = text
        dialogContent.appendChild(image)
      }
    }
    if (type === "text") {
      if (dialog && text && dialogContent) {
        dialogContent.innerHTML = ""
        dialog.classList.add("dialog-displayed")
        dialogContent.innerHTML = text
      }
    }
    if (type === "both") {
      if (dialog && text && url && dialogContent) {
        dialogContent.innerHTML = ""
        dialog.classList.add("dialog-displayed")
        const image = document.createElement("img")
        image.src = url
        dialogContent.appendChild(image)
        console.log(url)
        const paragraph = document.createElement("div")
        paragraph.innerHTML = text
        dialogContent.appendChild(paragraph)
      }
    }
  }

  addKeyToUI(keyNumber: number) {
    const key = document.querySelector(`#key-${keyNumber}`)
    if (key) {
      key.classList.add(`key-${keyNumber}`)
      this.keys.push(`key-${keyNumber}`)
      this.triggerDialog(
        "both",
        `<p>${this.gameEngine.translate().game.keyGet(keyNumber.toString())} ${
          this.gameEngine.gameState.inventory.key1 === true &&
          this.gameEngine.gameState.inventory.key2 === true &&
          this.gameEngine.gameState.inventory.key3 === true
            ? `<br> <br> ${this.gameEngine.translate().game.finalClueReached}`
            : ""
        }</p>`,
        keysTextures[keyNumber]
      )
      console.log(this.gameEngine.gameState.inventory)
      this.checkKeys()
    }
  }

  checkKeys() {
    if (
      this.gameEngine.gameState.inventory.key1 === true &&
      this.gameEngine.gameState.inventory.key2 === true &&
      this.gameEngine.gameState.inventory.key3 === true
    ) {
      this.showClue()
    }
  }

  showClue() {
    const keysContainer = document.querySelector("#keys")
    if (keysContainer) {
      setTimeout(() => {
        keysContainer.innerHTML = ""
        keysContainer.textContent = this.gameEngine.translate().game.finalClue
      }, 800)
    }
  }
}