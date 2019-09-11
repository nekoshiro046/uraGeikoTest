var scene = 0;
var sceneContinue = true;

var scene1cores = [];
var shapeType = 4;
var sAngle;
var sSize = 100;
var step = -2;

function preload(){
}


function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  // canvas = createCanvas(windowWidth, windowHeight,WEBGL);

  canvas.position(0,0);
  canvas.style('position','fixed');
  canvas.style('z-index','1');

  canvas.parent('sketch-holder');

  background(0);
  noStroke();
  frameRate(30);
  // blendMode(ADD);
  formShape();
}

function formShape(){
  sAngle = radians(360 / float(shapeType));
  for (var i = 0; i< shapeType; i++) {
    scene1cores[i] = createVector(sSize*cos(sAngle * i),sSize*sin(sAngle * i)); 
  }
}

function draw() {
	if(scene == 0){
    drawScene0();
    updateScene0();
	}else if(scene == 1){
		drawScene1();
	}else if(scene == 2){
		drawScene2();
	}
}

// function mousePressed(){
//   if(scene == 0){
//     sceneContinue = false;
//   }else if(scene == 1){
//     scene = 2;
//   }else{
//     scene = 3;
//   }
// }

function updateScene0(){
  push();
  translate(width/2,height/2);
  if(mouseIsPressed)sSize -= step * 10;
  sSize +=  step;
  for (var i = 0; i< shapeType; i++) {
    scene1cores[i].x = sSize*cos(sAngle * i);
    scene1cores[i].y = sSize*sin(sAngle * i);
    if(sceneContinue && i < shapeType/2 && dist(scene1cores[i].x,scene1cores[i].y,scene1cores[i*2].y,scene1cores[i*2].y) <= 5){
      shapeType = int(random(3,25));
      formShape();
      break;
    }
    if(!sceneContinue && i < shapeType/2 && dist(scene1cores[i].x,scene1cores[i].y,scene1cores[i*2].y,scene1cores[i*2].y) <= 5){
      scene = 1;
      sceneContinue = true;
      break;
    }

    if(scene1cores[i].x > width/2 || scene1cores[i].x < -width/2 || scene1cores[i].y > height/2 || scene1cores[i].y < -height/2){
      step *= -1;
      break;
    }
  }

  // for (var i=0; i<shapeType; i++){
  //   scene1cores[i].x += random(-step,step);
  //   scene1cores[i].y += random(-step,step);
  //   if(sceneContinue && i < shapeType/2 && dist(scene1cores[i].x,scene1cores[i].y,scene1cores[i*2].y,scene1cores[i*2].y) <= 5){
  //     shapeType = int(random(3,25));
  //     formShape();
  //     break;
  //   }
  //   if(!sceneContinue && i < shapeType/2 && dist(scene1cores[i].x,scene1cores[i].y,scene1cores[i*2].y,scene1cores[i*2].y) <= 5){
  //     scene = 1;
  //     sceneContinue = true;
  //     break;
  //   }

  //   if(scene1cores[i].x > width/2 || scene1cores[i].x < -width/2 || scene1cores[i].y > height/2 || scene1cores[i].y < -height/2){
  //     step *= -1;
  //     break;
  //   }
  // }
  pop();
}


function drawScene0(){
  background(0);
	push();
	translate(width/2,height/2);
  // rotate((random(-5,5) * frameCount));
	stroke(255);
  noFill();

  beginShape();
  for (var i=0; i<shapeType; i++){
    if(i == 0){
      stroke(255,0,0);
    }else{
      stroke(255);
    }
    vertex(scene1cores[i].x, scene1cores[i].y);
    strokeWeight(10);
    point(scene1cores[i].x, scene1cores[i].y);

  }
  strokeWeight(1);
  endShape(CLOSE);

  pop();
}
function updateScene1(){

}
function drawScene1() {
  background(100);


}

function drawScene2(){

}