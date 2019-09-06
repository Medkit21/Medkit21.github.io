// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let redAmount = 0;
let redChangeAmount = 1;
let greenAmount = 100;
let greenChangeAmount = 1;
let blueAmount = 200;
let blueChangeAmount = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0, 0, 0);
}

function draw() {
  fill(redAmount, greenAmount, blueAmount);
  noStroke()
  if (mouseIsPressed()) {
    ellipse(mouseX, mouseY, 100, 100);
  }

  redAmount += redChangeAmount;

  if (redAmount >= 255) {
    redChangeAmount *= -1;
  }
  if (redAmount <= 0) {
    redChangeAmount *= -1;
  }
  if (greenAmount >= 255) {
    greenChangeAmount *= -1;
  }
  if (greenAmount <= 0) {
    greenChangeAmount *= -1;
  }
  if (blueAmount >= 255) {
    blueChangeAmount *= -1;
  }
  if (blueAmount <= 0) {
    blueChangeAmount *= -1;
  }
}
