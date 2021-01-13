import { Group } from 'three';
import Camaro from './Camaro/Camaro.js';
import Plane from './Plane/Plane.js'
import BasicLights from './Lights.js';

export default class SeedScene extends Group {
  constructor() {
    super();

    const camaro = new Camaro();
    const plane = new Plane();
    const lights = new BasicLights();

    this.add(camaro, plane, lights);
  }

  update(timeStamp) {
    // this.rotation.y = timeStamp / 10000;
  }
}