import GameEngine, { globalUniforms } from '~/game-engine'
import GameObject from '~/game-objects/game-object'
import { BoxGeometry, CylinderGeometry, Mesh, MeshBasicNodeMaterial, MeshBasicMaterial, positionGeometry,normalGeometry, sin , distance, ConeGeometry, step, RingGeometry, uv, vec3, vec4, vec2, fract, Fn, PlaneGeometry, Group, DoubleSide, mx_noise_float } from 'three/webgpu'

export default class GameClock extends GameObject {
  material: MeshBasicMaterial
  ringMesh: Mesh
  smallRingMesh: Mesh
  needleGroup: Group

  constructor() {
    super()

    const geometry = new CylinderGeometry(8, 8, 1, 32)
    this.material = new MeshBasicMaterial({color: 0x000000})

    const wallGeometry = new CylinderGeometry(9, 9, 15, 32)
    const wallMaterial = new MeshBasicMaterial({color: 0x111111, side: DoubleSide})

    const centralGeometry = new CylinderGeometry(0.25, 0.25, 2, 32)
    const material = new MeshBasicMaterial({color: 0x856203})

    const ringGeometry = new RingGeometry( 0.5, 1.5, 32 );
    const ringMaterial = new MeshBasicNodeMaterial({wireframe: true, color: 0xfcba03})

    const smallRingGeometry = new RingGeometry( 0.5, 1, 32 );

    const bigRingGeometry = new RingGeometry(0.5, 7, 12)
    const bigRingMaterial = new MeshBasicNodeMaterial({wireframe: true, side: DoubleSide})

    const needleGeometry = new PlaneGeometry( 0.3, 6 );
    const needleMaterial = new MeshBasicMaterial({color: 0xfcba03})

    const doorGeometry = new PlaneGeometry(2, 2.5)
    const doorAnimatedGeometry = new PlaneGeometry(2, 2.5, 20, 20)
    const doorMaterial = new MeshBasicMaterial({color: 0x444444, wireframe: false})
    const doorAnimatedMaterial = new MeshBasicNodeMaterial({color: 0x444444, wireframe: false})

    const noise = mx_noise_float(uv().mul(100).add(globalUniforms.time));
    const noise2 = mx_noise_float(uv().mul(10).add(globalUniforms.time));
    const final = noise.add(noise2).div(2);
    doorAnimatedMaterial.colorNode = Fn(() => {
      const color = vec4(final.add(0.4), 0.02, final.add(0.4), 1);
      return color;
    })();

      doorAnimatedMaterial.positionNode = Fn(() => {
      const displacedPosition = positionGeometry.add(
        normalGeometry.mul(final.div(2))
      );
      return displacedPosition;
    })();


    bigRingMaterial.colorNode = Fn(() => {
      //const intermed = 0.5;
      const centre = vec2(0.5, 0.5);
      //const color = vec3(step(0.5,uv().x), 0, 0)
      const computeDist = distance(centre, uv()).mul(2)
      const timed = vec3(computeDist.add(sin(globalUniforms.time)), 0, 0)
      return timed;
    })()

    const positions = [
      {x: -7.9, y:1.5, z:0, rotation: Math.PI / 2, animated: true},
      {x: 7.9, y:1.5, z:0, rotation: -Math.PI / 2, animated: true},
      {x: 0, y:1.5, z:-7.9, animated: true},
      {x: 0, y:1.5, z:7.9, rotation: Math.PI, animated: true},
      {x: 3.8, y:1.5, z:6.8, rotation: -Math.PI / 1.19},
      {x: -3.8, y:1.5, z:6.8, rotation: Math.PI / 1.19},
      {x: -6.6, y:1.5, z:4, rotation: Math.PI / 1.5},
      {x: 6.6, y:1.5, z:4, rotation: -Math.PI / 1.5},
      {x: 3.8, y:1.5, z:-6.8, rotation: -Math.PI / 6},
      {x: -3.8, y:1.5, z:-6.8, rotation: Math.PI / 6},
      {x: 6.8, y:1.5, z:-3.8, rotation: -Math.PI / 3},
      {x: -6.8, y:1.5, z:-3.8, rotation: Math.PI / 3},
    ]

    const mesh = new Mesh(geometry, this.material)
    const wallMesh = new Mesh(wallGeometry, wallMaterial)

    const addDoorsToClock = () => {
      positions.map(e => {
        let doorMesh;
        if(e.animated) {
          doorMesh = new Mesh(doorAnimatedGeometry, doorAnimatedMaterial)
        } else {
          doorMesh = new Mesh(doorGeometry, doorMaterial)
        }
        doorMesh.position.set(e.x, e.y, e.z)
        if(e.rotation) doorMesh.rotation.y = e.rotation
        this.meshGroup.add(doorMesh)
      })
    }

    const needleMesh = new Mesh(needleGeometry, needleMaterial)
    needleMesh.position.y = 0.7
    needleMesh.rotation.z = Math.PI / 2
    needleMesh.rotation.x = -Math.PI / 2
    needleMesh.position.x = 2.9

    const centralMesh = new Mesh(centralGeometry, material)
    centralMesh.position.y = 1;

    this.ringMesh = new Mesh(ringGeometry, ringMaterial)
    this.ringMesh.rotation.x = Math.PI / 2
    this.ringMesh.position.y = 1

    const bigRingMesh = new Mesh(bigRingGeometry, bigRingMaterial)
    bigRingMesh.rotation.x = Math.PI / 2
    bigRingMesh.position.y = 0.6

    this.smallRingMesh = new Mesh (smallRingGeometry, ringMaterial)
    this.smallRingMesh.rotation.x = Math.PI / 2
    this.smallRingMesh.position.y = 1.2

    this.needleGroup = new Group()
    this.needleGroup.add(needleMesh, centralMesh)

    addDoorsToClock()

    this.meshGroup.add(mesh, this.ringMesh, this.smallRingMesh, bigRingMesh, this.needleGroup, wallMesh)
  }

  tick(engine: GameEngine) {
    this.ringMesh.rotation.z += 0.0025;
    this.smallRingMesh.rotation.z -= 0.001
    this.needleGroup.rotation.y -= 0.0002
  }
}