// Interactive Scene Project
// Therrill Strongarm
// September 11, 2019
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0, 0, 0);
}

function draw() {
  fill(redAmount, greenAmount, blueAmount);
  noStroke();
  if (mouseIsPressed === true){
    ellipse(mouseX, mouseY, 50, 50);
  }
}
