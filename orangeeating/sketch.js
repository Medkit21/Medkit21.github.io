// Orange Eating
// Blazingsky Carrier 
// Sep 13, 2019
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let noteA;
let noteB;
let noteC;
let noteD;
let noteE;
let noteF;
let noteG;

function preload(){
  noteA = loadSound('assets/noteA.mp3'), noteB = loadSound('assets/noteB.mp3'), noteC = loadSound('assets/noteC.mp3'), noteD = loadSound('assets/noteD.mp3');
  noteE = loadSound('assets/noteE.mp3'), noteF = loadSound('assets/noteF.mp3'), noteG = loadSound('assets/noteG.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw(){
  background(125);
  keyboardnotes();
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

// corresponds with a sound of the piano and shows the note pressed on the screen

function keyboardnotes(){
  if (keyIsPressed == true);{
    if (keyCode === 65);{
      text(keyCode, 33, 65);
      noteA.setVolume(0.5)
      noteA.play();
    }
    if (keyCode === 66);{
      noteB.play();
      text(keyCode, 33, 65);
      noteB.setVolume(0.5)
      noteB.play();
    }
    if (keyCode === 67);{
      noteC.play();
      text(keyCode, 33, 65);
      noteC.setVolume(0.5)
      noteC.play();
    }
    if (keyCode === 68);{
      noteD.play();
      text(keyCode, 33, 65);
      noteD.setVolume(0.5)
      noteD.play();
    }
    if (keyCode === 69);{
      noteE.play();
      text(keyCode, 33, 65);
      noteE.setVolume(0.5)
      noteE.play();
    }
    if (keyCode === 70);{
      noteF.play();
      text(keyCode, 33, 65);
      noteF.setVolume(0.5)
      noteF.play();
    }
    if (keyCode === 71);{
      noteG.play();
      text(keyCode, 33, 65);
      noteG.setVolume(0.5)
      noteG.play();
    }
  }
}