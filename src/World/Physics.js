import CANNON from 'cannon';

export default class Physics { 

    constructor(){

        this.setWorld()
        this.setFloor()
        this.setCar()
    }
    
    setWorld(){
        this.world = new CANNON.World()
        this.world.gravity.set(0, -3.25, 0)
        // this.world.allowSleep = true
        // this.world.defaultContactMaterial.friction = 0
        // this.world.defaultContactMaterial.restitution = 0.2
    }
    setFloor()
    {
        // ground plane
        const groundMaterial = new CANNON.Material();
        const groundShape = new CANNON.Plane();
        this.groundBody = new CANNON.Body({ mass: 0 });
        this.groundBody.addShape(groundShape);
        const rot = new CANNON.Vec3(1,0,0)
        // this.groundBody.quaternion.setFromAxisAngle(rot, -Math.PI/2)
        // this.groundBody.position.set(0,0,0);
        // this.world.addBody(this.groundBody);
    }
    setCar(){
        const shape = new CANNON.Box(new CANNON.Vec3(1,1,1));
        this.carBody = new CANNON.Body({
          mass: 1
        });
        this.carBody.addShape(shape);
        // this.carBody.angularVelocity.set(0,0,0);
        // this.carBody.angularDamping = 0.5;
        this.world.addBody(this.carBody);
    }

}