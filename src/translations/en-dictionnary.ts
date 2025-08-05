import { variables } from '~/translations/utils'

const enDictionnary = {
  ui: {
    controls: "Controls",
    openSelect: "Open/Select",
    leftClick: "Left Click",
    exit: "Exit",
    escapeOrRightClick: "Escape or Right Click",
    close: "Close",
    play: "Play",
    escape: "Escape",
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
    keyGet: variables("You have obtained key {keyNumber}"),
    finalClueReached: "You have reached the final clue",
    finalClue: "Acceptation"
  }
}

export type Dictionnary = typeof enDictionnary

export default enDictionnary