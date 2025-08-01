import GameEngine from '~/game-engine'
import GameObject from '~/game-objects/game-object'
import { BackSide, Box3, BoxGeometry, color, DoubleSide, Fn, LinearSRGBColorSpace, Mesh, MeshBasicNodeMaterial, mix, PlaneGeometry, positionGeometry, Sprite, SpriteMaterial, SRGBColorSpace, texture, TextureLoader, uv, vec3, Vector3 } from 'three/webgpu'
import { GLTFLoader } from 'three/examples/jsm/Addons.js'
import RoomInteriorModel from '~/assets/meshes/Room_Interior.glb?url'
import KeyTexture from '~/assets/textures/key.png'
import RoomTexture from '~/assets/textures/rooms/room-denial.png?url'

export default class RoomInterior extends GameObject {
  material: MeshBasicNodeMaterial
  roomSize: number

  constructor() {
    super()

    this.roomSize = 0.5

    // Key Placeholder
    const keyTextureMap = new TextureLoader().load(KeyTexture)
    const keyMaterial = new MeshBasicNodeMaterial({
      transparent: true,
      map: keyTextureMap
    })
    const keySize = 0.1
    const keyGeometry = new PlaneGeometry(keySize, keySize)
    const key = new Mesh(keyGeometry, keyMaterial)
    key.position.set(0, keySize/2, -this.roomSize*0.45)
    this.meshGroup.add(key)

    // Room Interior Material
    const roomTextureMap = new TextureLoader().load(RoomTexture)
    roomTextureMap.flipY = false
    roomTextureMap.colorSpace = SRGBColorSpace
    roomTextureMap.anisotropy = 16
    this.material = new MeshBasicNodeMaterial()
    this.material.colorNode = Fn(() => {
      const texel = texture(roomTextureMap, uv())
      const finalColor = mix(color("#000000"), texel, texel.a)
      return finalColor
    })()

    const loader = new GLTFLoader()
    loader.load(RoomInteriorModel, (gltf) => {
      const object = gltf.scene
      object.rotateY(-Math.PI / 2)

      object.traverse((child) => {
        if (child.type === "Mesh") {
          const mesh = (child as Mesh)
          console.log(mesh.userData.name)
          mesh.material = this.material
        }
      })

      // Room interiors are 1 unit in size in Blender
      // We scale room interiors to `this.roomSize` in-game
      object.scale.multiplyScalar(this.roomSize)
      this.meshGroup.add(object)
    })
  }

  tick(engine: GameEngine) {
  }
}