import { WebGLRenderer, PerspectiveCamera, Scene, Vector3 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import SeedScene from './World/Scene';


const scene = new Scene();
const camera = new PerspectiveCamera(40, window.innerWidth / window.innerHeight, .1, 1500 );
const renderer = new WebGLRenderer({antialias: true});
const seedScene = new SeedScene();
const orbitControls = new OrbitControls(camera, renderer.domElement);

// scene
scene.add(seedScene);

// camera
camera.position.set(0,.4,-9);
camera.lookAt(new Vector3(0,0,0));

// renderer
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x7ec0ee, 1);

// render loop
const onAnimationFrameHandler = (timeStamp) => {
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

