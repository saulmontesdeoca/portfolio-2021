import { Group, PlaneGeometry, MeshPhongMaterial, Mesh, DoubleSide } from 'three';

export default class Plane extends Group {
  constructor() {

    super();

    this.name = 'plane';

    const geometry = new PlaneGeometry( 500, 500, 32 );
    const material = new MeshPhongMaterial( {color: 0x187bcd, side: DoubleSide, specular: 0x009900, shininess: 12, flatShading: true} );
    const plane = new Mesh( geometry, material );
    plane.rotation.x = -Math.PI / 2;
    this.add( plane );
  }
}
