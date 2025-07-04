let circles = [
  [54, 48], [172, 25], [292, 3], [28, 160], [140, 136], [254, 110], [378, 80],
  [-8, 268], [108, 248], [224, 220], [340, 192], [64, 356], [184, 340], [304, 308],
  [420, 284], [260, 428], [380, 400]
];

//The radius of all circles is set to 54
const RADIUS = 54;

// song will hold the audio data we load from disk
// analyser will hold the amplitude data from the audio
let song, analyser;

// Let's make variables for the volume and pan
// We will start the volume at 1.0 (full volume) 
let volume = 1.0;
// We will start the pan at 0.0 (centre). It goes from -1.0 (left only) to 1.0 (right only)
let pan = 0.0;

// Let's load the sound file in preload
function preload() {
  song = loadSound('audio/drumbeat.MP3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  //Create a new Amplitude analyser, this will analyse the volume of the songAdd commentMore actions
  analyser = new p5.Amplitude();

  //Connect the input of the analyser to the song
  analyser.setInput(song);

  //Create the play/pause button in setup()
  let button = createButton('Play/Pause');
  
  //Place the button in the bottom center of the canvas
  button.position((width - button.width) / 2, height - button.height - 2);
  button.mousePressed(play_pause);
}

function windowResized() {
  //Reset the canvas and redraw when the window changes
  resizeCanvas(windowWidth, windowHeight);
  redraw();
}

function draw() {
  background(255);

  const baseSize = 400;
  const s = min(width / baseSize, height / baseSize);

  //Scale and center the 400×400 stage
  push();
    translate((width  - baseSize * s) / 2, (height - baseSize * s) / 2);
    scale(s);

    /**
     * First save the current canvas state, start a new path and define the clipping area with a rectangle of (0,0)-(baseSize,baseSize), 
     * then call clip() so that subsequent drawing is only visible inside the rectangle.
     */
    drawingContext.save();
    drawingContext.beginPath();
    drawingContext.rect(0, 0, baseSize, baseSize);
    drawingContext.clip();
    
    //background
    noStroke();
    fill(255);
    triangle(0, 0, 400, 0, 0, 400);
    fill(0);
    triangle(400, 400, 400, 0, 0, 400);

    //circles
    noStroke();
    fill(255);
    for (let [x, y] of circles) {
      ellipse(x, y, RADIUS * 2, RADIUS * 2);
    }

    let level = analyser.getLevel();
    let scaleFactor = map(level, 0, 0.5, 1, 0.5);
    scaleFactor = constrain(scaleFactor, 0.5, 1);
    /**
    *For each circle, we first push() to save the canvas state, translate(x, y) to move the origin to the center of the circle, 
    *scale(scaleFactor) according to the amplitude, then draw the graphics at (0,0), and finally pop() to restore, 
    *so that the circle can be enlarged and reduced around its own center with the drumbeat.
    */
    push(); translate(254,110); scale(scaleFactor); drawSunMoon(0,0); pop();
    push(); translate(54, 48); scale(scaleFactor); drawSunMoon(0, 0); pop();

    push(); translate(140, 136); scale(scaleFactor); drawEgg(0, 0); pop();
    push(); translate(-8, 268); scale(scaleFactor); drawEgg(0, 0); pop();

    push(); translate(108, 248); scale(scaleFactor); drawGreenCircle(0, 0); pop();
    push(); translate(292, 3); scale(scaleFactor); drawGreenCircle(0, 0); pop();

    push(); translate(28, 160); scale(scaleFactor); drawBlueCircle(0, 0); pop();
    push(); translate(172, 25); scale(scaleFactor); drawBlueCircle(0, 0); pop();

    push(); translate(340, 192); scale(scaleFactor); drawConcentricCircles(0, 0); pop();
    push(); translate(184, 340); scale(scaleFactor); drawConcentricCircles(0, 0); pop();

    push(); translate(64, 356); scale(scaleFactor); drawFlawerCircles(0, 0); pop();
    push(); translate(304, 308); scale(scaleFactor); drawFlawerCircles(0, 0); pop();

    push(); translate(224, 220); scale(scaleFactor); drawSectorCircles(0, 0); pop();
    push(); translate(420, 284); scale(scaleFactor); drawSectorCircles(0, 0); pop();

    push(); translate(378, 80); scale(scaleFactor); drawBlackCircles(0, 0); pop();
    push(); translate(260, 428); scale(scaleFactor); drawBlackCircles(0, 0); pop();

    push(); translate(380, 400); scale(scaleFactor); drawRedCircle(0, 0); pop();

    //Display the current volume and pan on the screen
    fill(0);
    textSize(18);
    //We will limit the number of decimal places to 2 using the function toFixed(2)
    text('Volume: ' + volume.toFixed(2), 10, 20);
    //Draw the pan value on the screen
    text('Pan: ' + pan.toFixed(2), 10, 40);

    drawingContext.restore();
  pop();
}

//Play/pause audio callback functionAdd commentMore actions
function play_pause() {
  if (song.isPlaying()) {
    song.stop();
  } else {
    song.loop();
  }
}

function mouseMoved() {
  // Map the mouseY to a volume value between 0 and 1
  volume = map(mouseY, 0, height, 1, 0);
  song.setVolume(volume);

  // Map the mouseX to a pan value between -1 and 1
  pan = map(mouseX, 0, width, -1, 1);
  song.pan(pan);
}

//Drawing on drawSunMoon(252, 108) and drawSunMoon(54,52)
function drawSunMoon(cx, cy) {
  const orange = color(241, 168, 128);
  const DarkOrange = color(236, 120, 46);
  const white = color(255);

  //Draw a circle
  strokeWeight(5);
  stroke(orange);
  noFill();
  ellipse(cx, cy, RADIUS * 2, RADIUS * 2);

  //Draw the "left semicircle" and fill it with orange
  noStroke();
  fill(orange);
  arc(cx, cy, RADIUS * 2, RADIUS * 2, PI / 2, 3 * PI / 2);

  //Draw a small white circle in the center——diameter 40
  fill(white);
  ellipse(cx, cy, 40, 40);

  //Draw another orange semicircle (radius 20) on the right half of the small white circle in the center.
  fill(DarkOrange);
  arc(cx, cy, 40, 40, -PI / 2, PI / 2);
  //Draw a small five-pointed star inside the orange semicircle in the previous step
  //Place the center of the star in the center area of ​​the right half of the small circle, here select (cx + 7, cy)
  drawStar(cx + 7, cy, 6, 4);

  //Draw radial lines around the circle
  //12 lines on the left side, white; 12 lines on the right side, orange; strokeWeight = 3
  const totalPerSide = 10;
  const step = PI / totalPerSide; //The angle between each line

  //The right half (from -PI/2 to +PI/2) is in orange
  strokeWeight(3);
  stroke(DarkOrange);
  for (let i = 0; i < totalPerSide; i++) {
    const angle = -PI / 2 + i * step;
    //Line from slightly inside radius RADIUS*1.05 to outside radius RADIUS*1.3
    const r1 = RADIUS * 0.9;
    const r2 = RADIUS * 0.6;
    const x1 = cx + cos(angle) * r1;
    const y1 = cy + sin(angle) * r1;
    const x2 = cx + cos(angle) * r2;
    const y2 = cy + sin(angle) * r2;
    line(x1, y1, x2, y2);
  }
  //The left half (from PI/2 to 3*PI/2) is white
  stroke(white);
  for (let i = 0; i < totalPerSide; i++) {
    const angle = PI / 2 + i * step;
    const r1 = RADIUS * 0.9;
    const r2 = RADIUS * 0.6;
    const x1 = cx + cos(angle) * r1;
    const y1 = cy + sin(angle) * r1;
    const x2 = cx + cos(angle) * r2;
    const y2 = cy + sin(angle) * r2;
    line(x1, y1, x2, y2);
  }
}

/**
 * Draw a five-pointed star at (x, y), where:
 * @param {*} rOuter the length from the tip of the star to the center of the star
 * @param {*} rInner the length from the valley of the star to the center of the star
 */
function drawStar(x, y, rOuter, rInner) {
  fill(255);
  noStroke();
  beginShape();
  let angle = -PI / 2;
  const step = TWO_PI / 5;
  for (let i = 0; i < 5; i++) {
    vertex(
      x + cos(angle) * rOuter,
      y + sin(angle) * rOuter
    );
    angle += step / 2;
    vertex(
      x + cos(angle) * rInner,
      y + sin(angle) * rInner
    );
    angle += step / 2;
  }
  endShape(CLOSE);
}

//Drawing on drawEgg(140,136) 和 drawEgg(-8, 268)
function drawEgg(cx, cy) {
  const Egg = color(255, 214, 160);
  const Egg2 = color(254, 181, 81);
  const Egg3 = color(255, 255, 255);
  const dark = color(235, 167, 85);
  const heartGreen = color(189, 213, 131);

  //Draw a light orange circle with a thick stroke (strokeWeight = 10)
  strokeWeight(10);
  stroke(Egg);
  noFill();
  //DIAMETER = RADIUS * 2 = 108
  ellipse(cx, cy, (RADIUS * 2) - 10, (RADIUS * 2) - 10);

  //Draw a light orange solid circle with a radius of 30 in the center
  noStroke();
  fill(Egg2);
  ellipse(cx, cy, 50, 50);

  noStroke();
  fill(Egg3);
  ellipse(cx, cy, 20, 20);

  //Add a dark brown thin stroke around the edge of the center solid circle.
  strokeWeight(2);
  stroke(dark);
  noFill();
  ellipse(cx, cy, RADIUS * 2, RADIUS * 2);

  //Insert 8 light green hearts on the white ring
  const heartCount = 8;
  const ringRadius = RADIUS - 15;
  const heartSize = 15;

  noStroke();
  fill(heartGreen);
  for (let i = 0; i < heartCount; i++) {
    const angle = (TWO_PI / heartCount) * i - PI / 2;
    const hx = cx + cos(angle) * ringRadius;
    const hy = cy + sin(angle) * ringRadius;
    drawHeart(hx, hy, heartSize, heartGreen);
  }
}

/**
* Draw a solid heart at (x, y), with a size of approximately size,
* Made up of two small circles + a triangle
 */
function drawHeart(x, y, size, c) {
  fill(c);
  noStroke();

  const r = size * 0.47;
  const offset = size * 0.35; //The offset between the center of the circle and the vertex of the triangle

  //left
  ellipse(x - offset * 0.5, y - offset * 0.5, r, r);
  //right
  ellipse(x + offset * 0.5, y - offset * 0.5, r, r);
  //bottom
  beginShape();
  vertex(x - r * 0.5, y);//left
  vertex(x + r * 0.5, y);//right
  vertex(x, y + offset * 0.5); //bottom
  endShape(CLOSE);
}

/**
 * Drawing on drawGreenCircle(108,248) and drawGreenCircle(292, 3)
 */
function drawGreenCircle(cx, cy) {
  const green = color(166, 198, 124);
  const paleGreen = color(187, 214, 161);
  const red = color(227, 170, 155);
  const yellow = color(239, 199, 120);

  //Outer green stroke (stroke 3) - keep the diameter at 108 and extend the stroke 1.5 pixels inside and outside the grey circle
  strokeWeight(3);
  stroke(green);
  noFill();
  ellipse(cx, cy, (RADIUS * 2) - 3, (RADIUS * 2) - 3);

  strokeWeight(6);
  stroke(green);
  noFill();
  ellipse(cx, cy, (RADIUS * 2) - 20, (RADIUS * 2) - 20);

  strokeWeight(3);
  stroke(red);
  noFill();
  ellipse(cx, cy, (RADIUS * 2) - 35, (RADIUS * 2) - 35);

  strokeWeight(3);
  stroke(yellow);
  noFill();
  ellipse(cx, cy, (RADIUS * 2) - 49, (RADIUS * 2) - 49);

  //A light green solid circle with a center radius of 20
  noStroke();
  fill(paleGreen);
  ellipse(cx, cy, 40, 40);

//Randomly distribute 40 small white dots inside the light green circle above
//Make the dots evenly distributed within a radius of 10: use sqrt(random()) * r to get a uniform distribution
  fill(255);
  noStroke();
  const dotCount = 40;
  const maxR = 10; //Max radius

  for (let i = 0; i < dotCount; i++) {
    //random degree
    const angle = random(0, TWO_PI);
    //Random radius, using sqrt(random()) to ensure that the points are evenly distributed within the circle
    const r = sqrt(random()) * maxR;
    const dx = cos(angle) * r;
    const dy = sin(angle) * r;
    //The radius of the small white dot is about 1 pixel (diameter 2)
    ellipse(cx + dx, cy + dy, 2, 2);
  }
}

/**
 * Drawing on drawBlueCircle(28, 160) and drawBlueCircle(172, 28)
 */
function drawBlueCircle(cx, cy) {
  //define lightblue
  const lightBlue = color(163, 202, 217);
  const lightRed = color(235, 190, 181);
  const lightYellow = color(234, 205, 155);

  //Light blue stroke for the outer circle (stroke = 5), diameter remains RADIUS*2 = 108
  strokeWeight(5);
  stroke(lightBlue);
  noFill();
  ellipse(cx, cy, (RADIUS * 2) - 5, (RADIUS * 2) - 5);

  strokeWeight(5);
  stroke(lightRed);
  noFill();
  ellipse(cx, cy, (RADIUS * 2) - 27, (RADIUS * 2) - 27);

  strokeWeight(5);
  stroke(lightYellow);
  noFill();
  ellipse(cx, cy, (RADIUS * 2) - 50, (RADIUS * 2) - 50);


  //On the white band between the three strokes above, draw 16 groups of two small circles with a radius of 1.5
  //Calculate the radii of the red and yellow rings
  const radiusRed = ((RADIUS * 2) - 27) / 2;
  const radiusYellow = ((RADIUS * 2) - 50) / 2;
  //The center radius of the white ring
  const ringMid = (radiusRed + radiusYellow) / 2;

  //Set the radius of the small circle and the offset along the tangent direction
  const smallR = 1.5;
  const offsetDistance = smallR; //Let the distance between the centers of two adjacent small circles be 3  (radius*2), and multiply the tangent unit vector by smallR
  noStroke();
  fill(lightRed);

  const total = 16;
  const angleStep = TWO_PI / total;

  for (let i = 0; i < total; i++) {
    const angle = -PI / 2 + i * angleStep; 
    //The reference point (bx, by) is located at the center of the white ring
    const bx = cx + cos(angle) * ringMid;
    const by = cy + sin(angle) * ringMid;

    //Compute the unit vector (tx, ty) in the direction of the tangent line
    const tx = -sin(angle);
    const ty = cos(angle);

    //circles
    const x1 = bx + tx * offsetDistance;
    const y1 = by + ty * offsetDistance;
    const x2 = bx - tx * offsetDistance;
    const y2 = by - ty * offsetDistance;

    //radius = 2
    ellipse(x1, y1, smallR * 2, smallR * 2);
    ellipse(x2, y2, smallR * 2, smallR * 2);
  }

  //Light blue solid circle with center radius 20 (diameter 40)
  noStroke();
  fill(lightBlue);
  ellipse(cx, cy, 40, 40);
}
/**
 * Drawing on drawConcentricCircles(340,192) and drawConcentricCircles(184,340)
 */

function drawConcentricCircles(cx, cy) {
  //Outermost layer: 36 oil painting style color blocks 
  const numBlocks = 36;
  
  const fixedWeights = Array(numBlocks).fill(1);
  const totalW = fixedWeights.reduce((sum, w) => sum + w, 0);
  const angles = fixedWeights.map(w => (w / totalW) * TWO_PI);

  //Outermost color ring
  const oilPalette = [
    [138,  54,  15], // Burnt Sienna
    [ 99,  81,  71], // Raw Umber
    [204, 183, 102], // Yellow Ochre
    [227,   0,  34], // Cadmium Red
    [227,  38,  54], // Alizarin Crimson
    [  0,  49,  83], // Prussian Blue
    [  0, 105,  70], // Phthalo Green
    [ 64, 130, 109], // Viridian
    [ 41,  36,  33], // Ivory Black
    [255, 255, 255]  // Titanium White
  ];

  // Draw the outermost 36 equiangular oil painting fan shapes
  noStroke();
  let currentAngle = 0;
  for (let i = 0; i < numBlocks; i++) {
    const [r, g, b] = oilPalette[i % oilPalette.length];
    fill(r, g, b);
    arc(
      cx, cy,
      RADIUS * 2,      
      RADIUS * 2,
      currentAngle,
      currentAngle + angles[i],
      PIE
    );
    currentAngle += angles[i];
  }

  // The middle 5 concentric circles
  noStroke();
  fill(150,  30,  30);
  ellipse(cx, cy, 80, 80);

  fill(200, 100,   0);
  ellipse(cx, cy, 65, 65);

  fill( 80,   0,  80);
  ellipse(cx, cy, 50, 50);

  fill(  0,  60,  30);
  ellipse(cx, cy, 35, 35);

  fill( 25,  25, 112);
  ellipse(cx, cy, 20, 20);

  //Outermost blue border 
  noFill();
  stroke(30, 55, 120); 
  strokeWeight(2);
  ellipse(cx, cy, (RADIUS * 2) + 2, (RADIUS * 2) + 2);

  colorMode(RGB, 255);
}

/**
 * Drawing on drawFlawerCircles(64,356) and drawFlawerCircles(304,308);It is composed of 20 sectors, and 14 petals are drawn on the sector circle.
*/
function drawFlawerCircles(cx, cy) {
  const numSlices = 20; //  The outermost layer uses 20 sectors to fill the entire circle 
  const angleStep = TWO_PI / numSlices;

  const oilPalette = [
   [205,  92,   0],   
   [ 87,   1,  79],   
   [ 34,  34,  59],   
   [184, 134,  11],   
   [ 255, 65, 108],   
   [227, 0, 34],   
   [152, 255, 152],   
   [147, 112, 219],   
   [ 25,  25, 112],   
  ];

  noStroke();
  for (let i = 0; i < numSlices; i++) {
    const [r, g, b] = oilPalette[i % oilPalette.length];
    fill(r, g, b);
    arc(
      cx, cy,
      RADIUS * 2,     
      RADIUS * 2,
      i * angleStep,
      (i + 1) * angleStep,
      PIE
    );
  }

  // Draw 14 petals
  const numPetals = 14;
  const petalAngle = TWO_PI / numPetals;

  const petalLength = RADIUS * 1.2;  
  const petalWidth  = 12;           
  const petalOffset = petalLength / 2;

  noStroke();
  for (let i = 0; i < numPetals; i++) {
    const [rCol, gCol, bCol] = oilPalette[i % oilPalette.length];
    fill(rCol, gCol, bCol);

    const theta = i * petalAngle - PI / 2;
    push();
      translate(cx, cy);
      rotate(theta);
      // Petals: ellipse centered at (petalOffset, 0), size (petalLength, petalWidth)
      ellipse(petalOffset, 0, petalLength, petalWidth);
    pop();
  }

  //Flirtatious
  fill(255, 165, 0);
  noStroke();
  const coreRadius = RADIUS * 0.3;  
  ellipse(cx, cy, coreRadius * 2, coreRadius * 2);
}


/**
 Drawing on drawSectorCircles(224,220) and drawSectorCircles(420,284)
 */
 
function drawSectorCircles(cx, cy) {
  
  const oilPalette = [
    [138,  54,  15], 
    [ 99,  81,  71], 
    [204, 183, 102], 
    [227,   0,  34], 
    [227,  38,  54], 
    [  0,  49,  83], 
    [  0, 105,  70], 
    [ 64, 130, 109], 
    [ 41,  36,  33], 
    [255, 255, 255]  
  ];

  // Outermost layer 40 sectors
  const numOuter = 40;
  const outerAngleStep = TWO_PI / numOuter;
  const outerDiameter = RADIUS * 2 ; 

  noStroke();
  for (let i = 0; i < numOuter; i++) {
 
    const [r, g, b] = oilPalette[i % oilPalette.length];
    fill(r, g, b);
    arc(
      cx, cy,
      outerDiameter, outerDiameter,
      i * outerAngleStep,
      (i + 1) * outerAngleStep,
      PIE
    );
  }

  // Black solid ring
  noStroke();
  fill(0);
  ellipse(cx, cy, RADIUS * 2 - 20, RADIUS * 2 - 20); 

  //Inner layer 30 sectors
  const numInner = 30;
  const innerAngleStep = TWO_PI / numInner;
  const innerDiameter = RADIUS * 2 - 30; 
  noStroke();
  for (let i = 0; i < numInner; i++) {
    
    const [r, g, b] = oilPalette[(i + 3) % oilPalette.length];
    fill(r, g, b);
    arc(
      cx, cy,
      innerDiameter, innerDiameter,
      i * innerAngleStep,
      (i + 1) * innerAngleStep,
      PIE
    );
  }
  
  noStroke();
  const [coreR, coreG, coreB] = oilPalette[2]; 
  fill(coreR, coreG, coreB);
  const coreDiameter = 20; 
  ellipse(cx, cy, coreDiameter, coreDiameter);
}


/**
  Drawing on drawBlackCircles(378,80) and drawBlackCircles(260,428)
 */
function drawBlackCircles(cx, cy) {
  const oilPalette = [
    [138,  54,  15], 
    [ 99,  81,  71], 
    [204, 183, 102], 
    [227,   0,  34], 
    [227,  38,  54], 
    [  0,  49,  83], 
    [  0, 105,  70], 
    [ 64, 130, 109], 
    [ 41,  36,  33], 
    [255, 255, 255]  
  ];


  noStroke();
  fill(148, 0, 211);
  ellipse(cx, cy, 110, 110);

  noStroke();
  fill(0, 102, 204);
  ellipse(cx, cy, 100, 100);

  noStroke();
  fill(0);
  ellipse(cx, cy, 90, 90);

  const numLines = 100;
  const lineColor = color(...oilPalette[9]); 
  stroke(lineColor);
  strokeWeight(2);
  for (let i = 0; i < numLines; i++) {
    const theta = i * TWO_PI / numLines;

    const rOuter = 45;
    const rInner = 30;
    const x1 = cx + cos(theta) * rInner;
    const y1 = cy + sin(theta) * rInner;
    const x2 = cx + cos(theta) * rOuter;
    const y2 = cy + sin(theta) * rOuter;
    line(x1, y1, x2, y2);
  }
  noStroke();

 
  const threePalette = [
    [255, 192, 203], 
    [221, 160, 221], 
    [255, 255, 204]  
  ];
  const numThree = 3;
  const threeAngle = TWO_PI / numThree;
  const threeDiameter = 60;
  noStroke();
  for (let i = 0; i < numThree; i++) {
    const [r, g, b] = threePalette[i];
    fill(r, g, b);
    arc(
      cx, cy,
      threeDiameter, threeDiameter,
      i * threeAngle,
      (i + 1) * threeAngle,
      PIE
    );
  }
 
  noStroke();
  fill(255);
  ellipse(cx, cy, 30, 30);

  noStroke();
  fill(0, 102, 204);
  ellipse(cx, cy, 20, 20);
}

/**
 drawing on drawRedCircle(380,400)
 */
function drawRedCircle(cx, cy) {
  noFill();

  stroke(150,  30,  30);
  strokeWeight(12);
  ellipse(cx, cy, 100, 100);
 
  stroke(200, 100,   0);
  strokeWeight(10);
  ellipse(cx, cy,  80,  80);
  
  stroke( 80,   0,  80);
  strokeWeight(8);
  ellipse(cx, cy,  60,  60);
  
  stroke(  0,  60,  30);
  strokeWeight(6);
  ellipse(cx, cy,  40,  40);

  stroke( 25,  25, 112);
  strokeWeight(4);
  ellipse(cx, cy,  20,  20);

  noStroke();
}

