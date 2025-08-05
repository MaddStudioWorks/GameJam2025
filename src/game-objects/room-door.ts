import GameEngine from '~/game-engine'
import GameObject from '~/game-objects/game-object'
import { color, Fn, Mesh, MeshBasicNodeMaterial, mix, pow, RepeatWrapping, saturate, smoothstep, SRGBColorSpace, texture, TextureLoader, uniform, uv } from 'three/webgpu'
import { GLTFLoader } from 'three/examples/jsm/Addons.js'
import DoorModelL from '~/assets/meshes/Room_Door_L.glb?url'
import DoorModelR from '~/assets/meshes/Room_Door_R.glb?url'
import DoorTexture_default from '~/assets/textures/doors/default.jpg?url'
import DoorTexture_denial from '~/assets/textures/doors/denial.jpg?url'
import DoorTexture_anger from '~/assets/textures/doors/anger.jpg?url'
import DoorTexture_sadness from '~/assets/textures/doors/sadness.jpg?url'
import DoorTexture_acceptance from '~/assets/textures/doors/acceptance.jpg?url'
import { RoomProps } from '~/types/room-props'

const doorTextures: Record<RoomProps["doorType"], string> = {
  default: DoorTexture_default,
  denial: DoorTexture_denial,
  anger: DoorTexture_anger,
  sadness: DoorTexture_sadness,
  acceptance: DoorTexture_acceptance
}

export default class RoomDoor extends GameObject {
  material: MeshBasicNodeMaterial
  open = false
  hovered = false

  constructor(side: "left" | "right", doorType: RoomProps["doorType"]) {
    super()

    const hovered = uniform(1)
    hovered.onFrameUpdate(() => {
      return this.hovered ? 1 : 0
    })

    const doorTexture = doorTextures[doorType]
    const roomTextureMap = new TextureLoader().load(doorTexture)
    roomTextureMap.flipY = false
    roomTextureMap.colorSpace = SRGBColorSpace
    roomTextureMap.anisotropy = 16
    roomTextureMap.wrapS = roomTextureMap.wrapT = RepeatWrapping

    this.material = new MeshBasicNodeMaterial
    this.material.colorNode = Fn(() => {
      const texel = texture(roomTextureMap, uv())
      const x = uv().x.sub(0.5).abs().mul(2)
      const y = uv().y.sub(0.6).abs().add(0.25)
      const distanceFromCenter = x.add(y)
      const shadow = smoothstep(0.25, 1, distanceFromCenter)
      const shadow2 = saturate(pow(shadow, 2))
      const baseColor = mix(texel, color(0x000000), shadow2)

      // Apply contrast: mix between original color and high contrast version
      const contrastColor = mix(color(0.5), baseColor, 2.0) // Increase contrast
      const result = mix(baseColor, contrastColor, hovered)

      return result
    })()

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
      this.meshGroup.translateX(side === "left" ? -0.11 : 0.11)
    })    
  }
  
  tick(engine: GameEngine) {
  }
}