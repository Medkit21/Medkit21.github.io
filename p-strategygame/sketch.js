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
    this.infrastructure;
    this.defense;
    this.manpower;
    this.buildLimit;

    // Defense Buildables
    this.landForts; // Land Forts (0 - 10) | These increase a Sector's Defense against land units(infantry, tanks, etc.)
    this.waterForts; // Water Forts/Coastal Forts (0 - 5) | These increase a Sector's Defense against Naval Invasions.
    this.antiAir; // Anti Air Guns(AA Guns) (0 - 5) | These increase your Air Superiority and decreases your enemy's (It also destroys enemy aircraft.)
    this.airbases; // Airbases/Airports (0 - 6) | Where planes are stored and deployed from.
    this.navalPorts; // Naval Ports (0 = 6) | Where Naval Units are stored and deployed from.
    this.navalDockyard; // Naval Dockyards (0 - Build Limit) | These are used to build Naval Units(Submarines, Convoys, Destroyers, Carriers, etc.)
    this.civFactories; // Civilian Factories (0 - Build Limit) | These are used to build buildings and manage trades. (Military Factories, Land Forts, etc.)
    this.milFactories; // Military Factories (0 - Build Limit) | These are used to produce equipment(Guns, Vehicles, Tanks, Artillery, Planes, etc.).

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
    this.puppetMasterIdeology;

    // Ideology Percentages
    this.democracy;
    this.natPop;
    this.syndicalism;
    this.monarchism;

    // Nation Stats
    this.politicalPower; // Politcal Power is used for decisions and national focuses
    this.stability;
    this.warSupport; // How much the population supports the war | Higher war support will generate higher manpower
    this.manpower; // Displays how much of the population is recruitable
    this.numOfFactories; // Displays the number of total factories you control
    this.fuel; // Displays how much fuel you have

    // Nation Resources
    this.ideology; // Converted into Fuel for the Nation
    this.aluminum; // Used for Aircraft and Support Equipment
    this.rubber; // Used for Aircraft, Motorized and Mechanized Vehicles, and Artillery
    this.tungsten; // Used for Artillery, Medium Tanks, Light and Medium SP Artillery, Tank Destroyers, Medium SP Anti-Air and Jet Aircraft
    this.steel; // Used for Infantry Weapons and Support Equipment, Artillery, Anti-air, Anti-tank, Ships, Tanks and Motorized/Mechanized Vehicles
    this.chromium; // Used for Heavy and Super Heavy Tanks, Large Ships and Level 4 Small Ships

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
    this.newIdeology = newIdeology;
    if (newIdeology === "rand") {
      this.ideology = floor(random(1, 101));
      if (this.ideology <= 25) {
        this.setGovernment = "democracy";
        this.democracy = floor(random(50, 61));
        this.natPop = floor(random(0 - this.democracy));
        this.syndicalism = floor(random(0 - this.natPop));
        this.monarchism = floor(random(this.syndicalism - 1));
      }
      else if (this.ideology <= 50) {
        this.setGovernment = "natpop";
        this.natPop = floor(random(50, 61));
        this.democracy = floor(random(0 - this.natPop));
        this.syndicalism = floor(random(0 - this.democracy));
        this.monarchism = floor(random(this.syndicalism - 1));
      }
      else if (this.ideology <= 75) {
        this.setGovernment = "syndicalism";
        this.syndicalism = floor(random(50, 61));
        this.democracy = floor(random(0 - this.syndicalism));
        this.natPop = floor(random(0 - this.democracy));
        this.monarchism = floor(random(this.natPop - 1));
      }
      else {
        this.setGovernment = "monarchism";
        this.monarchism = floor(random(50, 61));
        this.democracy = floor(random(0 - this.monarchism));
        this.natPop = floor(random(0 - this.democracy));
        this.syndicalism = floor(random(this.natPop - 1));
      }
    }
  }
  update()
  {
    this.render();
  }
  render()
  {

  }
}

class Division // Land Units (Infantry, Cavalry, Tanks, etc)
{
  constructor(mp)
  {
    this.mp = mp;
    this.organization;
    this.attack;
    this.def;
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

class General // Generals
{
  constructor(lvl, attack, defense, strategy, supply, isFieldMarshal)
  {
    this.lvl = lvl; // Their Level overall (0-10)
    this.attack = attack; // Their Attack Level (0-5)
    this.defense = defense; // Their Defense Level (0-5)
    this.strategy = strategy; // Their Strategy (0-5)
    this.supply = supply; // Their Fuel Management (0-5)
    this.isFieldMarshal = isFieldMarshal; // Determines whether it's a Field Marshal or a General
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

class Aircraft // Air Units (Fighters, Bombers, CAS, Naval Bombers, Transports, etc)
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

class Navalcraft // Naval Units (U-Boats, Submarines, Destroyers, Cruisers, Convoys, etc)
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
      else {
        print("this is not land");
      }
    }
  }
}
