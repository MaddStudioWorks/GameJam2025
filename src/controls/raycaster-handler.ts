import { Raycaster, Vector2, PerspectiveCamera, Object3D } from 'three/webgpu'
import GameObject from '~/game-objects/game-object'

export interface RaycastableCollection<T extends GameObject = GameObject> {
  id: string
  enabled: boolean
  list: Array<{
    gameObject: T
    hitbox: Object3D
  }>
  onClick: (gameObject: T) => void
  onHover: (gameObject: T) => void
}

// Internal type-erased version for storage
interface InternalRaycastableCollection {
  id: string
  enabled: boolean
  list: Array<{
    gameObject: GameObject
    hitbox: Object3D
  }>
  onClick: (gameObject: GameObject) => void
  onHover: (gameObject: GameObject) => void
}

export class RaycasterHandler{
  raycaster: Raycaster
  cursor: Vector2
  camera: PerspectiveCamera
  collections: InternalRaycastableCollection[] = []
  
  constructor(cursor: Vector2, camera: PerspectiveCamera) {
    this.raycaster = new Raycaster
    this.cursor = cursor
    this.camera = camera
  }

  addCollection<T extends GameObject>(collection: RaycastableCollection<T>) {
    this.collections.push(collection as unknown as InternalRaycastableCollection)
  }

  handleHover() {
    this.raycaster.setFromCamera(this.cursor, this.camera)
    
    this.collections.filter(collection => collection.enabled).forEach(collection => {
      const intersectableObjects = collection.list.map(item => item.hitbox)
      const results = this.raycaster.intersectObjects(intersectableObjects)
      if(results.length > 0){
        const object = collection.list[results[0].object.userData.index].gameObject
        collection.onHover(object)
      }
    })
  }

  handleClick() {
    this.raycaster.setFromCamera(this.cursor, this.camera)
    
    this.collections.filter(collection => collection.enabled).forEach(collection => {
      const intersectableObjects = collection.list.map(item => item.hitbox)
      const results = this.raycaster.intersectObjects(intersectableObjects)
      if(results.length > 0){
        const object = collection.list[results[0].object.userData.index].gameObject
        collection.onClick(object)
      }
    })
  }
}