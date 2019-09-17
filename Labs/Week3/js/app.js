class Ball { //ball class

  constructor() {
    this.position = { x: 100, y: 100 };
    this.velocity = { x: 10, y: 0 };
  }

  update() {

    this.position.x += this.velocity.x; //change x and y position of ball
    this.position.y += this.velocity.y;

    circle(this.position.x, this.position.y, 20); //draw the ball

    if(this.position.x < 0 || this.position.x > 400) { //if ball hits left or right bounds
      World.ballBeyond(this); //call function in World variable
    }
  }

}
class Boxes {
  constructor(xpos,ypos) {
    this.position = {x: this.x, y: this.y}; // x and y pos
    this.size = {w: 5, h: 5}; // width and height
  }

  update() {
    rect(0, 200, this.size.w, this.size.h); // draw rectangle
    rect(200, 200, this.size.w, this.size.h);
    World.boxBeyond(this); //call method in World
  }
}

var World = {
  bgcolor: [237, 119, 83],
  ballreset: 0,
  ballBeyond: function(whichBall) {
    this.bgcolor = [ Math.random()*255, Math.random()*255, 83 ];
    whichBall.position.x = 100;
    whichBall.velocity.x = (Math.random() - .5) * 20;
    this.ballreset = 1;
  },
  boxBeyond: function(whichBox) {
    if(this.ballreset == 1) {
      whichBox.size.w += 5; //change the width and height of the box
      whichBox.size.h += 5;
      this.ballreset = 0;
    }
    
  }
}

var ball = new Ball(); //create a new ball object
var b1 = new Boxes();
var b2 = new Boxes();



function setup() {
  createCanvas(400,300); // makes a 400x300 space that objects can be drawn to 
}

function draw() {
  background( World.bgcolor ); //change bg color
  ball.update(); //update ball position
  b1.update(); // update box sizes
  b2.update();
}