var p = new Array();
var canvas;
let clickNum = 12;//発生数
let clickCount = 0;//発生確認用カウンター
var apperSpan = 18;//発生スパン闘値
var uraTriger = false;
var fadeCount = 32;
var apperUra = false;
var apperCircuit = true;
var markers = [];
var explorer = new Array();
var img = [];
function preload() {img = loadImage("assets/image/ura_logo.jp2");}
function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0,50);
    canvas.parent('sketch-holder');
    canvas.style('z-index','-99');
    canvas.style('padding','0');
    canvas.style('margin','0');
    canvas.style('width','100%');
    canvas.style('height','auto');
    smooth();stroke(255);rectMode(CENTER);
    initMarkers();serchDirection(markers[0]);
}
function initMarkers(){
    var cx = width/2;var cy = height/2;
    var c3x = width/3;var c3y = height/3;var c32x = c3x*2;var c32y = c3y*2;
    var margin_01 = 60;var margin_02 = margin_01/2;var margin_03 = margin_01/3;
    //８方位(direction) 0:下 2:右 4:上 6:左
    //U
    markers[0] = new marker(cx,cy,[1,0,1,0,1,0,0,0]);
    markers[1] = new marker(cx,c3y,[0,0,1,0,1,0,1,0]);
    markers[2] = new marker(cx-margin_01,c3y,[0,0,0,0,0,1,0,0]);
    markers[3] = new marker(cx-margin_01*2,c3y - margin_01,[0,0,0,0,1,0,0,0]);
    //R
    markers[4] = new marker(cx + margin_02,cy,[1,0,1,0,1,0,0,0]);
    markers[5] = new marker(cx + margin_02,c3y,[0,0,1,0,1,0,0,0]);
    markers[6] = new marker(cx + margin_01*3,c3y,[1,0,0,0,0,0,0,0]);
    markers[7] = new marker(cx + margin_01*3,c3y + margin_01,[0,0,0,0,0,0,0,1]);
    markers[8] = new marker(cx + margin_01*3 - margin_01,cy,[0,1,0,0,0,0,0,0]);
    markers[9] = new marker(cx + margin_02,c32y,[0,0,1,0,0,0,0,0]);
    //A
    markers[10] = new marker(cx,c32y,[1,0,0,0,0,0,1,0]);
    markers[11] = new marker(cx-margin_02*3,c32y,[0,0,0,0,0,0,0,1]);
    markers[12] = new marker(cx-margin_02*3 - margin_01,c32y+ margin_01,[1,0,0,0,0,0,0,0]);
    markers[13] = new marker(cx,c32y + margin_01*2 ,[1,0,0,0,0,0,1,0]);
    markers[14] = new marker(cx,c32y + margin_01*2 + margin_03,[1,0,0,0,0,0,0,1]);
    markers[15] = new marker(cx-margin_02*3 - margin_01,c32y + margin_01*2,[1,0,0,0,0,0,1,0]);
    markers[16] = new marker(cx-margin_02,c32y + margin_01*2 + margin_03 + margin_02,[1,0,0,0,0,0,0,0]);
}
function serchDirection(mar){for (var i = 0; i < 8; i++) {if(mar.direction[i] != 0){append(explorer, new Explorer(mar.position,i));}}}
function draw() {
    stroke(255);
    if(apperCircuit){
        for (var i = 0; i < p.length; i++) {
            p[i].step();
            if (p[i].blocked) p.splice(i, 1);
        }
    }
    if(apperUra){
        var explorerNum = 0;
        for (var i = 0; i < explorer.length; i++) {
            explorer[i].updata();
            explorerNum++;
            if (explorer[i].blocked) explorer.splice(i, 1);
        }
        for (var i = 0; i < explorer.length; i++) {
            for (var j = 0; j < markers.length; j++) {
                if(dist(explorer[i].position.x + explorer[i].speed * sin(explorer[i].angle)/5,
                    explorer[i].position.y  + explorer[i].speed * cos(explorer[i].angle)/5,
                    markers[j].position.x,markers[j].position.y) < 5){
                    stroke(map(dist(explorer[i].position.x, explorer[i].position.y, width/2, height/2), 0, 500, 0, 3),
                            map(dist(explorer[i].position.x, explorer[i].position.y, width/2, height/2), 0, 500, 231, 4),
                            map(dist(explorer[i].position.x, explorer[i].position.y, width/2, height/2), 0, 500, 216, 18));
                    ellipse(explorer[i].position.x, explorer[i].position.y, 7, 7);
                    explorer.splice(i, 1);
                    serchDirection(markers[j]);
                    markers.splice(j, 1);
                }
            }
        }
        if(markers.length < 3){
	        $(".headerLogoImg").css({
            'position':"absolute",
            'top':"50px",
            'left':0,
            'right':0
            });
	        $(".headerLogoImg").animate({ opacity: 1 }, { duration: 1500, easing: 'swing'});
        }
    }
    fill(0);stroke(255);
    if(clickNum != 0){
        var rn = int(random(100));
        if(clickCount >= apperSpan){
            var rx = random(width/4,width/4*3);
            var ry = random(height/4,height/4*3);
            for (var i = 0; i < 4; i++) {
                append(p, new Particle(createVector(rx,ry), i * 2*PI / 4));
            }
            clickNum--;
            if(clickNum < 1){
                apperUra = true;
            }
            if(apperSpan > 0){
            	apperSpan -= int(random(5));
            }else{
            	apperSpan = 0;
            }
            clickCount = 0;
        }
    }
    else{
        canvas.style('z-index','-99');
        $(function() {
          // 一旦hide()で隠してフェードインさせる
          $(".title").css({
            'position':"fixed",
            'background-color':"rgba(0,0,0,0.8)",
            'z-index':'2'
            });
          $(".titleImg").css({
            'position':"fixed",
            'width': "80%",
            'top':0,
            'left':0,
            'right':0
            });
          $(".title").animate({ opacity: 1 }, { duration: 1500, easing: 'swing'});          
         
        });
        // noLoop();
    }
    clickCount++;
}
function Particle(nl, na) {
    this.location = nl;this.angle = na;this.speed = 5;this.blocked = false;this.life = random(20, 200);
    this.step = function() {
        push();
        var old_x = this.location.x;
        var old_y = this.location.y;
        this.location.x += this.speed * sin(this.angle);
        this.location.y += this.speed * cos(this.angle);
        var n = random(200);
        this.angle += (n > 198) ? PI/4 : (n < 1) ? -PI/4 : 0;
        strokeWeight(2);
        var mn = max(width,height) /2;
        stroke(map(dist(this.location.x, this.location.y, width/2, height/2), 0, mn, 242, 3),
            map(dist(this.location.x, this.location.y, width/2, height/2), 0, mn, 123, 4),
            map(dist(this.location.x, this.location.y, width/2, height/2), 0, mn, 0, 18));
        strokeWeight(2);
        line(old_x, old_y, this.location.x, this.location.y);
        if (this.location.x < 1 ||
            this.location.x >= width - 1 ||
            this.location.y < 1 ||
            this.location.y >= height - 1) {
                this.blocked = true;
                return;
        }
        if (this.life > 0) {
            this.life--;
        }else{
            this.blocked = true;
            ellipse(this.location.x, this.location.y, 5, 5);
            return;
        }
        pop();
    }
}
class marker{
  //８方位(direction) 0:下 2:右 4:上 6:左
  constructor(x,y,d){
    this.position = createVector(x,y);
    this.direction = d;
    this.prePosition = this.position;
  }
}
class Explorer{
  constructor(p,fD){
    this.position = createVector(p.x,p.y);
    this.direction = fD;//int 0~7
    this.speed = 5;
    this.land = 5;
    this.angle = fD * PI / 4;
    this.life = random(50, 100);
    this.blocked = false;
  }
  updata(){
    push();
    var old_x = this.position.x;
    var old_y = this.position.y;
    this.position.x += this.speed * sin(this.angle);
    this.position.y += this.speed * cos(this.angle);
    var getCol = get(this.position.x, this.position.y);
    if((red(getCol) + green(getCol) +  blue(getCol)) != 0 && (red(getCol) <= 3 ))this.blocked = true;
    strokeWeight(3);
    var mn = max(width,height) /2;
        stroke(map(dist(this.position.x, this.position.y, width/2, height/2), 0, mn, 0, 3),
            map(dist(this.position.x, this.position.y, width/2, height/2), 0, mn, 231, 4),
            map(dist(this.position.x, this.position.y, width/2, height/2), 0, mn, 216, 18));
    line(old_x, old_y, this.position.x, this.position.y);
    pop();
  }
}

