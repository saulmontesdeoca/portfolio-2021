import { WebGLRenderer, PerspectiveCamera, Scene, Vector3, Object3D } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import SeedScene from './World/Scene';
import cannonDebugger from 'cannon-es-debugger';
const scene = new Scene();
const camera = new PerspectiveCamera(40, window.innerWidth / window.innerHeight, .1, 1500 );
const renderer = new WebGLRenderer({antialias: true});
const seedScene = new SeedScene();
const orbitControls = new OrbitControls(camera, renderer.domElement);
// scene
scene.add(seedScene);
cannonDebugger(scene, seedScene.physics.world.bodies);
// camera
camera.position.set(-5.6,3.6,-0.5);
camera.lookAt(new Vector3(0,0,0));

// renderer
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x7ec0ee, 1);

// render loop
const onAnimationFrameHandler = (timeStamp) => {
  camera.lookAt( seedScene.skateboard.position );
  renderer.render(scene, camera);
  seedScene.updatePhysics && seedScene.updatePhysics(timeStamp);
  window.requestAnimationFrame(onAnimationFrameHandler);
}
window.requestAnimationFrame(onAnimationFrameHandler);
// resize
const windowResizeHanlder = () => { 
  const { innerHeight, innerWidth } = window;
  renderer.setSize(innerWidth, innerHeight);
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
};
windowResizeHanlder();
window.addEventListener('resize', windowResizeHanlder);

// dom
document.body.style.margin = 0;
document.body.appendChild( renderer.domElement );

// document.onkeydown = handler;
// document.onkeyup = handler;
document.body.addEventListener('keyup', handler);
document.body.addEventListener('keydown', handler);

const maxSteerVal = 0.5;
const maxForce = 1000;
const brakeForce = 1000000;
const handler = (event) => {
    console.log('forward');
    let up = (event.type == 'keyup');

    if(!up && event.type !== 'keydown'){
        return;
    }

    seedScene.physics.vehicle.setBrake(0, 0);
    seedScene.physics.vehicle.setBrake(0, 1);
    seedScene.physics.vehicle.setBrake(0, 2);
    seedScene.physics.vehicle.setBrake(0, 3);

    switch(event.keyCode){

    case 38: // forward
        console.log('forward');
        seedScene.physics.vehicle.applyEngineForce(up ? 0 : -maxForce, 2);
        seedScene.physics.vehicle.applyEngineForce(up ? 0 : -maxForce, 3);
        break;

    case 40: // backward
        seedScene.physics.vehicle.applyEngineForce(up ? 0 : maxForce, 2);
        seedScene.physics.vehicle.applyEngineForce(up ? 0 : maxForce, 3);
        break;

    case 66: // b
        seedScene.physics.vehicle.setBrake(brakeForce, 0);
        seedScene.physics.vehicle.setBrake(brakeForce, 1);
        seedScene.physics.vehicle.setBrake(brakeForce, 2);
        seedScene.physics.vehicle.setBrake(brakeForce, 3);
        break;

    case 39: // right
        console.log('forward');

        seedScene.physics.vehicle.setSteeringValue(up ? 0 : -maxSteerVal, 0);
        seedScene.physics.vehicle.setSteeringValue(up ? 0 : -maxSteerVal, 1);
        break;

    case 37: // left
        seedScene.physics.vehicle.setSteeringValue(up ? 0 : maxSteerVal, 0);
        seedScene.physics.vehicle.setSteeringValue(up ? 0 : maxSteerVal, 1);
        break;

    }
  }