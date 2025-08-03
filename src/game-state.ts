const gameState = {
  time: 0,
  endOfTime: 60 * 12,
  hasWon: false,
  doors: {
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
    10: false,
    11: false,
    12: false,
  },
  inventory: {
    key1: false,
    key2: false,
    key3: false,
    switch1: false,
    switch2: false,
    switch3: false,
    switch4: false,
    switch5: false,
  },
  stars: {
    star1: false,
    star2: false,
    star3: false,
    star4: false,
    star5: false,
    star6: false,
    star7: false,
    star8: false,
    star9: false,
    star10: false
  }
}

export default gameState