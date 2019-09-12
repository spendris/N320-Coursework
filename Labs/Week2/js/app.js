class Drop {
    constructor() {
        this.x = Math.random() * 400;
        this.y = 0;
    }

    update() {
        this.y ++;
        fill(0,0,200);
        circle(this.x, this.y, 5);
    }
}

class Ground {
    //constructor
    constructor() {
        this.color = 0;         //set the starting color
        this.dropCount = 0;      //start the drop hit count      
    }
        
    update() {
        fill(0,0,this.color);
        rect(0, 200, 400, 100);
        console.log(this.dropCount);
    }

    dropHit() {

        this.dropCount ++;
        console.log(this.dropCount);

        if(dropCount == 10) {
            this.color += 10;
            this.dropCount = 0;
        }
    }
}




class RainManager {
    constructor() {
        this.drops = [];
    }

    createDrop() {
        //make a new drop
        var newDrop = new Drop();
        
        //add this drop to our collection of drops
        this.drops.push(newDrop);
    }

    update() {
        for(var i = 0; i < this.drops.length; i++) {
            this.drops[i].update();
            if(this.drops[i].y >= 200) {
                this.drops.splice(i,1);
                console.log(this.drops);
                newGround.dropHit();
            }
        }
    }
}

//global variables
var rainManager = new RainManager();
var newGround = new Ground();


//Run once before the application starts
function setup() {
    createCanvas(400,300);
}

//runs 60 times a second, or so
function draw() {

    //clear out background
    background(255);

    //create a new drop on a 1% chance
    if(Math.random() < .05) {
        rainManager.createDrop();
    }

    rainManager.update();
    newGround.update();
}