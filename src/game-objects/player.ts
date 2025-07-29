import GameEngine from '~/game-engine'
import GameObject from '~/game-objects/game-object'
import { Mesh, MeshBasicNodeMaterial, PlaneGeometry, Vector2, Box3, Box2, TextureLoader, SRGBColorSpace, NearestFilter } from 'three/webgpu'
import playerTexture from '~/assets/Player.png'

export default class Player extends GameObject {
  position: Vector2 = new Vector2(0, 7)
  boundingBox: Box2 = new Box2()
  direction: Vector2 = new Vector2(0, 0)
  gravity: Vector2 = new Vector2(0, -5)
  speed: number = 5

  constructor() {
    super()

    const geometry = new PlaneGeometry(1, 1)
    const map = new TextureLoader().load(playerTexture)
    map.colorSpace = SRGBColorSpace
    map.minFilter = map.magFilter = NearestFilter
    const material = new MeshBasicNodeMaterial({ map, transparent: true })

    const mesh = new Mesh(geometry, material)
    this.meshGroup.add(mesh)

    this.boundingBox.set(
      new Vector2(this.position.x - 0.5, this.position.y - 0.5),
      new Vector2(this.position.x + 0.5, this.position.y + 0.5)
    )
  }

  tick(engine: GameEngine) {
    this.direction.add(this.gravity.clone().multiplyScalar(engine.deltaTime))
    if(this.direction.y < 0) this.direction.y = 0

    const deltaMovement = this.direction.clone().multiplyScalar(this.speed * engine.deltaTime)
    deltaMovement.add(this.gravity.clone().multiplyScalar(engine.deltaTime))

    // Calculate new position and bounding box
    const newPosition = this.position.clone().add(deltaMovement)
    const newBoundingBox = new Box2(
      new Vector2(newPosition.x - 0.5, newPosition.y - 0.5),
      new Vector2(newPosition.x + 0.5, newPosition.y + 0.5)
    )

    // Check for collisions and resolve them
    const collidingTiles = engine.level.collidingTiles(newBoundingBox)
    let resolvedPosition = newPosition.clone()

    if (collidingTiles.length > 0) {
      // Find the closest valid position by checking each colliding tile
      for (const tile of collidingTiles) {
        const tileCenter = new Vector2()
        tile.box.getCenter(tileCenter)

        const playerCenter = resolvedPosition.clone()
        const direction = playerCenter.clone().sub(tileCenter).normalize()

        // Calculate the minimum distance needed to separate the boxes
        const playerHalfSize = 0.5 // Player bounding box is 1x1, so half size is 0.5
        const tileHalfSize = 0.5   // Tile bounding box is also 1x1

        // Calculate separation distance based on the primary axis of collision
        const absDirection = new Vector2(Math.abs(direction.x), Math.abs(direction.y))

        if (absDirection.x > absDirection.y) {
          // Horizontal collision - separate on X axis
          const separationDistance = playerHalfSize + tileHalfSize
          resolvedPosition.x = tileCenter.x + (direction.x > 0 ? separationDistance : -separationDistance)
        } else {
          // Vertical collision - separate on Y axis
          const separationDistance = playerHalfSize + tileHalfSize
          resolvedPosition.y = tileCenter.y + (direction.y > 0 ? separationDistance : -separationDistance)
        }
      }
    }

    // Update player position and bounding box with resolved position
    this.position.copy(resolvedPosition)
    this.boundingBox.set(
      new Vector2(this.position.x - 0.5, this.position.y - 0.5),
      new Vector2(this.position.x + 0.5, this.position.y + 0.5)
    )

    this.meshGroup.position.set(this.position.x, this.position.y, 0)
  }
}