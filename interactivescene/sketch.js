// Interactive Scene Project
// Therrill Strongarm
// September 11, 2019
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

class player {

}


let playerX;
let playerY;
let playerSize = 50;
let gameStarted;


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0, 200, 200);
  playerX = windowWidth/2;
  playerY = windowHeight/2;
}

function drawTitleScreen() {
  background(0, 200, 200);
  textSize(40);
  noStroke();
  fill(255);

  textAlign(CENTER);
  text("FIA Defender", windowWidth/2, 50);
  fill(255, 50, 50);
  text("FIA Defender", windowWidth/2 + 2, 52);
  fill(255);

  text("Oh no! The AAF are attacking your hideout!", windowWidth/2, 100);
  text("In order to save the FIA, You must stop them!", windowWidth/2, 150);
  text("Use WASD to move and click to shoot.", windowWidth/2, 200)

  text("Press M to begin/restart", windowWidth/2, windowHeight - windowHeight/20);

}

function startGame() {
  playerX = windowWidth/2;
  playerY = windowHeight/2;

  gameStarted = true;
}

function drawGame() {
  background(0, 200, 100);
  
  playerMovement();
  
  fill(0);
  noStroke();
  ellipse(playerX, playerY, playerSize, playerSize);
}

function draw() {
  if (gameStarted === true) {
    drawGame();
  }
  else {
    drawTitleScreen();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function playerMovement() {
  if (keyIsPressed) {
    if(keyIsDown(87)) { // w
      if (playerY > 0 + playerSize/2) {
        if (keyIsDown(68) || keyIsDown(65)) {
          playerY -= 4;
        }
        else {
          playerY -= 5;
        }
      }
    }
    if(keyIsDown(83)) { // s
      if (playerY < windowHeight - playerSize/2) {
        if (keyIsDown(68) || keyIsDown(65)) {
          playerY += 4;
        }
        else {
          playerY += 5;
        }
      }
    }
    if(keyIsDown(68)) { // d
      if (playerX < windowWidth - playerSize/2) {
        if (keyIsDown(87) || keyIsDown(83)) {
          playerX += 4;
        }
        else {
          playerX += 5;
        }
      }
    }
    if(keyIsDown(65)) { // a
      if (playerX > 0 + playerSize/2) {
        if (keyIsDown(87) || keyIsDown(83)) {
          playerX -= 4;
        }
        else {
          playerX -= 5;
        }
      }
    }
  }
}

function keyPressed() {
  if (keyCode === 77) { // m
    startGame();
    print("Your Mome");
  }
}