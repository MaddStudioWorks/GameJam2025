import { Group, Material, Mesh } from 'three/webgpu'
import GameEngine from '~/game-engine'

export default class GameObject{
  meshGroup: Group = new Group
  children: GameObject[] = []

  constructor(){
  }

  forEachMaterial(callback: (material: Material) => void){
    this.meshGroup.traverse((child) => {
      if(child.type === "Mesh"){
        const material = [(child as Mesh).material].flat()
        material.forEach((material) => callback(material))
      }
    })
  }

  tick(engine: GameEngine){
    this.children.forEach((child) => child.tick(engine))
  }
}