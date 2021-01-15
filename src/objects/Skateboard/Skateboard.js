import { Group } from 'three';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import objModel from './model/Skateboard.obj';
import mtlModel from './model/Skateboard.mtl';

export default class Skateboard extends Group {
  constructor() {

    super();

    this.name = 'skateboard';

    const mtlLoader = new MTLLoader();

    mtlLoader.load(mtlModel, materials =>{
        materials.preload();
        const objLoader = new OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.load(objModel, object=>{
            object.position.y = -0.13;
            object.scale.set(0.2, 0.2, 0.2);
            this.add(object);
        });
    });
  }
}
