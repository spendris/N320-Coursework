var canvas = document.getElementById("renderCanvas");
var rgCost = document.getElementById("rgCost");
var infoBox = document.getElementById("infoBox");
var filterButtons = document.querySelectorAll(".filterNav");

console.log(filterButtons);

//app variables
var camera, scene, data, selectedPieces; 
var selectedType = "all";



//application setup
fetch("data/furniture.json", { method: 'get' })
    .then(response => response.json())
    .then((jsonData) => {
        //json representation of the data
        data = jsonData;

        //load in models
        data.furniture.forEach((piece, idx) => {
            var p = BABYLON.SceneLoader.ImportMesh(
                "", "./models/OBJ format/", piece.asset, scene,
                (meshes) => {
                    var containerNode = new BABYLON.TransformNode("root");
                    piece.asset = containerNode;
                    piece.asset.dataId = idx;

                    meshes.forEach((mesh) => {
                        mesh.parent = containerNode;
                    })
                }
            );
        })
    })

//engine
var engine = new BABYLON.Engine(canvas, true);

scene= createScene();
engine.runRenderLoop(function() {
    scene.render();
})

function createScene() {
    var scene = new BABYLON.Scene(engine);
    camera = new BABYLON.ArcRotateCamera(
        "c", Math.PI / 2, Math.PI / 4,
        4, BABYLON.Vector3.Zero(), scene 
        );

    var light = new BABYLON.DirectionalLight(
        "1", new BABYLON.Vector3(0, -.5, 1.0 ), scene
        )

    return scene;
}
//end of setup

//app functions
function selectType(event) {
    //what was selected
    selectedType = event.target.getAttribute("data-type");

    //reset selected class
    filterButtons.forEach((button) => { button.classList.remove("selected") });

    //add class to item
    event.target.classList.add("selected");
}

function showAvailable() {

    //cost on the slider
    var amount = Number(rgCost.value);

    //filter selected pieces
    selectedPieces = data.furniture.filter((piece) => {
        //only on price if all
        if(selectedType == "all") {
            return piece.price < amount;
        } else { //price and type
            return (piece.price < amount) && (piece.type == selectedType);
        }
    })

    //hide all pieces
    data.furniture.forEach((piece) => {
        TweenLite.to(piece.asset.position, 0.7, { y:5, onComplete: showFiltered })
    })
}

function showFiltered() {
    selectedPieces.forEach((piece, idx) => {
        TweenLite.to(piece.asset.position, .7, { y: 0, x: idx })
    })
}

window.addEventListener("click", function() {
    var pickResult = scene.pick(scene.pointerX, scene.pointerY);
    var selectedObject = pickResult.pickedMesh;

    if(selectedObject) {
        //get id of object
        var dataId = selectedObject.parent.dataId;

        //pull object info
        var itemInfo = data.furniture[dataId];
        console.log(itemInfo);
        console.log(itemInfo.style);

        infoBox.innerHTML = `${itemInfo.style} ${itemInfo.type} : $${itemInfo.price}`;
    }
})