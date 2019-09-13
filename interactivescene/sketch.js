// Interactive Scene Project
// Therrill Strongarm
// September 11, 2019
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let playerX;
let playerY;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0, 100, 200);
  playerX = windowWidth/2;
  playerY = windowHeight/2;
}

function draw() {
  background(0, 100, 200);

  if (keyIsPressed) {
    if(keyIsDown(87)) {
      if (playerY !== 0 && playerY !== windowHeight) {
        playerY -= 5;
      }
    }
    if(keyIsDown(83)) {
      if (playerY !== 0 && playerY !== windowHeight) {
        playerY += 5;
      }
    }
    if(keyIsDown(68)) {
      if (playerX !== windowWidth) {
        playerX += 5;
      }
    }
    if(keyIsDown(65)) {
      if (playerX !== 0) {
        playerX -= 5;
      }
    }
  }

  fill(0);
  noStroke();
  ellipse(playerX, playerY, 50, 50);
}


