import { variables } from '~/translations/utils'

const enDictionnary = {
  ui: {
    controls: "Controls",
    openSelect: "Open/Select",
    leftClick: "Left Click",
    exit: "Exit",
    escape: "Escape",
    rightClick: "Right Click",
    or: "or",
    close: "Close",
    play: "Play",
    inventory: "Inventory",
  },
  game: {
    close: "Close",
    escape: "Escape",
    key: "Key",
    switch: "Switch",
    switchActivated: "You have activated a switch. You hear a distant click.",
    note: "Note",
    doorLocked: "Door is locked",
    gameOver: "The loop has not been broken, and the cycle begins anew",
    key1Get: "You have obtained the Key of Denial! <br>The first step is often in darkness.",
    key2Get: "You have obtained the Key of Anger! <br>Blind rage will lead you nowhere.",
    key3Get: "You have obtained the Key of Sadness! <br>You open your eyes to the real solution.",
    finalClue: "Acceptance"
  }
}

export type Dictionnary = typeof enDictionnary

export default enDictionnary