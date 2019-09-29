new p5(sketch1, "container1");
new p5(sketch2, "container2");

var sketch1 = function(p1) {

var p = new Array();

var canvas;
let clickNum = 12;//発生数
let clickCount = 0;//発生確認用カウンター
var apperSpan = 30;//発生スパン闘値
var uraTriger = false;
var fadeCount = 0;
var apperUra = false;
var apperCircuit = true;

var markers = [];
var explorer = new Array();

// function windowResized(){
// 	resizeCanvas(windowWidth, windowHeight);
// }

p1.setup = function() {
    canvas = p1.createCanvas(windowWidth, windowHeight);
    canvas.position(0,0);
    canvas.parent('sketch-holder');
    canvas.style('z-index','-99');
    canvas.style('padding','0');
    canvas.style('margin','0');
    canvas.style('width','100%');
    canvas.style('height','auto');
    // canvas.style('position','fixed');
    //canvas.class("pcanvas");

    // setup drawing
    p1.smooth();
    p1.strokeWeight(1);
    // background(3,4,18);
    p1.stroke(255);
    p1.rectMode(CENTER);

    p1.initMarkers();
    p1.serchDirection(markers[0]);

};

// function initMarkers(){
//   //８方位(direction) 0:下 2:右 4:上 6:左
//   markers[0] = new marker(width/2,height/2,[1,0,1,0,1,0,1,0]);
//   markers[1] = new marker(width/2,height/3,[0,0,1,0,1,1,0,0]);
//   markers[2] = new marker(width/2-(height/3-height/5 ),height/5,[0,0,0,0,1,0,0,0]);
//   markers[3] = new marker(width/2,height/3-20,[0,0,0,0,1,0,0,0]);
//   markers[4] = new marker(width/2-(height/3-height/5),height/5,[0,0,0,0,1,0,0,0]);

//   markers[5] = new marker(width/2+20,height/2,[1,1,1,0,1,0,1,0]);
//   markers[6] = new marker(width/2+20,height/3,[1,0,1,0,1,0,1,0]);
//   markers[7] = new marker(width/5*3,height/2,[0,0,0,1,0,0,0,0]);
//   markers[8] = new marker(width/2+20+height/10,height/2+height/10,[0,0,0,1,0,0,0,0]);
//   markers[9] = new marker(width/2+20+height/10+height/20,height/2+height/10-height/20,[0,0,0,0,0,1,0,0]);

//   markers[10] = new marker(width/2-width/10,height/2,[0,0,0,0,0,0,0,1]);
//   markers[11] = new marker(width/2-width/10 - height/10,height/2 + height/10 ,[1,0,0,0,0,0,0,0]);
//   markers[12] = new marker(width/2,height/2 + height/5,[1,0,0,0,0,0,1,0]);
//   markers[13] = new marker(width/2,height/2 + height/5 + 10,[0,0,0,0,0,0,0,1]);
//   markers[14] = new marker(width/2-width/10 - height/10,height/2 + height/5,[1,0,0,0,0,0,1,0]);
//   markers[15] = new marker(width/2 -15,height/2 + height/5 + 10 +15,[1,0,0,0,0,0,0,0]);
// }
p1.initMarkers = function() {
    var cx = width/2;var cy = height/2;
    var c3x = width/3;var c3y = height/3;var c32x = c3x*2;var c32y = c3y*2;
    var margin_01 = 60;var margin_02 = margin_01/2;var margin_03 = margin_01/3;
    
    //８方位(direction) 0:下 2:右 4:上 6:左
    markers[0] = new marker(cx,cy,[1,0,1,0,1,0,0,0]);
    markers[1] = new marker(cx,c3y,[0,0,1,0,1,0,1,0]);
    markers[2] = new marker(cx-margin_01,c3y,[0,0,0,0,0,1,0,0]);
    markers[3] = new marker(cx-margin_01*2,c3y - margin_01,[0,0,0,0,1,0,0,0]);

    markers[4] = new marker(cx + margin_02,cy,[1,0,1,0,1,0,0,0]);
    markers[5] = new marker(cx + margin_02,c3y,[0,0,1,0,1,0,0,0]);
    markers[6] = new marker(cx + margin_01*3,c3y,[1,0,0,0,0,0,0,0]);
    markers[7] = new marker(cx + margin_01*3,c3y + margin_01,[0,0,0,0,0,0,0,1]);
    markers[8] = new marker(cx + margin_01*3 - margin_01,cy,[0,1,0,0,0,0,0,0]);
    markers[9] = new marker(cx + margin_02,c32y,[0,0,1,0,0,0,0,0]);
    // markers[10] = new marker(cx + margin_02*5 - margin_01 + c3y/2,c32y,[0,0,1,0,0,0,0,0]);
    markers[10] = new marker(cx,c32y,[1,0,0,0,0,0,1,0]);
    markers[11] = new marker(cx-margin_02*3,c32y,[0,0,0,0,0,0,0,1]);
    markers[12] = new marker(cx-margin_02*3 - margin_01,c32y+ margin_01,[1,0,0,0,0,0,0,0]);
    markers[13] = new marker(cx,c32y + margin_01*2 ,[1,0,0,0,0,0,1,0]);
    markers[14] = new marker(cx,c32y + margin_01*2 + margin_03,[1,0,0,0,0,0,0,1]);
    markers[15] = new marker(cx-margin_02*3 - margin_01,c32y + margin_01*2,[1,0,0,0,0,0,1,0]);
    markers[16] = new marker(cx-margin_02,c32y + margin_01*2 + margin_03 + margin_02,[1,0,0,0,0,0,0,0]);

    // push();
    // strokeWeight(10);
    // point(cx + margin_02,margin_032);
    // pop();
};

p1.serchDirection = function(mar) {
  for (var i = 0; i < 8; i++) {
    if(mar.direction[i] != 0){
      p1.append(explorer, new Explorer(mar.position,i));
    }
  }
};


p1.draw = function() {
    p1.stroke(255);

    if(apperCircuit){
        for (var i = 0; i < p.length; i++) {
            p[i].p1.step();
            if (p[i].blocked) p.p1.splice(i, 1);
        }
    }

    if(apperUra){
        var explorerNum = 0;
        for (var i = 0; i < explorer.length; i++) {
            explorer[i].update();
            explorerNum++;
            if (explorer[i].blocked) explorer.p1.splice(i, 1);
        }

        for (var i = 0; i < explorer.length; i++) {
            for (var j = 0; j < markers.length; j++) {
                if(p1.dist(explorer[i].position.x + explorer[i].speed * p1.sin(explorer[i].angle)/2,
                    explorer[i].position.y  + explorer[i].speed * p1.cos(explorer[i].angle)/2
                    ,markers[j].position.x,markers[j].position.y) < 5){
                    // push();
                    // noFill();
                    // stroke(map(dist(explorer[i].position.x, explorer[i].position.y, width/2, height/2), 0, 500, 0, 3),
                    //         map(dist(explorer[i].position.x, explorer[i].position.y, width/2, height/2), 0, 500, 231, 4),
                    //         map(dist(explorer[i].position.x, explorer[i].position.y, width/2, height/2), 0, 500, 216, 18));
                    // ellipse(explorer[i].position.x + explorer[i].speed * sin(explorer[i].angle),
                    // explorer[i].position.y  + explorer[i].speed * cos(explorer[i].angle),7,7);

                    explorer.splice(i, 1);
                    p1.serchDirection(markers[j]);
                    markers.splice(j, 1);
                    // pop();
                }
            }
        }

        if(explorerNum == 0){
            p1.noLoop();
            p1.print("loopstop");
        }
    }

    // for (var i = 0; i < p.length; i++) {
    //     p[i].step();
    //     if (p[i].blocked) p.splice(i, 1);
    // }

    p1.fill(0);
    p1.stroke(255);

    if(clickNum != 0){
        var rn = int(p1.random(100));
        // if(rn == 0){
        if(clickCount >= apperSpan){
            var rx = p1.random(width/4,width/4*3);
            var ry = p1.random(height/4,height/4*3);
            for (var i = 0; i < 4; i++) {
                // append(p, new Particle(createVector(width/2, height/2), i * 2*PI / 4));
                p1.append(p, new Particle(p1.createVector(rx,ry), i * 2*PI / 4));
            }

            // for (var i = 0; i < 4; i++) {
            //     append(g, new Garticle(createVector(rx,ry), i * 2*PI / 4));
            // }
            clickNum--;
            if(clickNum < 1){
                // apperCircuit = false;
                apperUra = true;
            }
            
            if(apperSpan > 0){
            	apperSpan -= int(p1.random(5));
            }else{
            	apperSpan = 0;
            }
            clickCount = 0;
        }
    }
    // else if(clickNum == 0 && apperUra){
    //     // makeU();
    //     tint(255, fadeCount);
    //     image(img,0,0,width,height);
    //     fadeCount += 16;
    //     if(fadeCount > 255)apperUra = false;

    //     // noLoop();

    // }
    else{
        canvas.p1.style('z-index','-99');
        $(function() {
 
          // 一旦hide()で隠してフェードインさせる

          $(".title").css({
            'position':"fixed",
            'top':0,
            'background-color':"rgba(3,4,18,0.8)"
            });
          $(".title").animate({ opacity: 1 }, { duration: 1500, easing: 'swing'});
         
        });
        // noLoop();
    }

    clickCount++;
};

var sketch2 = function(p2) {
    p2.setup = function() {
          p2.createCanvas(200, 200);
          p2.background(200);
    };

    p2.draw = function() {
          p2.fill(0);
          p2.stroke(0);
          p2.ellipse(50, 50, 50, 50);
    };
};

//----------------------------------------------------

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
        push();
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

        strokeWeight(2);
        // draw line (ja izdzesh uzrodas tikai galapunkti)
        stroke(map(dist(this.location.x, this.location.y, width/2, height/2), 0, 500, 242, 3),
        	map(dist(this.location.x, this.location.y, width/2, height/2), 0, 500, 123, 4),
        	map(dist(this.location.x, this.location.y, width/2, height/2), 0, 500, 0, 18));
        strokeWeight(2);
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
        pop();
    }
}

