import GameEngine from '~/game-engine'
import GameObject from '~/game-objects/game-object'
import { Color, Mesh, MeshBasicNodeMaterial } from 'three/webgpu'
import { GLTFLoader } from 'three/examples/jsm/Addons.js'
import DoorModelL from '~/assets/meshes/Room_Door_L.glb?url'
import DoorModelR from '~/assets/meshes/Room_Door_R.glb?url'

export default class RoomDoor extends GameObject {
  material: MeshBasicNodeMaterial

  constructor(side: "left" | "right") {
    super()

    this.material = new MeshBasicNodeMaterial({
      color: new Color("#603018")
    })

    const loader = new GLTFLoader()
    const model = side === "left" ? DoorModelL : DoorModelR
    loader.load(model, (gltf) => {
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