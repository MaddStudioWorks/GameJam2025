import { Scene, PerspectiveCamera, Color, Clock, WebGPURenderer, uniform, Vector2 } from 'three/webgpu'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import GameObject from '~/game-objects/game-object'
import Stats from 'three/examples/jsm/libs/stats.module.js'
import { GlobalUniforms } from '~/types'
import Hub from '~/game-objects/hub'
import CameraControls from '~/controls/camera-controls'
import RaycasterHandler from '~/controls/raycaster-handler'
import gameState from '~/game-state'
import ClockHandler from '~/controls/clock-handler'
import SoundManagement from '~/sound-design/index.sound-design'

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
  renderer: WebGPURenderer
  scene = new Scene
  camera: PerspectiveCamera
  orbitControls: OrbitControls
  cameraControls: CameraControls
  raycasterHandler: RaycasterHandler
  musicHandler = new SoundManagement(this)
  clockHandler = new ClockHandler(this)
  entities: GameObject[]
  gameState = gameState

  // Root Game Objects
  hub: Hub

  // Debug
  stats: Stats

  // Temp
  activeMode: 'hub' | 'doorstep' | 'roomInspection' = 'hub'

  constructor() {
    this.uniforms.time.onFrameUpdate(() => this.clock.getElapsedTime())
    this.scene.background = new Color(0x00404f)
    this.camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight)
    this.camera.position.set(0, 1.5, 1)
    this.entities = []

    this.renderer = new WebGPURenderer
    document.body.appendChild(this.renderer.domElement)
    this.setView()

    this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement)
    this.cameraControls = new CameraControls(this)
    this.raycasterHandler = new RaycasterHandler(this)
    this.registerEventListeners()

    // Initialize world
    // The Hub spawns everything else as children
    this.hub = new Hub(this)
    this.addEntity(this.hub)

    // this.camera.position.set(0, 0.25, 1)
    // this.orbitControls.target.set(0, 0.25, 0)
    // this.addEntity(new RoomInterior)


    // On game start, trigger enterHubMode
    // this.cameraControls.enterHubMode()

    // Debug : show room 1
    // this.cameraControls.enterRoomInspectionMode(this.hub.rooms[1])

    this.stats = new Stats()
    document.body.appendChild(this.stats.dom)

    this.renderer.setAnimationLoop(() => { this.tick() })
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
    this.cameraControls.orbitingStart = Date.now()
    this.cameraControls.isOrbiting = true
  }

  onOrbitEnd() {
    this.cameraControls.isOrbiting = false
  }

  onPointerMove(event: PointerEvent) {
    this.cursor.x = (event.clientX / window.innerWidth) * 2 - 1
    this.cursor.y = -(event.clientY / window.innerHeight) * 2 + 1
  }

  onPointerUp(event: MouseEvent) {
    if (!this.cameraControls.wasOrbiting()){
      this.raycasterHandler.handleClick()
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
    // Time updates
    this.deltaTime = this.clock.getDelta()
    const timeProgress = this.clock.getElapsedTime() / this.gameState.endOfTime
    this.gameState.time = timeProgress > 1 ? 1 : timeProgress

    // Game state updates
    this.clockHandler.tick()
    if(!this.cameraControls.isOrbiting){
      this.raycasterHandler.handleHover()
    }
    this.entities.forEach(entry => entry.tick(this))
    this.orbitControls.update()
    this.renderer.render(this.scene, this.camera)
    this.stats.update()
  }
}