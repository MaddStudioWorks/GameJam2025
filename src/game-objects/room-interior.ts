import GameEngine from '~/game-engine'
import GameObject from '~/game-objects/game-object'
import { BackSide, Box3, BoxGeometry, color, DoubleSide, Fn, LinearSRGBColorSpace, Material, Mesh, MeshBasicNodeMaterial, mix, PlaneGeometry, positionGeometry, Sprite, SpriteMaterial, SRGBColorSpace, texture, TextureLoader, uv, vec3, Vector3 } from 'three/webgpu'
import { GLTFLoader } from 'three/examples/jsm/Addons.js'
import RoomInteriorModel from '~/assets/meshes/Room_Interior.glb?url'
import RoomTexture from '~/assets/textures/rooms/room-denial.png?url'
import { RoomProps } from '~/interfaces/room-props'
import { InteractableObject } from '~/controls/raycaster-handler'
import Key from '~/game-objects/key-objects/key'

export default class RoomInterior extends GameObject {
  material: MeshBasicNodeMaterial
  roomSize: number
  interactableObjects: InteractableObject[] = []

  constructor(props: RoomProps) {
    super()

    this.roomSize = 0.5

    props.content.keyObjects.forEach(keyObject => {
      // Create the 3D object in the scene
      // TODO replace with a switch to spawn 
      // the corresponding keyObject of type `keyObject.type`
      // (instead of new Key)
      console.log('Creating keyObject of type', keyObject.type)
      const newKeyObject = new Key(keyObject.type)
      // TODO compute the hitbox size based on the keyObject Boundingbox
      const newKeyObjectHitbox = new Mesh(
        new BoxGeometry(0.1, 0.1, 0.1),
        new MeshBasicNodeMaterial({ wireframe: true, color: 0xFF0000 })
      )
      newKeyObject.meshGroup.add(newKeyObjectHitbox)
      newKeyObject.meshGroup.position.copy(keyObject.position)
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