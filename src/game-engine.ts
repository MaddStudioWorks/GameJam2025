import { Scene, PerspectiveCamera, Color, Clock, WebGPURenderer, uniform, Vector3, Vector2, Raycaster, Mesh } from 'three/webgpu'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import GameObject from '~/game-objects/game-object'
import Stats from 'three/examples/jsm/libs/stats.module.js'
import { GlobalUniforms } from '~/types'
import Hub from '~/game-objects/hub'
import CameraControls from '~/controls/camera-controls'

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
  entities: GameObject[]

  // Root Game Objects
  hub: Hub

  // Debug
  stats: Stats

  // Temp
  raycaster = new Raycaster

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

    // Camera Controls usage
    this.cameraControls.enterHubMode()
    // this.cameraControls.enterDoorstepMode(this.hub.rooms[0])

    this.stats = new Stats()
    document.body.appendChild(this.stats.dom)

    this.renderer.setAnimationLoop(() => { this.tick() })
  }

  raycast(){
    this.raycaster.setFromCamera(this.cursor, this.camera)
    const results = this.raycaster.intersectObjects(this.hub.rooms.map(room => room.hitbox), false)
    if(results.length > 0){
      const roomIndex = results[0].object.userData.index
      console.log("going to room", this.hub.rooms[roomIndex])
      this.cameraControls.enterDoorstepMode(this.hub.rooms[roomIndex])
    }
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
    window.addEventListener('click', (event) => { this.onClick(event) })
    window.addEventListener('keydown', (event) => { this.onKeyDown(event) })
    window.addEventListener('keyup', (event) => { this.onKeyUp(event) })
  }

  onPointerMove(event: PointerEvent) {
    this.cursor.x = (event.clientX / window.innerWidth) * 2 - 1
    this.cursor.y = -(event.clientY / window.innerHeight) * 2 + 1
  }

  onClick(event: MouseEvent) {
    this.raycast()
  }

  onKeyUp(event: KeyboardEvent) {
    if(event.key === 'Escape') this.cameraControls.enterHubMode()
  }

  onKeyDown(event: KeyboardEvent) {
    
  }

  tick() {
    this.deltaTime = this.clock.getDelta()
    this.entities.forEach(entry => entry.tick(this))
    this.orbitControls.update()
    this.renderer.render(this.scene, this.camera)
    this.stats.update()
  }
}