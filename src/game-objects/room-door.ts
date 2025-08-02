import GameEngine from '~/game-engine'
import GameObject from '~/game-objects/game-object'
import { Color, Mesh, MeshBasicNodeMaterial, RepeatWrapping, SRGBColorSpace, TextureLoader } from 'three/webgpu'
import { GLTFLoader } from 'three/examples/jsm/Addons.js'
import DoorModelL from '~/assets/meshes/Room_Door_L.glb?url'
import DoorModelR from '~/assets/meshes/Room_Door_R.glb?url'
import DoorTexture_default from '~/assets/textures/doors/default.jpg?url'
import DoorTexture_denial from '~/assets/textures/doors/denial.jpg?url'
import DoorTexture_anger from '~/assets/textures/doors/anger.jpg?url'
import DoorTexture_sadness from '~/assets/textures/doors/sadness.jpg?url'
import DoorTexture_acceptance from '~/assets/textures/doors/acceptance.jpg?url'
import { RoomProps } from '~/interfaces/room-props'

const doorTextures: Record<RoomProps["doorType"], string> = {
  default: DoorTexture_default,
  denial: DoorTexture_denial,
  anger: DoorTexture_anger,
  sadness: DoorTexture_sadness,
  acceptance: DoorTexture_acceptance
}

export default class RoomDoor extends GameObject {
  material: MeshBasicNodeMaterial

  constructor(side: "left" | "right", doorType: RoomProps["doorType"]) {
    super()

    const doorTexture = doorTextures[doorType]
    const roomTextureMap = new TextureLoader().load(doorTexture)
    roomTextureMap.flipY = false
    roomTextureMap.colorSpace = SRGBColorSpace
    roomTextureMap.anisotropy = 16
    roomTextureMap.wrapS = roomTextureMap.wrapT = RepeatWrapping
    this.material = new MeshBasicNodeMaterial({
      map: roomTextureMap
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