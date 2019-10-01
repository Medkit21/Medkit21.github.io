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
  constructor(position, size, development, manpower, defence, attack)
  {
    this.position = position;
    this.size = size;
    this.development = development;
    this.manpower = manpower;
    this.defence = defence;
    this.attack = attack;
  }
  update()
  {
    this.render();
  }
  render()
  {
    rect(this.position.x, this.position. y, this.size, this.size);
  }
}

class LandSector extends Sector
{
  update()
  {
    this.render();
  }
  render()
  {
    fill(0, 255, 0);
    rect(this.position.x, this.position. y, this.size, this.size);
  }
}

class WaterSector extends Sector
{
  update()
  {
    this.render();
  }
  render()
  {
    fill(0, 0, 255);
    rect(this.position.x, this.position. y, this.size, this.size);
  }
}

let newLandSector = new Array;
let newWaterSector = new Array;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0, 200, 200);
  let cellSize = width/20;
  for (let x = 0; x < 20; x++) {
    for (let y = 0; y < 8; y++) {
      sectorType = floor(random(1, 3));
      console.log(sectorType);
      if (sectorType === 1)
      {
        newLandSector.push(new LandSector(new Vector2(x * cellSize, y * cellSize), cellSize, 10, 10, 10, 10));
      }
      else
      {
        newWaterSector.push(new WaterSector(new Vector2(x * cellSize, y * cellSize), cellSize, 10, 10, 10, 10));
      }
    }
  }
}

function draw() {

  for (let i = 0; i < newLandSector.length; i++)
  {
    newLandSector[i].update();
  }
  for (let i = 0; i < newWaterSector.length; i++)
  {
    newWaterSector[i].update();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}