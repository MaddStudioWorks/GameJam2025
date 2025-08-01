import GameEngine from '~/game-engine'
import GameObject from '~/game-objects/game-object'
import { Box3, BoxGeometry, DoubleSide, Fn, Mesh, MeshBasicNodeMaterial, positionGeometry, uv, Vector3 } from 'three/webgpu'
import { GLTFLoader } from 'three/examples/jsm/Addons.js'
import RoomInteriorModel from '~/assets/meshes/Room_Interior.glb?url'

export default class RoomInterior extends GameObject {
  material: MeshBasicNodeMaterial

  constructor() {
    super()

    this.material = new MeshBasicNodeMaterial({
      side: DoubleSide
    })
    this.material.colorNode = Fn(() => {
      const depth = positionGeometry.z.add(0.5).div(8)
      return depth
    })()

    const loader = new GLTFLoader()
    loader.load(RoomInteriorModel, (gltf) => {
      const object = gltf.scene

      object.traverse((child) => {
        if (child.type === "Mesh") {
          const mesh = (child as Mesh)
          mesh.material = this.material
          mesh.geometry.rotateY(-Math.PI / 2)
        }
      })

      // Room interiors are 1 unit in size in Blender
      // We scale room interiors to 0.5 in-game
      object.scale.multiplyScalar(0.5)
      // Translate the room in behind the entrance
      const box = new Box3().setFromObject(object)
      const size = new Vector3
      box.getSize(size)
      object.position.y = size.y / 2
      object.position.z = -size.z / 2

      this.meshGroup.add(object)
    })
  }

  tick(engine: GameEngine) {
  }
}