// Strategy Game Concept
// Therrill Strongarm
// September 11, 2019
//
// Extra for Experts:
// Classes
// World Generation
// Arrays
// Vector2 Implementation
// Perlin Noise
// Grids


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
  constructor(position, size, landType)
  {
    this.position = position;
    this.size = size;
    this.development;
    this.manpower;
    this.defence;
    this.attack;
    this.landType = landType;
  }
  update()
  {
    this.render();
  }
  render()
  {
    if (this.landType === "plains") {
      fill(0, 200, 0);
    }
    else if (this.landType === "forest") {
      fill(34,139,34);
    }
    else if (this.landType === "arid") {
      fill(210, 180, 140);
    }
    else if (this.landType === "jungle") {
      fill(0, 100, 0);
    }
    else if (this.landType === "wetlands") {
      fill(107,142,35);
    }
    else {
      fill(0, 0, 255);
    }
    rect(this.position.x + plusX, this.position. y, this.size, this.size);
  }
}

class Nation 
{
  constructor(name, isPuppet)
  {
    this.name = name;
    this.isPuppet = isPuppet;
    this.setGovernment;

    // Ideology Percentages
    this.democracy;
    this.natPop;
    this.syndicalism;
    this.monarchism

    if(this.isPuppet) 
    {
      this.ideologyAssignment(puppetMasterIdeology);
    }
    else
    {
      this.ideologyAssignment("rand");
    }
  }
  ideologyAssignment(newIdeology) // This will only ever be called once at the beginning or the formation of new Nations
  {
    this.
    this.newIdeology = newIdeology;
    if (newIdeology === "rand") {
      this.ideology = floor(random(1, 101));
      if (this.ideology <= 25) {
        this.setGovernment = "democracy";
        this.democracy = (floor(random(50, 61)));
      }
    }
  }
}

class Division
{
  constructor(hp)
  {
    this.hp = hp;
  }
  update()
  {
    this.render();
  }
  render()
  {
    // Nothing here yet!
  }
}

let sectors;
let plusX;
let cellSize;
let currentSector;

let gameStarted;
let menuScreen = "main";
let generationType = "";

// Symbols
let nationalFocus;

function preload() {
  nationalFocus = loadImage("assets/nationalFocus.png");
}

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

  gameStarted = true;
  generationType = "normal"
  startGame();
}


function draw() {
  drawGUI();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0, 200, 200);
  loadSectors();
}

// Draws the GUI
function drawGUI() {
  // Left side of the GUI
  fill(0, 200, 200);
  noStroke();
  rect(0, 0, plusX - 1, windowHeight)
  stroke(1);
  fill(0);
  textSize(20);
  textAlign(LEFT);
  fill(105,105,105);
  rect(width - 355, 25, 325, 75);
  imageMode(LEFT);
  image(nationalFocus, width - 350, 35, 50, 50)
  fill(255);
  text("NO NATIONAL", width - 280, 60);
  text("FOCUS SELECTED", width - 280, 80);
}

// Loads the Sectors on the Screen
function loadSectors() {
  for (let x = 0; x < 50; x++) {
    for (let y = 0; y < 50; y++) {
      sectors[x][y].update();
    }
  }
}


// Generates the World
function generateWorld() {
  let xoffset = random(-1000, 1000);
  let yoffset = random(-1000, 1000);
  if (width >= height) {
    cellSize = height/50;
  }
  else if (height > width) {
    cellSize = width/50;
  }
  plusX = cellSize * 25;
  for (let x = 0; x < 50; x++) {
    for (let y = 0; y < 50; y++) {
      let sectorVal = noise(x / 7 + xoffset, y / 7 + yoffset);
      let sectorType;
      if (sectorVal < 0.45)
      {
        sectorType = 'forest';
      }
      else if (sectorVal < 0.6)
      {
        sectorType = 'plains';
      }
      else if (sectorVal < 0.65)
      {
        sectorType = 'arid';
      }
      else
      {
        sectorType = 'water';
      }
      sectors[x][y] = new Sector(new Vector2(x * cellSize, y * cellSize), cellSize, sectorType, random());
    }
  }
}

function startGame () {
  sectors = getTwoDArray(50, 50);
  generateWorld();

  background(0, 200, 200);
  loadSectors();

  gameStarted = true;
}

function mousePressed() {
  if (gameStarted) {
    let x = floor((mouseX - plusX) / cellSize);
    let y = floor(mouseY / cellSize);
    print("x: " + x + " y: " + y);

    if (x >= 0 && y >= 0 && x < 50 && y <50) {
      currentSector = sectors[x][y];
      if (sectors[x][y].landType === "plains") {
        print("This is a plains sector");
      }
      else if (sectors[x][y].landType === "forest") {
        print("This is a forest sector");
      }
      else if (sectors[x][y].landType === "arid") {
        print("This is a beach sector");
      }
      else if (sectors[x][y].landType === "jungle") {
        print("This is a jungle sector");
      }
      else if (sectors[x][y].landType === "wetlands") {
        print("This is a wetlands sector");
      }
      else {
        print("this is not land");
      }
    }
  }
}
