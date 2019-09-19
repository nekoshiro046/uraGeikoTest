var imgs = [];
var t = 0;
// preload the images to be used for the checkboxes
function preload(){
  imgs[0] = loadImage('assets/sketch02_imgs/pic01.jpg');
  imgs[1] = loadImage('assets/sketch02_imgs/pic02.jpg');
  imgs[2] = loadImage('assets/sketch02_imgs/pic03.jpg');
  imgs[3] = loadImage('assets/sketch02_imgs/pic04.jpg');
  imgs[4] = loadImage('assets/sketch02_imgs/pic05.jpg');
  imgs[5] = loadImage('assets/sketch02_imgs/pic06.jpg');
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0,0);
  canvas.parent('sketch-holder');
  canvas.style('z-index','-1');
    //canvas.position(0, 0);
    //canvas.class("pcanvas");

    // setup drawing
  smooth();
  strokeWeight(5);
  frameRate(16);
    // background(3,4,18);
  stroke(255);
  rectMode(CENTER);
  
}

function draw() {
  var rn = int(random(1,3));
  switch(rn){
    case 0:
      return;
    case 1:
      drawScene01();
      break;
    case 2:
      drawScene02();
      break;  
    case 3:
      drawScene03();
      break;  
    default:
      break;
  }
  // drawScene01();
}

function drawScene01(){
  push();
  colorMode(HSB);
  background(0);
  let w = width;
  let h = height;
  for (x = 5 ; x < w ; x += 10) {
    fill(360, 0, 360);
    rect(x, h, 10, random(0,2000));
  }
  for (x = 5 ; x < w ; x += 10) {
    fill(360, 0, 360);
    rect(x, 0, 10, random(0,2000));
  }
  pop();
}

function drawScene02(){
  var rn = int(random(6));
  image(imgs[rn],0,0,width,height);
}

function drawScene03(){
  
}
