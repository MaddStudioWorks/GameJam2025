import GameEngine from '~/game-engine'
import GameObject from '~/game-objects/game-object'
import { Box3, BoxGeometry, color, Fn, Mesh, MeshBasicNodeMaterial, mix, SRGBColorSpace, texture, TextureLoader, uv, Vector3 } from 'three/webgpu'
import { GLTFLoader } from 'three/examples/jsm/Addons.js'
import RoomInteriorModel from '~/assets/meshes/Room_Interior.glb?url'
import RoomTexture from '~/assets/textures/rooms/room-denial.png?url'
import { RoomProps } from '~/interfaces/room-props'
import { InteractableObject } from '~/controls/raycaster-handler'
import Key from '~/game-objects/key-objects/key'
import Switch from '~/game-objects/key-objects/switch'

export default class RoomInterior extends GameObject {
  material: MeshBasicNodeMaterial
  roomSize: number
  interactableObjects: InteractableObject[] = []

  constructor(props: RoomProps) {
    super()

    this.roomSize = 0.5

    props.content.keyObjects.forEach(keyObject => {
      const newKeyObject = keyObject.type === 'key' ? new Key(keyObject) : new Switch(keyObject)
      
      const newKeyObjectBbox = new Box3().setFromObject(newKeyObject.meshGroup)
      const size = new Vector3
      newKeyObjectBbox.getSize(size)
      const newKeyObjectHitbox = new Mesh(
        new BoxGeometry(size.x, size.y, size.z),
        new MeshBasicNodeMaterial({ wireframe: true, color: 0xFF0000 })
      )
      newKeyObjectHitbox.visible = false
      newKeyObject.meshGroup.add(newKeyObjectHitbox)
      const normalizedPosition = keyObject.position.multiplyScalar(this.roomSize)
      newKeyObject.meshGroup.position.copy(normalizedPosition)
      newKeyObject.meshGroup.translateY(0.05)
      this.meshGroup.add(newKeyObject.meshGroup)
      
      // Add a clickable definition to `this.keyObjects`
      this.interactableObjects.push({
        gameObject: newKeyObject,
        hitbox: newKeyObjectHitbox,
        hovered: false,
        onHover: (keyObject) => {
          console.log(keyObject)
        }
      })
    })

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