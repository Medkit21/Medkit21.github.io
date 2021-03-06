// Antistasi(Grid Assignment)
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
    this.landType = landType;

    // Sector Stats
    this.devastation;
    this.waterSupply;
    this.foodSupply;
    this.fuelSupply;
    
    // Determines the chance of a village spawning based on the Sector Type
    if (this.landType == 'water')
    {
      villageChance = 1; 
    }
    else if (this.landType == 'wetlands')
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
      else if (generationType === "easteuro")
      {
        this.villageName = easteuroVillageNames[floor(random(0, easteuroVillageNames.length))];
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
    rect(this.position.x + plusX, this.position.y, this.size, this.size);

    if(this.isVillage)
    {
      if (generationType === "normal") {
         image(mediTown, this.position.x + plusX, this.position.y, this.size, this.size);
      }
      else if (generationType === "easteuro") {
        image(eastEuroTown, this.position.x + plusX, this.position.y, this.size, this.size);
      }
      else if (generationType === "jungle") {
        image(jungleTown, this.position.x + plusX, this.position.y, this.size, this.size);
      }
      else {
        image(eastEuroTown, this.position.x + plusX, this.position.y, this.size, this.size);
      }
     
      // fill(200, 80, 10);
      // triangle(this.position.x + plusX, this.position.y + this.size,
      //   this.position.x + plusX + this.size, this.position.y + this.size,
      //   this.position.x + plusX + this.size/2, this.position.y)
    }
  }
}

