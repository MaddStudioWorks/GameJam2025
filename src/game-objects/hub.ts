import GameEngine from '~/game-engine'
import GameObject from '~/game-objects/game-object'
import { Mesh, MeshBasicNodeMaterial, CircleGeometry, Vector3 } from 'three/webgpu'
import RoomEntry from '~/game-objects/room-entry'

export default class Hub extends GameObject {
  material: MeshBasicNodeMaterial

  constructor() {
    super()

    const radius = 1

    // Hub Geometry
    const geometry = new CircleGeometry(radius, 24)
    geometry.rotateX(-Math.PI/2)
    this.material = new MeshBasicNodeMaterial({
      color: 0x000000
    })
    const mesh = new Mesh(geometry, this.material)
    this.meshGroup.add(mesh)

    // Doors
    for(let i = 0; i < 12; i++) {
      const door = new RoomEntry
      const angle = i * -Math.PI*2 / 12
      door.meshGroup.rotateY(angle)
      const projectionVector = new Vector3(0, 0, 1).applyEuler(door.meshGroup.rotation);
      door.meshGroup.position.addScaledVector(projectionVector, radius)
      this.meshGroup.add(door.meshGroup)
    }    
  }

  tick(engine: GameEngine) {
  }
}