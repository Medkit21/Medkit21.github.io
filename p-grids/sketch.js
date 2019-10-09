// Overthrow(Grid Assignment)
// Therrill Strongarm
// September 11, 2019
//
// Extra for Experts:
// Classes
// World Generation
// Arrays
// Vector2 Implementation
// Perlin Noise


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
  constructor(position, size, landType, villageChance)
  {
    this.position = position;
    this.size = size;
    this.development;
    this.manpower;
    this.defence;
    this.attack;
    this.landType = landType;
    // Determines the chance of a village spawning based on the Sector Type
    if (this.landType == 'water')
    {
      villageChance = 1; 
    }
    else if (this.landType == 'arid')
    {
    villageChance *= 3;
    }
    else if (this.landType == 'plains')
    {
    villageChance *= 2;
    }
    else if (this.landType == 'forest')
    {
    villageChance *= 2;
    }
    else if (this.landType == 'jungle')
    {
    villageChance *= 5;
    }
    this.isVillage = villageChance < villageRate;

    // If there is a village grab the names of the village/town based on the world generation type
    if (this.isVillage)
    {
      if (generationType === "normal")
      {
        this.villageName = mediterraneanVillageNames[floor(random(0, mediterraneanVillageNames.length))];
      }
      else if (generationType === "arid")
      {
        this.villageName = aridVillageNames[floor(random(0, aridVillageNames.length))];
      }
      else if (generationType === "jungle")
      {
        this.villageName = jungleVillageNames[floor(random(0, jungleVillageNames.length))];
      }
    }
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

    if(this.isVillage)
    {
      fill(200, 80, 10);
      triangle(this.position.x + plusX, this.position.y + this.size,
        this.position.x + plusX + this.size, this.position.y + this.size,
        this.position.x + plusX + this.size/2, this.position.y)
    }
  }
}

