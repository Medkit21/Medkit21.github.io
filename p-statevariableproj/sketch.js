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
  constructor(position, size, landType, villageChance)
  {
    this.position = position;
    this.size = size;
    this.development;
    this.manpower;
    this.defence;
    this.attack;
    this.landType = landType;
    if (this.landType == 'water')
    {
      villageChance = 1; 
    }
    else if (this.landType == 'arid')
    {
    villageChance *= 3;
    }
    else if (this.landType == 'jungle')
    {
    villageChance *= 4;
    }
    else if (this.landType == 'jungle')
    {
    villageChance *= 4;
    }
    this.isVillage = villageChance < villageRate;


    if (this.isVillage)
    {
      if (generationType === "normal")
      {
        this.villageName = normalVillageNames[floor(random(0, normalVillageNames.length))];
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
    else if (this.landType === "jungle")
    {
      fill(0, 100, 0);
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
}

let sectors;
let plusX;
let cellSize;
let selectedSector = "";
let currentSector;
let sectorColor = 0;

const villageRate = 0.1;
const normalVillageNames = ['Obamaville', 'Timsville', 'Schellenburg', 'Kuffnersville', 'Kavala', 'Pyrgos', 'Athanos', 'Aggelochori', 'Neri',
'Kostas', 'Agios Dionysis', 'Kore', 'Galati', 'Syrta', 'Abdera', 'Oreokastro'];
const aridVillageNames = ['Pazagbasi', 'Durocalar', 'Tabashahr', 'Kashavand', 'Tel Kemaniyah', 'Muqdatha', 'Safabin', 'Aswaria'];
const jungleVillageNames = ['Nam', 'Katkoula', 'Savaka', 'Lailai', 'Cerebu', 'Laikoro', 'Namuvaka', 'Balavu', 'Tavu', 'Muaceba', 'Sosovu', 'Nani', 'Tuvanaka', 'Belfort',
'Georgetown', 'Rasputin', 'Saint-Julien', 'Nicolet', 'Savu', 'La Rochelle', 'Tanouka']

let gameStarted;
let menuScreen = "main";
let generationType = "";

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

  gameStarted = false;
}


function draw() {
  if (gameStarted) {
    drawGUI();
  }
  else {
    background(100, 0, 100);
    drawTitle();
  }
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0, 200, 200);
  loadSectors();
}

function drawGUI() {
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
}

function drawTitle() {
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
    text("Normal", windowWidth/2 - 500, windowHeight/2 + 10)
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
      let sectorVal = noise(x / 7, y / 7);
      let sectorType;

      // Normal/Western Generation
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
        if (sectorVal < 0.25)
        {
          sectorType = 'forest';
        }
        else if (sectorVal < 0.35)
        {
          sectorType = 'plains';
        }
        else if (sectorVal < 0.6)
        {
          sectorType = 'arid';
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
          sectorType = 'plains';
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
      else {
        print("this is not land");
        selectedSector = "Water Sector";
        sectorColor = [0, 0, 255];
      }
    }
  }
  else {
    if (menuScreen === "main") {
      if (mouseIsPressed) {
        if (mouseX > width/2 - 200 && mouseX < width/2 + 200 && mouseY > height/2 - 100 - 75 && mouseY < height/2 - 100 + 75) {
          menuScreen = "worldgen";
        }
      }
    }
    else if (menuScreen === "worldgen") {
      // Normal Button
      if (mouseIsPressed) {
        if (mouseX > width/2 - 500 - 200 && mouseX < width/2 - 500 + 200 && mouseY > height/2- 75 && mouseY < height/2 + 75) {
          generationType = "normal"
          startGame();
        }
      }
      // Arid Button
       if (mouseIsPressed) {
        if (mouseX > width/2 - 200 && mouseX < width/2 + 200 && mouseY > height/2- 75 && mouseY < height/2 + 75) {
          generationType = "arid";
          startGame();
        }
      }
      // Jungle Button
       if (mouseIsPressed) {
        if (mouseX > width/2 + 500 - 200 && mouseX < width/2 + 500 + 200 && mouseY > height/2- 75 && mouseY < height/2 + 75) {
          generationType = "jungle";
          startGame();
        }
      }
    }
  }
}