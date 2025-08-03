import { Howl, Howler } from "howler";
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
};

export default class SoundManagement {
  bgm = bgm;
  sfx: any;
  playBGMmusic: Howl;
  playBGMmusicHub: Howl[] = [];
  playSFXsound: Howl;
  isHubMute: boolean = false;

  constructor() {
    this.sfx = {
      theme: BGMtheme,
      room1: BGMroom1,
    };
  }

  playBGM(music: keyof typeof bgm, loop: boolean): void {
    this.playBGMmusic = new Howl({
      src: [music],
      loop,
      volume: 0.4,
    });
    this.playBGMmusic.play();
    this.playBGMmusic.fade(0, 1, 2000);
  }

  playBGMHub(music: keyof typeof bgm, loop: boolean): void {
    let pattern = new Howl({
      src: [music],
      loop,
      volume: 0.5,
    });
    pattern.play();
    this.isHubMute === true ? pattern.fade(1, 0, 0) : "";
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
        this.playBGMHub(e as keyof typeof bgm, true);
      } else {
        this.playBGMHub(e as keyof typeof bgm, true);
        this.playBGMmusicHub[0].fade(0, 1, 1000);
        this.isHubMute = true;
      }
    });
  }

  playSFX(music: keyof typeof bgm): void {
    this.playSFXsound = new Howl({
      src: [music],
    });
    this.playSFXsound.play();
  }

  cleanAllMusic() {
    Howler.unload();
  }

  cleanSecondaryMusic() {
    this.playBGMmusic.unload();
  }

  fadeOutHubMusic() {
    if (!this.isHubMute) {
      this.playBGMmusicHub.map((e) => e.fade(1, 0, 1000));
      this.isHubMute = true;
    }
  }

  fadeInHubMusic() {
    this.isHubMute = false;
    this.playBGMmusicHub.map((e) => e.fade(0, 1, 2000));
  }

  fadeOutBGMMusic() {
    this.playBGMmusic.fade(1, 0, 1000);
    setTimeout(() => {
      this.playBGMmusic.unload();
    }, 1000);
  }

  fadeInTime(index: number) {
    this.playBGMmusicHub.map((e, i) => {
      if (index === i) e.fade(0, 1, 2000);
    });
  }

  transitionFromHubToRoom(music: keyof typeof bgm) {
    this.fadeOutHubMusic();
    this.playBGM(music, true);
  }
  transitionFromRoomToHub() {
    this.fadeOutBGMMusic();
    this.fadeInHubMusic();
  }
}
