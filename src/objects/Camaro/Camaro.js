import { Group } from 'three';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import objModel from './model/obj/model.obj';
import mtlModel from './model/obj/materials.mtl';

export default class Camaro extends Group {
  constructor() {

    super();

    this.name = 'camaro';

    const mtlLoader = new MTLLoader();

    mtlLoader.load(mtlModel, materials =>{
        materials.preload();
        const objLoader = new OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.load(objModel, object=>{
            object.position.y = .1;
            // object.scale.set(0.5, 0.5, 0.5);
            this.add(object);
        });
    });
  }
}
