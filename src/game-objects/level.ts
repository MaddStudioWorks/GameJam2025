import GameEngine from '~/game-engine'
import GameObject from '~/game-objects/game-object'
import { Mesh, MeshBasicNodeMaterial, Fn, Vector3, Box3, PlaneGeometry, texture, TextureLoader, NearestFilter, SRGBColorSpace, BufferAttribute, vec2, vec3, Vector2, Box2 } from 'three/webgpu'
import { World } from 'ldtk'
import tilesetTexture from '~/assets/BaseTileset.png'
import { TileInstance } from 'ldtk/dist/typedef'
import Player from '~/game-objects/player'

export interface Tile{
  box: Box2
  sound?: 'dirt' | 'water'
}

export default class Level extends GameObject {
  tiles: Tile[] = []

  constructor(level: string, player: Player) {
    super()
    const textureLoader = new TextureLoader()

    const tileset = textureLoader.loadAsync(tilesetTexture) 
    const world = World.loadRaw(level)

    Promise.all([tileset, world]).then(([tileset, world]) => {
      const material = new MeshBasicNodeMaterial({ map: tileset })
      tileset.minFilter = tileset.magFilter = NearestFilter
      tileset.colorSpace = SRGBColorSpace

      // Load each tile as quad
      world.levels.forEach((level) => {
        level.layerInstances?.forEach((layerInstance) => {
          const gridSize = layerInstance.__gridSize

          // Landscape tiles
          layerInstance.autoLayerTiles?.forEach((tile) => {
            const mappedQuad = this.getMappedQuad(tile, gridSize, tileset.image.width)
            const mesh = new Mesh(mappedQuad, material)

            // Place the tile according to the LDtk position
            const x = tile.px[0] / gridSize
            const y = Math.abs(tile.px[1] - world.levels[0].pxHei) / gridSize
            mesh.position.set(x, y, 0)
            this.meshGroup.add(mesh)

            this.tiles.push({
              box: new Box2(
                new Vector2(x - 0.5, y - 0.5),
                new Vector2(x + 0.5, y + 0.5)
              )
            })
          })

          // Entities
          layerInstance.entityInstances?.forEach((entity) => {
            const [x, y] = entity.__grid
            if(entity.__identifier === "Spawn"){
              // player position isnt using the offset defined later 
              // when centering the level using its bounding box ⚠️
              console.log(player.position)
              player.position.set(x, y)
              console.log(player.position)
              console.log(player)
            }
          })
        })
      })

      // Center the level using its bounding box
      const box = new Box3().setFromObject(this.meshGroup)
      const size = new Vector3
      box.getSize(size)
      this.meshGroup.position.set(-size.x/2, -size.y/2, 0)
      const offset = new Vector2(-size.x/2, -size.y/2)
      this.tiles.forEach((tile) => {
        tile.box.translate(offset)
      })
    })
  }

  getMappedQuad(tile: TileInstance, gridSize: number, tilesetSize: number){
    const quad = new PlaneGeometry(1, 1)
    // Create a UVs set that matches the texture position in the tileset
    const uvs = new Float32Array(8)

    // Calculate UV coordinates based on tile source position
    const uLeft = tile.src[0] / tilesetSize
    const uRight = (tile.src[0] + gridSize) / tilesetSize
    // Invert Y coordinates: LDtk uses top-left origin, Three.js uses bottom-left
    const vTop = 1 - (tile.src[1] / tilesetSize)
    const vBottom = 1 - ((tile.src[1] + gridSize) / tilesetSize)

    // UV mapping to match vertex order:
    // Vertex 0 (top-left): (uLeft, vTop)
    uvs[0] = uLeft
    uvs[1] = vTop

    // Vertex 1 (top-right): (uRight, vTop)
    uvs[2] = uRight
    uvs[3] = vTop

    // Vertex 2 (bottom-left): (uLeft, vBottom)
    uvs[4] = uLeft
    uvs[5] = vBottom

    // Vertex 3 (bottom-right): (uRight, vBottom)
    uvs[6] = uRight
    uvs[7] = vBottom

    quad.setAttribute('uv', new BufferAttribute(uvs, 2))

    return quad
  }

  collidingTiles(playerBox: Box2): Tile[] {
    const collidingTiles: Tile[] = []

    for (const tile of this.tiles) {
      if (tile.box.intersectsBox(playerBox)) {
        collidingTiles.push(tile)
      }
    }

    return collidingTiles
  }

  tick(engine: GameEngine) {
  }
}