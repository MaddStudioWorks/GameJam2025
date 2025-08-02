import GameEngine from '~/game-engine'
import GameObject from '~/game-objects/game-object'
import { Mesh, MeshBasicNodeMaterial, RepeatWrapping, SRGBColorSpace, TextureLoader } from 'three/webgpu'
import { GLTFLoader } from 'three/examples/jsm/Addons.js'
import DoorModel from '~/assets/meshes/Room_DoorFrame.glb?url'
import DoorFrameTexture from '~/assets/textures/hub-walls.jpg?url'

export default class RoomDoorFrame extends GameObject {
  material: MeshBasicNodeMaterial

  constructor() {
    super()

    const roomTextureMap = new TextureLoader().load(DoorFrameTexture)
    roomTextureMap.flipY = false
    roomTextureMap.colorSpace = SRGBColorSpace
    roomTextureMap.anisotropy = 16
    roomTextureMap.wrapS = roomTextureMap.wrapT = RepeatWrapping
    this.material = new MeshBasicNodeMaterial({
      map: roomTextureMap
    })

    const loader = new GLTFLoader()
    loader.load(DoorModel, (gltf) => {
      const object = gltf.scene
      object.rotateY(-Math.PI/2)
      
      object.traverse((child) => {
        if (child.type === "Mesh") {
          const mesh = (child as Mesh)
          mesh.material = this.material
        }
      })

      this.meshGroup.add(object)
    })    
  }

  tick(engine: GameEngine) {
  }
}