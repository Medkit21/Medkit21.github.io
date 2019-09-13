let civilian;
let scalar = 1;

function preload() {
  civilian = loadImage('assets/civilian.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);

  if (keyIsPressed) {
    if (keyCode === UP_ARROW) {
      scalar *= 1.02;
    }
    else if (keyCode === DOWN_ARROW) {
      scalar /= 1.02;
    }
  }
  imageMode(CENTER);
  image(civilian, mouseX, mouseY, civilian.width * scalar, civilian.height * scalar);
}