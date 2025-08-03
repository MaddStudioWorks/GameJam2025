import GameEngine from "~/game-engine";
import { triggerDialog } from "~/ui/index.ui";
import SoundManagement from "~/sound-design/index.sound-design";

export default class ClockHandler {
  gameEngine: GameEngine;
  hasReachedGameOver = false;
  soundInstance: SoundManagement;
  stopCheckTime: boolean = false;
  hubPatternChecker: boolean[] = [];

  constructor(gameEngine: GameEngine) {
    this.gameEngine = gameEngine;
    this.soundInstance = new SoundManagement();

    this.hubPatternChecker = [false, false, false];
    this.soundInstance.instanciateAllPatterns();
  }

  onGameOver() {
    this.hasReachedGameOver = true;
    triggerDialog("text", "Game Over");
    setTimeout(() => {
      triggerDialog("close");
    }, 3000);
  }

  checkTimeForMusicTrigger() {
    if (this.gameEngine.gameState.time >= 0.25 && !this.hubPatternChecker[0]) {
      this.soundInstance.fadeInTime(1);
      this.hubPatternChecker[0] = true;
    }
    if (this.gameEngine.gameState.time >= 0.5 && !this.hubPatternChecker[1]) {
      this.soundInstance.fadeInTime(2);
      this.hubPatternChecker[1] = true;
    }
    if (this.gameEngine.gameState.time >= 0.75 && !this.hubPatternChecker[2]) {
      this.soundInstance.fadeInTime(3);
      this.hubPatternChecker[2] = true;
      this.stopCheckTime = true;
    }
  }

  tick() {
    if (this.gameEngine.gameState.time === 1 && !this.hasReachedGameOver) {
      this.onGameOver();
    }
    if (!this.stopCheckTime) {
      this.checkTimeForMusicTrigger();
    }
  }
}
