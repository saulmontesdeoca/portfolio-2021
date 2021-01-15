import CANNON from 'cannon';

export default class Physics { 

    constructor(){

        this.setWorld()
        this.setFloor()
        this.setGuitar();

        this.setCar()
        this.setAmp()
        this.setSkateBoard();

    }
    
    setWorld(){
        this.damping = 0.01
        this.world = new CANNON.World()
        this.world.gravity.set(0, -3.25, 0)
        this.world.broadphase = new CANNON.NaiveBroadphase();
        // for car movement, friction between car and ground
        const groundMaterial = new CANNON.Material("groundMaterial");
        const wheelMaterial = new CANNON.Material("wheelMaterial");
        const wheelGroundContactMaterial = window.wheelGroundContactMaterial = new CANNON.ContactMaterial(
            wheelMaterial,
            groundMaterial,
            {
                friction: 0.3,
                restitution: 0,
                contactEquationStiffness: 1000
            });

        // We must add the contact materials to the world
        this.world.addContactMaterial(wheelGroundContactMaterial);
        this.world.allowSleep = true
    }
    setFloor()
    {
        // ground plane
        const groundMaterial = new CANNON.Material("groundMaterial");
        this.groundShape = new CANNON.Plane();
        this.groundBody = new CANNON.Body({ mass: 0, material: groundMaterial });
        this.groundBody.addShape(this.groundShape);
        this.groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0), -Math.PI/2)
        this.world.addBody(this.groundBody);
    }
    setCar(){
        const shape = new CANNON.Box(new CANNON.Vec3(0.5,0.15,0.25));
        this.carBody = new CANNON.Body({
          mass: 100
        });
        this.carBody.linearDamping = this.damping;
        this.carBody.addShape(shape);
        this.carBody.position.y = .15;
        this.carBody.position.z = 5;
        this.world.addBody(this.carBody);
    }
    carControls(){

    }
    setAmp(){
        const shape = new CANNON.Box(new CANNON.Vec3(0.28,0.23,0.15));
        this.ampBody = new CANNON.Body({
          mass: 1
        });
        this.ampBody.linearDamping = this.damping;
        this.ampBody.addShape(shape);
        this.ampBody.position.z = -1;
        this.ampBody.position.y = .23;
        this.ampBody.quaternion.setFromAxisAngle(new CANNON.Vec3(0,1,0), -Math.PI)
        this.world.addBody(this.ampBody);
    }
    setGuitar(){
        const shapeNeck = new CANNON.Box(new CANNON.Vec3(0.08,0.7,0.04));
        const shapeBody = new CANNON.Box(new CANNON.Vec3(0.22,0.7,0.04));
        shapeBody.boundingSphereRadius = 10
        this.guiarBody = new CANNON.Body({
          mass: 1
        });
        this.guiarBody.linearDamping = this.damping;
        this.guiarBody.addShape(shapeBody);
        this.guiarBody.addShape(shapeNeck);
        this.guiarBody.position.z = -1.1;
        this.guiarBody.position.y = 2;
        this.guiarBody.position.x = 0.1;

        this.guiarBody.quaternion.setFromAxisAngle(new CANNON.Vec3(0,1,1), -Math.PI)
        this.world.addBody(this.guiarBody);
    }
    setSkateBoard(){
        const groundMaterial = new CANNON.Material("groundMaterial");
        const shape = new CANNON.Box(new CANNON.Vec3(0.56,0.04,0.14));
        this.skateboardBody = new CANNON.Body({
          mass: 10,
          material: groundMaterial
        });
        this.skateboardBody.linearDamping = this.damping;
        this.skateboardBody.addShape(shape);
        // this.skateboardBody.sleep();

        this.skateboardBody.position.y = 1;
        this.skateboardBody.position.z = 0;
        this.skateboardBody.angularVelocity.set(0, 0, 0);
        this.world.addBody(this.skateboardBody);

        this.options = {
            radius: 0.04,
            directionLocal: new CANNON.Vec3(0, -.32, 0),
            suspensionStiffness: 25,
            suspensionRestLength: 0.3,
            frictionSlip: 5,
            dampingRelaxation: 1.8,
            dampingCompression: 1.5,
            maxSuspensionForce: 200000,
            rollInfluence:  0.01,
            axleLocal: new CANNON.Vec3(0, 0, 1),
            chassisConnectionPointLocal: new CANNON.Vec3(1, 0, 1),
            maxSuspensionTravel: 0.02,
            customSlidingRotationalSpeed: -30,
            useCustomSlidingRotationalSpeed: true
        };

        // Create the vehicle
        this.vehicle = new CANNON.RaycastVehicle({
            chassisBody: this.skateboardBody,
            indexRightAxis: 2,
            indexUpAxis: 1,
            indexLeftAxis: 0,
        });
        this.options.chassisConnectionPointLocal.set(.311, 0, .111);
        this.vehicle.addWheel(this.options);

        this.options.chassisConnectionPointLocal.set(.311, 0, -.111);
        this.vehicle.addWheel(this.options);

        this.options.chassisConnectionPointLocal.set(-.311, 0, .111);
        this.vehicle.addWheel(this.options);

        this.options.chassisConnectionPointLocal.set(-.311, 0, -.111);
        this.vehicle.addWheel(this.options);

        this.vehicle.addToWorld(this.world);

        let wheelBodies = [];
        const wheelMaterial = new CANNON.Material("wheelMaterial");
        for(let i=0; i< this.vehicle.wheelInfos.length; i++){

            let wheel = this.vehicle.wheelInfos[i];
            let cylinderShape = new CANNON.Cylinder(wheel.radius, wheel.radius, wheel.radius * 1.3, 20);
            let wheelBody = new CANNON.Body({
                mass: 0,
                material: wheelMaterial
            });
            wheelBody.type = CANNON.Body.KINEMATIC;
            wheelBody.collisionFilterGroup = 0; // turn off collisions

            let q = new CANNON.Quaternion();
            q.setFromAxisAngle(new CANNON.Vec3(0, 0, 1), Math.PI / 2);
            wheelBody.addShape(cylinderShape, new CANNON.Vec3(), q);
            wheelBodies.push(wheelBody);
            this.world.addBody(wheelBody);
        }

        // // Update wheels
        let vehicle = this.vehicle
        this.world.addEventListener('postStep', () => {
            for (let i = 0; i < vehicle.wheelInfos.length; i++) {
                vehicle.updateWheelTransform(i);
                let t = vehicle.wheelInfos[i].worldTransform;
                let wheelBody = wheelBodies[i];
                wheelBody.position.copy(t.position);
                wheelBody.quaternion.copy(t.quaternion);
            }
        });
    }
}