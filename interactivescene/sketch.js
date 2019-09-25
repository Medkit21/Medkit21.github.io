// Interactive Scene Project
// Therrill Strongarm
// September 11, 2019
//
// Tim helped me with classes Vector2 and Projectile(thanks Tim! :D)
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

  add(vector)
  {
    return new Vector2(this.x + vector.x, this.y + vector.y);
  }

  magnitude()
  {
    return Math.sqrt((this.x * this.x) + (this.y * this.y));
  }

  normalized()
  {
    let mag = this.magnitude();
    return new Vector2(this.x / mag, this.y / mag);
  }
  multiply(scale)
  {
    return new Vector2(this.x * scale, this.y * scale);
  }
}

class Projectile
{
  constructor(position, velocity, radius, fill)
  {
    this.position = position;
    this.velocity = velocity;
    this.radius = radius;
    this.fill = fill;
  }

  update() 
  {
    this.position = this.position.add(this.velocity);
    if (this.position.x > 0 && this.position.x < windowWidth && this.position.y > 0 && this.position.y < windowHeight) {
      this.render();
    }

    return (this.position.x < 0 || this.position.y < 0 || this.position.x > windowWidth || this.position.y > windowHeight);
  }

  render() 
  {
    fill(255,140,0);
    ellipse(this.position.x, this.position.y, this.radius * 2);
  }
}

class Enemy
{
  constructor(position, velocity, health, radius)
  {
    this.position = position;
    this.velocity = velocity;
    this.health = health;
    this.radius = radius;
    this.shootFrames = 0;
  }

  update()
  {
    this.position = this.position.add(this.velocity);
    
    this.render();

    this.shootFrames++;

		if (this.shootFrames > 200)
		{
			this.shootFrames = floor(random(0, 50));

			this.shoot();
    }
    if (this.position.x < 0 + this.radius)
		{
			this.velocity.x = Math.abs(this.velocity.x);
		}
		if (this.position.y < 0 + this.radius)
		{
			this.velocity.y = Math.abs(this.velocity.y);
		}
		if (this.position.x > windowWidth - this.radius)
		{
			this.velocity.x = -Math.abs(this.velocity.x);
		}
		if (this.position.y > windowHeight - this.radius)
		{
			this.velocity.y = -Math.abs(this.velocity.y);
		}

    //return (this.position.x < 0 || this.position.y < 0 || this.position.x > windowWidth || this.position.y > windowHeight);
  }

  shoot()
  {
    enemyProj.push(new Projectile(new Vector2(this.position.x,this.position.y), new Vector2(playerX-this.position.x,playerY-this.position.y).normalized().multiply(5), 10));
  }

  render()
  {
    fill(0, 255, 0);
    ellipse(this.position.x, this.position.y, this.radius * 2);
  }
}

let playerX;
let playerY;
let playerSize = 50;
let gameStarted;
let playerHealth;
let wave;

let proj = new Array();
let enemies = new Array();
let enemyProj = new Array();

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0, 200, 200);
  playerX = windowWidth/2;
  playerY = windowHeight/2;
  
}

// Displays the Title Screen
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

// Starts the game
function startGame() {
  playerX = windowWidth/2;
  playerY = windowHeight/2;

  wave = 0;
  playerHealth = 100;
  gameStarted = true;

  spawnWave();

  print("Game has started successfully");
}

// Displays the game itself
function drawGame() {
  background(200);

  for (let i = 0; i < proj.length; i++)
  {
    proj[i].update();
  }
  for (let i = 0; i < enemyProj.length; i++)
  {
    enemyProj[i].update();
  }
  for (let i = 0; i < enemies.length; i++)
  {
    enemies[i].update();
  }

  if (enemies.length <= wave * 2 + 2)
	{
		spawnWave();
  }
  
  playerMovement();
  
  fill(0, 0, 255);
  noStroke();
  ellipse(playerX, playerY, playerSize, playerSize);

}

// Draws the HUD
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
  text("Wave: " + wave, windowWidth/20 + 150, 20)
}

function draw() {
  if (gameStarted === true) {
    drawGame();
    drawHUD();
  }
  else {
    drawTitleScreen();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// The function for the player movement
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

// this function spawns the enemies
function spawnWave() {
  wave++;

  for (let i = 0; i < 7 + wave * random(1.5, 2.5); i++)
	{
    enemies.push(new Enemy(new Vector2(random(0, windowWidth), random(0, windowHeight)), new Vector2(random(0, windowWidth * 0.2), random(0, windowHeight * 0.2)).normalized().multiply(5), 10, 15));
  }
}

// Pressing M begins the game
function keyPressed() {
  if (keyCode === 77) { // m
    startGame();
  }
}

// Upon clicking the left mouse button it will create a projectile towards the mouse position
function mouseClicked() {
  proj.push(new Projectile(new Vector2(playerX,playerY), new Vector2(mouseX-playerX,mouseY-playerY).normalized().multiply(10), 10));
}
