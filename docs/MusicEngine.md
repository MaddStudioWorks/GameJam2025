# Sound Engine

- Music Engine
  - instancie [Howler.js](https://github.com/goldfire/howler.js#documentation)
  - expose deux méthodes
    - `playBGM(id)` (remplace le BGM actuel et loop)
    - `playSFX(id)` (play un SFX one-shot)
  - créer un objet `bgm` et un objet `sfx`, comme on peut facilement le passer en argument de `playBGM` et `playSFX` en restant typesafe, et on peut y accéder de l'extérieur (dans les autres classes), pour contrôler le son
- Interface de debug avec 2 listes
  - Background Music tracks
  - SFX
  - Cliquer sur un bouton trigger `playBGM` et `playSFX` pour tester que le Music Engine fonctionne bien

```ts
import BGMHub from '~/assets/bgm/hub.mp3?url'
import BGMRoom from '~/assets/bgm/room.mp3?url'

const bgm = {
  hub: BGMHub,
  room: BGMRoom,
}
```