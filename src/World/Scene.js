import { Group } from 'three';
import Amp from '../Objects/Amp/Amp.js';
import Camaro from '../Objects/Camaro/Camaro.js';
import Guitar from '../Objects/Guitar/Guitar.js';
import Plane from '../Objects/Plane/Plane.js'
import Skateboard from '../Objects/Skateboard/Skateboard.js';
import BasicLights from './Lights.js';
import Physics from './Physics'

export default class SeedScene extends Group {
  constructor() {
    super();

    this.camaro = new Camaro();
    this.skateboard = new Skateboard();
    // phyisics
    this.plane = new Plane();
    this.lights = new BasicLights();
    this.amp = new Amp();
    this.physics = new Physics();
    this.guitar = new Guitar();


    this.add(this.camaro, this.plane, this.lights, this.amp, this.guitar, this.skateboard);
  }

  updatePhysics(timeStamp) {
    // this.rotation.y = timeStamp / 10000;
    // Step the physics world
    this.physics.world.step(1/60);
    // Copy coordinates from Cannon.js to Three.js
    this.camaro.position.copy(this.physics.carBody.position);
    this.camaro.quaternion.copy(this.physics.carBody.quaternion);
    this.amp.position.copy(this.physics.ampBody.position);
    this.amp.quaternion.copy(this.physics.ampBody.quaternion);
    this.guitar.position.copy(this.physics.guiarBody.position);
    this.guitar.quaternion.copy(this.physics.guiarBody.quaternion);
    this.skateboard.position.copy(this.physics.skateboardBody.position);
    this.skateboard.quaternion.copy(this.physics.skateboardBody.quaternion);
  }
}