import { Group } from 'three';
import Camaro from '../Objects/Camaro/Camaro.js';
import Plane from '../Objects/Plane/Plane.js'
import BasicLights from './Lights.js';
import Physics from './Physics'


export default class SeedScene extends Group {
  constructor() {
    super();

    this.camaro = new Camaro();
    // phyisics
    this.physics = new Physics();
    this.plane = new Plane();
    // this.plane.position.copy(this.physics.groundBody.position);
    // this.plane.quaternion.copy(this.physics.groundBody.quaternion);

    this.lights = new BasicLights();

    this.add(this.camaro, this.plane, this.lights);
  }

  updatePhysics(timeStamp) {
    // this.rotation.y = timeStamp / 10000;
    // Step the physics world
    this.physics.world.step(1/60);

    // Copy coordinates from Cannon.js to Three.js
    this.camaro.position.copy(this.physics.carBody.position);
    this.camaro.quaternion.copy(this.physics.carBody.quaternion);

    this.physics.groundBody.quaternion.copy(this.plane.quaternion);
    this.physics.groundBody.position.copy(this.plane.position);
  }
}