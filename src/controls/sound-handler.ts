import { Howl, Howler } from "howler";
import GameEngine from "~/game-engine";
import BGMtheme from "/theme.mp3";
import BGMmenu from "/menu.mp3";
import BGMroom1 from "/room1.mp3";
import BGMroom2 from "/room2.mp3";
import BGMroom3 from "/room3.mp3";
import BGMroom4 from "/room4.mp3";
import BGMroomsecondary from "/secondaryRoom.ogg";
import BGMpattern1 from "/pattern.ogg";
import BGMpattern2 from "/pattern2.ogg";
import BGMpattern3 from "/pattern3.ogg";
import BGMpattern4 from "/pattern4.ogg";
import SFXswitch from "/sfx/doorOpen.wav";
import SFXmecanismOne from "/sfx/mecanismOne.wav";
import SFXmecanismTwo from "/sfx/mecanismTwo.wav";
import SFXtickOne from "/sfx/tickOne.mp3";
import SFXtickTwo from "/sfx/tickTwo.mp3";
import SFXclockRing from "/sfx/clockRing.wav";
import SFXdoor from "/sfx/switch.wav";
import SFXkey from "/sfx/keys.wav";
import SFXnote from "/sfx/paper.mp3";

export const bgm = {
  theme: BGMtheme,
  room1: BGMroom1,
  room2: BGMroom2,
  room3: BGMroom3,
  room4: BGMroom4,
  pattern1: BGMpattern1,
  pattern2: BGMpattern2,
  pattern3: BGMpattern3,
  pattern4: BGMpattern4,
  secondary: BGMroomsecondary,
  menu: BGMmenu,
} as const;

export const sfx = {
  door: SFXswitch,
  mecanismOne: SFXmecanismOne,
  mecanismTwo: SFXmecanismTwo,
  switch: SFXdoor,
  tickOne: SFXtickOne,
  tickTwo: SFXtickTwo,
  clockRing: SFXclockRing,
  keys: SFXkey,
  note: SFXnote
} as const;

export default class SoundHandler {
  bgm = bgm;
  sfx: any;
  playBGMmusic?: Howl;
  playBGMmusicHub: Howl[] = [];
  playSFXsound?: Howl;
  isHubMute: boolean = false;
  gameEngine: GameEngine;
  checkedTime: Record<string, boolean>

  constructor(gameEngine: GameEngine) {
    this.sfx = {
      theme: BGMtheme,
      room1: BGMroom1,
    };
    this.gameEngine = gameEngine;
    window.addEventListener("volumeTrack", (value: CustomEvent) => {
      this.manageVolume(parseInt(value.detail) / 10);
    });
    this.playSFX(sfx.tickOne, true);
    this.playSFX(sfx.tickTwo, true);
    this.checkedTime = {
      first: false,
      second: false,
      third: false
    }
  }

  playClockRinging() {
    let time = this.gameEngine.gameState.time

    if (time >= 0.25 && this.checkedTime.first === false) {
      this.checkedTime.first = true
      this.playSFX(sfx.clockRing);
      console.log('first')
    }
    if (time >= 0.5 && this.checkedTime.second === false) {
      this.playSFX(sfx.clockRing);
      this.checkedTime.second = true
    }
    if (time >= 0.75 && this.checkedTime.third === false) {
      this.playSFX(sfx.clockRing);
      this.checkedTime.third = true
    }
  }
  tick() {
    this.playClockRinging();
  }

  playBGM(music: string, loop = true): void {
    this.playBGMmusic = new Howl({
      src: [music],
      loop,
      volume: 0.4,
    });
    this.playBGMmusic.play();
    this.playBGMmusic.fade(0, 1, 2000);
  }

  playBGMHub(music: string, loop: boolean, isFade: boolean): void {
    let pattern = new Howl({
      src: [music],
      loop,
      volume: 0.5,
    });
    pattern.play();
    if (isFade) pattern.fade(1, 0, 0);
    this.playBGMmusicHub.push(pattern);
  }

  instanciateAllPatterns() {
    const patterns = [
      this.bgm.pattern1,
      this.bgm.pattern2,
      this.bgm.pattern3,
      this.bgm.pattern4,
    ];

    patterns.map((e, i) => {
      if (i > 0) {
        this.playBGMHub(e as string, true, true);
      } else {
        this.playBGMHub(e as string, true, false);
        this.playBGMmusicHub[0].fade(0, 1, 3000);
      }
    });
  }

  manageVolume(value: number) {
    Howler.volume(value);
  }

  playSFX(music: string, loop: boolean = false): void {
    this.playSFXsound = new Howl({
      src: [music],
      loop,
      volume: 0.2,
    });
    this.playSFXsound.play();
  }

  cleanAllMusic() {
    Howler.unload();
  }

  cleanSecondaryMusic() {
    this.playBGMmusic?.unload();
  }

  fadeOutHubMusic() {
    if (!this.isHubMute) {
      this.playBGMmusicHub.map((e, i) => {
        if (i === 0) {
          this.playBGMmusicHub[i].fade(1, 0, 1000);
        }

        if (this.gameEngine.gameState.time >= 0.25 && i === 1) {
          this.playBGMmusicHub[i].fade(1, 0, 1000);
        }
        if (this.gameEngine.gameState.time >= 0.5 && i === 2) {
          this.playBGMmusicHub[i].fade(1, 0, 1000);
        }
        if (this.gameEngine.gameState.time >= 0.75 && i === 3) {
          this.playBGMmusicHub[i].fade(1, 0, 1000);
        }
      });
      this.isHubMute = true;
    }
  }

  fadeInHubMusic() {
    this.isHubMute = false;

    // Ensure we have patterns loaded
    if (this.playBGMmusicHub.length === 0) {
      this.instanciateAllPatterns();
      return;
    }

    this.playBGMmusicHub.map((e, i) => {
      if (i === 0) {
        this.playBGMmusicHub[i].fade(0, 1, 2000);
      }
      if (this.gameEngine.gameState.time >= 0.25 && i === 1) {
        this.playBGMmusicHub[i].fade(0, 1, 2000);
      }
      if (this.gameEngine.gameState.time >= 0.5 && i === 2) {
        this.playBGMmusicHub[i].fade(0, 1, 2000);
      }
      if (this.gameEngine.gameState.time >= 0.75 && i === 3) {
        this.playBGMmusicHub[i].fade(0, 1, 2000);
      }
    });
  }

  fadeOutBGMMusic() {
    this.playBGMmusic?.fade(1, 0, 1000);
    setTimeout(() => {
      this.playBGMmusic?.unload();
    }, 1000);
  }

  fadeInTime(index: number) {
    this.playBGMmusicHub.map((e, i) => {
      if (index === i) e.fade(0, 1, 2000);
    });
  }

  transitionFromHubToRoom(music: string) {
    this.fadeOutHubMusic();
    this.playBGM(music, true);
  }

  transitionFromRoomToHub() {
    this.fadeOutBGMMusic();
    this.fadeInHubMusic();
  }
}
