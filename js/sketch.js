var markers = [];
var explorer = new Array();


// preload the images to be used for the checkboxes
function preload(){
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
    // background(3,4,18);
  stroke(255);

  initMarkers();
  // point(width/2+40+height/10+height/20,height/2+height/10-height/20);

  serchDirection(markers[0]);
  
}

function initMarkers(){
  //８方位(direction) 0:下 2:右 4:上 6:左
  markers[0] = new marker(width/2,height/2,[1,0,1,0,1,0,1,0]);
  markers[1] = new marker(width/2,height/3,[0,0,1,0,1,1,0,0]);
  markers[2] = new marker(width/2-(height/3-height/4),height/4,[0,0,0,0,1,0,0,0]);
  markers[3] = new marker(width/2,height/3-20,[0,0,0,0,1,1,0,0]);
  markers[4] = new marker(width/2-(height/3-height/4),height/4-20,[0,0,0,0,1,0,0,0]);

  markers[5] = new marker(width/2+30,height/2,[1,1,1,0,1,0,1,0]);
  markers[6] = new marker(width/2+30,height/3,[1,0,1,0,1,0,1,0]);
  markers[7] = new marker(width/5*3,height/2,[0,0,0,1,0,0,0,0]);
  markers[8] = new marker(width/2+30+height/10,height/2+height/10,[0,0,0,1,0,0,0,0]);
  markers[9] = new marker(width/2+30+height/10+height/20,height/2+height/10-height/20,[0,0,0,0,0,1,0,0]);

  markers[10] = new marker(width/2-width/10,height/2,[0,0,0,0,0,0,0,1]);
  markers[11] = new marker(width/2-width/10 - height/10,height/2 + height/10 ,[1,0,0,0,0,0,0,0]);
  markers[12] = new marker(width/2,height/2 + height/5,[1,0,0,0,0,0,1,0]);
  markers[13] = new marker(width/2,height/2 + height/5 + 10,[0,0,0,0,0,0,0,1]);
  markers[14] = new marker(width/2-width/10 - height/10,height/2 + height/5,[1,0,0,0,0,0,1,0]);
  markers[15] = new marker(width/2 -15,height/2 + height/5 + 10 +15,[1,0,0,0,0,0,0,0]);
}

function serchDirection(mar){
  for (var i = 0; i < 8; i++) {
    if(mar.direction[i] != 0){
      append(explorer, new Explorer(mar.position,i));
    }
  }

}

function draw() {
  for (var i = 0; i < explorer.length; i++) {
    explorer[i].update();
    if (explorer[i].blocked) explorer.splice(i, 1);
  }

  for (var i = 0; i < explorer.length; i++) {
    for (var j = 0; j < markers.length; j++) {
      if(dist(explorer[i].position.x,explorer[i].position.y,markers[j].position.x,markers[j].position.y) < 5){
        explorer.splice(i, 1);
        serchDirection(markers[j]);
        markers.splice(j, 1);
      }
    }
  }

  // for (var i = 0; i < explorer.length; i++) {
  //   explorer[i].draw();
  // }

  


  
}

//----------------------------------------------------
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
    this.angle = firstDirection * PI / 4;

    // status
    this.blocked = false;
  }

  update(){
    var old_x = this.position.x;
    var old_y = this.position.y;

        // move current particle
    this.position.x += this.speed * sin(this.angle);
    this.position.y += this.speed * cos(this.angle);

    var getCol = get(this.position.x, this.position.y);
    if((red(getCol) + green(getCol) +  blue(getCol)) != 0){
      this.blocked = true;
      // return;
    }

    stroke(map(dist(this.position.x, this.position.y, width/2, height/2), 0, 400, 0, 3),
            map(dist(this.position.x, this.position.y, width/2, height/2), 0, 400, 231, 4),
            map(dist(this.position.x, this.position.y, width/2, height/2), 0, 400, 216, 18));
    line(old_x, old_y, this.position.x, this.position.y);

    // var getCol = get(this.position.x + this.speed * sin(this.angle), this.position.y + this.speed * cos(this.angle));
    // var getCol = get(this.position.x, this.position.y);
    // if((red(getCol) + green(getCol) +  blue(getCol)) != 0){
    //   this.blocked = true;
    //   return;
    // }

  }



  // draw(){
  //   stroke(map(dist(this.location.x, this.location.y, width/2, height/2), 0, 400, 255, 3),
  //         map(dist(this.location.x, this.location.y, width/2, height/2), 0, 400, 100, 4),
  //         map(dist(this.location.x, this.location.y, width/2, height/2), 0, 400, 20, 18));
  //   line(old_x, old_y, this.location.x, this.location.y);
  // }


}