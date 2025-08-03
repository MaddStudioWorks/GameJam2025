import { RoomProps } from '~/interfaces/room-props'
import room1 from '~/room-layouts/room-1'
import room2 from '~/room-layouts/room-2'
import room3 from '~/room-layouts/room-3'
import room4 from '~/room-layouts/room-4'
import room5 from '~/room-layouts/room-5'
import room6 from '~/room-layouts/room-6'
import room7 from '~/room-layouts/room-7'
import room8 from '~/room-layouts/room-8'
import room9 from '~/room-layouts/room-9'
import room10 from '~/room-layouts/room-10'
import room11 from '~/room-layouts/room-11'
import room12 from '~/room-layouts/room-12'

/*
  - Les Room Index commence à 0 pour la 12ème heure, puis 1 pour l'heure 1, etc.
  - Les keyObjects peuvent être 
    - de type 'key' ou 'switch'
    - un id de 1-3
    - tu dois décrire ce que ça fait dans le onClick (voir les exemples pour les clés)
*/

const roomLayouts: RoomProps[] = [
  room12,
  room1,
  room2,
  room3,
  room4,
  room5,
  room6,
  room7,
  room8,
  room9,
  room10,
  room11,
]

export {
  roomLayouts
}