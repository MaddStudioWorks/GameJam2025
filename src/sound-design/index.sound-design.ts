import { Howl, Howler } from "howler";
import BGMtheme from "/theme.mp3"
import BGMmenu from "/menu.mp3"
import BGMroom1 from "/room1.mp3"
import BGMroom2 from "/room2.mp3"
import BGMroom3 from "/room3.mp3"
import BGMroom4 from "/room4.mp3"
import BGMpattern1wav from "/pattern1.wav"
import BGMpattern1 from "/pattern.ogg"
import BGMpattern2 from "/pattern2.mp3"
import BGMpattern3 from "/pattern3.mp3"
import BGMpattern4 from "/pattern4.mp3"

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
  pattern1wav: BGMpattern1wav,
  menu: BGMmenu
}

export default class SoundManagement {
  bgm = bgm;
  sfx: any;
  playBGMmusic: Howl;
  playSFXsound: Howl;

  constructor() {
    this.sfx = {
      theme: BGMtheme,
      room1: BGMroom1,
    };

    this.playBGM(this.bgm.pattern1, true)
  }

  playBGM(music: any, loop: boolean): void {
    this.playBGMmusic = new Howl({
      src: [music],
      loop,
      volume: 0.5
    })
    this.playBGMmusic.play();
  }

  playSFX(music: any): void {
    this.playSFXsound = new Howl({
      src: [music],
    })
    this.playSFXsound.play();
  }

  cleanAllMusic() {
    Howler.unload();
  }
}
