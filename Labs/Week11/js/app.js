var canvas = document.getElementById("renderCanvas"); // Get the canvas element 
var engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine
var camera;

var lock1, lock2, lock3, light, blueMat, whiteMat, greenMat;
var selectedMesh = null;

var scene = createScene(); //Call the createScene function

function createScene() {

  // Create the scene space
  var scene = new BABYLON.Scene(engine);

  // Add a camera to the scene and attach it to the canvas
  camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 4, 4, BABYLON.Vector3.Zero(), scene);
  
  
  // Add lights to the scene
  var myLight = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(0, -0.5, 1.0), scene);

  // Add and manipulate meshes in the scene
  lock1 = BABYLON.MeshBuilder.CreateBox("box1", {height: ".5", width: ".2", depth: ".2"}, scene);
  lock2 = BABYLON.MeshBuilder.CreateBox("box2", {height: ".5", width: ".2", depth: ".2"}, scene);
  lock3 = BABYLON.MeshBuilder.CreateBox("box3", {height: ".5", width: ".2", depth: ".2"}, scene);

  //set position of locks  
  lock1.position.x = 1;
  lock2.position.x = 0;
  lock3.position.x = -1;
  
  light = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(1, 1, 0), scene);

  //Materials
  blueMat = new BABYLON.StandardMaterial("blueMat", scene);
  blueMat.diffuseColor = new BABYLON.Color3(0, 0, 1);
  blueMat.specularColor = new BABYLON.Color3(0.2, 0.2, 0.87);

  whiteMat = new BABYLON.StandardMaterial("whiteMat", scene);
  whiteMat.diffuseColor = new BABYLON.Color3(0.1, 0.1, 0.1);
  whiteMat.specularColor = new BABYLON.Color3(0, 0, 0);

  greenMat = new BABYLON.StandardMaterial("greenMat", scene);
  greenMat.diffuseColor = new BABYLON.Color3(0, 1, 0);
  greenMat.specularColor = new BABYLON.Color3(.5, 1, .2);
  
    

  
  return scene;
};


//Render Loop
engine.runRenderLoop(function () { 
  scene.render();
});


function checkUp() {
    console.log(selectedMesh.rotation.y)
    if(lock1.rotation.x == lock2.rotation.x && lock2.rotation.x == lock3.rotation.x) {
        console.log("unlocked");
        lock1.material = greenMat;
        lock2.material = greenMat;
        lock3.material = greenMat;
    
    } else {
        lock1.material = whiteMat;
        lock2.material = whiteMat;
        lock3.material = whiteMat;
        selectedMesh.material = blueMat;
    }
}

window.addEventListener("keydown", (event) => {

    if(selectedMesh) {
        if(event.keyCode == 87) {
            TweenLite.to(selectedMesh.rotation, .01, { x: "-=.5", onComplete: checkUp });
            
        }
        if(event.keyCode == 83) {
            TweenLite.to(selectedMesh.rotation, .01, { x: "+=.5", onComplete: checkUp });

        }
    }

})

window.addEventListener("click", function () {
    // We try to pick an object
    var pickResult = scene.pick(scene.pointerX, scene.pointerY);

    selectedMesh = pickResult.pickedMesh;
    //set all to blank mat
    lock1.material = whiteMat;
    lock2.material = whiteMat;
    lock3.material = whiteMat;
    //set selected to blue mat
    selectedMesh.material = blueMat;

 })

