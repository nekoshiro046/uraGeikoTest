Pace.on('done', function(){$('.wrapper').fadeIn();});
//-------------------------------------
var img,img2,img3,img4;
var imgs = [];
var canvas;
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
var scene1Count = 0,scene2Count = 0,scene3Count = 0,scene4Count = 0;
var loadingCount = 0;
var loadingMax = 240;
var boxWidth,boxHeight;
var percentage = 0;
var fadeCount = 0;
var afterImg = false;
function preload() {
	img = loadImage("https://nekoshiro046.github.io/uraImg/image/mv.png");
	img2 = loadImage("https://nekoshiro046.github.io/uraImg/sketch02_imgs/jacked.png");
	img3 = loadImage("https://nekoshiro046.github.io/uraImg/image/ura_logo.jpg");
	img4 = loadImage("https://nekoshiro046.github.io/uraImg/sketch02_imgs/complete.png");

	imgs[0] = loadImage('https://nekoshiro046.github.io/uraImg/sketch02_imgs/pic01.png');
	imgs[1] = loadImage('https://nekoshiro046.github.io/uraImg/sketch02_imgs/pic02.png');
	imgs[2] = loadImage('https://nekoshiro046.github.io/uraImg/sketch02_imgs/pic03.png');
	imgs[3] = loadImage('https://nekoshiro046.github.io/uraImg/sketch02_imgs/pic04.png');
	imgs[4] = loadImage('https://nekoshiro046.github.io/uraImg/sketch02_imgs/pic05.jpg');
	imgs[5] = loadImage('https://nekoshiro046.github.io/uraImg/sketch02_imgs/pic06.jpg');
	imgs[6] = loadImage('https://nekoshiro046.github.io/uraImg/sketch02_imgs/pic07.jpg');
	imgs[7] = loadImage('https://nekoshiro046.github.io/uraImg/sketch02_imgs/pic08.jpg');
	imgs[8] = loadImage('https://nekoshiro046.github.io/uraImg/sketch02_imgs/pic09.jpg');
	imgs[9] = loadImage('https://nekoshiro046.github.io/uraImg/sketch02_imgs/pic10.jpg');
	imgs[10] = loadImage('https://nekoshiro046.github.io/uraImg/sketch02_imgs/pic11.png');
	imgs[11] = loadImage('https://nekoshiro046.github.io/uraImg/sketch02_imgs/pic12.jpg');
	imgs[12] = loadImage('https://nekoshiro046.github.io/uraImg/sketch02_imgs/pic13.jpg');
	imgs[13] = loadImage('https://nekoshiro046.github.io/uraImg/sketch02_imgs/pic14.jpg');
}
function setup() {
	canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0,0);
    canvas.parent('sketch-holder');
    canvas.style('z-index','-99');
    canvas.style('padding','0');
    canvas.style('margin','0');
    canvas.style('width','100%');
    canvas.style('height','auto');
    canvas.style('position','fixed');
    rectMode(CENTER);
	if(windowHeight > windowWidth){
		img.resize(width*1.5, height);
		img2.resize(width*1.5, height);
		img3.resize(width*1.5, height);
		img4.resize(width*1.5, height);
	}else{
		img.resize(width*1.25, height);
		img2.resize(width*1.25, height);
		img3.resize(width*1.25, height);
		img4.resize(width*1.25, height);
	}
	for (let i = 0; i < 100; i++) {drawStreak(img);}
	var nw = int(width / noiseSize);
	for(var i = 0;i <= noiseSize;i++){crashes[i] = new crashNoise(i*nw,0,nw);}
	boxWidth = width * 3 / 5;boxHeight = height / 32;	
}

function draw() {
	if(scene == 1){
		drawScene1();
		if(loadingCount < loadingMax){
			drawLoadScene();
			loadingCount++;
		}else{scene = 2;}
	}else if(scene == 2){
		drawScene2();
	}else if(scene == 3){
		drawScene3();
		drawImgNoise();
	}else if(scene == 4){
		drawScene4();
	}
}
function drawScene1(){
	if(mouseIsPressed){
		mouseCount++;
		if(mouseCount > 30)scene = 3;
	}
	for (let i = 0; i < height / 60; i++) { //dist(pmouseX, pmouseY, mouseX, mouseY) * 0.04; i++) {
		drawStreak(img);
	}
}

