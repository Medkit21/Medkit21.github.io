// Interactive Scene Project
// Therrill Strongarm
// September 11, 2019
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

class Vector2
{
  constructor(x, y)
  {
    this.x = x;
    this.y = y;
  }

  magnitude()
  {
    return Math.sqrt((this.x * this.x) + (this.y * this.y));
  }

  normalize()
  {
    let mag = this.magnitude();

    this.x /= mag;
    this.y /= mag;
  }
}

class Projectile
{
  constructor(x, y)
  {

  }
}


let playerX;
let playerY;
let playerSize = 50;
let gameStarted;
let playerHealth;
let wave;

let bulletX;
let bulletY;

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

  wave = 1;
  playerHealth = 100;
  gameStarted = true;
}

function drawGame() {
  background(200);
  
  playerMovement();
  
  fill(0);
  noStroke();
  ellipse(playerX, playerY, playerSize, playerSize);
}

function drawHUD() {
  textSize(20);
  if (playerHealth >= 70) {
    fill(0);
    text("Player Health: ", windowWidth/20, 20)
    fill(0, 200, 0);
    text(playerHealth, windowWidth/20 + 80, 20)
  }
  if (playerHealth < 70 && playerHealth >= 30) {
    fill(0);
    text("Player Health: ", windowWidth/20, 20)
    fill(255,69,0);
    text(playerHealth, windowWidth/20 + 80, 20)
  }
  if (playerHealth < 30) {
    fill(0);
    text("Player Health: ", windowWidth/15, 20)
    fill(255, 0, 0);
    text(playerHealth, windowWidth/20 + 80, 20)
  }
  fill(0);
  text("Wave: " + wave, windowWidth/20 + 140, 20)
}

function draw() {
  if (gameStarted === true) {
    drawGame();
    fireGun();
    drawHUD();
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

function fireGun() {
  ellipse(bulletX, bulletY, 20, 20);
  console.log(bulletX, bulletY);
  if (bulletY <= height) {
    bulletY -= 5;
  }
}

function mouseClicked() {
  bulletX = playerX;
  bulletY = playerY;
}
