# Game Hierarchy
- GameEngine
  - Player
  - Hub
    - RoomEntry x12
      - DoorFrame
      - Door
      - PointOfInterest
        - In front of Door
        - Inside
      - Room

# PointOfInterest
- position (vec3)
- lookAt (vec3)
- movementAmplitude (vec2)