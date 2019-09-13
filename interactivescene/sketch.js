// Interactive Scene Project
// Therrill Strongarm
// September 11, 2019
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0, 100, 200);
  fill(200);
  rect(0, 0, windowWidth, windowHeight / 8);
}

function draw() {
  fill(0);
  noStroke();
  if (mouseIsPressed === true){
    ellipse(mouseX, mouseY, 50, 50)
  }
}
