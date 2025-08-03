import GameEngine from '~/game-engine'
import GameObject from '~/game-objects/game-object'
import { Box3, BoxGeometry, color, Fn, Mesh, MeshBasicNodeMaterial, mix, SRGBColorSpace, texture, TextureLoader, uv, Vector3 } from 'three/webgpu'
import { GLTFLoader } from 'three/examples/jsm/Addons.js'
import RoomInteriorModel from '~/assets/meshes/Room_Interior.glb?url'
import RoomTextureDefault from '~/assets/textures/rooms/room-default.png?url'
import RoomTextureDenial from '~/assets/textures/rooms/room-denial.png?url'
import RoomTextureAnger from '~/assets/textures/rooms/room-anger.png?url'
import RoomTextureSadness from '~/assets/textures/rooms/room-sadness.png?url'
import RoomTextureAcceptance from '~/assets/textures/rooms/room-acceptance.png?url'
import { RoomProps } from '~/interfaces/room-props'
import { InteractableObject } from '~/controls/raycaster-handler'
import InteractiveObject from '~/game-objects/key-objects/interactive-object'
import SpriteProp from '~/game-objects/props/sprite'

export default class RoomInterior extends GameObject {
  material: MeshBasicNodeMaterial
  roomSize: number
  interactableObjects: InteractableObject[] = []

  constructor(props: RoomProps) {
    super()

    this.roomSize = 0.5

    // Spawn interactive objects
    props.content.keyObjects.forEach(keyObject => {
      const newKeyObject = new InteractiveObject(keyObject)
      
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
      newKeyObject.meshGroup.rotation.copy(keyObject.rotation)
      this.meshGroup.add(newKeyObject.meshGroup)
      
      // Add a clickable definition to `this.keyObjects`
      this.interactableObjects.push({
        gameObject: newKeyObject,
        hitbox: newKeyObjectHitbox,
        hovered: false,
        onHover: (keyObject) => {
          // Todo: hover effect
          console.log(keyObject)
        },
        onClick: (interactableObject, gameEngine) => {
          keyObject.onClick(gameEngine, interactableObject.gameObject)
        }
      })
    })

    // Spawn prop objects
    props.content.props.forEach(prop => {
      const newProp = new SpriteProp(prop)
      // normalizedPosition: places the object relative to the room size
      const normalizedPosition = prop.position.multiplyScalar(this.roomSize)
      // setScalar: we assume the objects are based on a 1 unit in size grid
      newProp.meshGroup.scale.setScalar(this.roomSize)
      newProp.meshGroup.position.copy(normalizedPosition)
      newProp.meshGroup.rotation.copy(prop.rotation)
      this.meshGroup.add(newProp.meshGroup)
    })

    // Room Interior Material
    let textureName = RoomTextureDefault
    if (props.content.roomType === "denial") textureName = RoomTextureDenial
    if (props.content.roomType === "anger") textureName = RoomTextureAnger
    if (props.content.roomType === "sadness") textureName = RoomTextureSadness
    if (props.content.roomType === "acceptance") textureName = RoomTextureAcceptance
    const roomTextureMap = new TextureLoader().load(textureName)
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