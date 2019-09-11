// Line Art Demo
// Therrill Strongarm
// September 9, 2019


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
}

function draw() {
  if (keyPressed(1))
  if (mouseIsPressed === true) {
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
}
