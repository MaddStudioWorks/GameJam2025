import GameEngine, { globalUniforms } from "~/game-engine";
import GameObject from "~/game-objects/game-object";
import {
  CylinderGeometry,
  Mesh,
  MeshBasicNodeMaterial,
  MeshBasicMaterial,
  AmbientLight,
  PointLight,
  MeshPhongMaterial,
  positionGeometry,
  normalGeometry,
  sin,
  distance,
  RingGeometry,
  uv,
  vec3,
  vec4,
  vec2,
  Fn,
  PlaneGeometry,
  Group,
  DoubleSide,
  mx_noise_float,
} from "three/webgpu";

export default class GameClock extends GameObject {
  material: MeshPhongMaterial;
  ringMesh: Mesh;
  smallRingMesh: Mesh;
  needleGroup: Group;

  constructor() {
    super();

    //LIGHT
    const light = new PointLight( 0x2205bb, 25, 10 );
    light.position.set( -4, 3, 0 );

    const secondLight = new PointLight(0xffffff, 50, 10)
    secondLight.position.set( 1, 5, 0 );

    const ambientlight = new AmbientLight( 0x404040 );

    //NOISE
    const noise = mx_noise_float(uv().mul(100).add(globalUniforms.time));
    const noise2 = mx_noise_float(uv().mul(10).add(globalUniforms.time));
    const final = noise.add(noise2).div(2);

    //BASE GEOMETRY
    const geometry = new CylinderGeometry(8, 8, 1, 32);
    this.material = new MeshPhongMaterial({ color: 0x000000 });

    //WALL GEOMETRY
    const wallGeometry = new CylinderGeometry(9, 9, 55, 32);
    const wallMaterial = new MeshPhongMaterial({
      color: 0x111111,
      side: DoubleSide,
    });
    const wallMesh = new Mesh(wallGeometry, wallMaterial);

    //CENTRAL CYLINDER GEOMETRY
    const centralGeometry = new CylinderGeometry(0.25, 0.25, 2, 32);
    const material = new MeshPhongMaterial({ color: 0x856203 });
    const centralMesh = new Mesh(centralGeometry, material);
    centralMesh.position.y = 1;

    //RINGS GEOMETRY
    const ringGeometry = new RingGeometry(0.5, 1.5, 32);
    const ringMaterial = new MeshBasicNodeMaterial({
      wireframe: true,
      color: 0xfcba03,
    });

    const smallRingGeometry = new RingGeometry(0.5, 1, 32);

    const bigRingGeometry = new RingGeometry(0.5, 7, 12);
    const bigRingMaterial = new MeshBasicNodeMaterial({
      wireframe: true,
      side: DoubleSide,
    });

    this.ringMesh = new Mesh(ringGeometry, ringMaterial);
    this.ringMesh.rotation.x = Math.PI / 2;
    this.ringMesh.position.y = 1;

    const bigRingMesh = new Mesh(bigRingGeometry, bigRingMaterial);
    bigRingMesh.rotation.x = Math.PI / 2;
    bigRingMesh.position.y = 0.6;

    this.smallRingMesh = new Mesh(smallRingGeometry, ringMaterial);
    this.smallRingMesh.rotation.x = Math.PI / 2;
    this.smallRingMesh.position.y = 1.2;

    bigRingMaterial.colorNode = Fn(() => {
      const centre = vec2(0.5, 0.5);
      const computeDist = distance(centre, uv()).mul(2);
      const timed = vec3(computeDist.add(sin(globalUniforms.time)), 0, 0);
      return timed;
    })();

    //NEEDLE GEOMETRY
    const needleGeometry = new PlaneGeometry(0.3, 6);
    const needleMaterial = new MeshPhongMaterial({ color: 0xfcba03 });

    //DOOR GEOMETRY
    const doorGeometry = new PlaneGeometry(2, 2.5);
    const doorAnimatedGeometry = new PlaneGeometry(2, 2.5, 20, 20);
    const doorMaterial = new MeshPhongMaterial({
      color: 0x444444,
      wireframe: false,
    });
    const doorAnimatedMaterial = new MeshBasicNodeMaterial({
      color: 0x444444,
      wireframe: false,
    });

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

    const positions = [
      { x: -7.9, y: 1.5, z: 0, rotation: Math.PI / 2, animated: true },
      { x: 7.9, y: 1.5, z: 0, rotation: -Math.PI / 2, animated: true },
      { x: 0, y: 1.5, z: -7.9, animated: true },
      { x: 0, y: 1.5, z: 7.9, rotation: Math.PI, animated: true },
      { x: 3.8, y: 1.5, z: 6.8, rotation: -Math.PI / 1.19 },
      { x: -3.8, y: 1.5, z: 6.8, rotation: Math.PI / 1.19 },
      { x: -6.6, y: 1.5, z: 4, rotation: Math.PI / 1.5 },
      { x: 6.6, y: 1.5, z: 4, rotation: -Math.PI / 1.5 },
      { x: 3.8, y: 1.5, z: -6.8, rotation: -Math.PI / 6 },
      { x: -3.8, y: 1.5, z: -6.8, rotation: Math.PI / 6 },
      { x: 6.8, y: 1.5, z: -3.8, rotation: -Math.PI / 3 },
      { x: -6.8, y: 1.5, z: -3.8, rotation: Math.PI / 3 },
    ];

    const mesh = new Mesh(geometry, this.material);

    const addDoorsToClock = () => {
      positions.map((e) => {
        let doorMesh;
        if (e.animated) {
          doorMesh = new Mesh(doorAnimatedGeometry, doorAnimatedMaterial);
        } else {
          doorMesh = new Mesh(doorGeometry, doorMaterial);
        }
        doorMesh.position.set(e.x, e.y, e.z);
        if (e.rotation) doorMesh.rotation.y = e.rotation;
        this.meshGroup.add(doorMesh);
      });
    };

    const needleMesh = new Mesh(needleGeometry, needleMaterial);
    needleMesh.position.y = 0.7;
    needleMesh.rotation.z = Math.PI / 2;
    needleMesh.rotation.x = -Math.PI / 2;
    needleMesh.position.x = 2.9;

    this.needleGroup = new Group();
    this.needleGroup.add(needleMesh, centralMesh);

    addDoorsToClock();

    this.meshGroup.add(
      mesh,
      this.ringMesh,
      this.smallRingMesh,
      bigRingMesh,
      this.needleGroup,
      wallMesh,
      light,
      secondLight,
      ambientlight
    );
  }

  tick(engine: GameEngine) {
    this.ringMesh.rotation.z += 0.0025;
    this.smallRingMesh.rotation.z -= 0.001;
    this.needleGroup.rotation.y -= 0.0002;
  }
}
