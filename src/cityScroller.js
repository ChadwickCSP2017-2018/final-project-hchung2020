var WINDOW_WIDTH = screen.width;
var WINDOW_HEIGHT = 600;
var BACKGROUND_COLOR = color(255);
var LEFT = '37';
var RIGHT = '39';
var DOWN = '40';
var UP = '38';
var direction = LEFT;

Character fatguy = new Character();
Skyline tallSkyline = new Skyline(1, 250, 350, color(220));
Skyline middleSkyline = new Skyline(3, 80, 250, color(180));
Skyline shortSkyline = new Skyline(5, 10, 100, color(100));


/* @pjs preload= "tmp-0.gif, tmp-1.gif, tmp-2.gif, tmp-3.gif, tmp-4.gif, tmp-5.gif, tmp-6.gif, tmp-7.gif, tmp-8.gif, tmp-9.gif, tmp-10.gif, tmp-11.gif, tmp-12.gif, tmp-13.gif, tmp-14.gif, tmp-15.gif";*/
/* @pjs preload= "rtmp-0.gif, rtmp-1.gif, rtmp-2.gif, rtmp-3.gif, rtmp-4.gif, rtmp-5.gif, rtmp-6.gif, rtmp-7.gif, rtmp-8.gif, rtmp-9.gif, rtmp-10.gif, rtmp-11.gif, rtmp-12.gif, rtmp-13.gif, rtmp-14.gif, rtmp-15.gif";*/
PImage characterImage;

PImage[] left = new PImage[16];
PImage[] right = new PImage[16];

void setup() {
  size(WINDOW_WIDTH, WINDOW_HEIGHT); //sets the size of the window
  frameRate(30); //how many times the draw function is called per second
  for (var i = 0; i < left.length; i++) {
    left[i] = loadImage("tmp-" + i + ".gif");
  }
  for (var i = 0; i < right.length; i++) {
    right[i] = loadImage("rtmp-" + i + ".gif");
  }

  ;

}

void draw() {
  background(225);
  if (keyPressed) {
    console.log("Pressed a key");
    if (keyCode == LEFT) {
      direction = LEFT;
      fatguy.updateCharacterLeft();
    } else if (keyCode == RIGHT) {
      direction = RIGHT;
      tallSkyline.moveSkyline();
      middleSkyline.moveSkyline();
      shortSkyline.moveSkyline();
      fatguy.updateCharacterRight();
    }

  }
  tallSkyline.drawSkyline();
  middleSkyline.drawSkyline();
  shortSkyline.drawSkyline();
  fatguy.drawCharacter(direction);


}

class Character {
  var xPos;
  var characterNumber;

  Character() {
    xPos = 200;
    characterNumber = 0;
  }
  void moveCharacter() {
    drawCharacter();
    updateCharacter();
  }

  void drawCharacter(var direction) {
    if (direction == LEFT) {
      image(left[characterNumber], xPos, 475, 100, 100);
    } else if (direction == RIGHT) {
      image(right[characterNumber], xPos, 475, 100, 100);
    }
  }

  void updateCharacterLeft() {
    characterNumber++;
    if (xPos > WINDOW_WIDTH + 50) {
      xPos = -50;
    }
    if (xPos < -50) {
      xPos = WINDOW_WIDTH + 50;
    }

    if (characterNumber == left.length) {
      characterNumber = 0;
    }
    xPos -= 3
  }
  void updateCharacterRight() {
    characterNumber++;
    if (xPos > WINDOW_WIDTH + 50) {
      xPos = -50;
    }
    if (xPos < -50) {
      xPosition = WINDOW_WIDTH + 50;
    }
    if (characterNumber == right.length) {
      characterNumber = 0;
    }
    xPos += 3
  }
}
class Skyline {
  ArrayList < Building > buildingList;
  var xPosition, speed, skylineUpbound, skylineLowbound;
  var skylineColor;

  /**
   * Constructs a SkyLine with enough buildings to fill the screen
   */
  Skyline(float s,
    var sl,
      var su,
        var sc) {
    buildingList = new ArrayList < Building > ();
    xPosition = 0;
    speed = s;
    skylineUpbound = su;
    skylineLowbound = sl;
    skylineColor = sc;
    fillSkyline(); //when a Skyline is created it automatically has enough buildings to fill the screen
  }

  void moveSkyline() {
    //TODO:update and draw the skyline, add buildings as buildings leave the screen
    drawSkyline();
    update();
    addBuilding();

  }

  /**
   * Draws the skyline, placing it on the screen
   */
  void drawSkyline() {
    //TODO:loop through buildingList and draw each Building
    for (var i = 0; i < buildingList.size(); i++) {
      var building = buildingList.get(i);
      building.drawBuilding();
    }
  }

  /**
   * Updates the position of each Building in the SkyLine
   */
  void update() {
    //TODO:loop through buildingList and update each Building
    for (var s = 0; s < buildingList.size(); s++) {
      var building = buildingList.get(s);
      building.update();

    }
  }

  /**
   * Adds a building of random building width and then updates
   * the x position to be the right corner of the building in order
   * to have the next building not overlap
   */
  void addBuilding() {
    var randomBuildingWidth = random(50, 100);
    Building currentBuilding = new Building(xPosition, randomBuildingWidth, skylineUpbound,
      skylineLowbound, speed, skylineColor);
    buildingList.add(currentBuilding);
    xPosition += randomBuildingWidth - 5;
  }


  void fillSkyline() {
    //TODO: add enough buildings to fill the screen
    // hint - use xPosition and WINDOW_WIDTH to figure out when you have
    //        enough buildings
    while (xPosition < WINDOW_WIDTH - 10) {
      addBuilding();
    }
  }
}

/**
 * Represents a building, providing a way to place a building and move
 * it across the screen.
 */
 class Building {

  var xPosition, yPosition, buildingHeight, buildingWidth;
  var buildingColor;
  var speed;
  var winHeight, winWidth, winColor;

  /**
   * Constructs a Building object
   * @param xPos - the x position of the top left corner of the building
   * @param bw - the building's width
   */
  Building(var xPos,
    var bw,
      var bh,
        var lb, float s,
          var bc) {

    buildingHeight = random(lb, bh);
    buildingWidth = bw;
    speed = s;
    xPosition = xPos;
    buildingColor = bc;
    winWidth = buildingWidth/4;
    winHeight = buildingHeight/2 + 5;
    winColor = color(239, 242, 247);
  }

  void drawAndUpdate() {
    // var testSpeed = 5;
    drawBuilding();
    update();
  }

  /**
   * Draws a building always attached to the bottom of the screen
   */
  void drawBuilding() {
    fill(buildingColor);
    rect(xPosition, WINDOW_HEIGHT - buildingHeight - 50, buildingWidth, buildingHeight);
    fill(winColor);
    rect(xPosition + (buildingWidth - winWidth)/4, WINDOW_HEIGHT - buildingHeight + (buildingHeight - winHeight)/2 - 50, winWidth, winHeight);
    rect(xPosition + buildingWidth - winWidth - 15, WINDOW_HEIGHT - buildingHeight + (buildingHeight - winHeight)/2 - 50,winWidth,winHeight);
  }

  /**
   * Updates the x position of the building
   * @param speed - the speed at which the building updates
   */
  void update() {
    xPosition -= speed;
  }

}
