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

class Sector 
{
  constructor(position, stability, manpower, supplies) 
  {
    this.position = position;
    this.stability = stability;
    this.manpower = manpower;
    this.supplies = supplies;
  }
}

class GrnSector
{
  constructor(position, radius, stability, manpower, supplies, strength, faction)
  {
    this.position = position;
    this.radius = radius;
    this.stability = stability;
    this.manpower = manpower;
    this.supplies = supplies;
    this.strength = strength;
    this.faction = faction;
  }
  update()
  {
    return (this.position.x, this.position.y);
  }
  render()
  {
    fill(0,255,0);
    ellipse(this.position.x, this.position.y, radius);
  }
}

class BluSector extends Sector
{
  constructor(position, stability, manpower, supplies, strength)
  {
    this.position = position;
    this.stability = stability;
    this.manpower = manpower;
    this.supplies = supplies;
    this.strength = strength;
  }
  render()
  {

  }
}
class OpfSector extends Sector
{
  constructor(position, stability, manpower, supplies, strength, faction)
  {
    this.position = position;
    this.stability = stability;
    this.manpower = manpower;
    this.supplies = supplies;
    this.strength = strength;
    this.faction = faction;
  }
  render()
  {
    
  }
}

let civilianSector = new Array();
let nationStability;
let nationEconomy;

// Factions' Influence
let natoInfluence;
let fiaInfluence;
let aafInfluence;
let csatInfluence;
let smugInfluence;
let pirateInfluence;


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0, 200, 200);
}

function draw() {
  civilianSector.push(new GrnSector(new Vector2(windowWidth/2, windowHeight/2)), 50, 100, 100, 100, "civilian");
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}