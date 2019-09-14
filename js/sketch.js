
var img;
var img1;
var img2;
var slider;
var cols = 40;
var rows = 40;
var boxes;
var boxHolder;

// preload the images to be used for the checkboxes
function preload(){
  img1 = loadImage('assets/image/ura_m.png');
  img2 = loadImage('assets/image/ura_b.png');
}

function setup() {
  // the html dom elements are not rendered on canvas
  noCanvas();
  // set pixel density to 1
  pixelDensity(1);
  boxHolder = createDiv('');
  boxHolder.id('mirror');

  boxes = [];

  // set the current img
  img = img1;
  img.resize(cols, rows);
  img.loadPixels();

  for (var y = 0; y < rows; y++) {
    for (var x = 0; x < cols; x++) {
      var box = createCheckbox();
      box.style('display', 'inline');
      box.parent('mirror');
      boxes.push(box);
    }
    var linebreak = createSpan('<br/>');
    linebreak.parent('mirror');
  }

  // add a slider to adjust the pixel threshold
  slider = createSlider(0, 255, 0);
}

function draw() {
  for (var y = 0; y < img.height; y++) {
    for (var x = 0; x < img.height; x++) {
      var c = color(img.get(x, y));
      var bright = (red(c) + green(c) + blue(c)) / 3;

      // get the threshold from the slider
      var threshold = slider.value();

      var checkIndex = x + y * cols;

      if (bright > threshold) {
        boxes[checkIndex].checked(false);
      } else {
        boxes[checkIndex].checked(true);
      }
    }
  }
}

function keyPressed() {
  if (key == '1') img = img1;
  if (key == '2') img = img2;
  if (key == '3') img = img3;

  img.resize(cols, rows);
  img.loadPixels();
}