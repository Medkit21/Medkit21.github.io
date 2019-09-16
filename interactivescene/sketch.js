// Interactive Scene Project
// Therrill Strongarm
// September 11, 2019
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let playerX;
let playerY;
let playerSize = 50;
let gameStarted = false;
let value = 200;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0, 200, 200);
  playerX = windowWidth/2;
  playerY = windowHeight/2;
}

function draw() {
  fill(value);
  rect((width/2)-50, (height/2)+200, 100, 50);

  if (gameStarted === true) {
    background(0, 100, 200);
  
    playerMovement();
    
    fill(0);
    noStroke();
    ellipse(playerX, playerY, playerSize, playerSize);
  }
}

function mouseClicked() {
  if(value === 200) {
    gameStarted = true;
  }
}

function playerMovement() {
  if (keyIsPressed) {
    if(keyIsDown(87)) { // w
      if (playerY > 0 + playerSize/2) {
        playerY -= 5;
      }
    }
    if(keyIsDown(83)) { // s
      if (playerY < windowHeight - playerSize/2) {
        playerY += 5;
      }
    }
    if(keyIsDown(68)) { // d
      if (playerX !== windowWidth - playerSize/2) {
        playerX += 5;
      }
    }
    if(keyIsDown(65)) { // a
      if (playerX !== 0 + playerSize/2) {
        playerX -= 5;
      }
    }
  }
}


