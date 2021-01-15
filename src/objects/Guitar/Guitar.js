import { Group } from 'three';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import objModel from './model/ElectricGuitar.obj';
import mtlModel from './model/ElectricGuitar.mtl';

export default class Guitar extends Group {
  constructor() {

    super();

    this.name = 'guitar';

    const mtlLoader = new MTLLoader();

    mtlLoader.load(mtlModel, materials =>{
        materials.preload();
        const objLoader = new OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.load(objModel, object=>{
            object.scale.set(0.06, 0.06, 0.06);
            object.position.set(0, -0.7,0)
            this.add(object);
        });
    });
  }
}