class marker{
  //８方位(direction) 0:下 2:右 4:上 6:左
  constructor(x,y,direction){
    this.position = createVector(x,y);
    this.direction = direction;
    this.prePosition = this.position;

  }
}

class Explorer{
  constructor(pos,firstDirection){
    this.position = createVector(pos.x,pos.y);
    this.direction = firstDirection;//int 0~7
    // this.prePosition = this.position;
    this.speed = 5;
    this.land = 5;
    this.angle = firstDirection * PI / 4;
    this.life = random(50, 100);

    // status
    this.blocked = false;
  }

  update(){
    push();

    var old_x = this.position.x;
    var old_y = this.position.y;

    // move current particle
    this.position.x += this.speed * sin(this.angle);
    this.position.y += this.speed * cos(this.angle);

    var getCol = get(this.position.x, this.position.y);
    if((red(getCol) + green(getCol) +  blue(getCol)) != 0 && (red(getCol) <= 3 )){
      this.blocked = true;
      // stroke(map(dist(this.position.x, this.position.y, width/2, height/2), 0, 400, 0, 3),
      //       map(dist(this.position.x, this.position.y, width/2, height/2), 0, 400, 231, 4),
      //       map(dist(this.position.x, this.position.y, width/2, height/2), 0, 400, 216, 18));
      // // ellipse(this.position.x+this.land * sin(this.angle), this.position.y+this.land * cos(this.angle), 5, 5);
      // ellipse(this.position.x, this.position.y, 5, 5);
      // return;
    }
    // if((red(getCol) < 3 )){
    //   this.blocked = true;
    //   // return;
    // }
    strokeWeight(5);

    stroke(map(dist(this.position.x, this.position.y, width/2, height/2), 0, 500, 0, 3),
            map(dist(this.position.x, this.position.y, width/2, height/2), 0, 500, 231, 4),
            map(dist(this.position.x, this.position.y, width/2, height/2), 0, 500, 216, 18));
    line(old_x, old_y, this.position.x, this.position.y);

    // var getCol = get(this.position.x + this.speed * sin(this.angle), this.position.y + this.speed * cos(this.angle));
    // var getCol = get(this.position.x, this.position.y);
    // if((red(getCol) + green(getCol) +  blue(getCol)) != 0){
    //   this.blocked = true;
    //   return;
    // }

    pop();

    if (this.life > 0) {
        this.life--;
    } else {
        this.blocked = true;
        return;
    }

  }
}
};

