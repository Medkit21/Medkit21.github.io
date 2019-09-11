// Line Art Demo
// Therrill Strongarm
// September 9, 2019


let shape = "line";
let shapeSize = 50;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);
  fill(0);
}

function draw() {
  let horizontalSpeed = abs(mouseX - pmouseX);
  if (horizontalSpeed > 40) {
    horizontalSpeed = 40;
  }
  strokeWeight(horizontalSpeed);
  if (mouseIsPressed === true) {
    if (key === "r") {
      rect(mouseX, mouseY, shapeSize, shapeSize);
    }
    else if (key === "e") {
      ellipse(mouseX, mouseY, shapeSize, shapeSize);
    }
    else {
      line(mouseX, mouseY, pmouseX, pmouseY);
    }
  }
}

function keyTyped() {
  if (key === "w") {
    background(255);
    stroke(0);
    fill(0);
  }
  else if (key === "b") {
    background(0);
    stroke(255);
    fill(255);
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    shapeSize += 5;
  }
  else if (keyCode === DOWN_ARROW) {
    shapeSize -= 5;
  }
}