class Units {
  constructor(hp, atk, def)
  {
    this.hp = hp;
    this.atk = atk;
    this.def = def;
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
let selectedSector = "";
let currentSector;
let sectorColor = 0;

// Factions
let BLUFOR; // Factions such as NATO, CTRG, Gendarmerie, CDF, BAF, ACR, etc.
let GREENFOR; // Factions such as AAF, FIA, Syndikat, LDF, ION PMC,  etc.
let INDEP1; // AI Factions that might spawn mid-game. Factions such as IDAP, ION, Cartels, NAPA, etc.
let INDEP2; // AI Factions that might spawn mid game. Factions such as Zealots, Traders, Smugglers, Pirates, etc.
let OPFOR; // Factions such as CSAT, AFRF, ChDkZ, TKM, TKA, TRF, etc.

// Player Resources
let money; // Money... what more needs to be said?
let cp; // Control Points
let mp; // Manpower

// BLUFOR Reputation
let bluforRep; // Civilian Reputation of BLUFOR
let bluforIndepRep1; // Independant Group 1's reputation of BLUFOR
let bluforIndepRep2; // Independant Group 2's reputation of BLUFOR
// GREENFOR Reputation
let greenforRep; // Civilian Reputation of GREENFOR
let greenforIndepRep1; // Independant Group 1's reputation of GREENFOR
let greenforIndepRep2; // Independant Group 2's reputation of GREENFOR
// OPFOR Reputation
let opforRep; // Civilian Reputation of OPFOR
let opforIndepRep1; // Independant Group 1's reputation of OPFOR
let opforIndepRep2; // Independant Group 2's reputation of OPFOR

const villageRate = 0.1;

// Town names based on the World Generation Type
const mediterraneanVillageNames = ['Kavala', 'Pyrgos', 'Athanos', 'Aggelochori', 'Neri','Kostas', 'Agios Dionysis', 'Kore', 'Galati', 'Syrta', 'Abdera', 'Oreokastro', 'Negades', 
'Agios Konstantinos', 'Frini', 'Infestiona', 'Athira', 'Anthrakia', 'Charkra', 'Tilos'];
const aridVillageNames = ['Pazagbasi', 'Durocalar', 'Tabashahr', 'Kashavand', 'Tel Kemaniyah', 'Muqdatha', 'Safabin', 'Aswaria'];
const jungleVillageNames = ['Nam', 'Katkoula', 'Savaka', 'Lailai', 'Cerebu', 'Laikoro', 'Namuvaka', 'Balavu', 'Tavu', 'Muaceba', 'Sosovu', 'Nani', 'Tuvanaka', 'Belfort',
'Georgetown', 'Rasputin', 'Saint-Julien', 'Nicolet', 'Savu', 'La Rochelle', 'Tanouka', 'Kawacatoose']
const westernVillageNames = ['Obamaville', 'Timsville', 'Schellenburg', 'Kuffnersville'];

let gameStarted;
let menuScreen = "main";
let generationType = "";
let selectedFaction = "";

// Backdrop Image Variables
let bArid1, bArid2, bArid3, bArid4, bArid5;
let bJungle1, bJungle2, bJungle3, bJungle4, bJungle5;
let bMediterranean1, bMediterranean2, bMediterranean3, bMediterranean4, bMediterranean5;

function preload() {
  // Preloading Backdrop Images
  bArid1 = loadImage("assets/backdrops/arid1.png");
  bArid2 = loadImage("assets/backdrops/arid2.png");
  bArid3 = loadImage("assets/backdrops/arid3.png");
  bArid4 = loadImage("assets/backdrops/arid4.png");
  bArid5 = loadImage("assets/backdrops/arid5.png");
  bJungle1 = loadImage("assets/backdrops/jungle1.png");
  bJungle2 = loadImage("assets/backdrops/jungle2.png");
  bJungle3 = loadImage("assets/backdrops/jungle3.png");
  bJungle4 = loadImage("assets/backdrops/jungle4.png");
  bJungle5 = loadImage("assets/backdrops/jungle5.png");
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
  randomBackdrop();

  gameStarted = false;
}


function draw() {
  if (gameStarted) {
    drawGUI();
  }
  else {
    drawTitle();
  }
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
  text("SELECTED SECTOR", width/20, height/20);
  fill(sectorColor);
  rectMode(CORNER);
  rect(width/20 + 40, height/20 + 30, 100, 100);
  fill(0);
  textAlign(CENTER);
  text(selectedSector, width/20 + 90, height/20 + 160);
  if (currentSector != undefined && currentSector.isVillage) {
    text("Town: " + currentSector.villageName, width/20 + 90, height/20 + 200);
  }
  // Right Side of the GUI
  fill(0, 150, 150);
  rectMode(CENTER);
  rect(width - 200, 100, 300, 70);
  fill(255);
  text("Click on the grids/sectors", width - 200, 100);
  fill(100, 0, 0);
  rectMode(CORNER);
  rect(width - 300, height - 70, 200, 50);
  fill(255);
  text("Regenerate World", width - 200, height - 40);
  fill(0);
}

// Draws the Title Screen
function drawTitle() {
  // Main Menu Screen(Opening Screen)
  if (menuScreen === "main") {
    textAlign(CENTER);
    textSize(50);
    fill(255);
    text("Overthrow", width/2, height/15);
  
    rectMode(CENTER);
    fill(150, 0, 0);
    rect(windowWidth/2, windowHeight/2 - 100, 400, 150);
    textAlign(CENTER);
    textSize(50);
    fill(0);
    text("Start Game", windowWidth/2, windowHeight/2 - 90)
    rectMode(CORNER);
  }
  // Menu Screen for the World Generation
  if (menuScreen === "worldgen") {
    textAlign(CENTER);
    textSize(50);
    fill(255);
    text("World Generation Type", width/2, height/15);
  
    rectMode(CENTER);
    fill(150, 0, 0);
    rect(windowWidth/2 - 500, windowHeight/2, 400, 150);
    textAlign(CENTER);
    textSize(50);
    fill(0);
    text("Mediterranean", windowWidth/2 - 500, windowHeight/2 + 10)
    rectMode(CORNER);

    rectMode(CENTER);
    fill(150, 0, 0);
    rect(windowWidth/2, windowHeight/2, 400, 150);
    textAlign(CENTER);
    textSize(50);
    fill(0);
    text("Arid", windowWidth/2, windowHeight/2 + 10)
    rectMode(CORNER);
    
    rectMode(CENTER);
    fill(150, 0, 0);
    rect(windowWidth/2 + 500, windowHeight/2, 400, 150);
    textAlign(CENTER);
    textSize(50);
    fill(0);
    text("Jungle", windowWidth/2 + 500, windowHeight/2 + 10)
    rectMode(CORNER);
  }
  if (menuScreen === "sideselection") {
    textAlign(CENTER);
    textSize(50);
    fill(255);
    text("Select Side", width/2, height/15);
  
    rectMode(CENTER);
    fill(0, 0, 150);
    rect(windowWidth/2 - 500, windowHeight/2, 400, 150);
    textAlign(CENTER);
    textSize(50);
    fill(0);
    text("BLUFOR", windowWidth/2 - 500, windowHeight/2 + 10)
    rectMode(CORNER);

    rectMode(CENTER);
    fill(0, 150, 0);
    rect(windowWidth/2, windowHeight/2, 400, 150);
    textAlign(CENTER);
    textSize(50);
    fill(0);
    text("INDEP", windowWidth/2, windowHeight/2 + 10)
    rectMode(CORNER);
    
    rectMode(CENTER);
    fill(150, 0, 0);
    rect(windowWidth/2 + 500, windowHeight/2, 400, 150);
    textAlign(CENTER);
    textSize(50);
    fill(0);
    text("OPFOR", windowWidth/2 + 500, windowHeight/2 + 10)
    rectMode(CORNER);
  }
  if (menuScreen === "factionSelection") {
    factionAssignment();
  }
}

// Chooses a Random Backdrop
function randomBackdrop()
{
  bDrop = floor(random(1, 11));
  if (bDrop === 1) {
    image(bArid1, 0, 0, width, height);
  }
  else if (bDrop === 2) {
    image(bArid2, 0, 0, width, height);
  }
  else if (bDrop === 3) {
    image(bArid3, 0, 0, width, height);
  }
  else if (bDrop === 4) {
    image(bArid4, 0, 0, width, height);
  }
  else if (bDrop === 5) {
    image(bArid5, 0, 0, width, height);
  }
  else if (bDrop === 6) {
    image(bJungle1, 0, 0, width, height);
  }
  else if (bDrop === 7) {
    image(bJungle2, 0, 0, width, height);
  }
  else if (bDrop === 8) {
    image(bJungle5, 0, 0, width, height);
  }
  else if (bDrop === 9) {
    image(bJungle4, 0, 0, width, height);
  }
  else {
    image(bJungle5, 0, 0, width, height);
  }
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

      // if (y < 10)
      // {
      //   sectorVal += (10 - y) / 30;
      // }

      // Mediterranean Generation
      if (generationType === "normal") {
        if (sectorVal < 0.2)
        {
          sectorType = 'jungle';
        }
        else if (sectorVal < 0.4)
        {
          sectorType = 'forest';
        }
        else if (sectorVal < 0.5)
        {
          sectorType = 'plains';
        }
        else if (sectorVal < 0.58)
        {
          sectorType = 'arid';
        }
        else
        {
          sectorType = 'water';
        }
      }
      // Arid/Desert Generation
      if (generationType === "arid") {
        if (sectorVal < 0.2)
        {
          sectorType = 'forest';
        }
        else if (sectorVal < 0.25)
        {
          sectorType = 'plains';
        }
        else if (sectorVal < 0.65)
        {
          sectorType = 'arid';
        }
        else if (sectorVal < 0.7)
        {
          sectorType = 'wetlands';
        }
        else
        {
          sectorType = 'water';
        }
      }
      // Jungle Generation
      if (generationType === "jungle") {
        if (sectorVal < 0.4)
        {
          sectorType = 'jungle';
        }
        else if (sectorVal < 0.5)
        {
          sectorType = 'forest';
        }
        else if (sectorVal < 0.60)
        {
          sectorType = 'wetlands';
        }
        else if (sectorVal < 0.62)
        {
          sectorType = 'arid';
        }
        else
        {
          sectorType = 'water';
        }
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
        selectedSector = "Plains Sector";
        sectorColor = [0,200,0];
      }
      else if (sectors[x][y].landType === "forest") {
        print("This is a forest sector");
        selectedSector = "Forest Sector";
        sectorColor = [34,139,34];
      }
      else if (sectors[x][y].landType === "arid") {
        print("This is a arid sector");
        selectedSector = "Arid Sector";
        sectorColor = [210, 180, 140];
      }
      else if (sectors[x][y].landType === "jungle") {
        print("This is a jungle sector");
        selectedSector = "Jungle Sector";
        sectorColor = [0, 100, 0];
      }
      else if (sectors[x][y].landType === "wetlands") {
        print("This is a wetlands sector");
        selectedSector = "Wetlands Sector";
        sectorColor = [107,142,35];
      }
      else {
        print("this is not land");
        selectedSector = "Water Sector";
        sectorColor = [0, 0, 255];
      }
    }

    else if (mouseIsPressed) {
      if (mouseX > width - 300 && mouseX < width - 100 && mouseY > height - 70 && mouseY < height - 20) {
        gameStarted = false;
        randomBackdrop();
      }
    }
  }
  else {
    if (menuScreen === "main") {
      // Start Game Button
      if (mouseIsPressed) {
        if (mouseX > width/2 - 200 && mouseX < width/2 + 200 && mouseY > height/2 - 100 - 75 && mouseY < height/2 - 100 + 75) {
          menuScreen = "worldgen";
          randomBackdrop();
        }
      }
    }
    else if (menuScreen === "worldgen") {
      // Mediterranean Button
      if (mouseIsPressed) {
        if (mouseX > width/2 - 500 - 200 && mouseX < width/2 - 500 + 200 && mouseY > height/2- 75 && mouseY < height/2 + 75) {
          generationType = "normal"
          menuScreen = "sideselection";
          randomBackdrop();
        }
      }
      // Arid Button
       if (mouseIsPressed) {
        if (mouseX > width/2 - 200 && mouseX < width/2 + 200 && mouseY > height/2- 75 && mouseY < height/2 + 75) {
          generationType = "arid";
          menuScreen = "sideselection";
          randomBackdrop();
        }
      }
      // Jungle Button
       if (mouseIsPressed) {
        if (mouseX > width/2 + 500 - 200 && mouseX < width/2 + 500 + 200 && mouseY > height/2- 75 && mouseY < height/2 + 75) {
          generationType = "jungle";
          menuScreen = "sideselection";
          randomBackdrop();
        }
      }
    }
    else if (menuScreen === "sideselection"){
            // BLUFOR Button
            if (mouseIsPressed) {
              if (mouseX > width/2 - 500 - 200 && mouseX < width/2 - 500 + 200 && mouseY > height/2- 75 && mouseY < height/2 + 75) {
                startGame();
              }
            }
            // INDEP Button
             if (mouseIsPressed) {
              if (mouseX > width/2 - 200 && mouseX < width/2 + 200 && mouseY > height/2- 75 && mouseY < height/2 + 75) {
                startGame();
              }
            }
            // OPFOR Button
             if (mouseIsPressed) {
              if (mouseX > width/2 + 500 - 200 && mouseX < width/2 + 500 + 200 && mouseY > height/2- 75 && mouseY < height/2 + 75) {
                startGame();
              }
            }
    }
    else if (menuScreen === "factionselection") {
      factionAssignmentHitbox();
    }
  }
}

