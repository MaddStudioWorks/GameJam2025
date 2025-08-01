import { Scene, PerspectiveCamera, Color, Clock, WebGPURenderer, uniform } from 'three/webgpu'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import GameObject from '~/game-objects/game-object'
import Stats from 'three/examples/jsm/libs/stats.module.js'
import { GlobalUniforms } from '~/types'
import GameClock from '~/game-objects/clock'

export const globalUniforms: GlobalUniforms = {
  time: uniform(0)
}

export default class GameEngine {
  clock: Clock
  uniforms = globalUniforms
  deltaTime: number = 0
  scene: Scene
  camera: PerspectiveCamera
  renderer: WebGPURenderer
  orbitControls: OrbitControls
  entities: GameObject[]
  stats: Stats
  gameClock: GameClock

  constructor() {
    this.clock = new Clock
    this.uniforms.time.onFrameUpdate(() => this.clock.getElapsedTime())
    this.scene = new Scene
    this.scene.background = new Color(0x00404f)
    this.camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight)
    this.camera.position.set(0, 4, 8)
    this.entities = []

    this.renderer = new WebGPURenderer
    document.body.appendChild(this.renderer.domElement)
    this.setView()

    this.registerEventListeners()
    this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement)

    this.gameClock = new GameClock();
    /*this.addEntity(this.player)
    this.level = new Level(ExampleLevel, this.player)*/
    this.addEntity(this.gameClock)

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
    window.addEventListener('keydown', (event) => { this.onKeyDown(event) })
    window.addEventListener('keyup', (event) => { this.onKeyUp(event) })
  }

  onKeyUp(event: KeyboardEvent) {
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