function drawLoadScene(){
	push();
	rectMode(CORNER);
	noStroke();
	fill(255);
	stroke(255);
	rect(width / 4, height / 2- boxHeight/2, boxWidth, boxHeight,20);
	fill(242, 123, 0);
	rect(width / 4, height / 2- boxHeight/2, boxWidth * percentage / loadingMax, boxHeight,20);
	if (percentage < loadingMax) {
		percentage++;
	}
	pop();
}

function drawImgNoise(){
	var rn = int(random(1,40));
  	switch(rn){	
	    case 39:
	      	push();colorMode(HSB);noStroke();background(0);
		  	let w = width;let h = height;
		  	for (x = 5 ; x < w ; x += 10) {
		    	fill(360, 0, 360);
		    	rect(x, h, 10, random(0,2000));
		    	rect(x, 0, 10, random(0,2000));
		  	}
		  	pop();
	      	break; 
	    case 38:
			var rn = int(random(13));image(imgs[rn],0,0,width,height);
	      	break;
	    case 37:
	    case 36:
	    case 35:
	    case 34:
			var rn = int(random(0,4));image(imgs[rn],0,0,width,height);
	      	break;  	    
	    default:
	      break;
  	}
}
function drawScene2(){
	push();
	noStroke();
	rectMode(CORNER);
	fill(0,scene2Count);
	noStroke();
	rect(0,0,windowWidth,windowHeight);
	$(".dataCompImg").css({
        'position':"absolute",
        'top':0,
        'bottom':0,
        'left':0,
        'right':0
    });
	$(".dataCompImg").animate({ opacity: 1 }, { duration: 1500, easing: 'swing'});
	if(mouseIsPressed)scene2Count++;
	scene2Count++;
	if (scene2Count > 150){
		$(".dataCompImg").css({
        	'opacity':"0",
        	'z-index':'-999'
    	});
  	// $("#dataCompImg").animate({ opacity: 0 }, { duration: 10, easing: 'swing'});
    	scene = 3;
	}
}


function drawScene3(){
	for (let i = 0; i < height / 60; i++) { //dist(pmouseX, pmouseY, mouseX, mouseY) * 0.04; i++) {
		drawStreak(img3);
	}
	if(mouseIsPressed)scene3Count++;
	scene3Count++;
	if (scene3Count > 300)scene = 4;
}

function drawScene4(){
	push();
	noStroke();
	rectMode(CORNER);
	fill(0,scene4Count);
	noStroke();
	rect(0,0,windowWidth,windowHeight);
	var rn = int(random(0,20));
	if(rn == 1){
		drawStreak(img2);
	}else if(rn == 2){
		drawStreak(img3);
	}else if(rn >5 || rn < 15){
		drawStreak(img4);
	}
	if(!afterImg){
		var htmlImg = document.getElementById('imgBox')
		htmlImg.innerHTML = '<img class = "dataCompImg" src="https://nekoshiro046.github.io/uraImg/sketch02_imgs/complete.png">';
		$(".dataCompImg").css({
		'width': '100%',
		'max-width': '600px',
		'height': 'auto',
		'max-height': '100vh',
		'margin': 'auto',
		'position':"absolute",
        'top':0,
        'bottom':0,
        'left':0,
        'right':0,
		'z-index':'0'
    	});
		$(".dataCompImg").animate({ opacity: 1 }, { duration: 2000, easing: 'swing'});
		afterImg = true;
	}
	pop();
	if(scene4Count < 255)scene4Count++;
}
function drawStreak(img) {
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
	image(img, xChange - maxXChange, -maxYChange + y + yChange, img.width, h, 0, y, img.width, h);
}
//------------------------------------------------------------
class crashNoise{
	constructor(x,y,ns){
		this.x = x;
		this.y = y;
		this.noiseSize = ns;
		this.end = false;
	}
	updata(){
		push();
		noStroke();
		fill(3,4,18);
		rect(this.x,this.y,this.noiseSize,this.noiseSize);
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
			default:
				break;	
		}
		if (this.y > height) {this.end = true;}
		if (this.y < 0) {this.y += this.noiseSize;}
		pop();
	}
}
