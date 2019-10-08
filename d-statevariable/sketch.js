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
let state = "menu";

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width/2;
  y = height/2;
  dx = random(-15, 15);
  dy = random(-15, 15);
}


function draw() {
  background(255);

  if (state === "menu") {
    showMenu();
    checkIfButtonClicked();
  }
  else if (state === "circle") {
    displayCircle();
    moveShape();
  }
  else if (state === "rectangle") {
    displayRectangle();
    moveShape();
  }
}

function showMenu() {
  // Show rectangle button
  rectMode(CENTER);
  fill(200, 0, 0);
  rect(windowWidth/2, windowHeight/2 - 100, 400, 150);
  textAlign(CENTER);
  textSize(50);
  fill(0);
  text("Rectangle", windowWidth/2, windowHeight/2 - 90)

  // Show Circle button
  rectMode(CENTER);
  fill(200, 0, 0);
  rect(windowWidth/2, windowHeight/2 + 100, 400, 150);
  textAlign(CENTER);
  textSize(50);
  fill(0);
  text("Circle", windowWidth/2, windowHeight/2 + 110)
}

function checkIfButtonClicked() {
  if (mouseIsPressed) {
    // Check for Rectangle Button
    if (mouseX > width/2 - 200 && mouseX < width/2 + 200 && mouseY > height/2 - 100 - 75 && mouseY < height/2 - 100 + 75) {
      state = "rectangle";
    }
    // Check for Circle Button
    if (mouseX > width/2 - 200 && mouseX < width/2 + 200 && mouseY > height/2 + 100 - 75 && mouseY < height/2 + 100  + 75) {
      state = "circle";
    }
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
  if (x > width - rectSize/2 || x < 0) {
    dx *= -1;
  }
  if (y > height - rectSize/2 || y < 0) {
    dy *= -1;
  }

  fill(0);
  rect(x, y, rectSize, rectSize);
}