# GameState

- time
- inventory: { key1, key2, key3 }
- rooms:
  - isLocked: () => key1 != true
  - type: salle "nulle" / salle thème 1/2/3/4
  - doorType: 
  - content: 
    - roomType: id of room model
    - keyObjects: list of clickable key objects
    - props: set dressing props
    - music: id