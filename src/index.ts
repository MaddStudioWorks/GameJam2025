import GameEngine from '~/game-engine'

const gameEngine = new GameEngine

document.addEventListener('DOMContentLoaded', () => {
  const menu = document.querySelector(".menu")
  const play = document.querySelector("#play")
  const controls = document.querySelector("#controls")
  const controlsHTML = document.querySelector(".controls")
  const closeControls = document.querySelector(".close-controls")
  
  const hideMenu = () => {
    if (menu) menu.classList.add("menu-hide")
  }
  const showControls = () => {
    controlsHTML.classList.add("controls-show")
  }
  const hideControls = () => {
    controlsHTML.classList.remove("controls-show")
  }

  play.addEventListener("click", () => {
    hideMenu()
    gameEngine.start()
  })
  controls.addEventListener("click", () => {
    showControls()
  })
  closeControls.addEventListener("click", () => {
    hideControls()
  })

  const finalScene = document.querySelector(".finalScene")
  const finalOne = document.querySelector(".finalOne")
  const finalTwo = document.querySelector(".finalTwo")
  const finalThree = document.querySelector(".finalThree")
  const finalFour = document.querySelector(".finalFour")

  window.addEventListener("final", () => {
    setTimeout(() => {
      finalScene.classList.add("finalScene-show")
    }, 200)
    setTimeout(() => {
      finalOne.classList.add("finalOne-opacity")
    }, 11000)
    setTimeout(() => {
      finalTwo.classList.add("finalTwo-opacity")
    }, 22000)
    setTimeout(() => {
      finalThree.classList.add("finalThree-opacity")
    }, 33000)
    setTimeout(() => {
      finalFour.classList.add("finalFour-opacity")
      window.location.reload()
    }, 44000)
  })

  const volumeEvent = (value) => (
    new CustomEvent("volumeTrack", {
      detail: value,
    })
  )

  const range = document.querySelector(".volume")
  range.addEventListener("input", (e) => {
    dispatchEvent(volumeEvent((e.target as HTMLInputElement).value))
  })
})