var p = new Array();
var side = 100;
let song;
var canvas;
let clickNum = 15;//発生数
let clickCount = 0;//発生確認用カウンター
var apperSpan = 45;//発生スパン闘値
var uraTriger = false;
var img;
var fadeCount = 0;
var apperUra = false;
var apperCircuit = true;

function windowResized(){
	resizeCanvas(windowWidth, windowHeight);
}

function preload(){
  img = loadImage('assets/image/ura.png');
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
    strokeWeight(1);
    // background(3,4,18);
    stroke(255);
    rectMode(CENTER);

  // song = loadSound('MPLab2.mp3');
}


function draw() {
    stroke(255);
    strokeWeight(2);

    if(apperCircuit){
        for (var i = 0; i < p.length; i++) {
            p[i].step();
            if (p[i].blocked) p.splice(i, 1);
        }
    }
    // for (var i = 0; i < p.length; i++) {
    //     p[i].step();
    //     if (p[i].blocked) p.splice(i, 1);
    // }

    fill(0);
    stroke(255);

    if(clickNum != 0){
        var rn = int(random(100));
        // if(rn == 0){
        if(clickCount >= apperSpan){
            var rx = random(width/4,width/4*3);
            var ry = random(height/4,height/4*3);
            for (var i = 0; i < 4; i++) {
                // append(p, new Particle(createVector(width/2, height/2), i * 2*PI / 4));
                append(p, new Particle(createVector(rx,ry), i * 2*PI / 4));
            }
            clickNum--;
            if(clickNum == 0){
                apperCircuit = false;
                apperUra = true;
            }
            
            if(apperSpan > 0){
            	apperSpan -= int(random(5));
            }else{
            	apperSpan = 0;
            }
            clickCount = 0;
        }
    }else if(clickNum == 0 && apperUra){
        // makeU();
        tint(255, fadeCount);
        image(img,0,0,width,height);
        fadeCount += 16;
        if(fadeCount > 255)apperUra = false;

        // noLoop();

    }else{
        $(function() {
 
          // 一旦hide()で隠してフェードインさせる
          $(".title").animate({ opacity: 1 }, { duration: 1500, easing: 'swing'});
         
        });
        noLoop();
    }

    clickCount++;
}

function makeU(){
    var rx = random(width/4,width/4*3);
    var ry = random(height/4,height/4*3);
    

    stroke(255,0,0);
    line(rx, ry, this.location.x, this.location.y);

}

// particle class
function Particle(new_location, new_angle) {
    // motion attributes
    this.location = new_location;
    this.angle = new_angle;
    this.speed = 5;

    // status
    this.blocked = false;
    this.life = random(20, 200);

    // one step into future
    this.step = function() {
        // save previous location for drawing
        var old_x = this.location.x;
        var old_y = this.location.y;

        // move current particle
        this.location.x += this.speed * sin(this.angle);
        this.location.y += this.speed * cos(this.angle);

        // move current particle only on the 8 directions
        // var angle_prime = PI / 4 * ceil(4 * this.angle / PI);
        // this.location.x += this.speed * sin(angle_prime);
        // this.location.y += this.speed * cos(angle_prime);

        // change angle randomly (continuous)
        // this.angle += random(-0.01, 0.01);

        // change angle randomly (probability)(maina virzienu, kantaini ceļi)
        var n = random(200);
        this.angle += (n > 198) ? PI/4 : (n < 1) ? -PI/4 : 0;

        // draw line (ja izdzesh uzrodas tikai galapunkti)
        stroke(map(dist(this.location.x, this.location.y, width/2, height/2), 0, 400, 255, 3),
        	map(dist(this.location.x, this.location.y, width/2, height/2), 0, 400, 100, 4),
        	map(dist(this.location.x, this.location.y, width/2, height/2), 0, 400, 20, 18));
        line(old_x, old_y, this.location.x, this.location.y);

        // delete itself if it hits window border
        if (this.location.x < 1 ||
            this.location.x >= width - 1 ||
            this.location.y < 1 ||
            this.location.y >= height - 1) {
                this.blocked = true;
                return;
        }

        // counts down life
        if (this.life > 0) {
            this.life--;
        } else {
            this.blocked = true;
            ellipse(this.location.x, this.location.y, 5, 5);
            return;
        }
    }
}

function mousePressed() {
  if (mouseX > width/2) {
    // .isPlaying() returns a boolean
    // song.stop();

  } else {
    // song.play();

  }
}
function mouseClicked() {
    // particle test
    for (var i = 0; i < 4; i++) {
        append(p, new Particle(createVector(mouseX, mouseY), i * 2*PI / 4));
    }
}