function factionAssignment()
{
  if (generationType === "mediterranean")
  {
    if (selectedFaction === "BLUFOR")
    {
      textAlign(CENTER);
      textSize(50);
      fill(255);
      text("Select Faction", width/2, height/15);
    
      rectMode(CENTER);
      fill(0, 0, 150);
      rect(windowWidth/2 - 500, windowHeight/2, 400, 150);
      textAlign(CENTER);
      textSize(50);
      fill(0);
      text("NATO", windowWidth/2 - 500, windowHeight/2 + 10)
      rectMode(CORNER);
  
      rectMode(CENTER);
      fill(0, 150, 0);
      rect(windowWidth/2, windowHeight/2, 400, 150);
      textAlign(CENTER);
      textSize(50);
      fill(0);
      text("CTRG", windowWidth/2, windowHeight/2 + 10)
      rectMode(CORNER);
      
      rectMode(CENTER);
      fill(150, 0, 0);
      rect(windowWidth/2 + 500, windowHeight/2, 400, 150);
      textAlign(CENTER);
      textSize(50);
      fill(0);
      text("FIA", windowWidth/2 + 500, windowHeight/2 + 10)
      rectMode(CORNER);
    }
    else if (selectedFaction === "INDEP")
    {
      textAlign(CENTER);
      textSize(50);
      fill(255);
      text("Select Faction", width/2, height/15);
    
      rectMode(CENTER);
      fill(0, 0, 150);
      rect(windowWidth/2 - 500, windowHeight/2, 400, 150);
      textAlign(CENTER);
      textSize(50);
      fill(0);
      text("FIA", windowWidth/2 - 500, windowHeight/2 + 10)
      rectMode(CORNER);
  
      rectMode(CENTER);
      fill(0, 150, 0);
      rect(windowWidth/2, windowHeight/2, 400, 150);
      textAlign(CENTER);
      textSize(50);
      fill(0);
      text("AAF", windowWidth/2, windowHeight/2 + 10)
      rectMode(CORNER);
      
      rectMode(CENTER);
      fill(150, 0, 0);
      rect(windowWidth/2 + 500, windowHeight/2, 400, 150);
      textAlign(CENTER);
      textSize(50);
      fill(0);
      text("ION PMC", windowWidth/2 + 500, windowHeight/2 + 10)
      rectMode(CORNER);
    }
    else if (selectedFaction === "OPFOR")
    {
      textAlign(CENTER);
      textSize(50);
      fill(255);
      text("Select Faction", width/2, height/15);
    
      rectMode(CENTER);
      fill(0, 0, 150);
      rect(windowWidth/2 - 500, windowHeight/2, 400, 150);
      textAlign(CENTER);
      textSize(50);
      fill(0);
      text("CSAT", windowWidth/2 - 500, windowHeight/2 + 10)
      rectMode(CORNER);
  
      rectMode(CENTER);
      fill(0, 150, 0);
      rect(windowWidth/2, windowHeight/2, 400, 150);
      textAlign(CENTER);
      textSize(50);
      fill(0);
      text("Altis Revolutionary Front", windowWidth/2, windowHeight/2 + 10)
      rectMode(CORNER);
      
      rectMode(CENTER);
      fill(150, 0, 0);
      rect(windowWidth/2 + 500, windowHeight/2, 400, 150);
      textAlign(CENTER);
      textSize(50);
      fill(0);
      text("VIPER TEAM", windowWidth/2 + 500, windowHeight/2 + 10)
      rectMode(CORNER);
    }
  }
  else if (generationType === "arid")
  {
    if (selectedFaction === "BLUFOR")
    {
      textAlign(CENTER);
      textSize(50);
      fill(255);
      text("Select Faction", width/2, height/15);
    
      rectMode(CENTER);
      fill(0, 0, 150);
      rect(windowWidth/2 - 500, windowHeight/2, 400, 150);
      textAlign(CENTER);
      textSize(50);
      fill(0);
      text("USMC", windowWidth/2 - 500, windowHeight/2 + 10)
      rectMode(CORNER);
  
      rectMode(CENTER);
      fill(0, 150, 0);
      rect(windowWidth/2, windowHeight/2, 400, 150);
      textAlign(CENTER);
      textSize(50);
      fill(0);
      text("BAF", windowWidth/2, windowHeight/2 + 10)
      rectMode(CORNER);
      
      rectMode(CENTER);
      fill(150, 0, 0);
      rect(windowWidth/2 + 500, windowHeight/2, 400, 150);
      textAlign(CENTER);
      textSize(50);
      fill(0);
      text("Bundeswehr", windowWidth/2 + 500, windowHeight/2 + 10)
      rectMode(CORNER);
    }
    else if (selectedFaction === "INDEP")
    {
      textAlign(CENTER);
      textSize(50);
      fill(255);
      text("Select Faction", width/2, height/15);
    
      rectMode(CENTER);
      fill(0, 0, 150);
      rect(windowWidth/2 - 500, windowHeight/2, 400, 150);
      textAlign(CENTER);
      textSize(50);
      fill(0);
      text("TKL", windowWidth/2 - 500, windowHeight/2 + 10)
      rectMode(CORNER);
  
      rectMode(CENTER);
      fill(0, 150, 0);
      rect(windowWidth/2, windowHeight/2, 400, 150);
      textAlign(CENTER);
      textSize(50);
      fill(0);
      text("AAF", windowWidth/2, windowHeight/2 + 10)
      rectMode(CORNER);
      
      rectMode(CENTER);
      fill(150, 0, 0);
      rect(windowWidth/2 + 500, windowHeight/2, 400, 150);
      textAlign(CENTER);
      textSize(50);
      fill(0);
      text("ION PMC", windowWidth/2 + 500, windowHeight/2 + 10)
      rectMode(CORNER);
    }
    else if (selectedFaction === "OPFOR")
    {
      textAlign(CENTER);
      textSize(50);
      fill(255);
      text("Select Faction", width/2, height/15);
    
      rectMode(CENTER);
      fill(0, 0, 150);
      rect(windowWidth/2 - 500, windowHeight/2, 400, 150);
      textAlign(CENTER);
      textSize(50);
      fill(0);
      text("CSAT", windowWidth/2 - 500, windowHeight/2 + 10)
      rectMode(CORNER);
  
      rectMode(CENTER);
      fill(0, 150, 0);
      rect(windowWidth/2, windowHeight/2, 400, 150);
      textAlign(CENTER);
      textSize(50);
      fill(0);
      text("Altis Revolutionary Front", windowWidth/2, windowHeight/2 + 10)
      rectMode(CORNER);
      
      rectMode(CENTER);
      fill(150, 0, 0);
      rect(windowWidth/2 + 500, windowHeight/2, 400, 150);
      textAlign(CENTER);
      textSize(50);
      fill(0);
      text("VIPER TEAM", windowWidth/2 + 500, windowHeight/2 + 10)
      rectMode(CORNER);
    }
  }
}
function factionAssignmentHitbox()
{
  if (generationType === "mediterranean")
  {

  }
}
