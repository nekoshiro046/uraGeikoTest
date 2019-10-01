var img
var imgs = [];
var canvas;
//p5.disableFriendlyErrors = true;

const maxXChange = 125;
const maxYChange = 5;
const yNoiseChange = 0.01;
const mouseYNoiseChange = 0.3;
const timeNoiseChange = 0.013;

var inverted = false;

var scene = 1;
var mouseCount = 0;

var crashes = [];
var noiseSize = 50;

function preload() {
	img = loadImage("assets/image/mv.jpg");
	// img = loadImage("assets/sketch02_imgs/pic02.jpg");
	imgs[0] = loadImage('assets/sketch02_imgs/pic01.jpg');
	imgs[1] = loadImage('assets/sketch02_imgs/pic02.jpg');
	imgs[2] = loadImage('assets/sketch02_imgs/pic03.jpg');
	imgs[3] = loadImage('assets/sketch02_imgs/pic04.jpg');
	imgs[4] = loadImage('assets/sketch02_imgs/pic05.jpg');
	imgs[5] = loadImage('assets/sketch02_imgs/pic06.jpg');
}


function setup() {
	canvas = createCanvas(windowWidth, windowHeight);
	// canvas = createCanvas(constrain(img.width - maxXChange * 2, 100, windowWidth), constrain(img.height - maxYChange * 2, 100, windowHeight));
    canvas.position(0,0);
    canvas.parent('sketch-holder');
    canvas.style('z-index','-99');
    canvas.style('padding','0');
    canvas.style('margin','0');
    canvas.style('width','100%');
    canvas.style('height','auto');
    rectMode(CENTER);
    frameRate(24);
	// createCanvas(constrain(img.width - maxXChange * 2, 100, windowWidth), constrain(img.height - maxYChange * 2, 100, windowHeight));
	// background(3,4,18);
	// img.resize(width, height);
	// image(img, -maxXChange, -maxYChange,width,img.width * height / width);
	for (let i = 0; i < 100; i++) {
		drawStreak();
	}

	var nw = int(width / noiseSize);

	for(var i = 0;i <= noiseSize;i++){
		crashes[i] = new crashNoise(i*nw,0,nw);
	}
}

function draw() {
	if(scene == 1){
		drawScene1();
	}else if(scene == 2){
		drawScene2();
	}else if(scene == 3){
		drawScene3();
	}
}

function drawScene1(){
	if(mouseIsPressed){
		mouseCount++;
		if(mouseCount > 120)scene = 2;
	}
	for (let i = 0; i < height / 60; i++) { //dist(pmouseX, pmouseY, mouseX, mouseY) * 0.04; i++) {
		drawStreak();
	}

	// var rn = int(random(1,40));
	var rn = int(random(1,40));
  	switch(rn){
	    case 1:
			var rn = int(random(6));
  			image(imgs[rn],0,0,width,height);
	      	break;
	    case 2:
	      push();
		  colorMode(HSB);
		  noStroke();
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
	      break;   
	    default:
	      break;
  	}


}

function drawScene2(){
	for(var i = 0; i < crashes.length; i++){
		crashes[i].update();
		if (crashes[i].end) crashes.splice(i, 1);
		// print("awake");
	}
	if(crashes.length < 1){
		scene = 3;
	}
}


function drawScene3(){
	noLop();
}


function drawStreak() {
	let y = floor(random(height));
	let h = floor(random(20, 30)); //floor(random(1, 100));
	let xChange = floor(map(noise(y * yNoiseChange, (mouseY * mouseYNoiseChange + frameCount) * timeNoiseChange), 0.06, 0.94, -maxXChange, maxXChange)); //floor(random(-maxXChange, maxXChange));
	let yChange = floor(xChange * (maxYChange / maxXChange) * random() > 0.1 ? -1 : 1);

	if (random() < dist(pmouseX, pmouseY, mouseX, mouseY) / width * 0.3 + 0.0015) filter(POSTERIZE, floor(random(2, 6)));
	if (mouseIsPressed && abs(mouseY - y) < 60) {
		if (!inverted) filter(INVERT);
		inverted = true;
	} else {
		if (inverted) filter(INVERT);
		inverted = false
	}
	
	//It looks better with the line below IMO but it runs a lot slower (not quite real time)
	//if(random()<0.07)tint(random(255), random(255), random(255));
	
	image(img, xChange - maxXChange, -maxYChange + y + yChange, img.width, h, 0, y, img.width, h);
	// image(img, xChange - maxXChange, -maxYChange + y + yChange, width, h, 0, y, width, h);
	//copy(img, 0, y, img.width, h, xChange - maxXChange, -maxYChange + y + yChange, img.width, h);
}

//------------------------------------------------------------
class crashNoise{
	constructor(x,y,ns){
		this.x = x;
		this.y = y;
		this.noiseSize = ns;
		this.end = false;
	}
	update(){
		push();
		noStroke();
		fill(3,4,18);
		
		rect(this.x,this.y,this.noiseSize,this.noiseSize);
		// rect(random(width),random(height),random(width),random(height));
		var movement = int(random(4));

		switch (movement) {
			case 0:
				this.y += this.noiseSize;
				break;
			case 1:
				this.y += this.noiseSize;
				break;
			case 2:
				this.y += this.noiseSize;
				break;
			case 3:
				this.y -= this.noiseSize;
				break;
			// default:
			// 	break;	
		}

		if (this.y > height) {
			this.end = true;
		}
		if (this.y < 0) {
			this.y += this.noiseSize;
		}
		pop();
	}
}
