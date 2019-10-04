// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let x;
let y;
let dx;
let dy;
let radius = 100;
let rectSize = 100;
let mode = "circle";

function preload() {

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width/2;
  y = height/2;
  dx = random(-15, 15);
  dy = random(-15, 15);
}


function draw() {
  background(255);

  moveShape();

  if (mode === "circle") {
    displayCircle();
  }
  if (mode === "rectangle") {
    displayRectangle();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function moveShape() {
  x += dx;
  y += dy;
}

function displayCircle() {
  //bounce if needed
  if (x > width - radius/2 || x < 0 + radius/2) {
    dx *= -1;
  }
  if (y > height - radius/2 || y < 0 + radius/2) {
    dy *= -1;
  }
  fill(0);
  ellipse(x, y, radius, radius)
}

function displayRectangle() {
  //bounce if needed
  if (x > width - rectSize || x < 0) {
    dx *= -1;
  }
  if (y > height - rectSize || y < 0) {
    dy *= -1;
  }
  fill(0);
  rect(x, y, rectSize, rectSize);
}