var sketch2 = function(p) {
        p.setup = function() {
          p.createCanvas(200, 200);
          p.background(200);
        };

        p.draw = function() {
          p.fill(0);
          p.stroke(0);
          p.ellipse(50, 50, 50, 50);
        };
      };

//---------------------
function mov1Btn(){
    var mov = document.getElementById('mov');
    mov.innerHTML = '<iframe class="mov-container" src="https://player.vimeo.com/video/355798761" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>';
    $(".btn-sf-like1").css({
        'background-color':"red"
    });
    $(".btn-sf-like2").css({
        'background-color':"#565656"
    });
    $(".btn-sf-like3").css({
        'background-color':"#565656"
    });
    $(".btn-sf-like0").css({
        'background-color':"#565656"
    });
}
function mov2Btn(){
    var mov = document.getElementById('mov');
    mov.innerHTML = '<iframe class="mov-container" src="https://player.vimeo.com/video/353201140" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>';
    $(".btn-sf-like2").css({
        'background-color':"red"
    });
    $(".btn-sf-like1").css({
        'background-color':"#565656"
    });
    $(".btn-sf-like3").css({
        'background-color':"#565656"
    });
    $(".btn-sf-like0").css({
        'background-color':"#565656"
    });
}
function mov3Btn(){
    var mov = document.getElementById('mov');
    mov.innerHTML = '<iframe class="mov-container" src="https://player.vimeo.com/video/355798761" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>';
    $(".btn-sf-like3").css({
        'background-color':"red"
    });
    $(".btn-sf-like2").css({
        'background-color':"#565656"
    });
    $(".btn-sf-like0").css({
        'background-color':"#565656"
    });
    $(".btn-sf-like1").css({
        'background-color':"#565656"
    });
}
function mov0Btn(){
    var mov = document.getElementById('mov');
    mov.innerHTML = '<iframe class="mov-container" src="https://player.vimeo.com/video/353201140" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>';
    $(".btn-sf-like0").css({
        'background-color':"red"
    });
    $(".btn-sf-like1").css({
        'background-color':"#565656"
    });
    $(".btn-sf-like3").css({
        'background-color':"#565656"
    });
    $(".btn-sf-like2").css({
        'background-color':"#565656"
    });
}

$(function() {
    $('html,body').animate({ scrollTop: 0 }, '1');
});