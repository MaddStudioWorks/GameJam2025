import { Scene, PerspectiveCamera, Color, Clock, WebGPURenderer, uniform, Vector2, Raycaster } from 'three/webgpu'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import GameObject from '~/game-objects/game-object'
import Stats from 'three/examples/jsm/libs/stats.module.js'
import { GlobalUniforms } from '~/types'
import Hub from '~/game-objects/hub'
import CameraControls from '~/controls/camera-controls'
import Room from '~/game-objects/room'
import RoomInterior from '~/game-objects/room-interior'

export const globalUniforms: GlobalUniforms = {
  time: uniform(0)
}

export default class GameEngine {
  // Tracked values
  clock = new Clock
  uniforms = globalUniforms
  deltaTime: number = 0
  cursor: Vector2 = new Vector2(0, 0)

  // Engine components
  scene = new Scene
  camera: PerspectiveCamera
  cameraControls: CameraControls
  renderer: WebGPURenderer
  orbitControls: OrbitControls
  orbitingStart = 0
  isOrbiting = false
  entities: GameObject[]

  // Root Game Objects
  hub: Hub

  // Debug
  stats: Stats

  // Temp
  raycaster = new Raycaster
  activeMode: 'hub' | 'doorstep' | 'roomInspection' = 'hub'

  constructor() {
    this.uniforms.time.onFrameUpdate(() => this.clock.getElapsedTime())
    this.scene
    this.scene.background = new Color(0x00404f)
    this.camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight)
    this.camera.position.set(0, 0.5, 1)
    this.entities = []

    this.renderer = new WebGPURenderer
    document.body.appendChild(this.renderer.domElement)
    this.setView()

    this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement)
    this.cameraControls = new CameraControls(this.camera, this.orbitControls)
    this.registerEventListeners()

    // Initialize world
    // The Hub spawns everything else as children
    this.hub = new Hub
    this.addEntity(this.hub)
    
    // this.camera.position.set(0, 0.25, 1)
    // this.orbitControls.target.set(0, 0.25, 0)
    // this.addEntity(new RoomInterior)

    // On game start, trigger enterHubMode
    // this.cameraControls.enterHubMode()

    this.stats = new Stats()
    document.body.appendChild(this.stats.dom)

    this.renderer.setAnimationLoop(() => { this.tick() })
  }

  getHoveredRoom(){
    this.raycaster.setFromCamera(this.cursor, this.camera)
    const results = this.raycaster.intersectObjects(this.hub.rooms.map(room => room.hitbox), false)
    return results.length > 0 ? this.hub.rooms[results[0].object.userData.index] : null
  }

  highlightRoom(room: Room){
    room.hitbox.visible = true
  }

  addEntity(entity: GameObject) {
    this.entities.push(entity)
    this.scene.add(entity.meshGroup)
  }

  setView() {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }

  registerEventListeners() {
    window.addEventListener('resize', () => { this.setView() })
    window.addEventListener('pointermove', (event) => { this.onPointerMove(event) })
    window.addEventListener('pointerup', (event) => { this.onPointerUp(event) })
    window.addEventListener('keydown', (event) => { this.onKeyDown(event) })
    window.addEventListener('keyup', (event) => { this.onKeyUp(event) })
    this.orbitControls.addEventListener('start', () => this.onOrbitStart())
    this.orbitControls.addEventListener('end', () => this.onOrbitEnd())
  }

  onOrbitStart() {
    this.orbitingStart = Date.now()
    this.isOrbiting = true
  }

  onOrbitEnd() {
    this.isOrbiting = false
  }

  wasOrbiting() {
    const orbitDuration = Date.now() - this.orbitingStart
    const wasOrbiting = orbitDuration > 300
    return wasOrbiting
  }

  onPointerMove(event: PointerEvent) {
    this.cursor.x = (event.clientX / window.innerWidth) * 2 - 1
    this.cursor.y = -(event.clientY / window.innerHeight) * 2 + 1
  }

  onPointerUp(event: MouseEvent) {
    const room = this.getHoveredRoom()
    if(room && !this.wasOrbiting()){
      if (this.activeMode === 'doorstep') {
        room.doorLeft.meshGroup.visible = false
        room.doorRight.meshGroup.visible = false
        setTimeout(() => {
          this.cameraControls.enterRoomInspectionMode(room)
          this.activeMode = 'roomInspection'
        }, 500);
      } else {
        this.cameraControls.enterDoorstepMode(room)
        this.activeMode = 'doorstep'
      }
    }
  }

  onKeyUp(event: KeyboardEvent) {
    if(event.key === 'Escape'){
      this.hub.rooms.forEach(room => {
        room.doorLeft.meshGroup.visible = true
        room.doorRight.meshGroup.visible = true
      })
      this.cameraControls.enterHubMode()
      this.activeMode = 'hub'
    }
  }

  onKeyDown(event: KeyboardEvent) {
    
  }

  tick() {
    if(!this.isOrbiting){
      // Move to Room or Hub class
      const hoveredRoom = this.getHoveredRoom()
      this.hub.rooms.forEach(room => {
        room.hitbox.visible = room.index === hoveredRoom?.index
      })
    }

    this.deltaTime = this.clock.getDelta()
    this.entities.forEach(entry => entry.tick(this))
    this.orbitControls.update()
    this.renderer.render(this.scene, this.camera)
    this.stats.update()
  }
}