# Game Hierarchy
- GameEngine
  - Player
  - Hub
    - RoomEntry x12
      -x DoorFrame
      -x Door
      -x PointOfInterest
        - In front of Door
        - Inside
      -x Room

# PointOfInterest
- position (vec3)
- lookAt (vec3)
- movementAmplitude (vec2)