class Units { // Template for a Unit
  constructor(position, manpower, side, faction)
  {
    this.position = position;
    this.manpower = manpower;
    this.side = side;
    this.faction = faction;
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

// Player/Resistance Resources
let money = 1000; // Money (Starting cash = $1000)
let mp = 8; // Manpower (Starting MP = 8)
let ammo; // Resistance Ammunition Supplies (1 = 1000)
let training; // Unit Training (Higher Training = Higher Chance of Winning Battles)

// Passive Stats
let govAggro; // Government Aggression (Higher Aggression will result in a larger QRF(Quick Response Forces))
let bluforSupport; // BLUFOR Support(BLUFOR Support can be exhanged for Resources)
let opforSupport; // Opfor Support(Higher OPFOR Support results in Punishments)
let warLevel;

// Nation Stats
let pop; // Civilian Population
let popHalf; // If Civilian Population drops past this number you will lose
let globalDevastation; // Higher Devastation means Civilians struggle to get supplies, go homeless and unemployed (This can be exploited by both sides)
let globalSupport; // Global Resistance Support/Global Civilian Support
let event; // Economy Crash, Droughts and Natural Disasters

// Factions
let resistance = ""; // Player Faction
let government = ""; // Main Enemy Faction
let blufor = ""; // Friendly faction that supports you
let opfor = ""; // Hostile Faction that supports your enemy

const villageRate = 0.1;

// Town names based on the World Generation Type
const mediterraneanVillageNames = ['Kavala', 'Pyrgos', 'Athanos', 'Aggelochori', 'Neri','Kostas', 'Agios Dionysis', 'Kore', 'Galati', 'Syrta', 'Abdera', 'Oreokastro', 'Negades', 
'Agios Konstantinos', 'Frini', 'Infestiona', 'Athira', 'Anthrakia', 'Charkra', 'Tilos'];
const jungleVillageNames = ['Nam', 'Katkoula', 'Savaka', 'Lailai', 'Cerebu', 'Laikoro', 'Namuvaka', 'Balavu', 'Tavu', 'Muaceba', 'Sosovu', 'Nani', 'Tuvanaka', 'Belfort',
'Georgetown', 'Saint-Julien', 'Nicolet', 'Savu', 'La Rochelle', 'Tanouka'];
const easteuroVillageNames = ['Stary Sobor', 'Chernogorsk', 'Elektrozavodsk', 'Kamino'];

let gameStarted;
let menuScreen = "main";
let generationType = "";
let selectedSide = "";
let selectedFaction = "";
let selectedGen;

// Backdrop Image Variables
let bJungle1, bJungle2;

// Town Images
let mediTown;
let eastEuroTown;
let jungleTown;

// Leader Portraits
let fiaPort, aafPort, natoPortM, csatPortM, napaPort, chdkzPort, cdfPort, afrfPort, syndPort, hidfPort, natoPortJ, csatPortJ;

function preload() {
  // Preloading Backdrop Images
  bJungle1 = loadImage("assets/backdrops/jungle1.png");
  bJungle2 = loadImage("assets/backdrops/jungle3.png");

  // Preloading Town Images
  mediTown = loadImage("assets/buildings/mediVillage.png");
  eastEuroTown = loadImage("assets/buildings/easteuroVillage.png");
  jungleTown = loadImage("assets/buildings/jungleVillage.png");

  // Preloading Altis/Mediterranean Leader Portraits
  fiaPort = loadImage("assets/leaders/altis/FIA.png");
  aafPort = loadImage("assets/leaders/altis/AAF.png");
  natoPortM = loadImage("assets/leaders/altis/NATO.png");
  csatPortM = loadImage("assets/leaders/altis/CSAT.png");

  // Preloading Chernarus/East European Leader Portraits
  napaPort = loadImage("assets/leaders/chernarus/NAPA.png");
  chdkzPort = loadImage("assets/leaders/chernarus/CHDKZ.png");
  cdfPort = loadImage("assets/leaders/chernarus/CDF.png");
  afrfPort = loadImage("assets/leaders/chernarus/AFRF.png");

  // Preloading Horizon Islands/Tanoan/Jungle Leader Portraits
  syndPort = loadImage("assets/leaders/tanoa/Syndikat.png");
  hidfPort = loadImage("assets/leaders/tanoa/HIDF.png");
  csatPortJ = loadImage("assets/leaders/tanoa/CSATJ.png");
  natoPortJ = loadImage("assets/leaders/tanoa/NATOJ.png");
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
  pop = floor(random(8000, 10000));
  popHalf = pop/2;
  console.log(pop);

  globalSupport = 10;
  govAggro = 5;
  bluforSupport = 5;
  opforSupport = 5;

  warLevel = 1;

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
  fill(0, 200, 200);
  noStroke();
  rect((plusX * 3) + 1, 0, plusX - 1, windowHeight)
  stroke(1);
  fill(0);
  text(resistance + " Support: " + globalSupport, width - 200, 75);
  text(government + " Aggression: " + govAggro, width - 200, 100);
  text(blufor + " Support: " + bluforSupport, width - 200, 125);
  text(opfor + " Support: " + opforSupport, width - 200, 150);
  textSize(40);
  text("WAR LEVEL: " + warLevel, width - 200, 50);
  textSize(20);
}

// Draws the Title Screen
function drawTitle() {
  // Main Menu Screen(Opening Screen)
  if (menuScreen === "main") {
    textAlign(CENTER);
    textSize(50);
    fill(255);
    text("Antistasi", width/2, height/15);
    textSize(60)
    text("2D", width/2, height/15 + 65);
  
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
    text("Altis", windowWidth/2 - 500, windowHeight/2)
    text("(Easy)", windowWidth/2 - 500, windowHeight/2 + 50)
    rectMode(CORNER);

    rectMode(CENTER);
    fill(150, 0, 0);
    rect(windowWidth/2, windowHeight/2, 400, 150);
    textAlign(CENTER);
    textSize(50);
    fill(0);
    text("Chernarus", windowWidth/2, windowHeight/2)
    text("(Medium)", windowWidth/2, windowHeight/2 + 50)
    rectMode(CORNER);
    
    rectMode(CENTER);
    fill(150, 0, 0);
    rect(windowWidth/2 + 500, windowHeight/2, 400, 150);
    textAlign(CENTER);
    textSize(50);
    fill(0);
    text("Horizon Islands", windowWidth/2 + 500, windowHeight/2)
    text("(Hard)", windowWidth/2 + 500, windowHeight/2 + 50)
    rectMode(CORNER);
  }
  if (selectedGen === "altis") {
    background(0);
    infoScreen("altis")
  }
  if (selectedGen === "chernarus") {
    background(0);
    infoScreen("chernarus")
  }
  if (selectedGen === "tanoa") {
    background(0);
    infoScreen("tanoa")
  }
}

// Chooses a Random Backdrop
function randomBackdrop()
{
  bDrop = floor(random(1, 3));
  if (bDrop === 1) {
    image(bJungle1, 0, 0, width, height);
  }
  else if (bDrop === 2) {
    image(bJungle2, 0, 0, width, height);
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
      // East European Generation
      if (generationType === "easteuro") {
        if (sectorVal < 0.4)
        {
          sectorType = 'forest';
        }
        else if (sectorVal < 0.6)
        {
          sectorType = 'plains';
        }
        else if (sectorVal < 0.65)
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
      // Mediterranean/Altis Button
      if (mouseIsPressed) {
        if (mouseX > width/2 - 500 - 200 && mouseX < width/2 - 500 + 200 && mouseY > height/2- 75 && mouseY < height/2 + 75) {
          generationType = "normal";
          menuScreen = "infoscreen";
          selectedGen = "altis";
          resistance = "FIA";
          government = "AAF";
          blufor = "NATO";
          opfor = "CSAT";
          globalSupport = 20;
          bluforSupport = 15;
        }
      }
      // East European/Chernarus Button
       if (mouseIsPressed) {
        if (mouseX > width/2 - 200 && mouseX < width/2 + 200 && mouseY > height/2- 75 && mouseY < height/2 + 75) {
          generationType = "easteuro";
          menuScreen = "infoscreen";
          selectedGen = "chernarus";
          resistance = "NAPA";
          government = "ChDKZ";
          blufor = "CDF";
          opfor = "AFRF";
          warLevel = 2;
          globalSupport = 10;
          govAggro = 20;
          bluforSupport = 5;
        }
      }
      // Jungle/Horizon Islands Button
       if (mouseIsPressed) {
        if (mouseX > width/2 + 500 - 200 && mouseX < width/2 + 500 + 200 && mouseY > height/2- 75 && mouseY < height/2 + 75) {
          generationType = "jungle";
          menuScreen = "infoscreen";
          selectedGen = "tanoa";
          resistance = "Syndikat";
          government = "HIDF";
          blufor = "CSAT";
          opfor = "NATO";
          globalSupport = 5;
          govAggro = 25;
          bluforSupport = 10;
          opforSupport = 15;
        }
      }
    }
    else if (menuScreen === "infoscreen") {
      if (mouseIsPressed) {
        if (mouseX > width/2 - 200 && mouseX < width/2 + 200 && mouseY > height - 175 && mouseY < height - 100 + 75) {
          startGame();
        }
      }
    }
  }
}

// Menu Screens for  Different World Types
function infoScreen(world) {
  if (world === "altis")
  {
    fill(255);
    textSize(60)
    text("Republic of Altis and Stratis", width/2, height/14);
    textSize(30);
    text("Information", width/2, height/14 + 30);
    textSize(15);

    // Freedom and Independence Army
    text("Freedom and Independence Army", 200, height/6-10);
    image(fiaPort, + 100 , height/6, 200, 200);
    fill(0, 200, 0);
    text("Pros:", 200, height/2 - 40);
    fill(255);
    text("+High Civilian Support", 200, height/2 - 20);
    text("+NATO Support", 200, height/2);
    text("+High Manpower", 200, height/2 + 20);
    text("+2000 Starting Cash", 200, height/2 + 40);
    text("+Experienced Fighters", 200, height/2 + 60);
    fill(200, 0, 0);
    text("Cons:", 200, height/2 + 80);
    fill(255);
    text("-Low Supplies", 200, height/2 + 100);
    text("-Low Tier Weapons", 200, height/2 + 120);

    // Altis Armed Forces(AAF)
    text("Altis Armed Forces", width/2 - 200, height/6-10);
    image(aafPort, width/2 - 300, height/6, 200, 200)
    fill(0, 200, 0);
    text("Pros:", width/2 - 200, height/2 - 40);
    fill(255);
    text("+CSAT Sponsored Gear", width/2 - 200, height/2 - 20);
    text("+Mechanized Divisions", width/2 - 200, height/2);
    text("+Armoured Divisions", width/2 - 200, height/2 + 20);
    text("+Air Divisions", width/2 - 200, height/2 + 40);
    fill(200, 0, 0);
    text("Cons:", width/2 - 200, height/2 + 60);
    fill(255);
    text("-Illegitimate Goverment", width/2 - 200, height/2 + 80);
    text("-High Attrition", width/2 - 200, height/2 + 100);
    text("-Low Visibility", width/2 - 200, height/2 + 120);

    // NATO
    text("North Atlantic Treaty Organisation", width/2 + 200, height/6 - 10);
    image(natoPortM, width/2 + 100, height/6, 200, 200);
    fill(0, 200, 0);
    text("Pros:", width/2 + 200, height/2 - 40);
    fill(255);
    text("+Heavily Armed Infantry", width/2 + 200, height/2 - 20);
    text("+Experienced Soldiers", width/2 + 200, height/2);
    text("+CTRG Team 14", width/2 + 200, height/2 + 20);
    text("+Air Divisions", width/2 + 200, height/2 + 40);
    text("+Armoured Divisions", width/2 + 200, height/2 + 60);
    text("+Mechanized Divisions", width/2 + 200, height/2 + 80);
    fill(200, 0, 0);
    text("Cons:", width/2 + 200, height/2 + 100);
    fill(255);
    text("-Slow Movement Speed", width/2 + 200, height/2 + 120);

    // CSAT
    text("Canton-Protocol Strategic Alliance Treaty", width - 200, height/6 - 10);
    image(csatPortM, width - 300, height/6, 200, 200);
    fill(0, 200, 0);
    text("Pros:", width - 200, height/2 - 40);
    fill(255);
    text("+Viper Team", width - 200, height/2 - 20);
    text("+Advanced Equipment", width - 200, height/2);
    text("+Supported by AAF", width - 200, height/2 + 20);
    text("+Eastwind Device", width - 200, height/2 + 40);
    text("+Cluster Bombs", width - 200, height/2 + 60);
    fill(200, 0, 0);
    text("Cons:", width - 200, height/2 + 80);
    fill(255);
    text("-Hated by Altians", width - 200, height/2 + 100);
    text("-Slow Movement Speed", width - 200, height/2 + 120);

    rectMode(CORNER);
    stroke(255);
    fill(0);
    rect(width/2 - 200, height - 200, 400, 150);
    stroke(1);
    fill(255);
    textSize(60);
    text("Start Game", width/2, height - 100);
  }
  else if (world === "chernarus")
  {
    fill(255);
    textSize(60)
    text("Chernarus", width/2, height/14);
    textSize(30);
    text("Information", width/2, height/14 + 30);
    textSize(15);

    // National Party of Chernarus(NAPA)
    text("National Party of Chernarus", 200, height/6-10);
    image(napaPort, + 100 , height/6, 200, 200);
    fill(0, 200, 0);
    text("Pros:", 200, height/2 - 40);
    fill(255);
    text("+Extensive Knowledge of the Area", 200, height/2 - 20);
    text("+Low Attrition", 200, height/2);
    text("+Merciless Tactics", 200, height/2 + 20);
    fill(200, 0, 0);
    text("Cons:", 200, height/2 + 40);
    fill(255);
    text("-Low Supplies", 200, height/2 + 60);
    text("-Untrained Units", 200, height/2 + 80);
    text("-High Chance of Setting off Mines", 200, height/2 + 100);
    text("-Blamed for Moscow Bombing", 200, height/2 + 120);

    // Chernarussian Movement of the Red Star(ChDKZ)
    text("Chernarussian Movement of the Red Star", width/2 - 200, height/6-10);
    image(chdkzPort, width/2 - 300, height/6, 200, 200)
    fill(0, 200, 0);
    text("Pros:", width/2 - 200, height/2 - 40);
    fill(255);
    text("+IEDs", width/2 - 200, height/2 - 20);
    text("+Anti-Air", width/2 - 200, height/2);
    text("+Guerilla Tactics", width/2 - 200, height/2 + 20);
    text("+High Attack against CDF", width/2 - 200, height/2 + 40);
    fill(200, 0, 0);
    text("Cons:", width/2 - 200, height/2 + 60);
    fill(255);
    text("-AFRF Target", width/2 - 200, height/2 + 80);
    text("-High Attrition", width/2 - 200, height/2 + 100);
    text("-High Amount of Warcrimes", width/2 - 200, height/2 + 120);

    // Chernarus Defense Forces(CDF)
    text("Chernarus Defense Forces", width/2 + 200, height/6 - 10);
    image(cdfPort, width/2 + 100, height/6, 200, 200);
    fill(0, 200, 0);
    text("Pros:", width/2 + 200, height/2 - 40);
    fill(255);
    text("+High Manpower", width/2 + 200, height/2 - 20);
    text("+US Equipment", width/2 + 200, height/2);
    text("+Low Attrition", width/2 + 200, height/2 + 20);
    text("+True Government", width/2 + 200, height/2 + 40);
    text("+Mechanized Divisions", width/2 + 200, height/2 + 60);
    fill(200, 0, 0);
    text("Cons:", width/2 + 200, height/2 + 80);
    fill(255);
    text("-High Chance of Setting off Mines", width/2 + 200, height/2 + 100);
    text("-Slow Movement Speed", width/2 + 200, height/2 + 120);

    // Armed Forces of the Russian Federation(AFRF)
    text("Armed Forces of the Russian Federation", width - 200, height/6 - 10);
    image(afrfPort, width - 300, height/6, 200, 200);
    fill(0, 200, 0);
    text("Pros:", width - 200, height/2 - 40);
    fill(255);
    text("+Heavy Armour", width - 200, height/2 - 20);
    text("+High Manpower", width - 200, height/2);
    text("+Merciless Tactics", width - 200, height/2 + 20);
    text("+Hinds", width - 200, height/2 + 40);
    text("+Cluster Bombs", width - 200, height/2 + 60);
    fill(200, 0, 0);
    text("Cons:", width - 200, height/2 + 80);
    fill(255);
    text("-High Attrition", width - 200, height/2 + 100);
    text("-Slow Movement Speed", width - 200, height/2 + 120);

    rectMode(CORNER);
    stroke(255);
    fill(0);
    rect(width/2 - 200, height - 200, 400, 150);
    stroke(1);
    fill(255);
    textSize(60);
    text("Start Game", width/2, height - 100);
  }
  else if (world === "tanoa")
  {
    fill(255);
    textSize(60)
    text("Horizon Islands", width/2, height/14);
    textSize(30);
    text("Information", width/2, height/14 + 30);
    textSize(15);

    // Syndikat
    text("Syndikat", 200, height/6-10);
    image(syndPort, + 100 , height/6, 200, 200);
    fill(0, 200, 0);
    text("Pros:", 200, height/2 - 40);
    fill(255);
    text("+Knowledge of Area", 200, height/2 - 20);
    text("+Supported by CSAT", 200, height/2);
    fill(200, 0, 0);
    text("Cons:", 200, height/2 + 20);
    fill(255);
    text("-Low Supplies", 200, height/2 + 40);
    text("-Untrained Units", 200, height/2 + 60);
    text("-High Chance of Setting off Mines", 200, height/2 + 80);
    text("-High Attrition", 200, height/2 + 100);
    text("-Crime Syndicate", 200, height/2 + 120);

    // Horizon Islands Defense Force(HIDF)
    text("Horizon Islands Defense Force", width/2 - 200, height/6-10);
    image(hidfPort, width/2 - 300, height/6, 200, 200)
    fill(0, 200, 0);
    text("Pros:", width/2 - 200, height/2 - 40);
    fill(255);
    text("+Merciless Tactics", width/2 - 200, height/2 - 20);
    text("+Helicopter Divisions", width/2 - 200, height/2);
    text("+NATO Support", width/2 - 200, height/2 + 20);
    text("+Gendarmerie", width/2 - 200, height/2 + 40);
    fill(200, 0, 0);
    text("Cons:", width/2 - 200, height/2 + 60);
    fill(255);
    text("-Cold War Era Equipment", width/2 - 200, height/2 + 80);
    text("-High Attrition", width/2 - 200, height/2 + 100);
    text("-High Aggression", width/2 - 200, height/2 + 120);

    // Canton-Protocol Strategic Alliance Treaty(CSAT)
    text("Canton-Protocol Strategic Alliance Treaty", width/2 + 200, height/6 - 10);
    image(csatPortJ, width/2 + 100, height/6, 200, 200);
    fill(0, 200, 0);
    text("Pros:", width/2 + 200, height/2 - 40);
    fill(255);
    text("+Viper Team", width/2 + 200, height/2 - 20);
    text("+Advanced Equipment", width/2 + 200, height/2);
    text("+Low Attrition", width/2 + 200, height/2 + 20);
    text("+Air Divisions", width/2 + 200, height/2 + 40);
    fill(200, 0, 0);
    text("Cons:", width/2 + 200, height/2 + 60);
    fill(255);
    text("-High Chance of Setting off Mines", width/2 + 200, height/2 + 80);
    text("-Slow Movement Speed", width/2 + 200, height/2 + 100);
    text("-CSAT Decline", width/2 + 200, height/2 + 120);

    // North Atlantic Treaty Organisation(NATO)
    text("North Atlantic Treaty Organisation", width - 200, height/6 - 10);
    image(natoPortJ, width - 300, height/6, 200, 200);
    fill(0, 200, 0);
    text("Pros:", width - 200, height/2 - 40);
    fill(255);
    text("+Heavy Armour", width - 200, height/2 - 20);
    text("+High Manpower", width - 200, height/2);
    text("+CTRG Team 15", width - 200, height/2 + 20);
    text("+High Visability", width - 200, height/2 + 40);
    text("+Cluster Bombs", width - 200, height/2 + 60);
    fill(200, 0, 0);
    text("Cons:", width - 200, height/2 + 80);
    fill(255);
    text("-Restricted Armory until War Level 3", width - 200, height/2 + 100);
    text("-Slow Movement Speed", width - 200, height/2 + 120);

    rectMode(CORNER);
    stroke(255);
    fill(0);
    rect(width/2 - 200, height - 200, 400, 150);
    stroke(1);
    fill(255);
    textSize(60);
    text("Start Game", width/2, height - 100);
  }
}
