Pace.on('done', function(){
    $('.wrapper').fadeIn();
});

//-------------------------------------
var img,img2,img3,img4;
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

var scene1Count = 0;
var scene2Count = 0;
var scene3Count = 0;

var loadingCount = 0;
var loadingMax = 240;

var boxWidth;
var boxHeight;
var percentage = 0;

var fadeCount = 0;

function preload() {
	img = loadImage("assets/image/mv.jpg");
	img2 = loadImage("assets/image/ura_logo.jpg");

	img3 = loadImage("assets/sketch02_imgs/ura_data_01.png");
	img4 = loadImage("assets/sketch02_imgs/ura_data_02.png");

	// img = loadImage("assets/sketch02_imgs/pic02.jpg");
	imgs[0] = loadImage('assets/sketch02_imgs/pic01.png');
	imgs[1] = loadImage('assets/sketch02_imgs/pic02.png');
	imgs[2] = loadImage('assets/sketch02_imgs/pic03.png');
	imgs[3] = loadImage('assets/sketch02_imgs/pic04.png');
	imgs[4] = loadImage('assets/sketch02_imgs/pic05.jpg');
	imgs[5] = loadImage('assets/sketch02_imgs/pic06.jpg');
	imgs[6] = loadImage('assets/sketch02_imgs/pic07.jpg');
	imgs[7] = loadImage('assets/sketch02_imgs/pic08.jpg');
	imgs[8] = loadImage('assets/sketch02_imgs/pic09.jpg');
	imgs[9] = loadImage('assets/sketch02_imgs/pic10.jpg');
	imgs[10] = loadImage('assets/sketch02_imgs/pic11.png');
	imgs[11] = loadImage('assets/sketch02_imgs/pic12.jpg');
	imgs[12] = loadImage('assets/sketch02_imgs/pic13.jpg');
	imgs[13] = loadImage('assets/sketch02_imgs/pic14.jpg');
	imgs[14] = loadImage('assets/sketch02_imgs/pic15.png');
}


function setup() {
	// canvas = createCanvas(windowWidth, windowHeight);
	canvas = createCanvas(constrain(img.width - maxXChange * 2, 100, windowWidth), constrain(img.height - maxYChange * 2, 100, windowHeight));
    canvas.position(0,0);
    canvas.parent('sketch-holder');
    canvas.style('z-index','-99');
    canvas.style('padding','0');
    canvas.style('margin','0');
    canvas.style('width','100%');
    canvas.style('height','auto');
    canvas.style('position','fixed');
    
    rectMode(CENTER);
    // frameRate(24);
	// createCanvas(constrain(img.width - maxXChange * 2, 100, windowWidth), constrain(img.height - maxYChange * 2, 100, windowHeight));
	// background(3,4,18);
	img.resize(width*1.5, height);
	img2.resize(width*1.5, height);
	img4.resize(width*1.5, height);
	// image(img, -maxXChange, -maxYChange,width,img.width * height / width);
	for (let i = 0; i < 100; i++) {
		drawStreak();
	}

	var nw = int(width / noiseSize);

	for(var i = 0;i <= noiseSize;i++){
		crashes[i] = new crashNoise(i*nw,0,nw);
	}

	boxWidth = width * 3 / 5;
	boxHeight = height / 32;	
}

function draw() {
	if(scene == 1){
		drawScene1();
		if(loadingCount < loadingMax){
			drawLoadScene();
			loadingCount++;
		}else{
			scene = 2;
			// drawImgNoise();
		}
	}
	else if(scene == 2){
		drawScene2();
	}
	else if(scene == 3){
		drawScene3();
		drawImgNoise();
	}
	else if(scene == 4){
		drawScene4();
	}

	// print(scene);
}

function drawScene1(){
	if(mouseIsPressed){
		mouseCount++;
		if(mouseCount > 30)scene = 3;
	}
	for (let i = 0; i < height / 60; i++) { //dist(pmouseX, pmouseY, mouseX, mouseY) * 0.04; i++) {
		drawStreak();
	}
}

function drawLoadScene(){
	push();
	rectMode(CORNER);
	noStroke();

	fill(255);
	stroke(255);
	rect(width / 4, height / 2- boxHeight/2, boxWidth, boxHeight,20);
	// fill(0, 231, 216);
	fill(242, 123, 0);
	rect(width / 4, height / 2- boxHeight/2, boxWidth * percentage / loadingMax, boxHeight,20);
	
	if (percentage < loadingMax) {
		percentage++;
	}
	pop();
}

function drawImgNoise(){
	var rn = int(random(1,40));
	// var rn = int(random(1,scene1Count));
	// if(scene1Count < 60){
	// 	scene1Count++;
	// }else{
	// }
  	switch(rn){	
	    case 39:
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
	    case 38:
			var rn = int(random(14));
  			image(imgs[rn],0,0,width,height);
	      	break;
	    case 37:
	    case 36:
	    case 35:
	    case 34:
			var rn = int(random(0,4));
  			image(imgs[rn],0,0,width,height);
	      	break;  	    
	    default:
	      break;
  	}

}

// function drawScene2_0(){
// 	for(var i = 0; i < crashes.length; i++){
// 		crashes[i].updata();
// 		if (crashes[i].end) crashes.splice(i, 1);
// 		// print("awake");
// 	}
// 	if(crashes.length < 1){
// 		scene = 3;
// 	}
// 	noLop();
// }
function drawScene2(){
	push();
	noStroke();
	rectMode(CORNER);
	fill(3,4,18,scene2Count);
	noStroke();
	rect(0,0,windowWidth,windowHeight);

	if(mouseIsPressed){
		scene2Count++;
		// if(mouseCount > 30)scene = 3;
	}
	scene2Count++;
	if (scene2Count > 120) {
		scene = 3;
	}
}


function drawScene3(){
	for (let i = 0; i < height / 60; i++) { //dist(pmouseX, pmouseY, mouseX, mouseY) * 0.04; i++) {
		drawStreak2();
	}
	if(mouseIsPressed){
		scene3Count++;
		// if(mouseCount > 30)scene = 3;
	}
	scene3Count++;
	if (scene3Count > 600) {
		scene = 4;
	}
}

function drawScene4(){
	push();
	noStroke();
	rectMode(CORNER);
	fill(3,4,18,scene2Count);
	noStroke();
	rect(0,0,windowWidth,windowHeight);

	// tint(255, fadeCount);
	// image(img4,0,0,width,height);
	// fadeCount += 16;
	// if(fadeCount > 255){
	//     noLoop();
 //        print("loopstop");
	// }
	$(".dataCompImg").css({
        'position':"absolute",
        'top':0,
        'bottom':0,
        'left':0,
        'right':0
        // 'margin-top':"50px"
    });
	$(".dataCompImg").animate({ opacity: 1 }, { duration: 2000, easing: 'swing'});
	pop();

	var rn = int(random(0,40));
	if(rn == 1){
		drawStreak2();
	}else if(rn == 2){
		drawStreak3();
	}
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

function drawStreak2() {
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
	
	image(img2, xChange - maxXChange, -maxYChange + y + yChange, img2.width, h, 0, y, img2.width, h);
	// image(img, xChange - maxXChange, -maxYChange + y + yChange, width, h, 0, y, width, h);
	//copy(img, 0, y, img.width, h, xChange - maxXChange, -maxYChange + y + yChange, img.width, h);
}

function drawStreak3() {
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
	
	image(img4, xChange - maxXChange, -maxYChange + y + yChange, img4.width, h, 0, y, img4.width, h);
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
	updata(){
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
