import GameEngine from '~/game-engine'
import GameObject from '~/game-objects/game-object'
import { Mesh, MeshNormalNodeMaterial } from 'three/webgpu'
import { GLTFLoader } from 'three/examples/jsm/Addons.js'
import DoorModel from '~/assets/meshes/Room_DoorFrame.glb?url'

export default class RoomDoorFrame extends GameObject {
  material: MeshNormalNodeMaterial

  constructor() {
    super()

    this.material = new MeshNormalNodeMaterial()

    const loader = new GLTFLoader()
    loader.load(DoorModel, (gltf) => {
      const object = gltf.scene
      object.rotateY(Math.PI/2)
      
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