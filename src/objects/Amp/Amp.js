import { Group } from 'three';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import objModel from './model/model.obj';
import mtlModel from './model/materials.mtl';

export default class Amp extends Group {
  constructor() {

    super();

    this.name = 'amp';

    const mtlLoader = new MTLLoader();

    mtlLoader.load(mtlModel, materials =>{
        materials.preload();
        const objLoader = new OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.load(objModel, object=>{
            object.scale.set(0.0014, 0.0014, 0.0014);
            this.add(object);
        });
    });
  }
}
