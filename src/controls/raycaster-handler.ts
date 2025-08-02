import { Raycaster, Vector2, PerspectiveCamera, Object3D } from 'three/webgpu'
import GameObject from '~/game-objects/game-object'

export interface InteractableObject<T extends GameObject = GameObject> {
  gameObject: T
  hitbox: Object3D
  hovered: boolean
  onClick?: (interactableObject: InteractableObject<T>) => void
  onHover?: (interactableObject: InteractableObject<T>) => void
  onBlur?: (interactableObject: InteractableObject<T>) => void
}

export interface RaycastableCollection<T extends GameObject = GameObject> {
  id: string
  enabled: boolean
  list: InteractableObject<T>[]
}

// Internal type-erased version for storage
interface InternalRaycastableCollection {
  id: string
  enabled: boolean
  list: InteractableObject<GameObject>[]
}

export class RaycasterHandler {
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
    return collection
  }

  handleHover() {
    this.raycaster.setFromCamera(this.cursor, this.camera)

    this.collections.filter(collection => collection.enabled).forEach(collection => {
      const intersectableObjects = collection.list.map(item => item.hitbox)
      const results = this.raycaster.intersectObjects(intersectableObjects)

      // Find which interactable object (if any) is being hovered
      let hoveredObject: InteractableObject<GameObject> | null = null

      if (results.length > 0) {
        // Find the interactable object that corresponds to the intersected hitbox
        hoveredObject = collection.list.find(item => item.hitbox === results[0].object) || null
      }

      // Update hover states for all objects in this collection
      collection.list.forEach(item => {
        if (item === hoveredObject) {
          // This object should be hovered
          if (!item.hovered) {
            item.hovered = true
            item.onHover?.(item)
          }
        } else {
          // This object should not be hovered
          if (item.hovered) {
            item.hovered = false
            item.onBlur?.(item)
          }
        }
      })
    })
  }

  handleClick() {
    this.raycaster.setFromCamera(this.cursor, this.camera)

    this.collections.filter(collection => collection.enabled).forEach(collection => {
      const intersectableObjects = collection.list.map(item => item.hitbox)
      const results = this.raycaster.intersectObjects(intersectableObjects)
      if (results.length > 0) {
        const interactableObject = collection.list.find(item => item.hitbox === results[0].object)
        if (interactableObject) {
          interactableObject.onClick?.(interactableObject)
        }
      }
    })
  }
}