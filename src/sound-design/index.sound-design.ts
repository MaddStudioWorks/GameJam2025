import { Howl, Howler } from "howler";
import theme from "/theme.mp3"
import room2 from "/theme.mp3"
import menu from "/menu.mp3"
import room1 from "/room1.mp3"

export default class SoundManagement {
  BGM: any;
  SFX: any;
  playBGMmusic: any;
  playSFXsound: any;

  constructor() {
    this.BGM = {
      'theme': theme,
      hub: '',
      'room1': room1,
      'room2': room2,
      room3: '',
      room4: '',
      'menu': menu
    };

    this.SFX = {
      'theme': theme,
      hub: '',
      'room1': room1,
      'room2': room2,
      room3: '',
      room4: '',
      'menu': menu
    };

    //this.playBGM('theme', true)
  }

  playBGM(music: string, loop: boolean): void {
    this.playBGMmusic = new Howl({
      src: [`${this.BGM[music]}`],
      loop
    })
    this.playBGMmusic.play();
  }

  changeMusicBGM(music: string, loop: boolean) {
    this.playBGMmusic.src = `${this.BGM[music]}`;
    this.playBGMmusic.loop = loop
  }
  playSFX(music: string): void {
    this.playSFXsound = new Howl({
      src: [`${this.BGM[music]}`]
    })
    this.playSFXsound.stop();
    this.playSFXsound.play();
  }
}
