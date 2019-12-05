
//App Setup
var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);

var camera, scene, ball, goal, timeoutId, particleSystem;

//Create Scene
scene = createScene();

//Render loop
engine.runRenderLoop(function() {
    scene.render();
})

scene.registerAfterRender(function() {
    if(ball.intersectsMesh(goal, false)) {
        //move goal 
        goal.position.x = (Math.random() * 8) -4;

        //play particle
        particleSystem.manualEmitCount = 20;
        particleSystem.start();
        particleSystem.minEmitBox = ball.position;
        particleSystem.maxEmitBox = ball.position;

        //put ball back
        resetBall();
    }
})

function createScene() {
    scene = new BABYLON.Scene(engine);

    //Camera
    camera = new BABYLON.UniversalCamera("UC", new BABYLON.Vector3(0,0,-15), scene);
    //Light 
    var light = new BABYLON.DirectionalLight("light", new BABYLON.Vector3(-.1, 1, 1), scene);

    //Physics
    var gravityVector = BABYLON.Vector3(0, -9.81, 0);
    var physicsPlugin = new BABYLON.CannonJSPlugin();
    scene.enablePhysics(gravityVector, physicsPlugin);

    //Ball
    ball = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 1 }, scene);
    ball.physicsImpostor = new BABYLON.PhysicsImpostor(
        ball, BABYLON.PhysicsImpostor.SphereImpostor, 
        {mass: 1, restitution: 0.2 }, scene);

        ball.tag = "ball";

    //Ground
    var ground = BABYLON.MeshBuilder.CreateGround("ground", { height: 20, width: 20, subdivisions: 4 }, scene);
    ground.position.y = -3;
    ground.position.z = 9;
    ground.PhysicsImpostor = new BABYLON.PhysicsImpostor(
        ground, BABYLON.PhysicsImpostor.BoxImpostor,
        { mass: 0, restitution: 0.9 }, scene);

    //Goal
    goal = new BABYLON.MeshBuilder.CreateBox("goal", { height: 5, width: 5 }, scene );
    goal.position.z = 15;
    goal.position.x = (Math.random() * 8) -4;

    //Particle System
    particleSystem = new BABYLON.ParticleSystem("particles", 2000, scene);
    particleSystem.emitter = new BABYLON.Vector3(0,0,0);
    particleSystem.minEmitPower = 1;
    particleSystem.maxEmitPower = 3;
    particleSystem.addVelocityGradient(0,2);

    //load particle texture
        particleSystem.particleTexture = new BABYLON.Texture("images/particle.png");
    
    return scene;
}

//Reset Ball
function resetBall() {
    //position
    ball.position = new BABYLON.Vector3();

    //velocity
    ball.physicsImpostor.setLinearVelocity( new BABYLON.Vector3() );
    ball.physicsImpostor.setAngularVelocity( new BABYLON.Vector3() );

    //timeout off
    clearTimeout( timeoutId );
}

window.addEventListener("click", function() {
    var pickResult = scene.pick(scene.pointerX, scene.pointerY);
    var selectedObject = pickResult.pickedMesh;

    //null check
    if(selectedObject) {
        if(selectedObject.tag == "ball" ) {
            //get direction from click on the ball
            var surfaceNormal = pickResult.getNormal(true);
            var forceDirection = surfaceNormal.scale(-1000);

            //kick object
            selectedObject.physicsImpostor.applyForce(
                forceDirection,
                selectedObject.getAbsolutePosition()
            )

            //reset ball 
            timeoutId = setTimeout(resetBall, 3000);
        }
            
        }
})


