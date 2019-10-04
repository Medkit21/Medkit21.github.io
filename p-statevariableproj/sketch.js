// Overthrow(State Variable Project)
// Therrill Strongarm
// September 11, 2019
//
// Extra for Experts:
// Classes


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

class Sector // Template for a Sector
{
  constructor(position, size, development, manpower, defence, attack, landType)
  {
    this.position = position;
    this.size = size;
    this.development = development;
    this.manpower = manpower;
    this.defence = defence;
    this.attack = attack;
    this.landType = landType;
  }
  update()
  {
    this.render();
  }
  render()
  {
    if (this.landType === "land") {
      fill(0, 255, 0);
    }
    if (this.landType === "arid") {
      fill(210, 180, 140);
    }
    else {
      fill(0, 0, 255);
    }
    rect(this.position.x + plusX, this.position. y, this.size, this.size);
  }
}

let sectors;
let plusX;
let cellSize;
let selectedSector = "";
let sectorColor = 0;

function getTwoDArray(x, y)
{
  let arr = new Array(x);
  for (let i = 0; i < x; i++)
  {
    arr[i] = new Array(y);
  }
  return arr;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0, 200, 200);
  sectors = getTwoDArray(50, 50);

  generateWorld();
}


function draw() {
  background(0, 200, 200);
  loadSectors();
  drawGUI();
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function drawGUI() {
  fill(0);
  textSize(20);
  textAlign(LEFT);
  text("SELECTED SECTOR", width/20, height/20);
  fill(sectorColor);
  rect(width/20 + 40, height/20 + 30, 100, 100);
  fill(0);
  textAlign(CENTER);
  text(selectedSector, width/20 + 90, height/20 + 160);
}

function loadSectors() {
  for (let x = 0; x < 50; x++) {
    for (let y = 0; y < 50; y++) {
      sectors[x][y].update();
    }
  }
}

function generateWorld() {
  if (width >= height) {
    cellSize = height/50;
  }
  else if (height > width) {
    cellSize = width/50;
  }
  plusX = cellSize * 25;
  for (let x = 0; x < 50; x++) {
    for (let y = 0; y < 50; y++) {
      sectorType = floor(random(1, 4));
      console.log(sectorType);
      if (sectorType === 1)
      {
        sectors[x][y] = new Sector(new Vector2(x * cellSize, y * cellSize), cellSize, 10, 10, 10, 10, "land");
      }
      else if (sectorType === 2) {
        sectors[x][y] = new Sector(new Vector2(x * cellSize, y * cellSize), cellSize, 10, 10, 10, 10, "arid");
      }
      else
      {
        sectors[x][y] = new Sector(new Vector2(x * cellSize, y * cellSize), cellSize, 10, 10, 10, 10, "water");
      }
    }
  }
}


function mousePressed() {
  let x = floor((mouseX - plusX) / cellSize);
  let y = floor(mouseY / cellSize);
  print("x: " + x + " y: " + y);

  if (sectors[x][y].landType === "land") {
    print("This is a land sector");
    selectedSector = "Land Sector";
    sectorColor = [0, 255, 0];
  }
  else if (sectors[x][y].landType === "arid") {
    print("This is a arid sector");
    selectedSector = "Arid Sector";
    sectorColor = [210, 180, 140];
  }
  else {
    print("this is not land");
    selectedSector = "Water Sector";
    sectorColor = [0, 0, 255];
  }
}