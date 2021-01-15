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
            object.position.x = -.05
            object.rotateY(-Math.PI/8)
            object.scale.set(1.5, 1.5, 1.5);
            this.add(object);
        });
    });
  }
  
  // setMovement()
  // {
  //     this.movement = {}
  //     this.movement.speed = new THREE.Vector3()
  //     this.movement.localSpeed = new THREE.Vector3()
  //     this.movement.acceleration = new THREE.Vector3()
  //     this.movement.localAcceleration = new THREE.Vector3()

  //     // Time tick
  //     this.time.on('tick', () =>
  //     {
  //         // Movement
  //         const movementSpeed = new THREE.Vector3()
  //         movementSpeed.copy(this.chassis.object.position).sub(this.chassis.oldPosition)
  //         this.movement.acceleration = movementSpeed.clone().sub(this.movement.speed)
  //         this.movement.speed.copy(movementSpeed)

  //         this.movement.localSpeed = this.movement.speed.clone().applyAxisAngle(new THREE.Vector3(0, 0, 1), - this.chassis.object.rotation.z)
  //         this.movement.localAcceleration = this.movement.acceleration.clone().applyAxisAngle(new THREE.Vector3(0, 0, 1), - this.chassis.object.rotation.z)

  //         // Sound
  //         this.sounds.engine.speed = this.movement.localSpeed.x
  //         this.sounds.engine.acceleration = this.controls.actions.up ? (this.controls.actions.boost ? 1 : 0.5) : 0

  //         if(this.movement.localAcceleration.x > 0.01)
  //         {
  //             this.sounds.play('screech')
  //         }
  //     })
  // }
}