//---------------------
function mov0Btn(){
    var mov = document.getElementById('mov');
    // mov.innerHTML = '<iframe class="mov-container" src="https://player.vimeo.com/video/353201140" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>';
    mov.innerHTML = '<iframe class="mov-container" src="https://www.youtube.com/embed/lUwpAVnDQRM" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>';
    $(".btn-sf-like0").css({'background-color':"#ff7b00"});
    $(".btn-sf-like1").css({'background-color':"#565656"});
    $(".btn-sf-like3").css({'background-color':"#565656"});
    $(".btn-sf-like2").css({'background-color':"#565656"});
}
function mov1Btn(){
    var mov = document.getElementById('mov');
    mov.innerHTML = '<iframe class="mov-container" src="https://www.youtube.com/embed/sVE4vF81rrE" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>';
    $(".btn-sf-like1").css({'background-color':"#ff7b00"});
    $(".btn-sf-like2").css({'background-color':"#565656"});
    $(".btn-sf-like3").css({'background-color':"#565656"});
    $(".btn-sf-like0").css({'background-color':"#565656"});
}
function mov2Btn(){
    var mov = document.getElementById('mov');
    mov.innerHTML = '<p style ="text-align:center;height:10vh;">coming soon</p>';
    $(".btn-sf-like2").css({'background-color':"#ff7b00"});
    $(".btn-sf-like1").css({'background-color':"#565656"});
    $(".btn-sf-like3").css({'background-color':"#565656"});
    $(".btn-sf-like0").css({'background-color':"#565656"});
}
function mov3Btn(){
    var mov = document.getElementById('mov');
    // mov.innerHTML = '<iframe class="mov-container" src="https://player.vimeo.com/video/355798761" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>';
    mov.innerHTML = '<p style ="text-align:center;height:10vh;">coming soon</p>';
    $(".btn-sf-like3").css({'background-color':"#ff7b00"});
    $(".btn-sf-like2").css({'background-color':"#565656"});
    $(".btn-sf-like0").css({'background-color':"#565656"});
    $(".btn-sf-like1").css({'background-color':"#565656"});
}
$(function() {$('html,body').animate({ scrollTop: 0 }, '1');});